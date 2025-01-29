import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BootCampPage from './pages/BootCampPage';
import NavBar from './components/NavBar';
import CreateBootcamp from './pages/CreateBootcamp';

const App = () => {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BootCampPage />} />
          <Route path="/create" element={<CreateBootcamp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
