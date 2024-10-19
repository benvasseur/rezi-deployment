import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RedirectHandler = () => {
  const { shortid } = useParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const response = await fetch(`/.netlify/functions/getUrl?shortId=${shortid}`);
        if (response.status === 404) {
          setError('URL not found');
        } else {
          const data = await response.json();
          window.location.href = data.url;
        }
      } catch (err) {
        setError('An error occurred while fetching the URL');
      }
    };

    // fetchUrl();
  }, [shortid]);

  return (
    <div className="container mx-auto p-4">
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div>Redirecting...</div>
      )}
    </div>
  );
};

export default RedirectHandler;