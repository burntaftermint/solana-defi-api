// Your React component file

import React, { useEffect, useState } from 'react';
import fetchBirdeyeData from './apiCaller'; // Adjust the path based on your project structure
import './App.css';

function App() {
  const [birdeyeData, setBirdeyeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBirdeyeData();
        setBirdeyeData(data);
      } catch (error) {
        console.error('Error in fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Birdeye Token Information</h1>
      {birdeyeData ? (
        <ul>
          {birdeyeData.map((token, index) => (
            <li key={index}>
              <strong>Name:</strong> {token.name || 'N/A'} <br />
              <strong>Symbol:</strong> {token.symbol || 'N/A'} <br />
              <strong>Decimals:</strong> {token.decimals || 'N/A'} <br />
              {/* Include additional properties as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
