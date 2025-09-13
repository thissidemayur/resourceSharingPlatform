'use client';

import { useState } from 'react';
import { MessageCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import Link from 'next/link';
import { MainLayout } from '@/app/components/layout/main-layout';
import { mockChats } from '@/lib/mockData';
import { ChatListItem } from '@/app/components/chat/chatlistItem';

// Mock chat data

export default function ChatPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = mockChats.filter(
    (chat) =>
      chat.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.resource.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalUnread = mockChats.reduce(
    (sum, chat) => sum + chat.unreadCount,
    0,
  );

  return (
    <MainLayout>
      <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        {/* Chat List Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <MessageCircle className="h-6 w-6" />
              Messages
            </h1>
            {totalUnread > 0 && (
              <Badge className="bg-primary text-primary-foreground">
                {totalUnread} unread
              </Badge>
            )}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Chat List */}
          <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-20rem)]">
            {filteredChats.length > 0 ? (
              filteredChats.map((chat) => (
                <ChatListItem key={chat.id} chat={chat} />
              ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-medium mb-2">No conversations found</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    {searchQuery
                      ? 'Try a different search term'
                      : 'Start a conversation by requesting a resource'}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Chat Placeholder */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardContent className="flex flex-col items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <MessageCircle className="h-10 w-10 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-muted-foreground">
                    Choose a conversation from the sidebar to start messaging
                  </p>
                </div>
                <Button asChild>
                  <Link href="/resources">
                    Browse Resources to Start Chatting
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
