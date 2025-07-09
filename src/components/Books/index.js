import { Component } from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import {Navigate} from 'react-router-dom'
import { TailSpin } from 'react-loader-spinner';
import Header from '../Header'
import Booklist from '../booklist'
import './index.css'
class Books extends Component{
state={
    search:'',
    booklist:[],
    loading: true,

}
componentDidMount() {
    this.getBooks()
  }


getBooks=async ()=>{
   
    const url='https://www.googleapis.com/books/v1/volumes?q=motivation';
    const response=await fetch(url)
    const data= await response.json()
    const updatedData = data.items.map(each => ({
  title: each.volumeInfo?.title || 'No title',
  subtitle: each.volumeInfo?.subtitle || '',
  image: each.volumeInfo?.imageLinks?.thumbnail || '',
  authors: each.volumeInfo?.authors?.join(', ') || 'Unknown author',
  price: each.saleInfo?.retailPrice?.amount || 'Not for sale',
  currency: each.saleInfo?.retailPrice?.currencyCode || '',
  id: each.id
}));

    this.setState({booklist:updatedData, loading: false })


}



OnSearch=event=>{
    this.setState({search:event.target.value})
}


    renderInputEle=()=>{
        const {search}=this.state
        return(
        <div className='input-containers'>

         
           <div className="search-input-container">
        <input
         
          type="search"
          className="search-input"
          placeholder="Search  your favourite"
          value={search}
          onChange={this.OnSearch}
         
        />
        <BsSearch className="search-icon" />
      </div>
            <img src="https://i.pinimg.com/736x/9d/e6/18/9de618093535e6cec479caf88e38b7df.jpg" className='search-img' alt="search-img"/>
        </div>
        
    )
    }
    render(){
        const jwtToken = Cookies.get('jwt_token');
if (!jwtToken) {
  return <Navigate to="/login" replace />;
}
const {booklist,search,loading}=this.state

const filteredBooks = booklist.filter(book =>
  book.title.toLowerCase().includes(search.toLowerCase()) ||
  book.authors.toLowerCase().includes(search.toLowerCase())
);
if (loading) return  <div className='book-loader-spinner'><TailSpin
  height={80}
  width={80}
  color="#4fa94d"
  ariaLabel="loading"
  visible={true}
/></div>
        return(

            <div>

                <Header/>
     <div className='input-c'>{this.renderInputEle()}</div>
    <div className='items'>

      {filteredBooks.map((each)=>(
        <Booklist bookss={each} key={each.id}/>
     ))}
    </div>
     
            </div>

        )
    }
}
export default Books