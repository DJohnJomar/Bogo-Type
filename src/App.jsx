import "./App.css";
import Keyboard from "./Keyboard";
import TestView from "./TestView";
import { useState, useEffect } from "react";

function App() {

  const [pressedKey, setPressedKey] = useState(null);

  useEffect(() => {
    function handleDown(e) {
      setPressedKey(e.key);
      console.log(e.key);
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

  return (
    <div>
      <h1>Bogo Type</h1>
      <TestView pressedKey={pressedKey}/>
      <Keyboard pressedKey={pressedKey}/>
    </div>
  );
}

export default App;
