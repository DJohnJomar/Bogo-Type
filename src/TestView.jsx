import "./assets/styles/TestView.css";
import { useState, useEffect, useRef, memo } from "react";

//Utilize memo to render characters. React skips unmodified "Character" components on each render.
const Character = memo(function Character({ char, typed, isCursor }) {
  let color = typed == null ? "black" : typed === char ? "green" : "red";
  const style = {
    color,
    borderRight: "1.5px solid",
    borderColor: isCursor ? "black" : "transparent",
  };
  return <span style={style}>{char}</span>;
});

function TestView() {
  const [typedCharacters, setTypedCharacters] = useState("");
  const [testCharacters, setTestCharacters] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [correctWords, setCorrectWords] = useState(0);
  const inputRef = useRef(null);
  const TEST_DURATION = 10;
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION);

  //Words API fetch
  async function getTestWords(wordCount) {
    const res = await fetch(
      `https://random-word-api.vercel.app/api?words=${wordCount}`
    );
    const data = await res.json();

    // Join data array, then return split characters.
    const joinedWords = data.join(" ");
    setTestCharacters(joinedWords.split(""));
  }

  function isCursor(index) {
    let currentCharIndex = typedCharacters.length - 1;
    return currentCharIndex === index ? true : false;
  }

  function checkLastWord(typedValue) {
    const typedWords = typedValue.trim().split(" ");
    const testWords = testCharacters.join("").split(" ");

    const currentWordIndex = typedWords.length - 1;

    if (typedWords[currentWordIndex] === testWords[currentWordIndex]) {
      setCorrectWords((prev) => prev + 1);
    }
  }

  //Fetch words API on initial render
  useEffect(() => {
    getTestWords(200);
  }, []);

  //Timer function
  useEffect(() => {
    if (!isRunning) return;
    if (timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  //
  useEffect(() => {
    if (
      timeLeft === 0 &&
      typedCharacters.length > 0 &&
      !typedCharacters.endsWith(" ")
    ) {
      checkLastWord(typedCharacters);
    }
  }, [timeLeft]);

  //Changes in input element
  function handleChange(e) {
    const typedValue = e.target.value;
    const testValue = testCharacters.join("");

    // Start timer on first keystroke
    if (!isRunning && typedValue.length > 0) {
      setIsRunning(true);
    }

    // Stop typing when time runs out
    if (timeLeft === 0) return;

    //Prevent erasing into completed words
    if (typedValue.length < typedCharacters.length) {
      const spaceIndex = typedCharacters.lastIndexOf(" ");
      if (spaceIndex !== -1 && typedValue.length <= spaceIndex) {
        return;
      }
    }

    // Prevent typing beyond test text
    if (typedValue.length > testValue.length) return;

    //Word completion check
    if (typedValue.endsWith(" ") && !typedCharacters.endsWith(" ")) {
      checkLastWord(typedValue);
    }

    setTypedCharacters(typedValue);
  }

  // onClick, uses useRef to give focus to the element. Click anywhere in the TestView Component to give focus
  /* Maps per character of words variable
        if the value of typedCharacter in current index is null, color is black.
        if not null, if typedCharacter in index is equal to current word character, color is green else red
      */
  return (
    <div className="TestView" onClick={() => inputRef.current.focus()}>
      <div>
        <h2>Time: {timeLeft}</h2>
        <h3>Correct words: {correctWords}</h3>
      </div>
      <p className="words">
        {testCharacters.map((char, i) => (
          <Character
            key={i}
            char={char}
            typed={typedCharacters[i]}
            isCursor={isCursor(i)}
          />
        ))}
      </p>

      <div className="cursor"></div>

      {/* The focus will be in the input since it has the useRef object. */}
      <div id="focus-error">
        <label htmlFor="type-input">Click here / Press Tab to focus</label>
        {/* Invisible input */}
        <input
          ref={inputRef}
          tabIndex={0}
          id="type-input"
          type="text"
          autoFocus
          value={typedCharacters}
          onChange={handleChange}
        />
      </div>
      {/* <button onClick={() => getWords(200)}>New Test</button> */}
    </div>
  );
}

export default TestView;
