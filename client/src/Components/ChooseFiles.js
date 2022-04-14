import './button.css'

const ChooseFiles = () => {

    const handleClick = () => {
        alert("Choose Files")
    }

    return (
        <div className = "choosefiles">
            <button class="btn chooseFilesButton" onClick={handleClick}>CHOOSE FILES</button>
        </div>
    );
}

export default ChooseFiles;
