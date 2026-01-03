
function Key({ char, value, size, pressedKey }) {
  let computedSize = `${setSize(size)}rem`;
  let transition = "color 0.1s, background-color 0.1s";

  let stylePressed =
    pressedKey === value || pressedKey === value.toUpperCase()
      ? {
          backgroundColor: "var(--keyPress)",
        }
      : {
          backgroundColor: "var(--darkerBg)",
        };
  return (
    <div
      className="flex justify-center items-center size-[3em] rounded-xl"
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
