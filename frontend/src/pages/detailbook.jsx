import React from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  Text,
} from "@chakra-ui/react";

import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../component/navbar';
const DetailBook = () => {
    const navigate = useNavigate()
    const {id} = useParams();
    const [isLoading, setIsLoading] =useState(true)
    const [book, setBook] = useState(null);
   
    useEffect(() => {
        
        const fetchDataId = async () =>{

            const {data} = await axios.get (`http://localhost:8000/books/${id}`,{
                headers: { 
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`
                 }
            })

            setBook(data.book)
            setIsLoading(false)
        }
        fetchDataId()
    }, [id]);

    const handleDelete = () =>{

       
            
            const deleteData=  async() =>{

                try {
                   await axios.delete(`http://localhost:8000/books/${id}`,{
                        headers: { 
                            Authorization: `Bearer ${window.localStorage.getItem("token")}`
                        }
                    })
                    navigate("/");
                } catch (err) {
                    console.log(err)
                }
            }
            deleteData()
    }
  return (
    <>
    <Navbar />
    <Box>
      {isLoading ? (
        <Skeleton height="300px" my="6" mx="6" />
      ) : (
        <Flex my="6" mx="6">
          <Box w="300px">
            <Image
              src={`http://localhost:8000/${book.image}`}
              alt={book.title}
            />
          </Box>
          <Box ml="8">
            <Heading as="h1" size="lg">
              {book.title}
            </Heading>
            <Text fontSize="xl" fontWeight="semibold" color="gray.500">
              {book.author}
            </Text>
            <Text fontSize="xl" fontWeight="semibold" color="gray.500">
              {book.publisher}
            </Text>
            <Text fontSize="xl" fontWeight="semibold" color="gray.500" mb="4">
              {book.year} | {book.pages} pages
            </Text>
          </Box>
        </Flex>
      )}
      {localStorage.getItem('token') && (
        <HStack mx="6">
          <Popover>
            <PopoverTrigger>
              <Button colorScheme="red">Delete</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Confirmation!</PopoverHeader>
              <PopoverBody>
                Are you sure you want to delete this book?
              </PopoverBody>
              <Button onClick={handleDelete}  colorScheme="red">
                Delete
              </Button>
            </PopoverContent>
          </Popover>
          <Link to={`/editbook/${id}`}>
            <Button>Edit</Button>
          </Link>
        </HStack>
      )}
    </Box>
    
    </>
  )
}

export default DetailBook