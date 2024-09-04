import "../../styles/productList.css";
import { useEffect, useState } from "react";
import { fetchProducts,fetchMensProducts, fetchWomensProducts,fetchJewelleryProducts,fetchElectronicsProducts} from "../../services/apiService";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, increment, decrement } from "../../redux/cart";
import { addToWishlist,removeFromWishlist } from "../../redux/wishlist";
import Button from "../ui/Button";

// eslint-disable-next-line react/prop-types
export default function ProductList({ searchQuery }) {
  const cart = useSelector((state) => state.cart.cartList);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [mensProducts, setMensProducts] = useState([]);
  const [womensProducts, setWomensProducts] = useState([]);
  const [jewelleryProducts, setJewelleryProducts] = useState([]);
  const [electronicsProducts, setElectronicsProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        const mensData = await fetchMensProducts();
        const womensData = await fetchWomensProducts();
        const jewelleryData = await fetchJewelleryProducts();
        const electronicsData = await fetchElectronicsProducts();

        setProducts(data);
        setMensProducts(mensData);
        setWomensProducts(womensData);
        setJewelleryProducts(jewelleryData);
        setElectronicsProducts(electronicsData);

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

  const handleIncrement = (productId) => {
    dispatch(increment(productId));
  };

  const handleDecrement = (productId) => {
    dispatch(decrement(productId));
  };

  const getProductQuantity = (productId) => {
    const product = cart.find(item => item.id === productId);
    return product ? product.quantity : 0;
  };
 
  const isProductInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const handleWishlistToggle = (product) => {
    if (isProductInWishlist(product.id)) {
      dispatch(removeFromWishlist(product));
    } else {
      dispatch(addToWishlist(product));
    }
  };
  const filteredProducts = products.filter(product =>
    // eslint-disable-next-line react/prop-types
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <img className="product-banner" src="./imgs/product-banner.svg" alt="" />
     <h1>All Products</h1>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div  className="product-image-div">
            <img
              src={product.image}
              alt={product.title}
               className="product-image"
             
            />
            </div>
           
            <div className="product-details">
              <h3>{product.title}</h3>
              <p>${product.price}</p>
              <div className="btns">
                {getProductQuantity(product.id) === 0 ? (
                  <Button className="btn-primary" onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </Button>
                ) : (
                  <div className="quantity-controls">
                    <Button className="btn-minus" onClick={() => handleDecrement(product.id)}>-</Button>
                    <span className="count">{getProductQuantity(product.id)}</span>
                    <Button className="btn-plus" onClick={() => handleIncrement(product.id)}>+</Button>
                  </div>
                )}
                      <Button className="btn-secondary" onClick={() => handleWishlistToggle(product)}>
                  {isProductInWishlist(product.id) ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                      <path fill="red" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                      <path fill="none" stroke="black" strokeDasharray="30" strokeDashoffset="30" strokeLinecap="round" strokeWidth="2.05" d="M12 8C12 8 12 8 12.7578 7C13.6343 5.84335 14.9398 5 16.5 5C18.9853 5 21 7.01472 21 9.5C21 10.4251 20.7209 11.285 20.2422 12C19.435 13.206 12 21 12 21M12 8C12 8 12 8 11.2422 7C10.3657 5.84335 9.06021 5 7.5 5C5.01472 5 3 7.01472 3 9.5C3 10.4251 3.27914 11.285 3.75777 12C4.56504 13.206 12 21 12 21">
                        <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="30;0"/>
                      </path>
                    </svg>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h1>Mens Collection</h1>
      <div className="mens">
       
      {mensProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div  className="product-image-div">
            <img
              src={product.image}
              alt={product.title}
               className="product-image"
             
            />
            </div>
           
            <div className="product-details">
              <h3>{product.title}</h3>
              <p>${product.price}</p>
              <div className="btns">
                {getProductQuantity(product.id) === 0 ? (
                  <Button className="btn-primary" onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </Button>
                ) : (
                  <div className="quantity-controls">
                    <Button className="btn-minus" onClick={() => handleDecrement(product.id)}>-</Button>
                    <span className="count">{getProductQuantity(product.id)}</span>
                    <Button className="btn-plus" onClick={() => handleIncrement(product.id)}>+</Button>
                  </div>
                )}
                      <Button className="btn-secondary" onClick={() => handleWishlistToggle(product)}>
                  {isProductInWishlist(product.id) ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                      <path fill="red" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                      <path fill="none" stroke="black" strokeDasharray="30" strokeDashoffset="30" strokeLinecap="round" strokeWidth="2.05" d="M12 8C12 8 12 8 12.7578 7C13.6343 5.84335 14.9398 5 16.5 5C18.9853 5 21 7.01472 21 9.5C21 10.4251 20.7209 11.285 20.2422 12C19.435 13.206 12 21 12 21M12 8C12 8 12 8 11.2422 7C10.3657 5.84335 9.06021 5 7.5 5C5.01472 5 3 7.01472 3 9.5C3 10.4251 3.27914 11.285 3.75777 12C4.56504 13.206 12 21 12 21">
                        <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="30;0"/>
                      </path>
                    </svg>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}


      </div>
      <h1>Womens Collection</h1>
      <div className="mens">
       
      {womensProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div  className="product-image-div">
            <img
              src={product.image}
              alt={product.title}
               className="product-image"
             
            />
            </div>
           
            <div className="product-details">
              <h3>{product.title}</h3>
              <p>${product.price}</p>
              <div className="btns">
                {getProductQuantity(product.id) === 0 ? (
                  <Button className="btn-primary" onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </Button>
                ) : (
                  <div className="quantity-controls">
                    <Button className="btn-minus" onClick={() => handleDecrement(product.id)}>-</Button>
                    <span className="count">{getProductQuantity(product.id)}</span>
                    <Button className="btn-plus" onClick={() => handleIncrement(product.id)}>+</Button>
                  </div>
                )}
                      <Button className="btn-secondary" onClick={() => handleWishlistToggle(product)}>
                  {isProductInWishlist(product.id) ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                      <path fill="red" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                      <path fill="none" stroke="black" strokeDasharray="30" strokeDashoffset="30" strokeLinecap="round" strokeWidth="2.05" d="M12 8C12 8 12 8 12.7578 7C13.6343 5.84335 14.9398 5 16.5 5C18.9853 5 21 7.01472 21 9.5C21 10.4251 20.7209 11.285 20.2422 12C19.435 13.206 12 21 12 21M12 8C12 8 12 8 11.2422 7C10.3657 5.84335 9.06021 5 7.5 5C5.01472 5 3 7.01472 3 9.5C3 10.4251 3.27914 11.285 3.75777 12C4.56504 13.206 12 21 12 21">
                        <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="30;0"/>
                      </path>
                    </svg>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}


      </div>

      <h1>Jewellery Collection</h1>
      <div className="mens">
       
      {jewelleryProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div  className="product-image-div">
            <img
              src={product.image}
              alt={product.title}
               className="product-image"
             
            />
            </div>
           
            <div className="product-details">
              <h3>{product.title}</h3>
              <p>${product.price}</p>
              <div className="btns">
                {getProductQuantity(product.id) === 0 ? (
                  <Button className="btn-primary" onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </Button>
                ) : (
                  <div className="quantity-controls">
                    <Button className="btn-minus" onClick={() => handleDecrement(product.id)}>-</Button>
                    <span className="count">{getProductQuantity(product.id)}</span>
                    <Button className="btn-plus" onClick={() => handleIncrement(product.id)}>+</Button>
                  </div>
                )}
                      <Button className="btn-secondary" onClick={() => handleWishlistToggle(product)}>
                  {isProductInWishlist(product.id) ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                      <path fill="red" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                      <path fill="none" stroke="black" strokeDasharray="30" strokeDashoffset="30" strokeLinecap="round" strokeWidth="2.05" d="M12 8C12 8 12 8 12.7578 7C13.6343 5.84335 14.9398 5 16.5 5C18.9853 5 21 7.01472 21 9.5C21 10.4251 20.7209 11.285 20.2422 12C19.435 13.206 12 21 12 21M12 8C12 8 12 8 11.2422 7C10.3657 5.84335 9.06021 5 7.5 5C5.01472 5 3 7.01472 3 9.5C3 10.4251 3.27914 11.285 3.75777 12C4.56504 13.206 12 21 12 21">
                        <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="30;0"/>
                      </path>
                    </svg>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}


      </div>
      <h1>Electronics Collection</h1>
      <div className="mens">
       
      {electronicsProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div  className="product-image-div">
            <img
              src={product.image}
              alt={product.title}
               className="product-image"
             
            />
            </div>
           
            <div className="product-details">
              <h3>{product.title}</h3>
              <p>${product.price}</p>
              <div className="btns">
                {getProductQuantity(product.id) === 0 ? (
                  <Button className="btn-primary" onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </Button>
                ) : (
                  <div className="quantity-controls">
                    <Button className="btn-minus" onClick={() => handleDecrement(product.id)}>-</Button>
                    <span className="count">{getProductQuantity(product.id)}</span>
                    <Button className="btn-plus" onClick={() => handleIncrement(product.id)}>+</Button>
                  </div>
                )}
                      <Button className="btn-secondary" onClick={() => handleWishlistToggle(product)}>
                  {isProductInWishlist(product.id) ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                      <path fill="red" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                      <path fill="none" stroke="black" strokeDasharray="30" strokeDashoffset="30" strokeLinecap="round" strokeWidth="2.05" d="M12 8C12 8 12 8 12.7578 7C13.6343 5.84335 14.9398 5 16.5 5C18.9853 5 21 7.01472 21 9.5C21 10.4251 20.7209 11.285 20.2422 12C19.435 13.206 12 21 12 21M12 8C12 8 12 8 11.2422 7C10.3657 5.84335 9.06021 5 7.5 5C5.01472 5 3 7.01472 3 9.5C3 10.4251 3.27914 11.285 3.75777 12C4.56504 13.206 12 21 12 21">
                        <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="30;0"/>
                      </path>
                    </svg>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}


      </div>
     
    </div>
  );
}
