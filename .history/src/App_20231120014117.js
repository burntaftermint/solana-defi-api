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

  return (
    <div>
      <h1>NFT Information</h1>
      {nftData ? (
        <ul>
          {nftData.map((nft, index) => (
            <li key={index}>
              <strong>Name:</strong> {nft.name}, <strong>Symbol:</strong> {nft.symbol}
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

