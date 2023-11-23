import React, { useEffect } from 'react';
import './App.css';

const BASE_URL = 'https://api.tensor.so/graphql';

function App() {
  useEffect(() => {
    const graphqlQuery = `
      query {
        helloWorld
      }
    `;

    fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: graphqlQuery,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <h1>bitch work</h1>
  );
}

export default App;

