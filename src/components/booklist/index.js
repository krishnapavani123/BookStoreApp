import { Link } from 'react-router-dom';
import './index.css'
const Booklist=props=>{
    const {bookss}=props
    const {title,image,price}=bookss
    return(
        <div className='books-container'>
            <Link to={`/book/${bookss.id}`} className='link-item'>
           
            <img src={image} alt={title} className='img'/>
             <h1 className='heading'>{title}</h1>
        
            <p className='price'>Rs.{price}</p>
            </Link>
            
        </div>
    )
}
export default Booklist