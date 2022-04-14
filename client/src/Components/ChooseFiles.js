import '../styles/button.css'
import 'bootstrap/dist/css/bootstrap.min.css';


const ChooseFiles = () => {
    function handleFile(e) {
        e.preventDefault();
        console.log("here");
        var list = document.getElementById('filelist');
        var files = document.getElementById('files');
        var userFiles = files.files;
        console.log(userFiles);
        list.innerHTML = '';
        for (var i = 0; i < userFiles.length; i++) {
            console.log(userFiles[i].name);
          list.innerHTML += (i + 1) + '. ' + userFiles[i].name + '\n';
        }
        if (list.innerHTML == '') list.style.display = 'none';
        else list.style.display = 'block';
    };

    return (
        <div className="chooseFile">
            <input type="file" className="button" id="files" onChange={handleFile} multiple ></input>
            <pre id="filelist"></pre>
        </div>
    );
}

export default ChooseFiles;
