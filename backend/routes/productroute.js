import express from 'express'

export const productrouter=express.Router();
import { getcontroller,updatecontroller,deletecontroller,insertcontroller } from '../controller/product.controller.js';


productrouter.get('/',getcontroller)             //this router is used for displaying all tha available datas of our mongodb.

productrouter.post('/',insertcontroller)          //this router is used for inserting the datas in our mongodb.

productrouter.delete('/:id',deletecontroller)       //this router is used for deleting the data from our mongodb.

productrouter.put('/:id',updatecontroller)         //this router is used for updating the data of our mongodb