import express from "express";
import { userLogout, userRegister } from "../RroutesController/userrouteController.js";
import { userLogin } from "../RroutesController/userrouteController.js";

const router = express.Router();

router.post('/register', userRegister)


router.post('/login', userLogin)

router.post('/logout', userLogout)






export default router