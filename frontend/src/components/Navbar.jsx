import userIcon from "../assets/userIcon.svg";
import keyboardIcon from "../assets/keyboardIcon.svg";

function Navbar() {
  return (
    <header>
      <nav className="flex items-center justify-between m-5">
        <span className="flex items-center gap-2">
          <img
            src={keyboardIcon}
            alt="Keyboard Logo"
            className="invert w-10 h-10"
          />
          <h1 className="text-4xl font-bold tracking-tight text-(--white)">Bogo Type</h1>
        </span>

        <button className="flex items-center gap-2 text-white">
          <img src={userIcon} alt="User profile" className="w-8 h-8 invert" />
          <span className="text-2xl">User</span>
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
