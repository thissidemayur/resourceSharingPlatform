import Image from 'next/image';

import { MapPin, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
export type Resource = {
  id: string;
  title: string;
  description: string;
  image?: string;
  availability: 'Available' | 'Unavailable';
  owner: {
    id: string;
    email: string;
  };
  distance?: string;
  rating: number;
  category: string;
};

export const ResourceListItem = ({ resource }: { resource: Resource }) => (
  <Card className="group hover:shadow-md transition-shadow duration-200">
    <CardContent className="p-4">
      <div className="flex gap-4">
        {/* Thumbnail */}
        <div className="w-24 h-24 relative overflow-hidden rounded-lg shrink-0">
          <Image
            fill
            src={resource.image || '/placeholder.svg'}
            alt={resource.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-lg line-clamp-1">
                {resource.title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-2">
                {resource.description}
              </p>
            </div>
            <Badge
              className={`ml-2 shrink-0 ${
                resource.availability === 'Available'
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {resource.availability}
            </Badge>
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {resource.owner?.email}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {resource.distance}
            </span>
            <span>★ {resource.rating ?? 'N/A'}</span>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <Badge variant="outline">{resource.category}</Badge>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/resources/${resource.id}`}>View Details</Link>
              </Button>
              <Button
                size="sm"
                disabled={resource.availability !== 'Available'}
              >
                {resource.availability === 'Available'
                  ? 'Request'
                  : 'Unavailable'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);
