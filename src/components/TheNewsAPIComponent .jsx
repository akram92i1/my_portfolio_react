import React, { useState } from 'react';

const TheNewsAPIComponent = () => {
  const [query, setQuery] = useState(''); // User's search input
  const [articles, setArticles] = useState([]); // Fetched news articles
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiToken = 'KsD2pN4o8dtSVjbwd8uj2HHcgJF2UOc9FlrDq7un';
  const baseUrl = 'https://api.thenewsapi.com/v1/news/all';

  const fetchNews = async () => {
    if (!query.trim()) {
      alert('Please enter a search term');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}?api_token=${apiToken}&search=${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }
      const data = await response.json();
      setArticles(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews();
  };

  return (
    <div className="p-6 justify-center items-center min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">The News API Search</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="text-center mb-4">
        <input
          type="text"
          placeholder="Search news (e.g., usd | gbp)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 border rounded w-2/3 sm:w-1/2"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {/* Loading and Error States */}
      {loading && <p className="text-center text-blue-500">Loading...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {/* News Articles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div
            key={index}
            className="primary-color rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Image Section */}
            <div className="h-40 overflow-hidden">
              <img
                src={article.image_url || 'https://via.placeholder.com/400'}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col justify-between h-48">
              <h2 className="text-lg font-semibold text-white mb-2 truncate">
                {article.title}
              </h2>
              <p className="text-sm text-gray-500 mb-4 line-clamp-3">
                {article.description || 'No description available.'}
              </p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto text-blue-500 hover:underline"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TheNewsAPIComponent;
