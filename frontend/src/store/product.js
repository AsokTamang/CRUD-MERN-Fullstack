import { FaSadCry } from 'react-icons/fa'
import {create} from 'zustand'
import { product } from '../../../backend/models/product.model'

export const useProductStore=create((set)=>({
  products:[],
  setProducts:(products)=>set({products:products}),

  createProducts: async(newProduct)=>{
    const regexPattern=/^[a-zA-z\s]+$/    //here in this patterns ^ denotes that the pattern check starts from the beginning of the string and + means more than one character and $ means that the pattern check will happen till the end. 
     if(!newProduct.name||!newProduct.price||!newProduct.image){
      return({success:false,message:'Please enter all the fields!'})
     }

     
     else if(isNaN(newProduct.price)||!regexPattern.test(newProduct.name)){

       return({success:false,message:'Please enter correct type of data!'})

     }

     const res=await fetch('/api/products',{         //here we are fetching the response provided by our backend server in which method is POST.
      method:'POST',
      headers:{
        'Content-Type':'application/json'

      },
      body:JSON.stringify(newProduct)
     })
     
     const data= await res.json();   //here we are retrieving the response in json format to store our data in our state.
     set((state)=>({products:[...state.products,data.data]})      //here we are appending the data retrived into our state without changing the original state.
     )
     return({success:true,message:'Data is inserted successfully.'})



  }
,
  fetchProducts:async()=>{                     //this function is for fetching the data from our backend get endpoint and the default method of fetch is GET. so no need of assigning method:'GET'
    const res=await fetch('/api/products/');
    const data= await res.json()
    set((state)=>({products:data.data}))
    return({success:true,message:`The feteched data is:${data.data}`})


  }
,
deleteProducts:async(pid)=>{
  const res=await fetch(`/api/products/${pid}`,{        //here we are fetching from backend api and the method is delete method.
    method:'DELETE',
   
  })
  const data= await res.json();
  if(!data.success){     //here we are checking if the response provide by our backend is true or false based on the logic done by our backend api.
    return({success:false,message:data.message})
  }  

  //the below code is else code , it is not necessary to include the else here.  and this code updates the UI immediately without the need to refesh the page, as this cause our zustand state to change.
  set((state)=>({products:state.products.filter((product)=>product._id!==pid)}));   //here we are filtering our state's products inorderto provide a new data array removing the matching id of product.
  return({success:true,message:data.message})
  


}
,
updateProducts:async(pid,updatedProduct)=>{
  const res = await fetch(`/api/products/${pid}`,{
    method:'PUT',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(updatedProduct)
  })

  const data=await res.json()
  if(!data.success){
    return({success:false,message:data.message})
  }
  //the code below directly updates the UI without the need to refresh the page.
  set((state)=>({products:state.products.map((product)=>product._id===pid?data.data:product)}))  //here this code checks whether the product id of our local state is equal to the id of product updated by the user through UI.
  return({success:true,message:data.message})
} 


}))