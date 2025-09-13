import Link from 'next/link';
import { ArrowRight, Users, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MainLayout } from '@/app/components/layout/main-layout';

export default function HomePage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
          Share Resources with Your{' '}
          <span className="text-primary">Community</span>
        </h1>
        <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
          Connect with neighbors to borrow and lend tools, books, equipment, and
          more. Build stronger communities through sharing.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/resources">
              Browse Resources <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="text-lg px-8 bg-transparent"
          >
            <Link href="/resources/create">Share Something</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose ShareHub?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Community Focused</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Connect with verified neighbors in your area. Build trust and
                strengthen community bonds through sharing.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Safe & Secure</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                User verification, secure messaging, and community ratings
                ensure safe and reliable resource sharing.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Easy to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Simple interface to browse, request, and manage resources. Get
                what you need in just a few clicks.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center bg-muted/50 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Sharing?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of community members who are already sharing resources
          and building connections.
        </p>
        <Button asChild size="lg" className="text-lg px-8">
          <Link href="/auth/register">
            Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </section>
    </MainLayout>
  );
}
