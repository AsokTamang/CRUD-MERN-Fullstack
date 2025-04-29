//in this file we are designing the model of the data.

import mongoose from "mongoose";

const productSchema=new mongoose.Schema({   //here in this code , we are designing the product schema i.e the format of the data for mongodb.
   name:{
      type:String,
      required:true,
   },
   price:{
      type:Number,
      required:true,
   },
   image:{
      type:String,
      required:true,
   }
},{timestamps:true})//here timestamps automatically adds the created at and updated at datetime for our data.

export const product=mongoose.model('Products',productSchema);    //here we are making the model of our db for our mongodb.