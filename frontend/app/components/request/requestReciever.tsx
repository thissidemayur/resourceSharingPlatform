import { Calendar, Clock, MapPin, MessageCircle, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { mockRequestsReceived } from '@/lib/mockData';
import { getStatusColor } from '@/lib/methods';

export const RequestReceivedCard = ({
  request,
}: {
  request: (typeof mockRequestsReceived)[0];
}) => {
  const handleApproveRequest = (requestId: string) => {
    // TODO: Implement approve request API call
    console.log('Approve request:', requestId);
  };

  const handleRejectRequest = (requestId: string) => {
    // TODO: Implement reject request API call
    console.log('Reject request:', requestId);
  };

  const handleContactUser = (userId: string) => {
    // TODO: Implement messaging logic
    console.log('Contact user:', userId);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="w-20 h-20 relative overflow-hidden rounded-lg shrink-0">
            <Image
              fill
              src={request.resource.image || '/placeholder.svg'}
              alt={request.resource.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-lg line-clamp-1">
                  {request.resource.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={request.requester.avatar || '/placeholder.svg'}
                    />
                    <AvatarFallback>
                      {request.requester.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">
                    {request.requester.name} • ★ {request.requester.rating}
                  </span>
                </div>
              </div>
              <Badge className={getStatusColor(request.status)}>
                {request.status.charAt(0).toUpperCase() +
                  request.status.slice(1)}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  Requested:{' '}
                  {new Date(request.requestDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Period: {request.requestedPeriod}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>
                  Pickup: {new Date(request.pickupDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>
                  Return: {new Date(request.returnDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="bg-muted/50 p-3 rounded-lg mb-3">
              <p className="text-sm">
                <strong>Requester`&apos;s message:</strong> {request.message}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleContactUser(request.requester.name)}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Message Requester
              </Button>
              {request.status === 'pending' && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRejectRequest(request.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleApproveRequest(request.id)}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
