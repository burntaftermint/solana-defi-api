import React, { useEffect, useState } from 'react';
import _debounce from 'lodash/debounce';
import './App.css';

const BASE_URL = 'https://api.simplehash.com/api/v0/nfts/collections/top_v2?chains=solana&limit=100';

function App() {
  const [collections, setCollections] = useState(null);

  const fetchCollections = async () => {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setCollections(data.collections);
    } catch (error) {
      console.error('Error fetching collections:', error);
    }
  };

  // Debounce the function to avoid making too many requests in a short period
  const debouncedFetch = _debounce(fetchCollections, 1000);

  useEffect(() => {
    debouncedFetch();
    // Cleanup debounce function on component unmount
    return () => debouncedFetch.cancel();
  }, []);

  return (
    <div>
      <h1>NFT Collection Information</h1>
      {collections && (
        <ul>
          {collections.map((collection, index) => (
            <li key={index}>
              <strong>Name:</strong> {collection.collection_details.name}, <strong>Symbol:</strong> {collection.collection_details.symbol}<br />
              <strong>Description:</strong> {collection.collection_details.description}<br />
              <strong>Floor Price:</strong> {collection.floor_prices?.find(price => price.marketplace_id === 'magiceden')?.value ? `${collection.floor_prices.find(price => price.marketplace_id === 'magiceden').value / 1e9} SOL (USD ${collection.floor_prices.find(price => price.marketplace_id === 'magiceden').value_usd_cents / 100})` : 'N/A'}<br />
              <strong>Collection URL:</strong> <a href={collection.collection_details.external_url} target="_blank" rel="noopener noreferrer">{collection.collection_details.external_url}</a><br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
