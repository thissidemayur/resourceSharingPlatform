'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

// Mock function to simulate real-time notifications
export function useNotificationListener() {
  useEffect(() => {
    // Simulate receiving notifications
    const interval = setInterval(() => {
      // This would be replaced with actual WebSocket or Server-Sent Events
      const notifications = [
        {
          title: 'New Request',
          description: 'Someone wants to borrow your power drill',
        },
        {
          title: 'Request Approved',
          description: 'Your request for the camping tent was approved',
        },
        {
          title: 'New Message',
          description: 'You have a new message from John Smith',
        },
      ];

      // Randomly show a notification (in real app, this would be triggered by actual events)
      if (Math.random() > 0.95) {
        const randomNotification =
          notifications[Math.floor(Math.random() * notifications.length)];
        toast.success(randomNotification.title, {
          description: randomNotification.description,
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);
}
