import wishListLogo from "../../assets/images/wishlist.svg";
import cartLogo from "../../assets/images/cart.svg";
import profileLogo from "../../assets/images/profile.svg";
import "../../styles/header.css";
import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { removeFromWishlist } from "../../redux/wishlist";


// eslint-disable-next-line react/prop-types
export default function Header({setSearchQuery}) {
  const [userName, setUserName] = useState("");
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const dispatch = useDispatch();
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const wishlistItems = useSelector((state) => state.wishlist.wishlist || []); 
  const cartItems = useSelector((state)=>state.cart.cartList || [])
  const navigate = useNavigate();
  // const wishlistRef = useRef(null);
  // const cartRef = useRef(null);
  // const profileRef = useRef(null);
  const toggleWishlist = () => setWishlistOpen(!wishlistOpen);
  const toggleCart = () => setCartOpen(!cartOpen);
  const toggleProfile = () => setProfileOpen(!profileOpen);
  const handleRemoveFromWishlist = (item) => {
    dispatch(removeFromWishlist(item)); 
  };
  const auth = getAuth();
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName || "");
      }else{
        navigate('/login')
      }
    });
  
    return () => unsubscribe(); 
  }, [auth,navigate]);


  const totalCartAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  
const handleLogout = ()=>{
  signOut(auth)
  .then(() => {
    navigate('/login');
    window.history.pushState(null, '', '/login');
    
  })
  .catch((error) => {
    console.log("error while logging out",error);
    
  });
 
}
  return (
    <>
      <nav>
        <div className="nav">
          <div>
            <a onClick={() => navigate('/')}>
            <img className="logo" src="\src\assets\logo.JPG" alt="logo" /></a>
          </div>
          <div className="header-icons">
            <div className="search">
              <input
                className="search-field"
                type="search"
                name="search"
                id="search"
                placeholder="Search Products"
                onChange={(e) => setSearchQuery(e.target.value)} 
                
              />
            </div>
            <div>
              <img
                className="icons"
                src={wishListLogo}
                alt="wishlistlogo"
                onClick={toggleWishlist}
              />
              {wishlistOpen && (
                <div className="dropdown">
                  {wishlistItems.length > 0 ? (
                    wishlistItems.map((item) => (
                      <div key={item.id} className="wishlist-item">
                        <img src={item.image} alt={item.title} className="wishlist-image" />
                        <div className="wishlist-details">
                          <p>{item.title}</p>
                          <p>${item.price}</p>
                        </div>
                        <div >
                        <svg  onClick={() => handleRemoveFromWishlist(item)} className="close-btn" xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 24 24"><g fill="none" stroke="#a31d1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M5 12H19"><animate fill="freeze" attributeName="d" dur="0.4s" values="M5 12H19;M12 12H12"></animate><set fill="freeze" attributeName="opacity" begin="0.4s" to={0}></set></path><path d="M5 5L19 5M5 19L19 19" opacity={0}><animate fill="freeze" attributeName="d" begin="0.2s" dur="0.4s" values="M5 5L19 5M5 19L19 19;M5 5L19 19M5 19L19 5"></animate><set fill="freeze" attributeName="opacity" begin="0.2s" to={1}></set></path></g></svg>                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Your Wishlist is Empty!</p>
                  )}
                </div>
              )}
            </div>
            <div>
              <img
                className="icons"
                src={cartLogo}
                alt="cartlogo"
                onClick={toggleCart}
              />
              {cartOpen && (
                <div className="dropdown cart-dropdown">
                  {cartItems.length >0 ?(
                    cartItems.map((item)=>(
                      <div key={item.id} className="cart-item">
                         <img src={item.image} alt={item.title} className="cart-image" />
                        <div className="wishlist-details">
                          <p>{item.title}</p>
                          <p>${item.price}</p>
                          <p>Qty: {item.quantity}</p>
                          <p>Total: ${item.price * item.quantity}</p>
                        </div>
                        <button className="buynow">Buy now</button>
                      </div>
                    ))
                  ):(
                    <p>Your cart is empty!</p>
                  
                  )}
                   <div >
                    <p className="total-amount cart-total">${totalCartAmount.toFixed(2)}</p>
                  </div>
                  <div className="cart-total">
                  <button className="checkout-btn" onClick={() => navigate('/cart')}>Checkout</button>


                  </div>
                
                </div>
              )}
            </div>
            <div>
              <div className="profile-name">
              <img
                className="icons"
                src={profileLogo}
                alt="profilelogo"
                onClick={toggleProfile}
              /> <p>Hi {userName}!</p>

              </div>
              
              {profileOpen && (
                <div className="dropdown profile-dropdown">
                  <p>Profile</p>
                  
                  <p onClick={handleLogout}>Logout</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
