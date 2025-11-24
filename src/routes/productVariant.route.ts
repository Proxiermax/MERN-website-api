import express, { type Router } from "express";
import {
  getProductVariantsHandler,
  getProductVariantByIdHandler,
  createProductVariantHandler,
  updateProductVariantHandler,
  deleteProductVariantHandler
} from "../controllers/productVariant.controller.js";

const router: Router = express.Router();

router.get("/", getProductVariantsHandler);         // ?productId=<uuid> optional
router.get("/:id", getProductVariantByIdHandler);
router.post("/", createProductVariantHandler);
router.put("/:id", updateProductVariantHandler);
router.delete("/:id", deleteProductVariantHandler);

export default router;