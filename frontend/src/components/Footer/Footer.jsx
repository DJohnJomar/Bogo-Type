import githubIcon from "../../assets/githubIcon.svg";

function Footer(){
    return (
        <footer className="flex justify-center m-5 ">
            <a className="invert flex gap-1  items-center hover:border-b-1" href="https://github.com/DJohnJomar/Bogo-Type" target="_blank">
                <img src={githubIcon} alt="GitHub Icon" className="w-5 h-5"/>
                <span>GitHub</span>
            </a>
        </footer>
    )
}

export default Footer;