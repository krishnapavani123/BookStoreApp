
import { Link } from 'react-router-dom';

import './index.css';

const Checkout = () => (
  <div className="order-success-container">
    <img src="https://static.vecteezy.com/system/resources/previews/008/506/390/large_2x/bright-green-tick-checkmark-icon-free-png.png" alt="order"
    className='order'/>
    <h1 className="success-message">Order Confirmed!</h1>
    <p className="success-subtext">Thank you for your purchase.</p>

    <Link to="/books" className="continue-button-link">
      Continue Buying
    </Link>
  </div>
);

export default Checkout;
