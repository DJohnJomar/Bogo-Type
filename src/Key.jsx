import "./assets/styles/Key.css";

function Key({ char, value, size, pressedKey }) {
  let computedSize = `${setSize(size)}rem`;
  let transition = "color 0.1s, background-color 0.1s, border 0.1s";

  let stylePressed =
    pressedKey === value
      ? {
          color: "white",
          backgroundColor: "black",
          border: "1px solid white",
        }
      : {
          color: "black",
          backgroundColor: "white",
          border: "1px solid gray",
        };
  return (
    <div
      className="Key"
      style={{ width: computedSize, transition, ...stylePressed }}
    >
      <p>{char}</p>
    </div>
  );
}

function setSize(size) {
  switch (size) {
    case "default":
      return 3;
    case "medium":
      return 4.5;
    case "large":
      return 6;
    case "x-large":
      return 8;
    case "xx-large":
      return 10;
    case "spacebar":
      return 26.5;
  }
}

export default Key;
