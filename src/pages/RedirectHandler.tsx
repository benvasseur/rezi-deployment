import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RedirectHandler = () => {
  const { shortid } = useParams();
  const [error, setError] = useState<string | null>(null);
  const [dots, setDots] = useState<string>('.');
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const response = await fetch(`/.netlify/functions/getUrl?shortId=${shortid}`);
        if (response.status === 404) {
          setError('URL not found');
        } else {
          const data = await response.json();
          // Let user see cool loading animation
          setTimeout(() => {
            setUrl(data.url);
            window.location.href = data.url;
          }, 700);
        }
      } catch (err) {
        setError('An error occurred while fetching the URL');
      }
    };

    fetchUrl();
  }, [shortid]);

  useEffect(() => {
    if (url || error) return;

    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : '.'));
    }, 300);

    return () => clearInterval(interval);
  }, [error, url]);

  return (
    <div 
      id="redirect-handler-page" 
      className="container mx-auto p-4 pb-0 h-screen w-screen max-w-none cursor-wait flex flex-col justify-between text-white"
    >
      {error ? (
        <div className="h-full flex flex-col justify-center">
          <div className="mx-auto text-3xl text-red-500">{error}</div>
        </div>
      ) : (
        <>
          <div className="h-full flex flex-col justify-center">
            <div className="mx-auto text-3xl min-w-40">
              {`Redirecting${dots}`}
            </div>
          </div>
          <img 
            className="mx-auto mb-0 min-h-52"
            src="/images/loading.gif" 
            alt="Loading animation" 
          />
        </>
      )}
    </div>
  );
};

export default RedirectHandler;