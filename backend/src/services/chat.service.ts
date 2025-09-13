import { prisma } from "../utils/prismaClient.js";
import { ApiError } from "../utils/apiError.js";

const getUserChats = async (userId: string) => {
  const chats = await prisma.chat.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
    include: {
      users: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
      messages: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
      resource: true,
    },
  });

  return chats;
};

const getChatMessages = async (chatId: string, userId: string) => {
  const chat = await prisma.chat.findUnique({
    where: { id: chatId },
    include: {
      users: true,
    },
  });

  if (!chat) {
    throw new ApiError({ status: 404, message: "Chat not found" });
  }

  const hasAccess = chat.users.some((user) => user.id === userId);
  if (!hasAccess) {
    throw new ApiError({ status: 403, message: "Access denied" });
  }

  const messages = await prisma.message.findMany({
    where: { chatId },
    include: {
      sender: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return messages;
};

const sendMessage = async ({
  chatId,
  content,
  senderId,
}: {
  chatId: string;
  content: string;
  senderId: string;
}) => {
  const chat = await prisma.chat.findUnique({
    where: { id: chatId },
    include: { users: true },
  });

  if (!chat) {
    throw new ApiError({ status: 404, message: "Chat not found" });
  }

  const hasAccess = chat.users.some((user) => user.id === senderId);
  if (!hasAccess) {
    throw new ApiError({ status: 403, message: "Access denied" });
  }

  const message = await prisma.message.create({
    data: {
      content,
      senderId,
      chatId,
    },
    include: {
      sender: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });

  return message;
};

export default {
  getUserChats,
  getChatMessages,
  sendMessage,
};
