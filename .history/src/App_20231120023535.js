import React, { useEffect, useState } from 'react';

const API_URL = 'https://api.simplehash.com/api/v0/nfts/collections/top_v2?chains=solana&limit=100';
const API_KEY = 'sh_sk1_Z4jhWXXBE09em';

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
        setCollections(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCollections();
  }, []);

  return (
    <div>
      <h1>Top NFT Collections</h1>
      {collections ? (
        <ul>
          {collections.map((collection, index) => (
            <li key={index}>
              <strong>Name:</strong> {collection.name}, <strong>Symbol:</strong> {collection.symbol}
              {/* Include other information you want to display */}
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
