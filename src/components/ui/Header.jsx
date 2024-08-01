import wishListLogo from "../../assets/images/wishlist.svg";
import cartLogo from "../../assets/images/cart.svg";
import profileLogo from "../../assets/images/profile.svg";
import "../../styles/header.css";
import { useState} from "react";

import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
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
      // An error happened.
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
                  <p>Your Wishlist is Empty!</p>
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
                  <p>Your cart is empty!</p>
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
