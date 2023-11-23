import React, { useEffect, useState } from 'react';
import './App.css'

const API_URL = 'https://api.simplehash.com/api/v0/nfts/collections/top_v2?chains=solana&time_period=24h&limit=100';
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
    <div className="NFTs">
      <h1>Top 100 Solana NFTs</h1>
      <h3>This is a top 100 list of Solana NFTs in terms of volume over the last 24 hours. The list is generated using the Magic Eden API and is updated daily.</h3>
      
        <p className="website__rights" >Website built by<a href="https://twitter.com/burntaftermint" target="_blank" rel="noopener noreferrer" className="burnt"> @burntaftermint.sol</a></p>
      {collections ? (
        <ul className="NFT-list">
          {collections.map((collection, index) => (
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
        <p>Loading...</p>
      )}
    </div>
  );
}


export default App;
