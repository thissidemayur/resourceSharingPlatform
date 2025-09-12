'use client';
import { mockNotifications } from '@/lib/mockData';

import { useState } from 'react';
import { Check, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';

const getNotificationTypeColor = (type: string) => {
  switch (type) {
    case 'request_received':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'request_approved':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'request_rejected':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'message':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    case 'reminder':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'resource_shared':
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  }
};

export const NotificationCard = ({
  notification,
}: {
  notification: (typeof mockNotifications)[0];
}) => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const IconComponent = notification.icon;
  const deleteNotification = (notificationId: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== notificationId),
    );
  };
  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification,
      ),
    );
  };
  return (
    <Card
      className={`transition-all hover:shadow-md ${
        !notification.read ? 'border-primary/50 bg-primary/5' : ''
      }`}
    >
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="shrink-0">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${getNotificationTypeColor(
                notification.type,
              )}`}
            >
              <IconComponent className="h-5 w-5" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1">
              <h3
                className={`font-medium ${
                  !notification.read ? 'font-semibold' : ''
                }`}
              >
                {notification.title}
              </h3>
              {!notification.read && (
                <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {notification.message}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(notification.timestamp, {
                  addSuffix: true,
                })}
              </span>
              <div className="flex gap-2">
                {!notification.read && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markAsRead(notification.id)}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteNotification(notification.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
