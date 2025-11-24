import express, { type Router } from "express";
import {
  getVariantOptionsHandler,
  getVariantOptionByIdHandler,
  createVariantOptionHandler,
  updateVariantOptionHandler,
  deleteVariantOptionHandler
} from "../controllers/variantOption.controller.js";

const router: Router = express.Router();

router.get("/", getVariantOptionsHandler);          // ?variantId=<uuid>
router.get("/:id", getVariantOptionByIdHandler);
router.post("/", createVariantOptionHandler);
router.put("/:id", updateVariantOptionHandler);
router.delete("/:id", deleteVariantOptionHandler);

export default router;