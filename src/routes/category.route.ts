import express, { type Router } from "express";
import {
  getCategoriesHandler,
  getCategoryByIdHandler,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} from "../controllers/category.controller.js";

const router: Router = express.Router();

router.get("/", getCategoriesHandler); // optional ?parentId=<uuid>
router.get("/:id", getCategoryByIdHandler);
router.post("/", createCategoryHandler);
router.put("/:id", updateCategoryHandler);
router.delete("/:id", deleteCategoryHandler);

export default router;