import { Calendar, Clock, MapPin, MessageCircle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { mockRequestsMade } from '@/lib/mockData';
import Link from 'next/link';
import { getStatusColor } from '@/lib/methods';

export const RequestMadeCard = ({
  request,
}: {
  request: (typeof mockRequestsMade)[0];
}) => {
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
                <p className="text-sm text-muted-foreground">
                  Owner: {request.resource.owner}
                </p>
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
                <strong>Your message:</strong> {request.message}
              </p>
              {request.ownerResponse && (
                <p className="text-sm mt-2">
                  <strong>Owner response:</strong> {request.ownerResponse}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/resources/${request.resource.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Resource
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleContactUser(request.resource.owner)}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Message Owner
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
