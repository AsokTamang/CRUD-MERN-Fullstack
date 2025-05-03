import express from 'express'

export const productRouter=express.Router();
import { getcontroller,updatecontroller,deletecontroller,insertcontroller } from '../controller/product.controller.js';


productRouter.get('/',getcontroller)             //this router is used for displaying all tha available datas of our mongodb.

productRouter.post('/',insertcontroller)          //this router is used for inserting the datas in our mongodb.

productRouter.delete('/:id',deletecontroller)       //this router is used for deleting the data from our mongodb.

productRouter.put('/:id',updatecontroller)         //this router is used for updating the data of our mongodb