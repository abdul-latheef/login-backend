import express from "express";
import {createItems, getItems, searchItems} from "../controller/item.controller.js"

const router = express.Router();

router.post('/', createItems)
router.get('/', getItems)
router.post('/search-items', searchItems)
export default router;
