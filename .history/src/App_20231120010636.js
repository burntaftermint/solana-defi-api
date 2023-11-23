import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios'; // Import axios here

const apiKey = "8d2a6342-25eb-4fcb-869a-3f8b8246bc9d";
const apiUrl = "https://api.tensor.so/graphql";

const query = `
  query CollectionsStats(
    $sortBy: String,
    $limit: Int,
    $page: Int
  ) {
    allCollections(
      sortBy: $sortBy,
      limit: $limit,
      page: $page
    ) {
      total
      collections {
        slug
        statsOverall {
          floorPrice
          numListed
          numMints
          sales7d
          volume7d
        }
        name
      }
    }
  }
`;

const variables = {
  sortBy: "statsOverall.volume7d:desc",
  limit: 50,
  page: 1,
};

const App = () => {
  useEffect(() => {
    axios.post(
      apiUrl,
      { query, variables },
      {
        headers: {
          "Content-Type": "application/json",
          "X-TENSOR-API-KEY": apiKey,
        },
      }
    )
      .then((response) => {
        const collections = response.data.data.allCollections.collections;
        console.log("Top 50 NFT Collections:");
        collections.forEach((collection, index) => {
          console.log(`${index + 1}. ${collection.name} - ${collection.statsOverall.volume7d} Sol`);
        });
      })
      .catch((error) => {
        console.error("Error fetching collections:", error);
      });
  }, []);

  return (
    <h1>bitch work</h1>
  );
}

export default App;
