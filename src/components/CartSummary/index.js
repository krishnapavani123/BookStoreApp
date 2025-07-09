import CartContext from '../../context/CartContext';
import {Link} from 'react-router-dom'
import './index.css';

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const { cartList } = value;
      let total = 0;

      cartList.forEach(eachCartItem => {
        const price = typeof eachCartItem.price === 'number' ? eachCartItem.price : 0;
        total += price * eachCartItem.quantity;
      });

      return (
        <>
          <div className="cart-summary-container">
            <h1 className="order-total-value">
              <span className="order-total-label">Order Total:</span> Rs {total}/-
            </h1>
            <p className="total-items">{cartList.length} Items in cart</p>
            <Link to="/checkout" className='btn'>
             <button type="button" className="checkout-button d-sm-none">
              Place Order
            </button>
            </Link>
           
          </div>
          <Link to='/checkout' className='btn'>
          <button type="button" className="checkout-button d-lg-none">
            Place Order
          </button></Link>
          
        </>
      );
    }}
  </CartContext.Consumer>
);

export default CartSummary;
