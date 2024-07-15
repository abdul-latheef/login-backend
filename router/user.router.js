import express from "express";
import {createUser, getUsers, getUserByUserName} from "../controller/login.controller.js";

const router = express.Router()

router.post('/', createUser)
router.get('/', getUsers)
router.get('/:userName', getUserByUserName)
export default router;