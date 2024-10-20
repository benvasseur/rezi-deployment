import { useState } from 'react';
import ShortUrlDisplay from '../components/ShortUrlDisplay';
import Header from '../components/Header';

const Dashboard = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/.netlify/functions/createUrl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });
    const data = await response.json();
    setShortUrl(data.shortUrl);
  };

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
    }
  };

  const handleOpen = () => {
    if (shortUrl) {
      window.open(`http://${shortUrl}`, '_blank');
    }
  };

  return (
    <div className="container mx-auto p-48 pt-4 min-h-screen">
      <Header />
      <form onSubmit={handleSubmit} className="flex w-full">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          // className="border p-2 mb-4"
          className="flex-grow p-2 border border-gray-300 rounded-l-md"
        />
        <button 
          type="submit" 
          // className="bg-blue-500 text-white p-2"
          className="p-2 bg-blue-500 text-white w-32 rounded-r-md"
        >
          Shorten URL
        </button>
      </form>

      {shortUrl && (
        <ShortUrlDisplay 
          shortUrl={shortUrl} 
          handleCopy={handleCopy} 
          handleOpen={handleOpen} 
        />
      )}
    </div>
  );
};

export default Dashboard;