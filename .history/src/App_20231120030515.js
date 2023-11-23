import React, { useEffect, useState } from 'react';

const API_URL = 'https://api.simplehash.com/api/v0/nfts/collections/top_v2?chains=solana&limit=100';
const API_KEY = 'cfils1214_sk_a5cb95f3-fbdf-4657-94cc-d39e495a4ab0_0lnpqbvm051uhuhr';

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

        if (data.collections && Array.isArray(data.collections)) {
          setCollections(data.collections);
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
              <strong>Name:</strong> {collection.collection_details?.name || 'N/A'}, <strong>Symbol:</strong> {collection.collection_details?.symbol || 'N/A'}<br />
              <img src={collection.collection_details?.image_url} alt="Collection" style={{ maxWidth: '200px', maxHeight: '200px' }} /><br />
              <strong>Description:</strong> {collection.collection_details?.description || 'N/A'}<br />
              <strong>Floor Price:</strong> {collection.floor_prices?.length > 0
  ? `${(Math.min(...collection.floor_prices.map(price => price.value_usd_cents)) / 100).toLocaleString("en-US", { style: 'currency', currency: 'USD' })}`
  : 'N/A'}<br />

              <strong>Collection URL:</strong> <a href={collection.collection_details?.external_url} target="_blank" rel="noopener noreferrer">{collection.collection_details?.external_url || 'N/A'}</a><br />
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
