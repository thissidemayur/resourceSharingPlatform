import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  getUserChats,
  getChatMessages,
  sendMessage,
} from "../controllers/chat.controller.js";

const chatRouter = Router();

chatRouter.use(authenticate);
chatRouter.get("/", getUserChats);
chatRouter.get("/:chatId/messages", getChatMessages);
chatRouter.post("/:chatId/messages", sendMessage);

export { chatRouter };
