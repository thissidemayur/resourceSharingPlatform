import { mockResources } from '@/lib/mockData';

import { MapPin, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';

export const ResourceCard = ({
  resource,
}: {
  resource: (typeof mockResources)[0];
}) => (
  <Card className="group hover:shadow-lg transition-shadow duration-200">
    <div className="aspect-video relative overflow-hidden rounded-t-lg">
      <Image
        fill
        src={resource.image || '/placeholder.svg'}
        alt={resource.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
      />
      <Badge
        className={`absolute top-2 right-2 ${
          resource.availability === 'Available'
            ? 'bg-accent text-accent-foreground'
            : 'bg-muted text-muted-foreground'
        }`}
      >
        {resource.availability}
      </Badge>
    </div>
    <CardHeader className="pb-2">
      <div className="flex items-start justify-between">
        <CardTitle className="text-lg line-clamp-1">{resource.title}</CardTitle>
        <Badge variant="outline" className="ml-2 shrink-0">
          {resource.category}
        </Badge>
      </div>
      <CardDescription className="line-clamp-2">
        {resource.description}
      </CardDescription>
    </CardHeader>
    <CardContent className="pt-0">
      <div className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>{resource.owner}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>
            {resource.location} • {resource.distance}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>Last used {resource.lastUsed}</span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium">★ {resource.rating}</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/resources/${resource.id}`}>View Details</Link>
          </Button>
          <Button size="sm" disabled={resource.availability !== 'Available'}>
            {resource.availability === 'Available' ? 'Request' : 'Unavailable'}
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);
