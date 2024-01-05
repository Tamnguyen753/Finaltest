import { Router } from "express";
import { getInventory, login, order } from "../Controller/controller.js";



const authRouter = Router()

authRouter.get('/getInventory',getInventory)
authRouter.post('/login',login)
authRouter.post('/order',order)

export default authRouter