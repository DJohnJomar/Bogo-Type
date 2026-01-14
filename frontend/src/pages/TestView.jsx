import "./TestView.css";
import Keyboard from "../components/Keyboard.jsx";
import { useState, useEffect, useRef, memo } from "react";
import restartIcon from "../assets/restartIcon.svg";
import Character from "../components/Character.jsx";

function TestView() {
  const [typedCharacters, setTypedCharacters] = useState("");
  const [testCharacters, setTestCharacters] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [correctWords, setCorrectWords] = useState(0);
  const [pressedKey, setPressedKey] = useState(null);
  const inputRef = useRef(null);
  const defaultDuration = 60;
  const [timeLeft, setTimeLeft] = useState(defaultDuration);
  const [selectedDuration, setSelectedDuration] = useState(defaultDuration);
  const [wpm, setWpm] = useState(-1);
  const wordsContainerRef = useRef(null);
  const cursorRef = useRef(null);
  const timeOptions = [15, 30, 60, 120];

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

  //Fetch words API on initial render
  useEffect(() => {
    getTestWords(200);
  }, []);

  //Timer function
  useEffect(() => {
    if (!isRunning) return;
    if (timeLeft === 0) {
      let correctChars = 0;
      for (let i = 0; i < typedCharacters.length; i++) {
        if (typedCharacters[i] === testCharacters[i]) correctChars++;
      }
      const computedWpm = Math.round(
        correctChars / 5 / (selectedDuration / 60)
      );
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
      setCorrectWords(countCorrectWords);
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

  function countCorrectWords() {
    const typedWords = typedCharacters.trim().split(" ");
    const testWords = testCharacters.join("").split(" ");

    let correct = 0;

    for (let i = 0; i < typedWords.length; i++) {
      if (typedWords[i] === testWords[i]) {
        correct++;
      }
    }

    return correct;
  }

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

    // Prevent typing beyond test text
    if (typedValue.length > testValue.length) return;

    //Word completion check
    if (typedValue.endsWith(" ") && !typedCharacters.endsWith(" ")) {
      setCorrectWords(countCorrectWords);
    }

    setTypedCharacters(typedValue);
  }

  function restartTest() {
    setTypedCharacters("");
    setCorrectWords(0);
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
        <div className="words-container cursor-pointer" ref={wordsContainerRef}>
          <p className="words text-1xl text-[1.9rem] md:text-3xl lg:text-[2.4rem]">
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
          value={typedCharacters}
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
