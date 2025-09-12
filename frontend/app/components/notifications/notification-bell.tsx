import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotificationBellProps {
  count?: number;
}

export function NotificationBell({ count }: NotificationBellProps) {
  return (
    <Button variant="ghost" size="icon" className="relative">
      <Bell className="h-5 w-5" />
      {count && count > 0 && (
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Button>
  );
}
