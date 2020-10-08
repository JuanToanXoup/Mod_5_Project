import React from 'react';
import BookCard from './BookCard'

class BookContainer extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/books',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Key': localStorage.getItem('auth_key')
      }
    })
    .then(res => res.json())
    .then(books => {
      this.setState({ books: books })
    })
  }

  handleDeleteBtn = (e,deleteBook) => {
    fetch(`http://localhost:3000/books/${deleteBook.id}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(_ => {
      const filteredBooks = [...this.state.books].filter(book => book.id !== deleteBook.id)
      this.setState({ ...this.state, books: filteredBooks })
    })
    .catch(error => console.log(error))
  }

  render(){
    return (
      <div className='maincontainer'>
        {
          this.state.books.map(book => <BookCard
             book={book}
              key={book.id}
                handleDeleteBtn={this.handleDeleteBtn}
          />)
        }
      </div>
    )
  }
}

export default BookContainer;