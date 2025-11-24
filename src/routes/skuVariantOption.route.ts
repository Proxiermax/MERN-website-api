import express, { type Router } from "express";
import {
  getSkuVariantOptionsHandler,
  getSkuVariantOptionHandler,
  createSkuVariantOptionHandler,
  deleteSkuVariantOptionHandler
} from "../controllers/skuVariantOption.controller.js";

const router: Router = express.Router();

router.get("/", getSkuVariantOptionsHandler); // ?skuId=&variantOptionId=
router.get("/:skuId/:variantOptionId", getSkuVariantOptionHandler);
router.post("/", createSkuVariantOptionHandler);
router.delete("/:skuId/:variantOptionId", deleteSkuVariantOptionHandler);

export default router;