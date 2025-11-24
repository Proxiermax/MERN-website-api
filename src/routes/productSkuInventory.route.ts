import express, { type Router } from "express";
import {
  getSkuInventoryItemsHandler,
  getSkuInventoryItemByIdHandler,
  createSkuInventoryItemHandler,
  updateSkuInventoryItemHandler,
  deleteSkuInventoryItemHandler
} from "../controllers/productSkuInventory.controller.js";

const router: Router = express.Router();

router.get("/", getSkuInventoryItemsHandler);              // ?productId=<uuid>
router.get("/:id", getSkuInventoryItemByIdHandler);
router.post("/", createSkuInventoryItemHandler);
router.put("/:id", updateSkuInventoryItemHandler);
router.delete("/:id", deleteSkuInventoryItemHandler);

export default router;