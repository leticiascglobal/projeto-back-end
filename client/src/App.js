import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [files, setFiles] = useState([]);
  const [prompt, setPrompt] = useState("");

  function handleChange(event) {
    setFiles([...event.target.files]);
    console.log([...event.target.files]);
  }

  function handlePromptChange(event) {
    setPrompt(event.target.value);
  }

  function handleMultipleSubmit(event) {
    event.preventDefault();
    if (files.length === 0) {
      console.log("No file selected");
      return;
    }
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });
    formData.append("prompt", prompt);

    axios({
      method: 'post',
      url: 'http://127.0.0.1:5000/upload',
      data: formData,
    }).then(response => {
      console.log(response);
    }).catch(error => {
      console.log("Erro na requisição:", error);
    });
  }

  return (
    <div className="App">
      <form onSubmit={handleMultipleSubmit}>
        <label htmlFor="file" style={{ cursor: 'pointer' }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
          </svg>
        </label>
        <input
          id="file"
          type="file"
          accept=".pdf"
          onChange={handleChange}
          multiple
          style={{ display: 'none' }} 
        />

        <br />
        <input
          className="prompt"
          type="text"
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Insira o prompt"
        />
        <br/>
        <br/>
        <button type="submit" className="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;
