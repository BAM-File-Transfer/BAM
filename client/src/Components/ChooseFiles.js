import '../styles/button.css'
import '../styles/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'

const ChooseFiles = () => {
  // Populates pre component with file names
  function handleFile (e) {
    e.preventDefault()
    const fileListContainer = document.getElementById('fileListContainer')
    const fileList = document.getElementById('filelist')
    const userFiles = document.getElementById('files').files
    fileList.innerHTML = ''
    for (let i = 0; i < userFiles.length; i++) {
      fileList.innerHTML += userFiles[i].name + '\n\n'
    }
    if (fileList.innerHTML === '' || fileList.innerHTML === null) {
      fileList.style.display = 'none'
      fileListContainer.style.display = 'none'
    } else {
      fileList.style.display = 'block'
      fileListContainer.style.display = 'flex'
    }
  };

  return (
        <div className="chooseFile">
            <input type="file" className="button" id="files" onChange={handleFile} multiple ></input>
            <div className="fileListContainer" id="fileListContainer">
                <pre className="fileList" id="filelist"></pre>
            </div>
        </div>
  )
}

export default ChooseFiles
