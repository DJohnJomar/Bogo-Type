import "./assets/styles/TestView.css";
import { useState, useRef } from "react";
/*
Utilizing:
React useRef to give focus to the input field
tabIndex to make input field to be first when tabbing


*/
function TestView({ pressedKey }) {
  const [typedCharacters, setTypedCharacters] = useState("");
  const inputRef = useRef(null);

  let words =
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut ex non qui ipsam quibusdam facilis nostrum architecto nihil consequatur maiores, unde optio magnam voluptatibus aspernatur asperiores praesentium iste distinctio vero!";

  return (
    <div
      className="TestView"
      onClick={() => inputRef.current.focus()} // ✅ CLICK ANYWHERE TO FOCUS
    >
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

      <div id="focus-error">
        <label htmlFor="type-input">
          Click here/ Press Tab to focus
        </label>

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
    </div>
  );
}

export default TestView;
