import "../../styles/cart.css";
import { useSelector } from "react-redux";

function CartItem() {
  const cartItems = useSelector((state) => state.cart.cartList || []);
  const totalCartAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return (
    <>
      {cartItems.length > 0 ? (
        <div className="cart-section">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id}>
                <div className="cart-Eachitems">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cart-images"
                  />
                  <div className="cart-details">
                    <p className="cart-item-title">{item.title}</p>
                    <p className="cart-item-price">${item.price}</p>
                    <p className="cart-item-qty">Qty: {item.quantity}</p>
                    {/* <p className="cart-item-total">Total: ${item.price * item.quantity}</p> */}
                  </div>
                  <p className="cart-item-total">
                    ${item.price * item.quantity}
                  </p>
                  <button className="buynow">Buy now</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-right-section">
            <div>
              <h5>Order Summary</h5>
              <p>Sub Total : ${totalCartAmount}</p>
              <p>Estimated Shipping Charges : $20</p>
            </div>
            <hr />
            <div>
              <h4>Estimated Total : ${(totalCartAmount + 20).toFixed(2)}</h4>
            </div>
            <hr />
            <div>
              <h4>Apply Coupon Code</h4>
              <div className="coupons">
                <input className="coupon-input" type="text" />
                <button className="coupon-btn">Apply</button>
              </div>
            </div>
            <hr />
            <div>
              <button className="checkout-btns">Checkout</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="cart-empty">
          <p className="cart-empty-text">Your cart is empty!</p>
          <img className="cart-img" src="./imgs/cart.png" alt="" />
        </div>
      )}
    </>
  );
}

export default CartItem;
