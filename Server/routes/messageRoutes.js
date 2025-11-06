// import express from "express";
// import { protectRoute } from "../middlewares/auth.js";
// import { getMessages, getUsersForSidebar, markMessageAsSeen, sendMessage } from "../controllers/messageController.js";
// const messageRouter=express.Router();

// messageRouter.get("/users",protectRoute,getUsersForSidebar)

// messageRouter.get("/id",protectRoute,getMessages)

// messageRouter.put("mark/id",protectRoute,markMessageAsSeen)

// messageRouter.post("/send/:id",protectRoute,sendMessage)

// export default messageRouter;




import express from "express";
import {
  getUsersForSidebar,
  getMessages,
  sendMessage,
  markMessageAsSeen,
} from "../controllers/messageController.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
router.put("/mark/:id", protectRoute, markMessageAsSeen);

export default router;
