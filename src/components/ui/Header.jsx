import wishListLogo from "../../assets/images/wishlist.svg";
import cartLogo from "../../assets/images/cart.svg";
import profileLogo from "../../assets/images/profile.svg";
import "../../styles/header.css";
import { useState} from "react";
import { useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { removeFromWishlist } from "../../redux/wishlist";


// eslint-disable-next-line react/prop-types
export default function Header({setSearchQuery}) {
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const wishlistItems = useSelector((state) => state.wishlist.wishlist || []); 
  const cartItems = useSelector((state)=>state.cart.cartList || [])
  const navigate = useNavigate();
  const toggleWishlist = () => setWishlistOpen(!wishlistOpen);
  const toggleCart = () => setCartOpen(!cartOpen);
  const toggleProfile = () => setProfileOpen(!profileOpen);
  
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      
    })
    .catch((error) => {
      console.log(error);
      
    });
    const logout = ()=>{
        navigate('/login');
    }

  return (
    <>
      <nav>
        <div className="nav">
          <div>
            <img className="logo" src="\src\assets\logo.JPG" alt="logo" />
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
                        <svg onClick={removeFromWishlist} className="close-btn" xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 24 24"><g fill="none" stroke="#a31d1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M5 12H19"><animate fill="freeze" attributeName="d" dur="0.4s" values="M5 12H19;M12 12H12"></animate><set fill="freeze" attributeName="opacity" begin="0.4s" to={0}></set></path><path d="M5 5L19 5M5 19L19 19" opacity={0}><animate fill="freeze" attributeName="d" begin="0.2s" dur="0.4s" values="M5 5L19 5M5 19L19 19;M5 5L19 19M5 19L19 5"></animate><set fill="freeze" attributeName="opacity" begin="0.2s" to={1}></set></path></g></svg>                        </div>
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
                <div className="dropdown">
                  {cartItems.length >0 ?(
                    cartItems.map((item)=>(
                      <div key={item.id} className="cart-item">
                         <img src={item.image} alt={item.title} className="wishlist-image" />
                        <div className="wishlist-details">
                          <p>{item.title}</p>
                          <p>${item.price}</p>
                        </div>
                      </div>
                    ))
                  ):(

                    <p>Your cart is empty!</p>
                  
                  )}
                
                </div>
              )}
            </div>
            <div>
              <img
                className="icons"
                src={profileLogo}
                alt="profilelogo"
                onClick={toggleProfile}
              />
              {profileOpen && (
                <div className="dropdown">
                  <p>Profile</p>
                  <p onClick={logout}>Logout</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
