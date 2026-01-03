import Key from "./Key";
import { useState, useEffect } from "react";

function Keyboard({ pressedKey }) {
  return (
    <div className="flex flex-col items-center w-screen max-w-fit px-2 gap-2 hidden lg:flex">
      <div className="gap-2 flex flex-row">
        <Key char={"`"} value={"`"} size={"default"} pressedKey={pressedKey} />
        <Key char={"1"} value={"1"} size={"default"} pressedKey={pressedKey} />
        <Key char={"2"} value={"2"} size={"default"} pressedKey={pressedKey} />
        <Key char={"3"} value={"3"} size={"default"} pressedKey={pressedKey} />
        <Key char={"4"} value={"4"} size={"default"} pressedKey={pressedKey} />
        <Key char={"5"} value={"5"} size={"default"} pressedKey={pressedKey} />
        <Key char={"6"} value={"6"} size={"default"} pressedKey={pressedKey} />
        <Key char={"7"} value={"7"} size={"default"} pressedKey={pressedKey} />
        <Key char={"8"} value={"8"} size={"default"} pressedKey={pressedKey} />
        <Key char={"9"} value={"9"} size={"default"} pressedKey={pressedKey} />
        <Key char={"0"} value={"0"} size={"default"} pressedKey={pressedKey} />
        <Key char={"-"} value={"-"} size={"default"} pressedKey={pressedKey} />
        <Key char={"="} value={"="} size={"default"} pressedKey={pressedKey} />
        <Key
          char={"backspace"}
          value={"Backspace"}
          size={"large"}
          pressedKey={pressedKey}
        />
      </div>

      <div className="gap-2 flex flex-row">
        {/* <Key char={"tab"} value={"Tab"} size={"medium"} pressedKey={pressedKey} /> */}
        <Key char={"Q"} value={"q"} size={"default"} pressedKey={pressedKey} />
        <Key char={"W"} value={"w"} size={"default"} pressedKey={pressedKey} />
        <Key char={"E"} value={"e"} size={"default"} pressedKey={pressedKey} />
        <Key char={"R"} value={"r"} size={"default"} pressedKey={pressedKey} />
        <Key char={"T"} value={"t"} size={"default"} pressedKey={pressedKey} />
        <Key char={"Y"} value={"y"} size={"default"} pressedKey={pressedKey} />
        <Key char={"U"} value={"u"} size={"default"} pressedKey={pressedKey} />
        <Key char={"I"} value={"i"} size={"default"} pressedKey={pressedKey} />
        <Key char={"O"} value={"o"} size={"default"} pressedKey={pressedKey} />
        <Key char={"P"} value={"p"} size={"default"} pressedKey={pressedKey} />
        <Key char={"["} value={"["} size={"default"} pressedKey={pressedKey} />
        <Key char={"]"} value={"]"} size={"default"} pressedKey={pressedKey} />
        <Key
          char={"\\ "}
          value={"\\"}
          size={"medium"}
          pressedKey={pressedKey}
        />
      </div>

      <div className="gap-2 flex flex-row">
        {/* <Key char={"capsLock"} value={"CapsLock"} size={"medium"} pressedKey={pressedKey} /> */}
        <Key char={"A"} value={"a"} size={"default"} pressedKey={pressedKey} />
        <Key char={"S"} value={"s"} size={"default"} pressedKey={pressedKey} />
        <Key char={"D"} value={"d"} size={"default"} pressedKey={pressedKey} />
        <Key char={"F"} value={"f"} size={"default"} pressedKey={pressedKey} />
        <Key char={"G"} value={"g"} size={"default"} pressedKey={pressedKey} />
        <Key char={"H"} value={"h"} size={"default"} pressedKey={pressedKey} />
        <Key char={"J"} value={"j"} size={"default"} pressedKey={pressedKey} />
        <Key char={"K"} value={"k"} size={"default"} pressedKey={pressedKey} />
        <Key char={"L"} value={"l"} size={"default"} pressedKey={pressedKey} />
        <Key char={";"} value={";"} size={"default"} pressedKey={pressedKey} />
        <Key char={"'"} value={"'"} size={"default"} pressedKey={pressedKey} />
        {/* <Key char={"enter"} value={"Enter"} size={"x-large"} pressedKey={pressedKey} /> */}
      </div>

      <div className="gap-2 flex flex-row">
        {/* <Key char={"shift"} value={"ShiftLeft"} size={"large"} pressedKey={pressedKey} /> */}
        <Key char={"Z"} value={"z"} size={"default"} pressedKey={pressedKey} />
        <Key char={"X"} value={"x"} size={"default"} pressedKey={pressedKey} />
        <Key char={"C"} value={"c"} size={"default"} pressedKey={pressedKey} />
        <Key char={"V"} value={"v"} size={"default"} pressedKey={pressedKey} />
        <Key char={"B"} value={"b"} size={"default"} pressedKey={pressedKey} />
        <Key char={"N"} value={"n"} size={"default"} pressedKey={pressedKey} />
        <Key char={"M"} value={"m"} size={"default"} pressedKey={pressedKey} />
        <Key char={","} value={","} size={"default"} pressedKey={pressedKey} />
        <Key char={"."} value={"."} size={"default"} pressedKey={pressedKey} />
        <Key char={"/"} value={"/"} size={"default"} pressedKey={pressedKey} />
        {/* <Key char={"shift"} value={"ShiftRight"} size={"xx-large"} pressedKey={pressedKey} /> */}
      </div>

      <div className="gap-2 flex flex-row">
        {/* <Key char={"ctrl"} value={"ControlLeft"} size={"default"} pressedKey={pressedKey} /> */}
        {/* <Key char={"win"} value={"MetaLeft"} size={"default"} pressedKey={pressedKey} /> */}
        {/* <Key char={"alt"} value={"AltLeft"} size={"default"} pressedKey={pressedKey} /> */}
        <Key
          char={"space"}
          value={" "}
          size={"spacebar"}
          pressedKey={pressedKey}
        />
        {/* <Key char={"alt"} value={"AltRight"} size={"default"} pressedKey={pressedKey} /> */}
        {/* <Key char={"fn"} value={"Fn"} size={"default"} pressedKey={pressedKey} /> */}
        {/* <Key char={"menu"} value={"ContextMenu"} size={"default"} pressedKey={pressedKey} /> */}
        {/* <Key char={"ctrl"} value={"ControlRight"} size={"default"} pressedKey={pressedKey} /> */}
      </div>
    </div>
  );
}

export default Keyboard;
