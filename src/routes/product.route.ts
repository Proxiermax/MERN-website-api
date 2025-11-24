import express, { type Router } from "express";
import {
  getProductsHandler,
  getProductByIdHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from "../controllers/product.controller.js";

const router: Router = express.Router();

router.get("/", getProductsHandler); // optional ?categoryId=<uuid>
router.get("/:id", getProductByIdHandler);
router.post("/", createProductHandler);
router.put("/:id", updateProductHandler);
router.delete("/:id", deleteProductHandler);

export default router;