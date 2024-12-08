
//add food item

import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add food item
const addFood = async (req, res) => {
  // Extracting filename from the uploaded file
  const image_filename = req.file?.filename;

  if (!image_filename) {
    return res.status(400).json({ success: false, message: "Image is required" });
  }

  // Create a new food item
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename, // Save only the filename
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error occurred while adding food" });
  }
};


//all food list
const listfood=async(req,res)=>{
  try{
    const foods=await foodModel.find({});
    res.json({success:true,data:foods});
  }catch(error){
    console.log(error)
    res.json({success:false,message:error});
  }
}

//remove food item
const removefood=async(req,res)=>{
   try{
    const food=await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`,()=>{});
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({success:true,message:"food removed"})
   }catch(error){
     console.log(error);
     res.json({success:false,message:"Error while removing"})
   }
}


export {addFood,listfood,removefood}