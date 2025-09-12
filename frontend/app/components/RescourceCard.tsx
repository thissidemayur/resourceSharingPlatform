import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const avilabity = 'Available';

export default function RescourceCard() {
  return (
    <Card className="py-0 pb-3">
      {/* card content */}
      <CardContent className="px-0">
        <AspectRatio ratio={16 / 9}>
          <Image
            fill
            src={'/photo1.jpeg'}
            alt="Image"
            className="rounded-md object-cover"
          />
        </AspectRatio>
        <div className="px-6 pt-4">
          <h1 className="text-lg font-medium">
            {' '}
            The Subtle Art of Not Giving Fuck
          </h1>
          <div className="flex items-center justify-between  ">
            <p className="text-foreground-muted text-sm py-1.5">Category</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start gap-x-2">
              <Avatar className="">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>Mayur Pal</p>
            </div>
            <Badge
              className={cn(
                avilabity === 'Available'
                  ? 'bg-green-500 text-white'
                  : avilabity === 'Not Available'
                  ? 'bg-red-500 text-white'
                  : avilabity === 'onLoan'
                  ? 'bg-orange-500 text-white'
                  : '',
                'text-center text-sm',
              )}
            >
              {avilabity}
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Link href={`resources/borrow/id`}>
          <Button>Request Borrow</Button>
        </Link>
        <Link href={`resources/id`}>
          <Button variant={'outline'}>View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
