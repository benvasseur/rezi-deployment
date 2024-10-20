import { ShortenedUrl } from '../../types/urlTypes';

interface ShortenedUrlListProps {
  urlList: ShortenedUrl[];
  handleDelete: (id: string) => void;
  handleCopy: (shortUrl: string) => void;
  handleOpen: (shortUrl: string) => void;
}

const ShortenedUrlList: React.FC<ShortenedUrlListProps> = ({ urlList, handleDelete, handleCopy, handleOpen }) => {
  return (
    <div className="mt-auto">
      <h3 className="text-white text-xl font-semibold">History</h3>
      <div className="mt-4 max-h-96 overflow-y-auto p-4">
        <ul className="space-y-4">
          {urlList.map((item) => (
            <li 
              key={item.shortId} 
              className="flex justify-between items-center border border-gray-500 p-2 rounded-md bg-gray-300/10"
            >
              <a 
                href={`http://${window.location.host}/${item.shortId}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {`${window.location.host}/${item.shortId}`}
              </a>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleOpen(`${window.location.host}/${item.shortId}`)} 
                  className="p-1 text-gray-400 text-sm rounded"
                >
                  Open
                </button>
                <button 
                  onClick={() => handleCopy(`${window.location.host}/${item.shortId}`)} 
                  className="p-1 text-gray-400 text-sm rounded"
                >
                  Copy
                </button>
                <button 
                  onClick={() => handleDelete(item.shortId)} 
                  className="p-1 text-red-400 text-sm rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShortenedUrlList;