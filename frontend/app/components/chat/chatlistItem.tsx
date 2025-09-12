import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { mockChats } from '@/lib/mockData';
import { useState } from 'react';

export const ChatListItem = ({ chat }: { chat: (typeof mockChats)[0] }) => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  return (
    <Link href={`/chat/${chat.user.id}`} className="block">
      <Card
        className={`hover:shadow-md transition-shadow cursor-pointer ${
          selectedChat === chat.id ? 'border-primary' : ''
        }`}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={chat.user.avatar || '/placeholder.svg'} />
                <AvatarFallback>
                  {chat.user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              {chat.user.online && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium truncate">{chat.user.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(chat.lastMessage.timestamp, {
                      addSuffix: true,
                    })}
                  </span>
                  {chat.unreadCount > 0 && (
                    <Badge className="h-5 w-5 rounded-full p-0 text-xs">
                      {chat.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">
                Re: {chat.resource}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {chat.lastMessage.sender === 'me' ? 'You: ' : ''}
                {chat.lastMessage.content}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
