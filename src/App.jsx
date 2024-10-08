
import "./App.css";

import { BrowserRouter, Routes, Route ,useLocation } from "react-router-dom";
import ProductList from "./components/product/ProductList";
import Login from "./components/login/Login";
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import Product from "./components/product/Product";
import Cart from "./components/cart/Cart";
import Header from "./components/ui/Header";
import { useState } from "react";
function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

const firebaseConfig = {

  apiKey: "AIzaSyD3NvrqDywTWsMiB6R8O1V3Hkk67iHI1bI",

  authDomain: "espacio-ecommerce.firebaseapp.com",

  projectId: "espacio-ecommerce",

  storageBucket: "espacio-ecommerce.appspot.com",

  messagingSenderId: "902061365231",

  appId: "1:902061365231:web:2a75d086ee903ae56ac81a",

  measurementId: "G-Q6MX69SE6H"

};
  // Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

  return (
    <>
      {location.pathname !== '/login' && <Header setSearchQuery={setSearchQuery}/>} 
      <Routes>
        <Route path="/" element={<ProductList searchQuery={searchQuery} />} />
        <Route path="/products" element={<ProductList searchQuery={searchQuery} />} />
        <Route path ="/login" element={<Login/>}/>
        <Route path ="/product" element={<Product/>}/>
        <Route path="/cart" element={<Cart/>}/>
   
      </Routes>
    </>
  );
}
export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
// export default App;
