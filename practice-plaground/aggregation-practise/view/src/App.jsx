import Brands from './components/Brands';
import Category from './components/Category';
import Navbar from './components/Navbar';
import Products from './components/Products';
import CreateProduct from './components/CreateProduct';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="container m-auto">
          <Routes>
            <Route path="/brand" element={<Brands />} />
            <Route path="/category" element={<Category />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/" element={<Products />} />
            <Route path="/:id" element={<ProductDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
