import React, { useEffect, useState } from 'react';
import './App.css';

const SOLANA_API_URL = 'https://api.simplehash.com/api/v0/nfts/collections/top_v2?chains=solana&time_period=24h&limit=100';
const SOLANA_API_KEY = 'cfils1214_sk_a5cb95f3-fbdf-4657-94cc-d39e495a4ab0_0lnpqbvm051uhuhr';
const BIRDEYE_API_URL = 'https://public-api.birdeye.so/public/tokenlist?sort_by=v24hUSD&sort_type=desc';
const BIRDEYE_API_KEY = '44bca3513a0f44748ad83d5896123afe';

function App() {
  const [solanaCollections, setSolanaCollections] = useState(null);
  const [birdeyeData, setBirdeyeData] = useState(null);

  useEffect(() => {
    // Fetch Solana NFTs
    const fetchSolanaCollections = async () => {
      const options = {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'X-API-KEY': SOLANA_API_KEY,
        },
      };

      try {
        const response = await fetch(SOLANA_API_URL, options);
        const data = await response.json();

        if (data.collections && Array.isArray(data.collections)) {
          setSolanaCollections(data.collections);
        } else {
          console.error('Invalid data format:', data);
        }
      } catch (error) {
        console.error('Error fetching Solana NFTs data:', error);
      }
    };

    // Fetch data from the second API
    const fetchBirdeyeData = async () => {
      const options = { method: 'GET', headers: { 'X-API-KEY': BIRDEYE_API_KEY } };

      try {
        const response = await fetch(BIRDEYE_API_URL, options);
        const data = await response.json();
        setBirdeyeData(data);
      } catch (error) {
        console.error('Error fetching Birdeye data:', error);
      }
    };

    // Perform both API calls
    fetchSolanaCollections();
    fetchBirdeyeData();
  }, []);

  return (
    <div className="NFTs">
      <h1>Top 100 Solana NFTs</h1>
      <h3>This is a top 100 list of Solana NFTs in terms of volume over the last 24 hours. The list is generated using the SimpleHash API and is updated daily.</h3>

      <p className="website__rights">Website built by<a href="https://twitter.com/burntaftermint" target="_blank" rel="noopener noreferrer" className="burnt"> @burntaftermint.sol</a></p>
      
      {/* Display Solana NFTs */}
      {solanaCollections ? (
        <ul className="NFT-list">
          {solanaCollections.map((collection, index) => (
            <li key={index}>
              <strong>{collection.collection_details?.name || 'N/A'}</strong> <br />
              <span className="img"><img src={collection.collection_details?.image_url} alt="Collection" style={{ maxWidth: '200px', maxHeight: '200px' }} /></span><br />
              <span className="description">{collection.collection_details?.description || 'N/A'}</span><br />
              <strong>24-hour Volume:</strong> {collection.volume_string ? (parseFloat(collection.volume_string) / 1e9).toFixed(3).toLocaleString() + ' SOL' : 'N/A'}<br />

              {/* Display Tensor floor prices if available */}
              {collection.collection_details?.floor_prices && (
                <div>
                  <strong>Floor Prices:</strong>
                  {collection.collection_details.floor_prices.map((floorPrice, floorIndex) => (
                    <div key={floorIndex}>
                      {floorPrice.marketplace_name}: {floorPrice.value / 10**collection.payment_token?.decimals} {collection.payment_token?.symbol} (USD: {floorPrice.value_usd_cents / 100})
                    </div>
                  ))}
                </div>
              )}
              {/* Display Tensor marketplace URL if available */}
              {collection.collection_details?.marketplace_pages && (
                <div>
                  <strong>Marketplaces:</strong>
                  {collection.collection_details.marketplace_pages.map((marketplace, marketplaceIndex) => (
                    <div key={marketplaceIndex}>
                      <a href={marketplace.collection_url} target="_blank" rel="noopener noreferrer" className="marketplace-link">
                        {marketplace.marketplace_name || 'N/A'}
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading Solana NFTs data...</p>
      )}

      {/* Display data from the second API */}
      {Array.isArray(birdeyeData) ? (
        <div>
          <h2>Birdeye Token List</h2>
          <ul>
            {birdeyeData.map((token, index) => (
              <li key={index}>
                <strong>{token.name || 'N/A'}</strong> <br />
                <span>{token.symbol || 'N/A'}</span><br />
                {/* Include additional properties as needed */}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading Birdeye data...</p>
      )}
    </div>
  );
}

export default App;
