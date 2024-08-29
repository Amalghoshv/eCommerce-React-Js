
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./components/product/ProductList";
import Login from "./components/login/Login";
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import Product from "./components/product/Product";
import Cart from "./components/cart/Cart";


function App() {

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


// const analytics = getAnalytics(app);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path ="/login" element={<Login/>}/>
        <Route path ="/product" element={<Product/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
