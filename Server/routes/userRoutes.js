import express from "express";
import { signup ,login, updateprofile, checkAuth} from "../controllers/UserController.js";
import { protectRoute } from "../middlewares/auth.js";


const userRouter=express.Router();


userRouter.post("/signup",signup);

userRouter.post("/login",login);

userRouter.put("/update-profile",protectRoute,updateprofile);

userRouter.put("/check",protectRoute,checkAuth);

 export default userRouter;