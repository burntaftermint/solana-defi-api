import React, { useEffect } from 'react';
import './App.css';

const BASE_URL = 'https://api.coingecko.com/api/v3/nfts/list?per_page=100&page=1'

function App() {
  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => console.log(data))
  }, [])

  return (
    <div>App</div>
  );
}

export default App;
