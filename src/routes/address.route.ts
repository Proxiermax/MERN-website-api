import express, { type Router } from "express";
import {
  getAddressesHandler,
  getAddressByIdHandler,
  createAddressHandler,
  updateAddressHandler,
  deleteAddressHandler,
} from "../controllers/address.controller.js";

const router: Router = express.Router();

router.get("/", getAddressesHandler); // optional ?userId=<uuid>
router.get("/:id", getAddressByIdHandler);
router.post("/", createAddressHandler);
router.put("/:id", updateAddressHandler);
router.delete("/:id", deleteAddressHandler);

export default router;