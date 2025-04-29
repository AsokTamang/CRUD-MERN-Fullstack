import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/home.jsx'
import Create from './pages/create.jsx'
import { ChakraProvider } from "@chakra-ui/react";



createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ChakraProvider>
 
  <BrowserRouter>
 
   <Routes>
     

      <Route path='/' element={<Home/>}/>
      <Route path='/create' element={<Create/>}/>
      
      </Routes>   
      
  </BrowserRouter>
 
  </ChakraProvider>
  </StrictMode>,
)
