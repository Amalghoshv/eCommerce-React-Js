import "../../styles/productList.css";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../services/apiService";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, increment, decrement } from "../../redux/cart";
import Header from "../ui/Header";
import Button from "../ui/Button";
export default function ProductList() {
  const cart =useSelector((state)=>(state.cart))
  const dispatch =useDispatch()
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);
 

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <Header />
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
            <div className="product-details">
              <h3>{product.title}</h3>
              <p>${product.price}</p>
              <div className="btns">
              {cart.cartList.includes(product) ? (
                  <div className="quantity-controls">
                    <Button className="btn-minus" onClick={handleDecrement}>-</Button>
                    <span className="count">{cart.cartCount}</span>
                    <Button className="btn-plus" onClick={handleIncrement}>+</Button>
                  </div>
                ) : (
                  <Button className="btn-primary" onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </Button>
                )}
              <Button className="btn-secondary" onClick={() => alert('Primary button clicked!')}><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="none" stroke="black" strokeDasharray="30" strokeDashoffset="30" strokeLinecap="round" strokeWidth="2.05" d="M12 8C12 8 12 8 12.7578 7C13.6343 5.84335 14.9398 5 16.5 5C18.9853 5 21 7.01472 21 9.5C21 10.4251 20.7209 11.285 20.2422 12C19.435 13.206 12 21 12 21M12 8C12 8 12 8 11.2422 7C10.3657 5.84335 9.06021 5 7.5 5C5.01472 5 3 7.01472 3 9.5C3 10.4251 3.27914 11.285 3.75777 12C4.56504 13.206 12 21 12 21"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="30;0"/></path></svg> </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
