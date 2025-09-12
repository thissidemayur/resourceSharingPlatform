'use client';

import { useState } from 'react';
import { Bell, Check, Trash2, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { MainLayout } from '@/app/components/layout/main-layout';
import { mockNotifications } from '@/lib/mockData';
import { NotificationCard } from '@/app/components/notifications/notificationCard';

// Mock notification data

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState('all');

  const unreadCount = notifications.filter((n) => !n.read).length;
  const filteredNotifications = notifications.filter((notification) => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true })),
    );
  };

  const deleteAllRead = () => {
    setNotifications((prev) =>
      prev.filter((notification) => !notification.read),
    );
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Bell className="h-8 w-8" />
              Notifications
            </h1>
            <p className="text-muted-foreground">
              Stay updated with your community interactions
              {unreadCount > 0 && (
                <Badge className="ml-2 bg-primary text-primary-foreground">
                  {unreadCount} unread
                </Badge>
              )}
            </p>
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead}>
                <Check className="mr-2 h-4 w-4" />
                Mark All Read
              </Button>
            )}
            <Button variant="outline" onClick={deleteAllRead}>
              <Trash2 className="mr-2 h-4 w-4" />
              Clear Read
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter:</span>
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Notifications</SelectItem>
              <SelectItem value="unread">Unread Only</SelectItem>
              <SelectItem value="request_received">
                Requests Received
              </SelectItem>
              <SelectItem value="request_approved">
                Requests Approved
              </SelectItem>
              <SelectItem value="message">Messages</SelectItem>
              <SelectItem value="reminder">Reminders</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
              />
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                    <Bell className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">No notifications found</h3>
                    <p className="text-muted-foreground">
                      {filter === 'unread'
                        ? "You're all caught up! No unread notifications."
                        : "You don't have any notifications matching this filter."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Stats */}
        {notifications.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Notification Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {notifications.length}
                  </div>
                  <div className="text-muted-foreground">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {unreadCount}
                  </div>
                  <div className="text-muted-foreground">Unread</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {
                      notifications.filter((n) => n.type === 'request_approved')
                        .length
                    }
                  </div>
                  <div className="text-muted-foreground">Approved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {notifications.filter((n) => n.type === 'message').length}
                  </div>
                  <div className="text-muted-foreground">Messages</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
