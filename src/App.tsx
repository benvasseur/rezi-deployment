import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UrlForm from './pages/Dashboard';
import RedirectHandler from './pages/RedirectHandler';

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