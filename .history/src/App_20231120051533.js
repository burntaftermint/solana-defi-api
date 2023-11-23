import React, { useEffect, useState } from 'react';

const API_URL = 'https://solanaapi.nftscan.com/api/sol/statistics/ranking/trade?time=1d&sort_field=volume&sort_direction=desc';
const API_KEY = 'X71rvLqB1gmCYbp0K7xO1ddj'; // Replace this with your actual API key

function App() {
  const [collections, setCollections] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      const options = {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'X-API-KEY': API_KEY,
        },
      };

      try {
        const response = await fetch(API_URL, options);
        const data = await response.json();

        if (data && Array.isArray(data)) {
          setCollections(data);
        } else {
          console.error('Invalid data format:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCollections();
  }, []);

  return (
    <div>
      <h1>NFT Collections</h1>
      {collections ? (
        <ul>
          {collections.map((collection, index) => (
            <li key={index}>
              <strong>Name:</strong> {collection.collection || 'N/A'}<br />
              <img src={collection.logo_url || 'N/A'} alt="Collection" style={{ maxWidth: '200px', maxHeight: '200px' }} /><br />
              <strong>Lowest Price:</strong> {collection.lowest_price || 'N/A'} SOL<br />
              <strong>24-hour Volume:</strong> {collection.volume ? (parseFloat(collection.volume) / 1e9).toFixed(3).toLocaleString() + ' SOL' : 'N/A'}<br />
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
