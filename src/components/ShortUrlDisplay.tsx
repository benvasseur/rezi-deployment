import React from 'react';

interface Props {
  shortUrl: string;
  handleCopy: () => void;
  handleOpen: () => void;
}

const ShortUrlDisplay: React.FC<Props> = ({ shortUrl, handleCopy, handleOpen }) => {
  return (
    <div className="border border-gray-300 p-4 rounded-md relative mt-8">
      <h3 className="absolute -top-3 left-3 bg-white px-1 text-sm text-gray-600">
        Shortened URL
      </h3>
      <div className="flex justify-between items-center">
        <a 
          href={`http://${shortUrl}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-500 underline"
        >
          {shortUrl}
        </a>
        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            className="p-1 bg-gray-200 text-sm rounded"
          >
            Copy
          </button>
          <button
            onClick={handleOpen}
            className="p-1 bg-gray-200 text-sm rounded"
          >
            Open
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShortUrlDisplay;