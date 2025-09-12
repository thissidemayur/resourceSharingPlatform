import { Badge } from '@/components/ui/badge';

interface RequestStatusBadgeProps {
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  className?: string;
}

export function RequestStatusBadge({
  status,
  className,
}: RequestStatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Pending',
          className:
            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        };
      case 'approved':
        return {
          label: 'Approved',
          className:
            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        };
      case 'rejected':
        return {
          label: 'Rejected',
          className:
            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        };
      case 'completed':
        return {
          label: 'Completed',
          className:
            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        };
      default:
        return {
          label: 'Unknown',
          className:
            'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge className={`${config.className} ${className}`}>{config.label}</Badge>
  );
}
