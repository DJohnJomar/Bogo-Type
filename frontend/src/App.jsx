import "./App.css";
import Keyboard from "./components/Keyboard/Keyboard.jsx";
import TestView from "./pages/TestView/TestView.jsx";
import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [pressedKey, setPressedKey] = useState(null);

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

  return (
    <BrowserRouter>
      <div>
        <h1>Bogo Type</h1>
        <TestView />
        <Keyboard pressedKey={pressedKey} />
      </div>
    </BrowserRouter>
  );
}

export default App;
