import React from "react";
import Navbar from "../components/navbar";
import { useProductStore } from "../store/product";


export default function Create() {
  const{createProducts}=useProductStore();
  const [finalmessage, setfinalmessage] = React.useState("");
  const [insertion, setinsertion] = React.useState(null);

  
  

 
  const [data, setdata] = React.useState({
    //here we are setting the state of an object to insert the data.
    name: "",
    price: "",
    image: "",
  });

  
  const handlesubmit=async()=>{
    try{
    const {success,message}=await createProducts(data);
    if(success){
      setinsertion(true);
      setfinalmessage(message)

      

    }
    else{
      setinsertion(false);
      setfinalmessage(message)
    }

    setTimeout(()=>{
      setinsertion(null);
      setfinalmessage('');
      
    },3000)
   

  }
  catch(err){
    console.log(`The error is :${err}`)
  }
  }
 

  return (
    <>
      <Navbar />
      <main className="addbox">
        <h1>Create a product.</h1>
        <div className="createbox">
          <input
            placeholder="Product Name"
            name="name"
            value={data.name}
            onChange={(e) => setdata({ ...data, name: e.target.value })}
            required
          />
          <br />
          <input
            placeholder="Price"
            name="price"
            value={data.price}
            onChange={(e) => setdata({ ...data, price: e.target.value })}
            required
          />
          <br />
          <input
            placeholder="ImageUrl"
            name="image"
            value={data.image}
            onChange={(e) => setdata({ ...data, image: e.target.value })}
            required
          />
          <br />
          <button className='addbtn'onClick={handlesubmit}>Add</button>
        </div>
        {finalmessage && (
          <div className="toasting">
            <p style={{ color: insertion ? "green" : "red" }}>{finalmessage}</p>
          </div>
        )}
      </main>
    </>
  );
}
