import "./assets/styles/TestView.css";
import { useState, useEffect, useRef, memo } from "react";

//Utilize memo to render characters. React skips unmodified "Character" components on each render.
//Uses Character memoized component
const Character = memo(function Character({ char, typed, isCursor}) {
  let color = typed == null ? "black" : typed === char ? "green" : "red";

  const style = {
    color, 
    borderRight: "1.5px solid",
    borderColor: isCursor? "black" : "transparent"
  }
  return <span style={style}>{char}</span>;
});

function TestView() {
  const [typedCharacters, setTypedCharacters] = useState("");
  const [testCharacters, setTestCharacters] = useState([]);
  const inputRef = useRef(null);

  async function getTestWords(wordCount) {
    const res = await fetch(
      `https://random-word-api.vercel.app/api?words=${wordCount}`
    );
    const data = await res.json();

    // Join data array, then return split characters.
    const joinedWords = data.join(" ");
    setTestCharacters(joinedWords.split(""));
  }

  useEffect(() => {
    getTestWords(200); 
  }, []);

  function isCursor(index){
    let currentCharIndex = typedCharacters.length - 1;
    return currentCharIndex === index? true : false;
  }

  function handleChange(e) {
    const typedValue = e.target.value;
    const testValue = testCharacters.join("");

    // Prevent deletion into completed words
    if (typedValue.length < typedCharacters.length) {
      // Only allow deletion if it's in the current word
      const lastCompletedIndex = typedCharacters.lastIndexOf(" ") + 1;
      if (typedValue.length < lastCompletedIndex) {
        return; // ignore backspace into previous words
      }
    }

    // Prevent typing beyond test text
    if (typedValue.length > testValue.length) return;

    setTypedCharacters(typedValue);
  }

  // onClick, uses useRef to give focus to the element. Click anywhere in the TestView Component to give focus
  /* Maps per character of words variable
        if the value of typedCharacter in current index is null, color is black.
        if not null, if typedCharacter in index is equal to current word character, color is green else red
      */
  return (
    <div className="TestView" onClick={() => inputRef.current.focus()}>
      <p className="words">
        {testCharacters.map((char, i) => (
          <Character key={i} char={char} typed={typedCharacters[i]} isCursor={isCursor(i)} />
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
