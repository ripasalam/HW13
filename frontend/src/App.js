import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateBook from "./pages/createBook";
import DetailBook from "./pages/detailbook";
import EditBook from "./pages/editbook";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  return (
    < >
     <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element ={<Home />} />
          <Route path = "/login" element ={<Login />} />
          <Route path = "/register" element ={<Register />} />
          <Route path = "/create" element ={<CreateBook />} />
          <Route path = "/books/:id" element ={<DetailBook />} />
          <Route path = "/editbook/:id" element ={<EditBook />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
    
    </>
  );
}

export default App;
