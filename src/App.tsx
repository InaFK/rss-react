import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SearchLayout from './components/SearchLayout/SearchLayout';
import DetailsPanel from './components/DetailsPanel/DetailsPanel';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchLayout />}>
          <Route path=":itemName" element={<DetailsPanel />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
