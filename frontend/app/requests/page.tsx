'use client';

import { useState } from 'react';
import { Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import Link from 'next/link';
import { MainLayout } from '@/app/components/layout/main-layout';
import { mockRequestsMade, mockRequestsReceived } from '@/lib/mockData';
import { RequestMadeCard } from '@/app/components/request/requestMadeCard';
import { RequestReceivedCard } from '@/app/components/request/requestReciever';

export default function RequestsPage() {
  const [activeTab, setActiveTab] = useState('made');

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">My Requests</h1>
          <p className="text-muted-foreground">
            Manage your borrowing requests and incoming requests for your
            resources
          </p>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="made">Requests Made</TabsTrigger>
            <TabsTrigger value="received">Requests Received</TabsTrigger>
          </TabsList>

          {/* Requests Made Tab */}
          <TabsContent value="made" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Requests You`&apos;ve Made
              </h2>
              <p className="text-sm text-muted-foreground">
                {mockRequestsMade.length} total requests
              </p>
            </div>

            {mockRequestsMade.length > 0 ? (
              <div className="space-y-4">
                {mockRequestsMade.map((request) => (
                  <RequestMadeCard key={request.id} request={request} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                      <Calendar className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">No requests made yet</h3>
                      <p className="text-muted-foreground">
                        Start browsing resources to make your first request
                      </p>
                    </div>
                    <Button asChild>
                      <Link href="/resources">Browse Resources</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Requests Received Tab */}
          <TabsContent value="received" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Requests for Your Resources
              </h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>
                  {
                    mockRequestsReceived.filter((r) => r.status === 'pending')
                      .length
                  }{' '}
                  pending
                </span>
                <span>{mockRequestsReceived.length} total requests</span>
              </div>
            </div>

            {mockRequestsReceived.length > 0 ? (
              <div className="space-y-4">
                {mockRequestsReceived.map((request) => (
                  <RequestReceivedCard key={request.id} request={request} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                      <User className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        No requests received yet
                      </h3>
                      <p className="text-muted-foreground">
                        Share some resources to start receiving requests
                      </p>
                    </div>
                    <Button asChild>
                      <Link href="/resources/create">Share a Resource</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
