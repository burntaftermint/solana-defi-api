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

        if (Array.isArray(data)) {
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
              <strong>Name:</strong> {collection.collection_details.name}, <strong>Symbol:</strong> {collection.collection_details.symbol}<br />
              <strong>Description:</strong> {collection.collection_details.description}<br />
              <strong>Floor Price:</strong> {collection.floor_prices[0].value / 1e9} SOL (USD {collection.floor_prices[0].value_usd_cents / 100})<br />
              <strong>Collection URL:</strong> <a href={collection.collection_details.external_url} target="_blank" rel="noopener noreferrer">{collection.collection_details.external_url}</a><br />
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
