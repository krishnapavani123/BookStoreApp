import Cookies from 'js-cookie'
import {Navigate , Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token');
if (!jwtToken) {
  return <Navigate to="/login" replace />;
}


  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-heading">Books That Speak Your Soul</h1>
          <img
            src="https://i.pinimg.com/736x/40/ff/4d/40ff4d7efcf7f7121c0546fb2cb43c6c.jpg"
            alt="clothes that get you noticed"
            className="home-mobile-img"
          />
          <p className="home-description">
            Just like fashion, books carry the rhythm of their time — echoing ideas, emotions, and revolutions. They shape how we think, feel, and express ourselves. Whether it’s through a powerful story, a poetic phrase, or a provocative insight, books let us be seen in our quiet moments and heard through the words we carry forward.
          </p>
          <Link to="/books">
            <button type="button" className="shop-now-button">
              Buy Now
            </button>
          </Link>
        </div>
        <img
          src="https://i.pinimg.com/736x/40/ff/4d/40ff4d7efcf7f7121c0546fb2cb43c6c.jpg"
          alt="clothes that get you noticed"
          className="home-desktop-img"
        />
      </div>
    </>
  )
}

export default Home
