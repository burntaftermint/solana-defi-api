import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [tokens, setTokens] = useState(null);

  useEffect(() => {
    const fetchBirdeyeData = async () => {
      const options = {
        method: 'GET',
        headers: {
          'X-API-KEY': '44bca3513a0f44748ad83d5896123afe',
        },
      };

      try {
        const response = await fetch('https://public-api.birdeye.so/public/tokenlist?sort_by=v24hUSD&sort_type=desc', options);
        const data = await response.json();

        // Assuming the structure is { data: { tokens: [...] } }
        if (data && data.data && Array.isArray(data.data.tokens)) {
          const validTokens = data.data.tokens.filter(token =>
            token.name &&
            token.symbol &&
            token.v24hChangePercent &&
            token.v24hUSD
          );

          setTokens(validTokens);
        } else {
          console.error('Invalid data format:', data);
        }
      } catch (error) {
        console.error('Error fetching Birdeye data:', error);
      }
    };

    fetchBirdeyeData();
  }, []);

  return (
    <div>
      {/* Navbar */}
      {/* ... (unchanged) */}

      {/* Main content */}
      <div className="NFTs">
        <h1>Top Solana NFTs</h1>
        <h3>This is a top list of Solana NFTs in terms of volume over the last 24 hours. The list is generated using the SimpleHash API and is updated daily.</h3>

        <p className="website__rights">Website built by<a href="birdEye.html" target="_blank" rel="noopener noreferrer" className="burnt"> @burntaftermint.sol</a></p>
        {tokens ? (
          <ul className="NFT-list">
            {tokens.map((token, index) => (
              <li key={index}>
                <strong>{token.name}</strong> <br />
                <span className="img"><img src={token.logoURI} alt="Token Logo" style={{ maxWidth: '200px', maxHeight: '200px' }} /></span><br />
                <strong>Symbol:</strong> {token.symbol} <br />
                <strong>24h Change Percent:</strong> {token.v24hChangePercent} <br />
                <strong>24h USD:</strong> {token.v24hUSD} <br />
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
