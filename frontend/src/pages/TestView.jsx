import "./TestView.css";
import Keyboard from "../components/Keyboard.jsx";
import { useState, useEffect, useRef, memo } from "react";
import restartIcon from "../assets/restartIcon.svg";
import Character from "../components/Character.jsx";

function TestView() {
  const defaultDuration = 60;
  const timeOptions = [15, 30, 60, 120];

  const [typedTestCharacters, setTypedCharacters] = useState("");
  const [testCharacters, setTestCharacters] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [pressedKey, setPressedKey] = useState(null);
  const [timeLeft, setTimeLeft] = useState(defaultDuration);
  const [selectedDuration, setSelectedDuration] = useState(defaultDuration);
  const [wpm, setWpm] = useState(-1);
  const [accuracy, setAccuracy] = useState(-1);
  const [errors, setErrors] = useState(-1);

  const inputRef = useRef(null);
  const wordsContainerRef = useRef(null);
  const cursorRef = useRef(null);

  //Words API fetch
  async function getTestWords(wordCount) {
    const res = await fetch(
      `https://random-word-api.vercel.app/api?words=${wordCount}`,
    );
    const data = await res.json();

    // Join data array, then return split characters.
    const joinedWords = data.join(" ");
    setTestCharacters(joinedWords.split(""));
  }

  function isCursor(index) {
    let currentCharIndex = typedTestCharacters.length - 1;
    return currentCharIndex === index ? true : false;
  }

  //Fetch words API on initial render
  useEffect(() => {
    getTestWords(200);
  }, []);

  //Timer function
  useEffect(() => {
    if (!isRunning) return;

    //Compute WPM at end
    if (timeLeft === 0) {
      let correctChars = countCorrectChars();
      let computedWpm = computeWpmRound(correctChars);
      setWpm(computedWpm);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  //AutoScroll function
  useEffect(() => {
    //Early exit if either refs doesn't exist
    if (!cursorRef.current || !wordsContainerRef.current) return;
    const cursor = cursorRef.current;
    const wordsContainer = wordsContainerRef.current;
    const cursorBottom = cursor.offsetTop + cursor.offsetHeight;
    const containerScroll = wordsContainer.scrollTop;
    const containerHeight = wordsContainer.clientHeight;
    
    //Approximate one line height
    const lineHeight = cursor.offsetHeight;

    // Scroll when only one line is left visible
    const scrollThreshold = containerScroll + containerHeight - lineHeight;

    if (cursorBottom > scrollThreshold) {
      wordsContainer.scrollTop = cursorBottom - containerHeight + lineHeight;
    }
  }, [typedTestCharacters]);

  //Key Press handle for Keyboard Component
  useEffect(() => {
    function handleDown(e) {
      setPressedKey(e.key);
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

  function countCorrectChars() {
    let correctChars = 0;
    for (let i = 0; i < typedTestCharacters.length; i++) {
      if (typedTestCharacters[i] === testCharacters[i]) correctChars++;
    }
    return correctChars;
  }

  function computeWpmRound(correctChars) {
    return Math.round(correctChars / 5 / (selectedDuration / 60));
  }

  function computeAccuracyRaw() {
    let typedCount = typedTestCharacters.length;
    let correctChars = countCorrectChars();
    let accuracy = (correctChars / typedCount) * 100;
    return accuracy;
  }

  function countErrors() {
    let typedCount = typedTestCharacters.length;
    let correctChars = countCorrectChars();
    return typedCount - correctChars;
  }

  //Changes in input element - Triggers per keystroke
  function handleChange(e) {
    const typedValue = e.target.value;
    const testValue = testCharacters.join("");

    // Start timer on first keystroke
    if (!isRunning && typedValue.length > 0) {
      setIsRunning(true);
    }

    // Stop typing when time runs out
    if (timeLeft === 0) return;

    // Prevent typing beyond test text
    if (typedValue.length > testValue.length) return;

    setTypedCharacters(typedValue);
  }

  function restartTest() {
    setTypedCharacters("");
    setWpm(-1);
    setTimeLeft(selectedDuration);
    setIsRunning(false);
    setPressedKey(null);

    getTestWords(200);

    // Reset scroll
    if (wordsContainerRef.current) {
      wordsContainerRef.current.scrollTop = 0;
    }
  }

  function timeSelect(time) {
    setSelectedDuration(time);
    setTimeLeft(time);
  }

  // onClick, uses useRef to give focus to the element. Click anywhere in the TestView Component to give focus
  /* Maps per character of words variable
        if the value of typedCharacter in current index is null, color is black.
        if not null, if typedCharacter in index is equal to current word character, color is green else red
      */
  return (
    <div
      className="TestView h-full flex flex-col gap-5"
      onClick={() => inputRef.current.focus()}
    >
      <div
        className={`bg-(--darkerBg) rounded-xl transition:all duration-200 ${
          isRunning ? "opacity-0 scale-90" : "opacity-100 scale-100"
        }`}
      >
        <span>
          {timeOptions.map((time) => (
            <button
              key={time}
              onClick={() => timeSelect(time)}
              disabled={isRunning} // prevent changing mid-test
              className={`px-4 py-2 transition-colors transform duration-200 hover:scale-125
        ${selectedDuration === time ? "text-(--neon-green)" : "text-(--white)"}
        hover:text-(--lighter-neon-green)`}
            >
              {time}s
            </button>
          ))}
        </span>
      </div>

      <div className={`flex justify-around w-full`}>
        <h2
          className={`text-3xl text-(--neon-green) transition:all duration-200 ${
            isRunning ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          {timeLeft}
        </h2>
        <h2
          className={`text-3xl text-(--neon-green) transition:all duration-200 ${
            wpm >= 0 ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          {wpm} wpm
        </h2>
      </div>

      <div className="relative">
        <div className="cursor-pointer">
          <p
            className="words text-1xl text-[1.9rem] md:text-3xl lg:text-[2.4rem]"
            ref={wordsContainerRef}
          >
            {testCharacters.map((char, i) => (
              <Character
                key={i}
                char={char}
                typed={typedTestCharacters[i]}
                isCursor={isCursor(i)}
                cursorRef={cursorRef}
              />
            ))}
          </p>
        </div>

        <label htmlFor="type-input" className="text-lg md:text-xl xl:text-3xl">
          Click here / Press Tab to focus
        </label>
        {/* The focus will be in the input since it has the useRef object. */}
        <input
          ref={inputRef}
          tabIndex={0}
          id="type-input"
          type="text"
          autoFocus
          value={typedTestCharacters}
          onChange={handleChange}
          onPaste={(e) => e.preventDefault()}
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          autoCapitalize="off"
        />
      </div>

      <div className="flex justify-center">
        <div className="relative group">
          <button
            onClick={restartTest}
            className="cursor-pointer transform transition-transform duration-200 hover:scale-125"
          >
            <img
              src={restartIcon}
              alt="Restart test"
              className="invert w-8 h-8"
            />
          </button>

          <span
            className="
        pointer-events-none
        absolute top-full left-1/2
        -translate-x-1/2
        rounded-md bg-black px-2 py-1
        text-xs text-(--white) whitespace-nowrap
        opacity-0 scale-95
        transition-all duration-200
        group-hover:opacity-100 group-hover:scale-100
      "
          >
            Restart test
          </span>
        </div>
      </div>

      <div className="m-5">
        <Keyboard pressedKey={pressedKey} />
      </div>
    </div>
  );
}

export default TestView;
