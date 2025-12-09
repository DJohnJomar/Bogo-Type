import "./assets/styles/TestView.css";
import { useState, useEffect, useRef } from "react";
/*
Input focus system:
React useRef to give focus to the input field
tabIndex to make input field to be first when tabbing


*/
function TestView({ pressedKey }) {
  const [typedCharacters, setTypedCharacters] = useState("");
  const [words, setWords] = useState("");
  const inputRef = useRef(null);

  async function getWords(wordCount) {
    let res = await fetch(
      `https://random-word-api.vercel.app/api?words=${wordCount}`
    );
    let data = await res.json();
    let words = "";
    data.forEach((word) => {
      words += `${word} `;
    });
    setWords(words);
  }

  useEffect(() => {
    getWords(20);
  }, []);

  return (
    // onClick, uses useRef to give focus to the element. Click anywhere in the TestView Component to give focus
    /* Maps per character of words variable
        if the value of typedCharacter in current index is null, color is black.
        if not null, if typedCharacter in index is equal to current word character, color is green else red
      */
    <div className="TestView" onClick={() => inputRef.current.focus()}>
      <p className="words">
        {[...words].map((char, i) => {
          const typed = typedCharacters[i];

          let color =
            typed == null ? "black" : typed === char ? "green" : "red";

          return (
            <span key={i} style={{ color }}>
              {char}
            </span>
          );
        })}
      </p>

      <div className="cursor"></div>

      {/* The focus will be in the input since it has the useRef object. */}
      <div id="focus-error">
        <label htmlFor="type-input">Click here/ Press Tab to focus</label>
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
