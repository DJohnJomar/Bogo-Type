import githubIcon from "../../assets/githubIcon.svg";

function Footer(){
    return (
        <footer className="flex justify-center m-5">
            <a className="invert flex gap-2  items-center" href="https://github.com/DJohnJomar/Bogo-Type" target="_blank">
                <img src={githubIcon} alt="GitHub Icon" />
                <span>GitHub</span>
            </a>
        </footer>
    )
}

export default Footer;