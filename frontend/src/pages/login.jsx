import React, {useState} from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Flex,
    Box,
    Heading,
    Button,
    VStack,
    useToast,
    Toast
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../component/navbar';

const Login = () => {

    const toast = useToast({
      position:"top"
    })
    const navigate = useNavigate();
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const handleLogin = async (data) => {
    
    try{
        const res = await axios.post(`http://localhost:8000/login`, data)
        window.localStorage.setItem("token", res.data.token)
        
        toast({
          title: 'Login successfully',
          description: "",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        navigate("/")

    }catch(err){
         toast({
                title: "Error",
                description: err.message,
                status: "error",
                duration: 3000,
                isClosable: true,
              });
    }
  }
  return (
    <>
          <Navbar />
          <VStack height="91vh" bgColor="teal">
                <Flex margin="auto" >
                    <Box p={8} maxWidth="700px" maxHeight="1000px" borderWidth={1} borderRadius={8} boxShadow="lg" bgColor="white">
                        <Box textAlign="center">
                            <Heading>Login</Heading>
                        </Box>
                        <Box my={4} textAlign="left">
                            <form onSubmit={handleSubmit(handleLogin)} >
                                <FormControl >
                                    <FormLabel>Email</FormLabel>
                                    <Input type="email" placeholder="test@test.com" {...register('email', { required: true })}/>
                                    <FormLabel>Password</FormLabel>
                                    <Input type="password" placeholder="*******" {...register('password', { required: true })} />
                                </FormControl>
                                <Link to="/register" >
                                    <Button variant="ghost">
                                    Doesn't Have Account? Click here
                                    </Button>
                                </Link>
                                <Button width="full" mt={4} type="submit" colorScheme="teal">
                                    Login
                                </Button>
                            </form>
                        </Box>
                    </Box>
                </Flex>
            </VStack>
    {/* <Box
        w={['full', 'md']}
        p={[8, 10]}
        mt={[10, '10vh']}
        mx="auto"
        border={['none', '1px']}
        borderColor={['', 'gray.300']}
        borderRadius={10}
        
    >


    </Box> */}
    </>
  )
}

export default Login