'use client';

import type React from 'react';

import { useState } from 'react';
import { ArrowLeft, Upload, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { MainLayout } from '@/app/components/layout/main-layout';
import Image from 'next/image';

const createResourceSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Please select a category'),
  condition: z.string().min(1, 'Please select condition'),
  borrowingPeriod: z.string().min(1, 'Please select borrowing period'),
  pickupLocation: z.string().min(5, 'Please provide pickup location'),
  specialInstructions: z.string().optional(),
  requiresDeposit: z.boolean().optional(),
  depositAmount: z.string().optional(),
  availableFrom: z.string().min(1, 'Please select availability date'),
  availableTo: z.string().optional(),
});

type CreateResourceForm = z.infer<typeof createResourceSchema>;

const categories = [
  'Tools',
  'Books',
  'Outdoor',
  'Kitchen',
  'Music',
  'Electronics',
  'Sports',
  'Garden',
  'Automotive',
  'Other',
];

const conditions = ['Like New', 'Good', 'Fair', 'Needs Repair'];
const borrowingPeriods = [
  '1 day',
  '3 days',
  '1 week',
  '2 weeks',
  '1 month',
  'Flexible',
];

export default function CreateResourcePage() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [specifications, setSpecifications] = useState<string[]>([]);
  const [newSpecification, setNewSpecification] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateResourceForm>({
    resolver: zodResolver(createResourceSchema),
  });

  const requiresDeposit = watch('requiresDeposit');

  const onSubmit = async (data: CreateResourceForm) => {
    try {
      // TODO: Implement create resource API call
      console.log('Create resource data:', {
        ...data,
        images: uploadedImages,
        specifications,
      });
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Redirect to resource list or created resource
      window.location.href = '/resources';
    } catch (error) {
      console.error('Create resource failed:', error);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // TODO: Implement actual image upload
      // For now, create placeholder URLs
      const newImages = Array.from(files).map(
        (file, index) =>
          `/placeholder.svg?height=200&width=300&query=${file.name.replace(
            /\.[^/.]+$/,
            '',
          )}`,
      );
      setUploadedImages([...uploadedImages, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  const addSpecification = () => {
    if (newSpecification.trim()) {
      setSpecifications([...specifications, newSpecification.trim()]);
      setNewSpecification('');
    }
  };

  const removeSpecification = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/resources">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Share a Resource</h1>
            <p className="text-muted-foreground">
              Help your community by sharing something useful
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Tell us about the resource you want to share
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Resource Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Power Drill Set, JavaScript Book, Camping Tent"
                  {...register('title')}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your resource in detail. Include condition, what's included, and any special features..."
                  rows={4}
                  {...register('description')}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    onValueChange={(value) => setValue('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-destructive">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="condition">Condition *</Label>
                  <Select
                    onValueChange={(value) => setValue('condition', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map((condition) => (
                        <SelectItem key={condition} value={condition}>
                          {condition}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.condition && (
                    <p className="text-sm text-destructive">
                      {errors.condition.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Photos</CardTitle>
              <CardDescription>
                Add photos to help others see what you&apos;re sharing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <Image
                      fill
                      src={image || '/placeholder.svg'}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-muted-foreground/50 transition-colors">
                  <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">
                    Add Photo
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Specifications */}
          <Card>
            <CardHeader>
              <CardTitle>What&apos;s Included</CardTitle>
              <CardDescription>
                List the items or features included with this resource
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., Drill bits, Carrying case, Charger"
                  value={newSpecification}
                  onChange={(e) => setNewSpecification(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === 'Enter' &&
                    (e.preventDefault(), addSpecification())
                  }
                />
                <Button
                  type="button"
                  onClick={addSpecification}
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {specifications.length > 0 && (
                <div className="space-y-2">
                  {specifications.map((spec, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-muted/50 p-2 rounded"
                    >
                      <span className="text-sm">{spec}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSpecification(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Borrowing Terms */}
          <Card>
            <CardHeader>
              <CardTitle>Borrowing Terms</CardTitle>
              <CardDescription>
                Set the terms for how others can borrow this resource
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="borrowingPeriod">
                    Maximum Borrowing Period *
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setValue('borrowingPeriod', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      {borrowingPeriods.map((period) => (
                        <SelectItem key={period} value={period}>
                          {period}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.borrowingPeriod && (
                    <p className="text-sm text-destructive">
                      {errors.borrowingPeriod.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availableFrom">Available From *</Label>
                  <Input
                    id="availableFrom"
                    type="date"
                    {...register('availableFrom')}
                  />
                  {errors.availableFrom && (
                    <p className="text-sm text-destructive">
                      {errors.availableFrom.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pickupLocation">Pickup Location *</Label>
                <Input
                  id="pickupLocation"
                  placeholder="e.g., Downtown Coffee Shop, My Home Address"
                  {...register('pickupLocation')}
                />
                {errors.pickupLocation && (
                  <p className="text-sm text-destructive">
                    {errors.pickupLocation.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialInstructions">
                  Special Instructions
                </Label>
                <Textarea
                  id="specialInstructions"
                  placeholder="Any special care instructions, usage notes, or requirements..."
                  rows={3}
                  {...register('specialInstructions')}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="requiresDeposit"
                    {...register('requiresDeposit')}
                  />
                  <Label htmlFor="requiresDeposit">
                    Require security deposit
                  </Label>
                </div>

                {requiresDeposit && (
                  <div className="space-y-2 ml-6">
                    <Label htmlFor="depositAmount">Deposit Amount</Label>
                    <Input
                      id="depositAmount"
                      placeholder="e.g., $50"
                      {...register('depositAmount')}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-4">
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Share Resource'}
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/resources">Cancel</Link>
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
