import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format, isToday, isYesterday } from 'date-fns';

interface ChatBubbleProps {
  message: {
    id: string;
    content: string;
    sender: string;
    timestamp: Date;
    read: boolean;
  };
  user?: {
    name: string;
    avatar?: string;
  };
  isMe: boolean;
}

const formatMessageTime = (timestamp: Date) => {
  if (isToday(timestamp)) {
    return format(timestamp, 'HH:mm');
  } else if (isYesterday(timestamp)) {
    return `Yesterday ${format(timestamp, 'HH:mm')}`;
  } else {
    return format(timestamp, 'MMM d, HH:mm');
  }
};

export function ChatBubble({ message, user, isMe }: ChatBubbleProps) {
  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`flex items-end gap-2 max-w-[70%] ${
          isMe ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        {!isMe && user && (
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar || '/placeholder.svg'} />
            <AvatarFallback>
              {user.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
        )}
        <div
          className={`rounded-lg px-4 py-2 ${
            isMe
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          <p
            className={`text-xs mt-1 ${
              isMe ? 'text-primary-foreground/70' : 'text-muted-foreground/70'
            }`}
          >
            {formatMessageTime(message.timestamp)}
          </p>
        </div>
      </div>
    </div>
  );
}
