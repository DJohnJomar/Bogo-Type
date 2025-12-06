import Key from "./Key";
import "./assets/styles/Keyboard.css";
import { useState, useEffect } from "react";

function Keyboard() {
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
    <div className="Keyboard">
        <div className="row">
            <Key char={"`"} value={"Backquote"} size={"default"} pressedKey={pressedKey} />
            <Key char={"1"} value={"Digit1"} size={"default"} pressedKey={pressedKey} />
            <Key char={"2"} value={"Digit2"} size={"default"} pressedKey={pressedKey} />
            <Key char={"3"} value={"Digit3"} size={"default"} pressedKey={pressedKey} />
            <Key char={"4"} value={"Digit4"} size={"default"} pressedKey={pressedKey} />
            <Key char={"5"} value={"Digit5"} size={"default"} pressedKey={pressedKey} />
            <Key char={"6"} value={"Digit6"} size={"default"} pressedKey={pressedKey} />
            <Key char={"7"} value={"Digit7"} size={"default"} pressedKey={pressedKey} />
            <Key char={"8"} value={"Digit8"} size={"default"} pressedKey={pressedKey} />
            <Key char={"9"} value={"Digit9"} size={"default"} pressedKey={pressedKey} />
            <Key char={"0"} value={"Digit0"} size={"default"} pressedKey={pressedKey} />
            <Key char={"-"} value={"Minus"} size={"default"} pressedKey={pressedKey} />
            <Key char={"="} value={"Equal"} size={"default"} pressedKey={pressedKey} />
            <Key char={"backspace"} value={"Backspace"} size={"large"} pressedKey={pressedKey} />
        </div>

        <div className="row">
            <Key char={"tab"} value={"Tab"} size={"medium"} pressedKey={pressedKey} />
            <Key char={"Q"} value={"KeyQ"} size={"default"} pressedKey={pressedKey} />
            <Key char={"W"} value={"KeyW"} size={"default"} pressedKey={pressedKey} />
            <Key char={"E"} value={"KeyE"} size={"default"} pressedKey={pressedKey} />
            <Key char={"R"} value={"KeyR"} size={"default"} pressedKey={pressedKey} />
            <Key char={"T"} value={"KeyT"} size={"default"} pressedKey={pressedKey} />
            <Key char={"Y"} value={"KeyY"} size={"default"} pressedKey={pressedKey} />
            <Key char={"U"} value={"KeyU"} size={"default"} pressedKey={pressedKey} />
            <Key char={"I"} value={"KeyI"} size={"default"} pressedKey={pressedKey} />
            <Key char={"O"} value={"KeyO"} size={"default"} pressedKey={pressedKey} />
            <Key char={"P"} value={"KeyP"} size={"default"} pressedKey={pressedKey} />
            <Key char={"["} value={"BracketLeft"} size={"default"} pressedKey={pressedKey} />
            <Key char={"]"} value={"BracketRight"} size={"default"} pressedKey={pressedKey} />
            <Key char={"\\ "} value={"Backslash"} size={"medium"} pressedKey={pressedKey} />
        </div>

        <div className="row">
            <Key char={"capsLock"} value={"CapsLock"} size={"medium"} pressedKey={pressedKey} />
            <Key char={"A"} value={"KeyA"} size={"default"} pressedKey={pressedKey} />
            <Key char={"S"} value={"KeyS"} size={"default"} pressedKey={pressedKey} />
            <Key char={"D"} value={"KeyD"} size={"default"} pressedKey={pressedKey} />
            <Key char={"F"} value={"KeyF"} size={"default"} pressedKey={pressedKey} />
            <Key char={"G"} value={"KeyG"} size={"default"} pressedKey={pressedKey} />
            <Key char={"H"} value={"KeyH"} size={"default"} pressedKey={pressedKey} />
            <Key char={"J"} value={"KeyJ"} size={"default"} pressedKey={pressedKey} />
            <Key char={"K"} value={"KeyK"} size={"default"} pressedKey={pressedKey} />
            <Key char={"L"} value={"KeyL"} size={"default"} pressedKey={pressedKey} />
            <Key char={";"} value={"Semicolon"} size={"default"} pressedKey={pressedKey} />
            <Key char={"'"} value={"Quote"} size={"default"} pressedKey={pressedKey} />
            <Key char={"enter"} value={"Enter"} size={"x-large"} pressedKey={pressedKey} />
        </div>

        <div className="row">
            <Key char={"shift"} value={"ShiftLeft"} size={"large"} pressedKey={pressedKey} />
            <Key char={"Z"} value={"KeyZ"} size={"default"} pressedKey={pressedKey} />
            <Key char={"X"} value={"KeyX"} size={"default"} pressedKey={pressedKey} />
            <Key char={"C"} value={"KeyC"} size={"default"} pressedKey={pressedKey} />
            <Key char={"V"} value={"KeyV"} size={"default"} pressedKey={pressedKey} />
            <Key char={"B"} value={"KeyB"} size={"default"} pressedKey={pressedKey} />
            <Key char={"N"} value={"KeyN"} size={"default"} pressedKey={pressedKey} />
            <Key char={"M"} value={"KeyM"} size={"default"} pressedKey={pressedKey} />
            <Key char={","} value={"Comma"} size={"default"} pressedKey={pressedKey} />
            <Key char={"."} value={"Period"} size={"default"} pressedKey={pressedKey} />
            <Key char={"/"} value={"Slash"} size={"default"} pressedKey={pressedKey} />
            <Key char={"shift"} value={"ShiftRight"} size={"xx-large"} pressedKey={pressedKey} />
        </div>

        <div className="row">
            <Key char={"ctrl"} value={"ControlLeft"} size={"default"} pressedKey={pressedKey} />
            <Key char={"win"} value={"MetaLeft"} size={"default"} pressedKey={pressedKey} />
            <Key char={"alt"} value={"AltLeft"} size={"default"} pressedKey={pressedKey} />
            <Key char={"space"} value={"Space"} size={"spacebar"} pressedKey={pressedKey} />
            <Key char={"alt"} value={"AltRight"} size={"default"} pressedKey={pressedKey} />
            <Key char={"fn"} value={"Fn"} size={"default"} pressedKey={pressedKey} />
            <Key char={"menu"} value={"ContextMenu"} size={"default"} pressedKey={pressedKey} />
            <Key char={"ctrl"} value={"ControlRight"} size={"default"} pressedKey={pressedKey} />
        </div>
    </div>


  );
}

export default Keyboard;
