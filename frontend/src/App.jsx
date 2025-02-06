import Navbar from './components/Navbar/Navbar';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Shop from './pages/Shop';
import ShopCategory from './pages/ShopCategory';
import Product from './pages/Product';
import LoginSignup from './pages/LoginSignup';
import Cart from './pages/Cart';
import Footer from './components/Footer/Footer';
import men_banner from './components/assets/banner_mens.png'
import women_banner from './components/assets/banner_women.png'
import kid_banner from './components/assets/banner_kids.png'
import { createContext } from 'react';

const userAuth = createContext();

function App() {
  return (
    <div>
      <BrowserRouter>
     < Navbar />
     <Routes>
      <Route path='/' element={<Shop/>} />
      <Route path='/men' element={<ShopCategory banner={men_banner} category="men"/>}/>
      <Route path='/women' element={<ShopCategory banner={women_banner} category="women"/>}/>
      <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kids"/>}/>
      <Route path='/products' element={<Product />}>
      <Route path=':slug' element={<Product/>}/>
      </Route>
      <Route path='/login' element={<LoginSignup />}/>
      <Route path='/cart' element={<Cart />}/>
     </Routes>
     <Footer />
     </BrowserRouter>
    </div>
  );
}

export default App;
