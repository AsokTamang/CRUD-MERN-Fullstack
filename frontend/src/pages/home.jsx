import React from "react";
import Navbar from "../components/navbar";
import { useProductStore } from "../store/product";
import { NavLink } from "react-router-dom";
import { MdDelete, MdInsertDriveFile   } from "react-icons/md";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  useDisclosure,
  VStack
} from '@chakra-ui/react'

export default function Home() {
  const[updatedProduct,setupdatedProduct]=React.useState({name:'',price:'',image:''})

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { fetchProducts, products, deleteProducts, updateProducts } =
    useProductStore();
  

  React.useEffect(()=>{
    fetchProducts();
  },[])  
  
  const [deletion,setdeletion]=React.useState(null);
  const [deletemessage,setdeletemessage]=React.useState('');
  const [updation,setupdation]=React.useState(null);
  const [updatemessage,setupdatemessage]=React.useState('');


  const handleclick = async (pid) => {
    const { success, message } = await deleteProducts(pid);
    if(success){
      setdeletion(true)
      setdeletemessage(message)
      fetchProducts();
    

      setTimeout(()=>{             //this setTimeout function is to make the detetion box appear only for 3 seconds or 3000 ms.
        setdeletion(null);
        setdeletemessage('');
      },3000)
    }
   
  };

  const handleclick2=async(pid,updatedProduct)=>{
  
      const {success,message}=await updateProducts(pid,updatedProduct)
      console.log(success,message)
      if(success){
        setupdation(true)
        setupdatemessage(message)
        fetchProducts();
        onClose();
  
        setTimeout(()=>{             //this setTimeout function is to make the detetion box appear only for 3 seconds or 3000 ms.
          setupdation(null);
          setupdatemessage('');
        },3000)
      }
   
  }

  

  const noelements = (
    <div className="nobox">
      <h1 style={{ color: "red" }}>No products found.</h1>
      <NavLink to="/create">Create a product</NavLink>
    </div>
  );

  const elements = products.map((item) => (
    <div className="itembox" key={item._id}>
      <img src={item.image} width={250} style={{ borderRadius: "15px" }} />
      <h1  className='itemname' style={{ fontSize: "30px" }}>Name:{item.name}</h1>
      <p className='itemprice' style={{ fontSize: "20px" }}>Price:{item.price}</p>
      <div className="buttonbox">
        <button className="deletebtn" onClick={() => handleclick(item._id)}>
          <MdDelete />
        </button>
        <button className="updatebtn" onClick={()=>{  setupdatedProduct(item);  //when this button is clicked then it updates the state with the current item. and then it opnes the modalbox
          onOpen();}}> 
       < MdInsertDriveFile /> 
        </button>
      </div>
    </div>
  ));

  return (
    <>
    <div style={{ height: "100%" }}>
      <Navbar />
      <br />
      {deletion && (
      <div className='deletionBox'>
        <h1>{deletemessage}</h1>

      </div>)}



      {updation && (
      <div className='deletionBox'>
        <h1>{updatemessage}</h1>

      </div>)}


      {products.length > 0 && <h1 className="heading">The available products are:</h1>}
      <div className="box">
        {!products || products.length == 0 ? noelements : elements}
      </div>
    </div>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
          <Input name='name' placeholder="Name" value={updatedProduct.name} onChange={(e)=>setupdatedProduct({...updatedProduct,name:e.target.value})}/>
          <Input name='price' placeholder="Price" value={updatedProduct.price} onChange={(e)=>setupdatedProduct({...updatedProduct,price:e.target.value})}/>
          <Input name='image' placeholder="Image" value={updatedProduct.image} onChange={(e)=>setupdatedProduct({...updatedProduct,image:e.target.value})}/>
          </VStack>
          </ModalBody>

          <ModalFooter>

          <Button colorScheme='blue' mr={3} onClick={()=>handleclick2(updatedProduct._id,updatedProduct)}>
              Update
            </Button>
          
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
           
          </ModalFooter>
        </ModalContent>
      </Modal>
      </>
  );}

