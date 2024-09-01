import express from "express";
import {createUser, getUsers, getAllUsersName, getUserByUserName} from "../controller/login.controller.js";

const router = express.Router()

router.post('/createUser', createUser)
router.get('/getUsers', getUsers)
router.get('/getAllUsersName', getAllUsersName)
router.post('/login', getUserByUserName)
export default router;