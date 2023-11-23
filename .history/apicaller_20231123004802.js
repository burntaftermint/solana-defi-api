// apiCaller.js

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
      return data;
    } catch (error) {
      console.error('Error fetching Birdeye data:', error);
      throw error; // Rethrow the error for the calling code to handle
    }
  };
  
  export default fetchBirdeyeData;
  