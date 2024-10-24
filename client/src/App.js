import React,{useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/members")
      .then(response => response.json())
      .then(data => {
        setData(data.members);
        console.log(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  
  return (
    <div>App</div>
  )
}

export default App
