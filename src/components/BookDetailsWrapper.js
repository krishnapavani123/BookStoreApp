// BookDetailsWrapper.js
import { useParams } from 'react-router-dom';
import BookDetails from './Bookdetails'; // adjust import path if needed

const BookDetailsWrapper = () => {
  const params = useParams();
  return <BookDetails params={params} />;
};

export default BookDetailsWrapper;
