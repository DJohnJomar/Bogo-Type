import "./App.css";
import Keyboard from "./Keyboard";
import TestView from "./TestView";
import { useState, useEffect } from "react";

function App() {

  const [pressedKey, setPressedKey] = useState(null);

  useEffect(() => {
    function handleDown(e) {
      setPressedKey(e.code);
    //   console.log(e.code);
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
      <TestView />
      <Keyboard pressedKey={pressedKey}/>
    </div>
  );
}

export default App;
