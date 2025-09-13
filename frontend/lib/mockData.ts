import { Calendar, Check, MessageCircle, Package, User2 } from 'lucide-react';

export const mockResource = {
  id: '1',
  title: 'Power Drill Set',
  description:
    'Professional cordless drill with various bits and accessories. Perfect for home improvement projects, furniture assembly, and general repairs. Includes multiple drill bits, screwdriver attachments, and a carrying case.',
  category: 'Tools',
  owner: {
    name: 'John Smith',
    avatar: '/diverse-user-avatars.png',
    rating: 4.8,
    totalShares: 23,
    joinedDate: 'March 2023',
    verified: true,
  },
  location: 'Downtown',
  availability: 'Available',
  images: [
    '/power-drill-set-main.jpg',
    '/power-drill-accessories.jpg',
    '/power-drill-case.jpg',
  ],
  distance: '0.5 miles',
  rating: 4.8,
  reviews: [
    {
      id: '1',
      user: 'Sarah M.',
      rating: 5,
      comment:
        'Great drill set! John was very helpful and the equipment was in perfect condition.',
      date: '2 weeks ago',
    },
    {
      id: '2',
      user: 'Mike R.',
      rating: 4,
      comment:
        'Worked perfectly for my project. Easy pickup and return process.',
      date: '1 month ago',
    },
  ],
  specifications: [
    '18V Cordless Drill',
    'Multiple speed settings',
    'LED work light',
    '20+ drill bits included',
    'Carrying case',
  ],
  borrowingTerms: [
    'Maximum 3 days borrowing period',
    'Must return in same condition',
    'ID verification required',
    'Local pickup only',
  ],
};

//
export const mockUser = {
  id: 'john-smith',
  name: 'John Smith',
  avatar: '/diverse-user-avatars.png',
  online: true,
  lastSeen: new Date(Date.now() - 1000 * 60 * 5),
};

export const mockMessages = [
  {
    id: '1',
    content:
      "Hi! I'm interested in borrowing your power drill set. Is it still available?",
    sender: 'me',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    read: true,
  },
  {
    id: '2',
    content: "Yes, it's available! When do you need it?",
    sender: 'john-smith',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 15),
    read: true,
  },
  {
    id: '3',
    content:
      "I need it for this weekend. I'm planning to build some shelves in my garage.",
    sender: 'me',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 30),
    read: true,
  },
  {
    id: '4',
    content:
      'Perfect! The drill comes with various bits and a carrying case. I can meet you tomorrow if that works?',
    sender: 'john-smith',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 + 1000 * 60 * 10),
    read: true,
  },
  {
    id: '5',
    content: 'That sounds great! What time works best for you?',
    sender: 'me',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 + 1000 * 60 * 25),
    read: true,
  },
  {
    id: '6',
    content:
      "How about 10 AM? I'll be at the downtown coffee shop on Main Street.",
    sender: 'john-smith',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: true,
  },
  {
    id: '7',
    content: 'Perfect! See you there at 10 AM. Thanks so much!',
    sender: 'me',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 + 1000 * 60 * 5),
    read: true,
  },
  {
    id: '8',
    content:
      "Sure, you can pick up the drill tomorrow morning. I'll be home after 9 AM.",
    sender: 'john-smith',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    read: false,
  },
];

export const mockChats = [
  {
    id: '1',
    user: {
      id: 'john-smith',
      name: 'John Smith',
      avatar: '/diverse-user-avatars.png',
      online: true,
    },
    lastMessage: {
      content:
        "Sure, you can pick up the drill tomorrow morning. I'll be home after 9 AM.",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      sender: 'john-smith',
    },
    unreadCount: 2,
    resource: 'Power Drill Set',
  },
  {
    id: '2',
    user: {
      id: 'sarah-johnson',
      name: 'Sarah Johnson',
      avatar: '/diverse-user-avatars.png',
      online: false,
    },
    lastMessage: {
      content:
        "Thanks for letting me borrow the book! I'll return it next week.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      sender: 'me',
    },
    unreadCount: 0,
    resource: 'JavaScript: The Good Parts',
  },
  {
    id: '3',
    user: {
      id: 'alex-chen',
      name: 'Alex Chen',
      avatar: '/diverse-user-avatars.png',
      online: true,
    },
    lastMessage: {
      content:
        "Hi! I'm interested in borrowing your guitar. Is it still available?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      sender: 'alex-chen',
    },
    unreadCount: 1,
    resource: 'Guitar (Acoustic)',
  },
  {
    id: '4',
    user: {
      id: 'emily-davis',
      name: 'Emily Davis',
      avatar: '/diverse-user-avatars.png',
      online: false,
    },
    lastMessage: {
      content: 'The mixer worked perfectly for the cake! Thanks again.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      sender: 'emily-davis',
    },
    unreadCount: 0,
    resource: 'Stand Mixer',
  },
];

export // Mock data for requests
const mockRequestsMade = [
  {
    id: '1',
    resource: {
      id: '1',
      title: 'Power Drill Set',
      image: '/power-drill-set.jpg',
      owner: 'John Smith',
    },
    status: 'pending',
    requestDate: '2024-01-15',
    requestedPeriod: '3 days',
    pickupDate: '2024-01-18',
    returnDate: '2024-01-21',
    message:
      "Hi! I need this for a weekend project. I'll take good care of it.",
    ownerResponse: null,
  },
  {
    id: '2',
    resource: {
      id: '2',
      title: 'JavaScript: The Good Parts',
      image: '/javascript-programming-book.png',
      owner: 'Sarah Johnson',
    },
    status: 'approved',
    requestDate: '2024-01-10',
    requestedPeriod: '2 weeks',
    pickupDate: '2024-01-12',
    returnDate: '2024-01-26',
    message: 'Would love to read this book for my studies.',
    ownerResponse: 'Let me know when you want to pick it up.',
  },
  {
    id: '3',
    resource: {
      id: '3',
      title: 'Camping Tent (4-person)',
      image: '/camping-tent-outdoor.jpg',
      owner: 'Mike Wilson',
    },
    status: 'rejected',
    requestDate: '2024-01-08',
    requestedPeriod: '1 week',
    pickupDate: '2024-01-15',
    returnDate: '2024-01-22',
    message: 'Planning a family camping trip next weekend.',
    ownerResponse: 'Sorry, I already have it booked for that weekend.',
  },
  {
    id: '4',
    resource: {
      id: '4',
      title: 'Stand Mixer',
      image: '/kitchen-stand-mixer.jpg',
      owner: 'Emily Davis',
    },
    status: 'completed',
    requestDate: '2024-01-01',
    requestedPeriod: '2 days',
    pickupDate: '2024-01-03',
    returnDate: '2024-01-05',
    message: 'Need this for baking a birthday cake!',
    ownerResponse: 'Perfect! Happy to help with the celebration.',
  },
];

export const mockRequestsReceived = [
  {
    id: '5',
    resource: {
      id: '5',
      title: 'Guitar (Acoustic)',
      image: '/acoustic-guitar-musical-instrument.jpg',
      owner: 'You',
    },
    requester: {
      name: 'Alex Chen',
      avatar: '/diverse-user-avatars.png',
      rating: 4.8,
    },
    status: 'pending',
    requestDate: '2024-01-16',
    requestedPeriod: '1 week',
    pickupDate: '2024-01-20',
    returnDate: '2024-01-27',
    message:
      "Hi! I'm learning guitar and would love to practice on a real instrument. I'll be very careful with it.",
  },
  {
    id: '6',
    resource: {
      id: '6',
      title: 'Projector',
      image: '/hd-projector-electronics.jpg',
      owner: 'You',
    },
    requester: {
      name: 'Lisa Park',
      avatar: '/diverse-user-avatars.png',
      rating: 4.9,
    },
    status: 'pending',
    requestDate: '2024-01-14',
    requestedPeriod: '2 days',
    pickupDate: '2024-01-19',
    returnDate: '2024-01-21',
    message:
      'Need this for a work presentation. Can pick up and return at your convenience.',
  },
  {
    id: '7',
    resource: {
      id: '7',
      title: 'Bicycle Repair Kit',
      image: '/placeholder.svg?key=bike-repair',
      owner: 'You',
    },
    requester: {
      name: 'Tom Rodriguez',
      avatar: '/diverse-user-avatars.png',
      rating: 4.7,
    },
    status: 'approved',
    requestDate: '2024-01-12',
    requestedPeriod: '1 day',
    pickupDate: '2024-01-15',
    returnDate: '2024-01-16',
    message:
      'My bike chain broke and I need to fix it urgently for work commute.',
  },
];

export // Mock data for resources
const mockResources = [
  {
    id: '1',
    title: 'Power Drill Set',
    description:
      'Professional cordless drill with various bits and accessories',
    category: 'Tools',
    owner: 'John Smith',
    location: 'Downtown',
    availability: 'Available',
    image: '/power-drill-set.jpg',
    distance: '0.5 miles',
    rating: 4.8,
    lastUsed: '2 days ago',
  },
  {
    id: '2',
    title: 'JavaScript: The Good Parts',
    description: 'Classic programming book by Douglas Crockford',
    category: 'Books',
    owner: 'Sarah Johnson',
    location: 'Midtown',
    availability: 'Available',
    image: '/javascript-programming-book.png',
    distance: '1.2 miles',
    rating: 4.9,
    lastUsed: '1 week ago',
  },
  {
    id: '3',
    title: 'Camping Tent (4-person)',
    description: 'Waterproof family tent perfect for weekend camping trips',
    category: 'Outdoor',
    owner: 'Mike Wilson',
    location: 'Suburbs',
    availability: 'Borrowed',
    image: '/camping-tent-outdoor.jpg',
    distance: '2.1 miles',
    rating: 4.7,
    lastUsed: '3 days ago',
  },
  {
    id: '4',
    title: 'Stand Mixer',
    description: 'KitchenAid stand mixer with multiple attachments',
    category: 'Kitchen',
    owner: 'Emily Davis',
    location: 'Downtown',
    availability: 'Available',
    image: '/kitchen-stand-mixer.jpg',
    distance: '0.8 miles',
    rating: 4.6,
    lastUsed: '5 days ago',
  },
  {
    id: '5',
    title: 'Guitar (Acoustic)',
    description: 'Yamaha acoustic guitar in excellent condition',
    category: 'Music',
    owner: 'Alex Chen',
    location: 'University Area',
    availability: 'Available',
    image: '/acoustic-guitar-musical-instrument.jpg',
    distance: '1.5 miles',
    rating: 4.9,
    lastUsed: '1 day ago',
  },
  {
    id: '6',
    title: 'Projector',
    description: 'HD projector perfect for movie nights and presentations',
    category: 'Electronics',
    owner: 'David Brown',
    location: 'Midtown',
    availability: 'Available',
    image: '/hd-projector-electronics.jpg',
    distance: '1.8 miles',
    rating: 4.5,
    lastUsed: '1 week ago',
  },
];

export const mockRecentNotifications = [
  {
    id: '1',
    title: 'New borrowing request',
    message: 'Alex Chen wants to borrow your Guitar',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    actionUrl: '/requests',
  },
  {
    id: '2',
    title: 'Request approved',
    message: 'John Smith approved your request',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: false,
    actionUrl: '/requests',
  },
  {
    id: '3',
    title: 'New message',
    message: 'Sarah Johnson sent you a message',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    read: true,
    actionUrl: '/chat/sarah-johnson',
  },
];

export const mockNotifications = [
  {
    id: '1',
    type: 'request_received',
    title: 'New borrowing request',
    message: 'Alex Chen wants to borrow your Guitar (Acoustic) for 1 week',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    actionUrl: '/requests',
    icon: Package,
    user: {
      name: 'Alex Chen',
      avatar: '/diverse-user-avatars.png',
    },
  },
  {
    id: '2',
    type: 'request_approved',
    title: 'Request approved',
    message: 'John Smith approved your request for Power Drill Set',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    actionUrl: '/requests',
    icon: Check,
    user: {
      name: 'John Smith',
      avatar: '/diverse-user-avatars.png',
    },
  },
  {
    id: '3',
    type: 'message',
    title: 'New message',
    message:
      'Sarah Johnson sent you a message about JavaScript: The Good Parts',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    read: true,
    actionUrl: '/chat/sarah-johnson',
    icon: MessageCircle,
    user: {
      name: 'Sarah Johnson',
      avatar: '/diverse-user-avatars.png',
    },
  },
  {
    id: '4',
    type: 'reminder',
    title: 'Return reminder',
    message: "Don't forget to return Stand Mixer to Emily Davis tomorrow",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    read: true,
    actionUrl: '/requests',
    icon: Calendar,
    user: {
      name: 'Emily Davis',
      avatar: '/diverse-user-avatars.png',
    },
  },
  {
    id: '5',
    type: 'request_rejected',
    title: 'Request declined',
    message: 'Mike Wilson declined your request for Camping Tent (4-person)',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    actionUrl: '/requests',
    icon: User2,
    user: {
      name: 'Mike Wilson',
      avatar: '/diverse-user-avatars.png',
    },
  },
  {
    id: '6',
    type: 'resource_shared',
    title: 'Resource shared successfully',
    message: 'Your Projector is now available for the community to borrow',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    read: true,
    actionUrl: '/resources/6',
    icon: Package,
  },
];
