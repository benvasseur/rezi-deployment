import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UrlForm from './components/UrlForm';
import RedirectHandler from './components/RedirectHandler';
// import UrlForm from '@components/UrlForm';
// import RedirectHandler from '@components/RedirectHandler';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UrlForm />} />
        <Route path="/:shortid" element={<RedirectHandler />} />
      </Routes>
    </Router>
  );
};

export default App;