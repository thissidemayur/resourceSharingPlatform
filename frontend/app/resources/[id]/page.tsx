'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  Star,
  MessageCircle,
  Calendar,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

import Link from 'next/link';
import { MainLayout } from '@/app/components/layout/main-layout';
import Image from 'next/image';
import { mockResource } from '@/lib/mockData';

// Mock data for individual resource

export default function ResourceDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showRequestModal, setShowRequestModal] = useState(false);

  const handleRequestBorrow = () => {
    setShowRequestModal(true);
    // TODO: Implement request borrowing logic
    console.log('Request to borrow resource');
  };

  const handleContactOwner = () => {
    // TODO: Implement messaging logic
    console.log('Contact owner');
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/resources">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Resources
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <Image
                    fill
                    src={
                      mockResource.images[selectedImage] || '/placeholder.svg'
                    }
                    alt={mockResource.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge
                    className={`absolute top-4 right-4 ${
                      mockResource.availability === 'Available'
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {mockResource.availability}
                  </Badge>
                </div>
                {mockResource.images.length > 1 && (
                  <div className="flex gap-2 p-4">
                    {mockResource.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImage === index
                            ? 'border-primary'
                            : 'border-border'
                        }`}
                      >
                        <Image
                          fill
                          src={image || '/placeholder.svg'}
                          alt={`View ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Resource Details */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">
                      {mockResource.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <Badge variant="outline">{mockResource.category}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-current text-yellow-500" />
                        <span>{mockResource.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{mockResource.distance}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {mockResource.description}
                </p>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-2">What&lsquo;s Included</h3>
                  <ul className="space-y-1">
                    {mockResource.specifications.map((spec, index) => (
                      <li
                        key={index}
                        className="text-sm text-muted-foreground flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-2">Borrowing Terms</h3>
                  <ul className="space-y-1">
                    {mockResource.borrowingTerms.map((term, index) => (
                      <li
                        key={index}
                        className="text-sm text-muted-foreground flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                        {term}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Reviews ({mockResource.reviews.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockResource.reviews.map((review) => (
                  <div key={review.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{review.user}</span>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < review.rating
                                  ? 'fill-current text-yellow-500'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {review.date}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {review.comment}
                    </p>
                    {review.id !==
                      mockResource.reviews[mockResource.reviews.length - 1]
                        .id && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Owner Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resource Owner</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={mockResource.owner.avatar || '/placeholder.svg'}
                    />
                    <AvatarFallback>
                      {mockResource.owner.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {mockResource.owner.name}
                      </span>
                      {mockResource.owner.verified && (
                        <Shield className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-3 w-3 fill-current text-yellow-500" />
                      <span>
                        {mockResource.owner.rating} •{' '}
                        {mockResource.owner.totalShares} shares
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {mockResource.owner.joinedDate}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="h-4 w-4" />
                    <span>{mockResource.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <Button
                  onClick={handleRequestBorrow}
                  className="w-full"
                  size="lg"
                  disabled={mockResource.availability !== 'Available'}
                >
                  {mockResource.availability === 'Available'
                    ? 'Request to Borrow'
                    : 'Currently Unavailable'}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleContactOwner}
                  className="w-full bg-transparent"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message Owner
                </Button>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <Badge variant="outline">{mockResource.category}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Distance</span>
                  <span>{mockResource.distance}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current text-yellow-500" />
                    <span>{mockResource.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge
                    className={
                      mockResource.availability === 'Available'
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-muted text-muted-foreground'
                    }
                  >
                    {mockResource.availability}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
