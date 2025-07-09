import { Component } from 'react';
import { ClipLoader } from 'react-spinners';


import CartContext from '../../context/CartContext';
import Header from '../Header';

import './index.css';

class BookDetails extends Component {
  static contextType = CartContext;

  state = {
    book: null,
    loading: true,
    error: false,
  };

  componentDidMount() {
    const { id } = this.props.params;

    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then(res => res.json())
      .then(data => {
        const info = data.volumeInfo;
        const sale = data.saleInfo;

        const bookData = {
          id: data.id,
          title: info.title || 'No title',
          subtitle: info.subtitle || '',
          description: info.description || 'No description available',
          authors: info.authors?.join(', ') || 'Unknown author',
          image: info.imageLinks?.thumbnail || '',
          price: sale?.retailPrice?.amount,
          currency: sale?.retailPrice?.currencyCode || '',
        };

        this.setState({ book: bookData, loading: false });
      })
      .catch(() => this.setState({ error: true, loading: false }));
  }

  handleAddToCart = () => {
    const { book } = this.state;
    const { addCartItem } = this.context;

    if (!book || !book.id || typeof book.price !== 'number') {
      alert('This book cannot be added to the cart.');
      return;
    }

    const cartItem = {
      id: book.id,
      title: book.title,
      price: book.price,
      currency: book.currency,
      image: book.image,
      quantity: 1,
    };

    addCartItem(cartItem);
  };

  render() {
    const { book, loading, error } = this.state;

    if (loading) {
      return (
        <div className="book-loader-spinner">
          <ClipLoader color="#4fa94d" size={80} />

        </div>
      );
    }

    if (error || !book) {
      return <p className="error-message">Book not found or an error occurred.</p>;
    }

    return (
      <div>
        <Header />
        <div className="book-details">
          <img src={book.image} alt={book.title} />
          <h2>{book.title}</h2>
          {book.subtitle && <h4>{book.subtitle}</h4>}
          <p><strong>Author:</strong> {book.authors}</p>
          <p><strong>Price:</strong> {book.price} {book.currency}</p>
          <div>
            <strong>Description:</strong>
            <p dangerouslySetInnerHTML={{ __html: book.description }} />
          </div>
          <button onClick={this.handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    );
  }
}

export default BookDetails;
