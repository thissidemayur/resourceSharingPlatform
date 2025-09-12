interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface Chat {
  id: string;
  participants: string[];
  user: User; // other participant
  resource: string;
  unreadCount: number;
  messages: ChatMessage[];
  lastUpdated: string;
}

interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
  },
];

export const mockPosts = [
  {
    id: "1",
    title: "Introduction to React",
    content: "Learn the basics of React development",
    authorId: "1",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Advanced TypeScript Patterns",
    content: "Explore advanced TypeScript features",
    authorId: "2",
    createdAt: "2024-01-16T15:30:00Z",
  },
];

export const mockNotifications = [
  {
    id: "1",
    userId: "1",
    type: "like",
    message: "Someone liked your post",
    read: false,
    createdAt: "2024-01-17T08:00:00Z",
  },
  {
    id: "2",
    userId: "1",
    type: "comment",
    message: "New comment on your post",
    read: true,
    createdAt: "2024-01-17T09:15:00Z",
  },
];

export const mockChats = [
  {
    id: "1",
    participants: ["1", "2"],
    user: getUserById("2"), // other participant
    resource: "Introduction to React",
    unreadCount: 1,
    messages: [
      {
        id: "1",
        senderId: "1",
        content: "Hey, how are you?",
        timestamp: "2024-01-17T10:00:00Z",
      },
      {
        id: "2",
        senderId: "2",
        content: "I'm doing great, thanks!",
        timestamp: "2024-01-17T10:01:00Z",
      },
    ],
    lastUpdated: "2024-01-17T10:01:00Z",
  },
  {
    id: "2",
    participants: ["1", "3"],
    user: getUserById("3"), // other participant
    resource: "Advanced TypeScript Patterns",
    unreadCount: 2,
    messages: [
      {
        id: "3",
        senderId: "1",
        content: "Did you check the new resource I shared?",
        timestamp: "2024-01-17T11:00:00Z",
      },
    ],
    lastUpdated: "2024-01-17T11:00:00Z",
  },
];

export const getUserById = (userId: string | undefined): User => {
  if (!userId) {
    return {
      id: "unknown",
      name: "Unknown User",
      email: "",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Unknown",
    };
  }
  return (
    mockUsers.find((user) => user.id === userId) || {
      id: userId,
      name: "Unknown User",
      email: "",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Unknown",
    }
  );
};

export const getUserName = (userId: string | undefined): string => {
  return getUserById(userId).name;
};

export const getChatParticipants = (chat: Chat): User[] => {
  return chat.participants.map(getUserById);
};
