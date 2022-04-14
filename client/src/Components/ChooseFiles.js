import '../styles/button.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ChooseFile.css';


const ChooseFiles = () => {
    // Populates pre component with file names
    function handleFile(e) {
        e.preventDefault();
        var list = document.getElementById('filelist');
        var userFiles = document.getElementById('files').files;
        list.innerHTML = '';
        for (var i = 0; i < userFiles.length; i++) {
          list.innerHTML += (i + 1) + '. ' + userFiles[i].name + '\n';
        }
        if (list.innerHTML == '') list.style.display = 'none';
        else list.style.display = 'block';
    };

    return (
        <div className="chooseFile">
            <input type="file" className="button" id="files" onChange={handleFile} multiple ></input>
            <pre className="fileList" id="filelist"></pre>
        </div>
    );
}

export default ChooseFiles;
