import { product } from "../models/product.model.js";
import mongoose from "mongoose";

export const getcontroller = async (req, res) => {
  try {
    const Data = await product.find({}); //this code product.find({}) will get all the datas available in our mongo db database.
    res.status(200).json({ success: true, data: Data });
  } catch (err) {
    console.log(`error occured while fetching the datas:${err}`);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const deletecontroller = async (req, res) => {
  //this controller is for deletion purpose.
  const { id } = req.params; //here we are destructuring the id from req.params as req.params means /:id.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    //here we are checking if the id exist in our database or not.
    return res
      .status(404)
      .json({ success: false, message: "product with such id doesnot exist." });
  }
  try {
    await product.findByIdAndDelete(id); //this code helps us to delete the data.
    res
      .status(200)
      .json({ success: true, message: "Data is deleted successfully." });
  } catch (err) {
    console.log(`error occured while deleting the datas:${err}`);
    res
      .status(500)
      .json({ success: false, message: "Internal server error occuered." });
  }
};

export const updatecontroller = async (req, res) => {
  const { id } = req.params;
  const productfields = req.body; //here req.body means the fields that are in the requested body.

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res
      .status(404)
      .json({ success: false, message: "Product with such id doesnot exist." });
  }

  try {
    const updatedproduct = await product.findByIdAndUpdate(id, productfields, {
      new: true,
    }); //here new:true helps to display the updated data rather than the old one.
    console.log(`Data is updated successfully.`);
    res.status(200).json({ success: true, message: `Data is updated successfully.`,data:updatedproduct });
  } catch (err) {
    console.log(`${err} occured`);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const insertcontroller = async (req, res) => {
  //this endpoint is for inserting the data.
  const data = req.body; //here req.body means the field available to insert the data values.
  if (!data.name || !data.price || !data.image) {
    return res.status(400).json({ message: "Please fill all the fields." });
  } else {
    const newProduct = new product(data); //here we are inserting the values inputed by the user into our products model.
    try {
      await newProduct.save(); //here the new product is saved into our database.
      res
        .status(200)
        .json({ message: "Data is saved successfully.", data: newProduct });
    } catch (err) {
      console.log(`error occured while inserting the datas:${err}`);
      res.status(500).json({ message: "Internal server error." });
    }
  }
};
