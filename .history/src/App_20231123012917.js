import React, { useEffect, useState } from 'react';
import './App.css';

const BIRDEYE_API_URL = 'https://public-api.birdeye.so/public/tokenlist?sort_by=v24hUSD&sort_type=desc';
const BIRDEYE_API_KEY = '44bca3513a0f44748ad83d5896123afe';

function App() {
  const [tokens, setTokens] = useState(null);

  useEffect(() => {
    const fetchBirdeyeData = async () => {
      const options = {
        method: 'GET',
        headers: {
          'X-API-KEY': BIRDEYE_API_KEY,
        },
      };

      try {
        const response = await fetch(BIRDEYE_API_URL, options);
        const data = await response.json();

        if (Array.isArray(data)) {
          setTokens(data);
        } else {
          console.error('Invalid data format:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBirdeyeData();
  }, []);

  return (
    <div>
      {/* Navbar */}
      {/* ... (same as before) */}

      {/* Main content */}
      <div className="BirdeyeData">
        <h1>Top Birdeye Tokens</h1>
        <h3>This is a top list of Birdeye tokens in terms of USD volume over the last 24 hours. The list is generated using the Birdeye API and is updated daily.</h3>

        <p className="website__rights">Website built by<a href="birdEye.html" target="_blank" rel="noopener noreferrer" className="burnt"> @burntaftermint.sol</a></p>
        {tokens ? (
          <ul className="Token-list">
            {tokens.map((token, index) => (
              <li key={index}>
                <strong>Name:</strong> {token.name || 'N/A'} <br />
                <strong>Symbol:</strong> {token.symbol || 'N/A'} <br />
                <strong>Decimals:</strong> {token.decimals || 'N/A'} <br />
                {/* Include additional properties as needed */}
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default App;
