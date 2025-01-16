import React, { useState, useEffect } from 'react';

const WaifuPicsComponent = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch a random waifu image
  const fetchImage = async () => {
    try {
      const response = await fetch('https://api.waifu.pics/sfw/waifu');
      const result = await response.text(); // Use .text() to see raw response
      console.log(result); // Check if it's HTML or JSON
      const data = JSON.parse(result); // Parse JSON if valid
      setImageUrl(data.url);
    } catch (err) {
      console.error('Error fetching data:', err.message);
      setError(err.message);
    }
  };
  

  // Fetch a new image when the component mounts
  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Waifu Pics</h1>

      {loading && <p className="text-blue-500 text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">Error: {error}</p>}

      {imageUrl && (
        <div className="flex flex-col items-center">
          <img
            src={imageUrl}
            alt="Random Waifu"
            className="rounded shadow-lg mb-4 max-w-full h-auto"
          />
          <button
            onClick={fetchImage}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
          >
            Fetch Another Waifu
          </button>
        </div>
      )}
    </div>
  );
};

export default WaifuPicsComponent;
