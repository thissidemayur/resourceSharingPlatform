import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import chatService from "../services/chat.service.js";

export const getUserChats = asyncHandler(async (req, res) => {
  const userId = req.authUser?.id!;
  const chats = await chatService.getUserChats(userId);

  return res.status(200).json(
    new ApiResponse({
      status: 200,
      data: chats,
      message: "Chats fetched successfully",
    })
  );
});

export const getChatMessages = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const userId = req.authUser?.id!;
  const messages = await chatService.getChatMessages(chatId, userId);

  return res.status(200).json(
    new ApiResponse({
      status: 200,
      data: messages,
      message: "Messages fetched successfully",
    })
  );
});

export const sendMessage = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const { content } = req.body;
  const userId = req.authUser?.id!;

  const message = await chatService.sendMessage({
    chatId,
    content,
    senderId: userId,
  });

  return res.status(201).json(
    new ApiResponse({
      status: 201,
      data: message,
      message: "Message sent successfully",
    })
  );
});
