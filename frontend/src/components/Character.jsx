import { memo } from "react";

//Utilize memo to render characters. React skips unmodified "Character" components on each render.
const Character = memo(function Character({
  char,
  typed,
  isCursor,
  cursorRef,
}) {
  let color =
    typed == null ? "var(--text)" : typed === char ? "var(--white)" : "red";
  const style = {
    color,
    borderRight: "1.5px solid",
    borderColor: isCursor ? "var(--white)" : "transparent",
    transition: "color 0.2s ease, border-color 0.2s ease"
  };
  return (
    <span className=""style={style} ref={isCursor ? cursorRef : null}>
      {char}
    </span>
  );
});

export default Character;