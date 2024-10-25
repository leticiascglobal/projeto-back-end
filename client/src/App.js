import React,{useState, useEffect } from 'react';
import axios from 'axios';

function App() {
 
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  function handleChange(event) {
    setFiles([...event.target.files]);
    console.log([...event.target.files]);
  }

  function handleMultipleSubmit(event) {
    event.preventDefault();
    if (files == null) {
      console.log("No file selected")
      return;
    }

    const formData = new FormData();
    files.forEach((file,index) => {
      formData.append(`file${index}`, file);
    });

    axios({
      method: 'post',
      url: 'http://127.0.0.1:5000/upload',
      data: formData,
      }).then(function (response) {
        console.log(response);
      }).catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div>
      <form action="">
        <input id='file' type='file' accept='.pdf' onChange={handleChange} multiple />
        <br/>
        <button className='submit' onClick={handleMultipleSubmit}>Faça o upload</button>
       

      </form>
    </div>
  )
}

export default App
