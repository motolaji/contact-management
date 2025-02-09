'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/lib/api';
import { Contact } from '../types/contact';
import { Category } from '../types/category';



interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Contact>) => void;
  initialData?: Contact | null;
}

export function ContactForm({ isOpen, onClose, onSubmit, initialData }: ContactFormProps) {
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: initialData || {
      name: '',
      email: '',
      phone: '',
      address: '',
      category: undefined
    }
  });

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });

  const categories = categoriesData?.results || [];
  const selectedCategory = watch('category');

  const onSubmitForm = (data: any) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Contact' : 'Add New Contact'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <div className="grid w-full gap-2">
            <Label htmlFor="name">Name</Label>
            <Input {...register('name')} required placeholder="John Doe" />
          </div>
          <div className="grid w-full gap-2">
            <Label htmlFor="email">Email</Label>
            <Input {...register('email')} type="email" placeholder="john@example.com" />
          </div>
          <div className="grid w-full gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input {...register('phone')} placeholder="+1234567890" />
          </div>
          <div className="grid w-full gap-2">
            <Label htmlFor="address">Address</Label>
            <Textarea {...register('address')} placeholder="Enter address" />
          </div>
          <div className="grid w-full gap-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={selectedCategory?.toString()}
              onValueChange={(value) => setValue('category', parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category: Category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}