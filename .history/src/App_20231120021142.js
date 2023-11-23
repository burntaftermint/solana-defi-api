import React, { useEffect, useState } from 'react';
import './App.css';

const BASE_URL = 'https://api.coingecko.com/api/v3/nfts/list?asset_platform_id=solana&per_page=200&page=1';

function App() {
  const [nftData, setNftData] = useState(null);

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => setNftData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const getCollectionImage = (collectionName) => {
    // Assuming Coingecko uses a standard URL structure for NFT collections
    // Modify this URL structure based on the actual URL patterns on Coingecko
    return `https://coingecko.com/en/nft/${collectionName}`;
  };

  return (
    <div>
      <h1>NFT Information</h1>
      {nftData ? (
        <ul>
          {nftData.map((nft, index) => (
            <li key={index}>
              <strong>Name:</strong> {nft.name}, <strong>Symbol:</strong> {nft.symbol}
              <br />
              <img
                src={getCollectionImage(nft.id)}
                alt={`${nft.name} Collection Image`}
                style={{ maxWidth: '100px', maxHeight: '100px' }}
              />
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
