import '../styles/button.css'
import 'bootstrap/dist/css/bootstrap.min.css';


const ChooseFiles = () => {

    return (
        <div className = "chooseFilesButtonCSS">
            <input class="col-2 button chooseFilesButton" type="file" names="files[]" multiple></input>
            <div className="fileList"></div>
        </div>
    );
}

export default ChooseFiles;
