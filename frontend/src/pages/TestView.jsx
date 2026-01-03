import "./TestView.css";
import Keyboard from "../components/Keyboard.jsx";
import { useState, useEffect, useRef, memo } from "react";

//Utilize memo to render characters. React skips unmodified "Character" components on each render.
const Character = memo(function Character({
  char,
  typed,
  isCursor,
  cursorRef,
}) {
  let color =
    typed == null ? "var(--text)" : typed === char ? "var(--white)" : "red";
  const style = {
    color,
    borderRight: "1.5px solid",
    borderColor: isCursor ? "var(--white)" : "transparent",
  };
  return (
    <span style={style} ref={isCursor ? cursorRef : null}>
      {char}
    </span>
  );
});

function TestView() {
  const [typedCharacters, setTypedCharacters] = useState("");
  const [testCharacters, setTestCharacters] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [correctWords, setCorrectWords] = useState(0);
  const [pressedKey, setPressedKey] = useState(null);
  const inputRef = useRef(null);
  const testDuration = 60;
  const [timeLeft, setTimeLeft] = useState(testDuration);
  const [wpm, setWpm] = useState(0);
  const wordsContainerRef = useRef(null);
  const cursorRef = useRef(null);

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
    if (timeLeft === 0) {
      //Compute wpm
      const minutes = testDuration / 60;
      const computedWpm = Math.round(correctWords / minutes);
      setWpm(computedWpm);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  //Check last word when time hits 0
  useEffect(() => {
    if (
      timeLeft === 0 &&
      typedCharacters.length > 0 &&
      !typedCharacters.endsWith(" ")
    ) {
      checkLastWord(typedCharacters);
    }
  }, [timeLeft]);

  /*Auto Scrolls the words-container
  vars:
  cursorBottom = Position of the span cursor from top of the container to the bottom of the span (offsetTop + offsetHeight)
  containerSccroll = how far the container have scrolled so far (scrollTop)
  containerHeight = visible height of the container (clientHeight)
  */
  useEffect(() => {
    //Early exit if either refs doesn't exist
    if (!cursorRef.current || !wordsContainerRef.current) return;

    const cursorBottom =
      cursorRef.current.offsetTop + cursorRef.current.offsetHeight;
    const containerScroll = wordsContainerRef.current.scrollTop;
    const containerHeight = wordsContainerRef.current.clientHeight;

    //Approximate one line height
    const lineHeight = cursorRef.current.offsetHeight;

    // Scroll when only one line is left visible
    const scrollThreshold = containerScroll + containerHeight - lineHeight;

    if (cursorBottom > scrollThreshold) {
      wordsContainerRef.current.scrollTop =
        cursorBottom - containerHeight + lineHeight;
    }
  }, [typedCharacters]);

  //Key Press handle for Keyboard Component
  useEffect(() => {
    function handleDown(e) {
      setPressedKey(e.key);
      // console.log(e.key);
    }

    function handleUp() {
      setPressedKey(null);
    }

    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);

    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp);
    };
  }, []);

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
    <div className="TestView h-full" onClick={() => inputRef.current.focus()}>
      <div className="flex justify-around">
        <h2>Time: {timeLeft}</h2>
        <h2>WPM: {wpm}</h2>
      </div>

      <div className="relative">
        <div className="words-container" ref={wordsContainerRef}>
          <p className="words">
            {testCharacters.map((char, i) => (
              <Character
                key={i}
                char={char}
                typed={typedCharacters[i]}
                isCursor={isCursor(i)}
                cursorRef={cursorRef}
              />
            ))}
          </p>
        </div>

        <label htmlFor="type-input">Click here / Press Tab to focus</label>
        {/* The focus will be in the input since it has the useRef object. */}
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

      <div>
        <Keyboard pressedKey={pressedKey} />
      </div>
      {/* <button onClick={() => getWords(200)}>New Test</button> */}
    </div>
  );
}

export default TestView;
