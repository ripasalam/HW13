import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookForm from '../component/bookForm';
import axios from 'axios';
import Navbar from '../component/navbar';
const EditBook = () => {

    const {id} = useParams();
    const [ book, setBook] = useState(null)

    useEffect(() => {
       const fetchBook = async () =>{

        const {data} = await axios.get(`http://localhost:8000/books/${id}`)
        setBook(data.book)
       }
       fetchBook()

    }, [id]);
  return (
    <div>
      <Navbar />
      <BookForm bookData = {book} />
      
    </div>
  )
}

export default EditBook
