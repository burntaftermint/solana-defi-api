import React, { useEffect } from 'react';
import './App.css';


const BASE_URL = 'https://api.tensor.so/graphql'

function App() {

  useEffect(() => {
    fetch(BASE_URL)
    .then(res => res.json())
    .then(data => console.log(data))
  }, [])

  return (
   <h1>bitch work</h1>
  );
}

export default App;
