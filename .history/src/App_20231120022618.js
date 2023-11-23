import React, { useEffect, useState } from 'react';
import _debounce from 'lodash/debounce';
import './App.css';

const BASE_URL = 'https://api.coingecko.com/api/v3/nfts/list?asset_platform_id=solana&per_page=200&page=1';

function App() {
  const [nftData, setNftData] = useState(null);

  const fetchNftData = async () => {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setNftData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Debounce the function to avoid making too many requests in a short period
  const debouncedFetch = _debounce(fetchNftData, 1000);

  useEffect(() => {
    debouncedFetch();
    // Cleanup debounce function on component unmount
    return () => debouncedFetch.cancel();
  }, []);

  return (
    <div>
      <h1>NFT Information</h1>
      {nftData ? (
        <ul>
          {nftData.map((nft, index) => (
            <li key={index}>
              <strong>Name:</strong> {nft.name}, <strong>Symbol:</strong> {nft.symbol}
              {nft.market_data && nft.market_data.floor_price && (
                <span>, <strong>Floor Price:</strong> ${nft.market_data.floor_price}</span>
              )}
              <br />
              {nft.id && (
                <a
                  href={`https://www.coingecko.com/en/nft/${nft.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Coingecko
                </a>
              )}
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
