import './button.css'
import BAMLogo from '../assets/BAMLogo.png'

const Header = () => {
    const handleClick = () => {
        alert("About")
    }

    return (
        <div className = "Header">
           <img src = {BAMLogo} class="bam-image-size" alt="BAM! Logo"/>
            <button class="QuestionMark" onClick={handleClick}>?</button>
        </div>
    );
}

export default Header;
