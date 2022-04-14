import '../styles/button.css'
import BAMLogo from '../assets/BAMLogo.png'

const Header = () => {

    return (
        <div className = "Header">
           <img src = {BAMLogo} class="bam-image-size" alt="BAM! Logo"/>
            <button>?</button>
        </div>
    );
}

export default Header;
