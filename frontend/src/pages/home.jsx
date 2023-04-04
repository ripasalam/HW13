import React from "react";
import Navbar from "../component/navbar";
import { 
    Card,
    CardBody,
    CardFooter,
    Image,
    Stack,
    Heading,
    Text,
    Container,
    Flex,
    SimpleGrid
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



const Home = () => {

    const [data, setData] = useState([])

    useEffect(() => {

        const getData = async () =>{

            try {
                const {data} = await axios.get(`http://localhost:8000/books`,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setData(data.books)
            } catch (error) {
                console.log(error) 
            }
        }
        getData()
    }, []);

    return(
        <>
        <Navbar/>
            <Container maxW='container.xl' pt={10} >
                <Flex flexWrap='wrap' >
                    {data !== null &&
                        data.map((res)=>{
                            return(
                                <>
                                <Link to={`/books/${res.id}`}>
                                     <Card 
                                maxW='sm' 
                                m={4}
                                variant="elevated">
                                    <CardBody>
                                        <Image
                                        src={'http://localhost:8000/'+ res.image}
                                        alt=''
                                        borderRadius='lg'
                                        />
                                        <Stack mt='6' spacing='3'>
                                        <Heading size='md'>{res.title}</Heading>
                                        <Text>
                                            {res.author}
                                        </Text>
                                        </Stack>
                                    </CardBody>
                                </Card>              
                                </Link>
                                             
                                </>
                            )
                        })}
                </Flex>
            </Container>
        </>
    )

}

export default Home