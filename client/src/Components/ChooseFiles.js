import './button.css'
import 'bootstrap/dist/css/bootstrap.min.css';


const ChooseFiles = () => {

    const handleClick = () => {
        alert("Choose Files")
    }

    return (
        <div className = "choosefiles">
            <button type = "button" class="button chooseFilesButton col-2" onClick={handleClick}>CHOOSE FILES</button>
        </div>
    );
}

export default ChooseFiles;
