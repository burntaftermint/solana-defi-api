// ... (your imports)

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
          // Filter out collections with missing or invalid data
          const validCollections = data.collections.filter(collection =>
            collection.collection_details?.name &&
            collection.collection_details?.image_url &&
            collection.volume_string
          );

          setCollections(validCollections);
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
      {/* ... (your other content) */}
      
      <p className="website__rights">Website built by<a href="birdEye.html" target="_blank" rel="noopener noreferrer" className="burnt"> @burntaftermint.sol</a></p>
      {collections ? (
        <ul className="NFT-list">
          {collections.map((collection, index) => (
            <li key={index}>
              {/* ... (your other content) */}
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

