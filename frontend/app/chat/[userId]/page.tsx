'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Send,
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { MainLayout } from '@/app/components/layout/main-layout';
import { mockMessages, mockUser } from '@/lib/mockData';
import { MessageBubble } from '@/app/components/chat/MessageBubble';

// Mock user and messages data

export default function ChatDetailPage() {
  const params = useParams();
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        content: newMessage.trim(),
        sender: 'me',
        timestamp: new Date(),
        read: true,
      };
      setMessages([...messages, message]);
      setNewMessage('');

      // Simulate typing indicator and response
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const response = {
          id: (Date.now() + 1).toString(),
          content: "Thanks for the message! I'll get back to you soon.",
          sender: 'john-smith',
          timestamp: new Date(),
          read: false,
        };
        setMessages((prev) => [...prev, response]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <MainLayout>
      <div className="h-[calc(100vh-12rem)] flex flex-col">
        {/* Chat Header */}
        <Card className="rounded-b-none border-b-0">
          <CardHeader className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="md:hidden"
                >
                  <Link href="/chat">
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </Button>
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={mockUser.avatar || '/placeholder.svg'} />
                    <AvatarFallback>
                      {mockUser.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  {mockUser.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                  )}
                </div>
                <div>
                  <h2 className="font-semibold">{mockUser.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {mockUser.online
                      ? 'Online'
                      : `Last seen ${formatDistanceToNow(mockUser.lastSeen, {
                          addSuffix: true,
                        })}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Messages Area */}
        <Card className="flex-1 rounded-none border-x-0">
          <CardContent className="p-0 h-full">
            <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
              <div className="space-y-1">
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
                {isTyping && (
                  <div className="flex justify-start mb-4">
                    <div className="flex items-end gap-2 max-w-[70%]">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={mockUser.avatar || '/placeholder.svg'}
                        />
                        <AvatarFallback>
                          {mockUser.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted rounded-lg px-4 py-2">
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
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Message Input */}
        <Card className="rounded-t-none border-t-0">
          <CardContent className="p-4">
            <div className="flex items-end gap-2">
              <Button variant="ghost" size="icon" className="shrink-0">
                <Paperclip className="h-4 w-4" />
              </Button>
              <div className="flex-1">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="resize-none"
                />
              </div>
              <Button variant="ghost" size="icon" className="shrink-0">
                <Smile className="h-4 w-4" />
              </Button>
              <Button
                onClick={sendMessage}
                size="icon"
                disabled={!newMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
