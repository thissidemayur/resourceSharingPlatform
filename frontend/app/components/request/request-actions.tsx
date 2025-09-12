'use client';

import { useState } from 'react';
import { Check, X, MessageCircle, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface RequestActionsProps {
  requestId: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  type: 'made' | 'received';
  onApprove?: (requestId: string) => void;
  onReject?: (requestId: string) => void;
  onMessage?: (requestId: string) => void;
  onCancel?: (requestId: string) => void;
}

export function RequestActions({
  requestId,
  status,
  type,
  onApprove,
  onReject,
  onMessage,
  onCancel,
}: RequestActionsProps) {
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const handleReject = () => {
    onReject?.(requestId);
    setShowRejectDialog(false);
  };

  const handleCancel = () => {
    onCancel?.(requestId);
    setShowCancelDialog(false);
  };

  if (type === 'received' && status === 'pending') {
    return (
      <>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onMessage?.(requestId)}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Message
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowRejectDialog(true)}
            className="text-destructive hover:text-destructive"
          >
            <X className="mr-2 h-4 w-4" />
            Reject
          </Button>
          <Button size="sm" onClick={() => onApprove?.(requestId)}>
            <Check className="mr-2 h-4 w-4" />
            Approve
          </Button>
        </div>

        <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reject Request</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to reject this borrowing request? This
                action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleReject}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Reject Request
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }

  if (type === 'made') {
    return (
      <>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onMessage?.(requestId)}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Message Owner
          </Button>
          {status === 'pending' && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setShowCancelDialog(true)}
                  className="text-destructive"
                >
                  Cancel Request
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cancel Request</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to cancel this borrowing request? This
                action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep Request</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleCancel}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Cancel Request
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }

  // Default actions for other statuses
  return (
    <Button variant="outline" size="sm" onClick={() => onMessage?.(requestId)}>
      <MessageCircle className="mr-2 h-4 w-4" />
      Message
    </Button>
  );
}
