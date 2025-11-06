// import express from "express";
// import { signup ,login, updateprofile, checkAuth} from "../controllers/UserController.js";
// import { protectRoute } from "../middlewares/auth.js";


// const userRouter=express.Router();


// userRouter.post("/signup",signup);

// userRouter.post("/login",login);

// userRouter.put("/update-profile",protectRoute,updateprofile);

// userRouter.put("/check",protectRoute,checkAuth);

//  export default userRouter;




import express from "express";
import { signup, login, checkAuth, updateprofile } from "../controllers/authController.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/checkauth", protectRoute, checkAuth);
router.put("/update-profile", protectRoute, updateprofile);

export default router;
