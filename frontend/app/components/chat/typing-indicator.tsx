import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TypingIndicatorProps {
  user: {
    name: string;
    avatar?: string;
  };
}

export function TypingIndicator({ user }: TypingIndicatorProps) {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-end gap-2 max-w-[70%]">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.avatar || '/placeholder.svg'} />
          <AvatarFallback>
            {user.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <div className="bg-muted rounded-lg px-4 py-3">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
            <div
              className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
              style={{ animationDelay: '0.1s' }}
            />
            <div
              className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
              style={{ animationDelay: '0.2s' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
