import "./assets/styles/TestView.css";
import { useState, useEffect, useRef, memo } from "react";

//Utilize memo to render characters. React skips unmodified "Character" components on each render.
//Uses Character memoized component
const Character = memo(function Character({ char, typed }) {
  let color = typed == null ? "black" : typed === char ? "green" : "red";
  return <span style={{ color }}>{char}</span>;
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

  // onClick, uses useRef to give focus to the element. Click anywhere in the TestView Component to give focus
  /* Maps per character of words variable
        if the value of typedCharacter in current index is null, color is black.
        if not null, if typedCharacter in index is equal to current word character, color is green else red
      */
  return (
    <div className="TestView" onClick={() => inputRef.current.focus()}>
      <p className="words">
        {testCharacters.map((char, i) => (
          <Character key={i} char={char} typed={typedCharacters[i]} />
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
          onChange={(e) => setTypedCharacters(e.target.value)}
        />
      </div>
      {/* <button onClick={() => getWords(200)}>New Test</button> */}
    </div>
  );
}

export default TestView;
