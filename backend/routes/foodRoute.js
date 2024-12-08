import express from "express";
import { addFood, listfood, removefood } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

// Routes
foodRouter.post("/add", upload.single("image"), addFood); // Add food
foodRouter.get("/list", listfood);                      // List foods
foodRouter.post("/remove", removefood);                 // Remove food

export default foodRouter;








