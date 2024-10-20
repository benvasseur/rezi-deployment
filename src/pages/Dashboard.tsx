import { useState, useEffect } from 'react';
import ShortUrlDisplay from '../components/ShortUrlDisplay';
import Header from '../components/Header';
import ShortenedUrlList from '../components/ShortenedUrlList';
import { ShortenedUrl } from '../../types/urlTypes';

const Dashboard = () => {
  const [url, setUrl] = useState<string>('');
  const [shortUrl, setShortUrl] = useState<string>('');
  const [urlList, setUrlList] = useState<ShortenedUrl[]>([]);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    const fetchUrls = async () => {
      const response = await fetch('/.netlify/functions/listUrls');
      const { urls } = await response.json();
      setUrlList(urls);
    };

    fetchUrls();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const urlPattern = new RegExp(
      '^(https?:\\/\\/)' + // Protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // Domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // Port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // Query string
      '(\\#[-a-z\\d_]*)?$', 'i' // Fragment locator
    );

    console.log(url);
    console.log(urlPattern.test(url));

    if (!urlPattern.test(url)) {
      setShortUrl('');
      setToastType('error');
      setToastMessage('Invalid URL, please enter a valid one');
      setTimeout(() => {
        setToastType('success');
        setToastMessage('');
      }, 2000);
      return;
    }

    const response = await fetch('/.netlify/functions/createUrl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });
    const data:ShortenedUrl = await response.json();
    setShortUrl(`${window.location.host}/${data.shortId}`);
    setUrlList([...urlList, data]);
  };

  const handleDelete = async (shortId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this URL?");
    
    if (confirmed) {
      await fetch(`/.netlify/functions/deleteUrl?shortId=${shortId}`, {
        method: 'DELETE',
      });
      setUrlList(urlList.filter((item) => item.shortId !== shortId));
    }
  };

  const handleCopy = (shortUrl: string) => {
    navigator.clipboard.writeText(shortUrl);
    setToastMessage('URL copied to clipboard!');
    
    setTimeout(() => {
      setToastMessage('');
    }, 2000);
  };

  const handleOpen = (shortUrl: string) => {
    window.open(`http://${shortUrl}`, '_blank');
  };

  return (
    <div className="container mx-auto px-48 pt-4 pb-20 min-h-screen flex flex-col">
      <Header />
      <form onSubmit={handleSubmit} className="flex w-full">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          className="flex-grow p-2 border border-gray-300 rounded-l-md"
        />
        <button 
          type="submit" 
          className="p-2 bg-blue-500 text-white w-32 rounded-r-md"
        >
          Shorten URL
        </button>
      </form>

      {shortUrl && (
        <ShortUrlDisplay 
          shortUrl={shortUrl} 
          handleCopy={() => handleCopy(shortUrl)} 
          handleOpen={() => handleOpen(shortUrl)} 
        />
      )}

      {urlList.length > 0 && (
        <ShortenedUrlList 
          urlList={urlList} 
          handleDelete={handleDelete} 
          handleCopy={handleCopy} 
          handleOpen={handleOpen} 
        />
      )}

      {toastMessage && (
        <div
          className={`fixed bottom-4 right-4 py-2 px-4 rounded ${
            toastType === 'error' ? 'bg-red-500' : 'bg-green-500'
          } text-white`}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default Dashboard;