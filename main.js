import express from "express";
import cors from 'cors';
import userRoutes from "./router/user.router.js";

const app = express();
const PORT = 6969;

app.use(cors());

app.use(express.json())

app.use('/users', userRoutes)

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})

