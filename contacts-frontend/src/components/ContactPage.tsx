'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { ContactForm } from '@/components/ContactForm';
import { CategoryForm } from '@/components/CategoryForm';
import { ContactsTable } from '@/components/ContactsTable';
import { 
  getContacts, 
  createContact, 
  updateContact, 
  deleteContact, 
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory 
} from '@/lib/api';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  category?: number;
  category_name?: string;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: number;
  name: string;
}

export function ContactsPage() {
  // States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  const queryClient = useQueryClient();

  // Queries
  const { 
    data: contactsData, 
    isLoading: isLoadingContacts, 
    error: contactsError 
  } = useQuery({
    queryKey: ['contacts'],
    queryFn: getContacts,
  });

  const { 
    data: categoriesData, 
    isLoading: isLoadingCategories 
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const contacts = contactsData?.results || [];
  const categories = categoriesData?.results || [];

  // Contact Mutations
  const createContactMutation = useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      setIsFormOpen(false);
    },
  });

  const updateContactMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Contact> }) => 
      updateContact(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      setIsFormOpen(false);
      setSelectedContact(null);
    },
  });

  const deleteContactMutation = useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });

  // Category Mutations
  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setIsCategoryFormOpen(false);
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: { name: string } }) => 
      updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setIsCategoryFormOpen(false);
      setSelectedCategory(null);
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  // Handlers
  const handleContactSubmit = (data: Partial<Contact>) => {
    if (selectedContact) {
      updateContactMutation.mutate({ id: selectedContact.id, data });
    } else {
      createContactMutation.mutate(data);
    }
  };

  const handleCategorySubmit = (data: { name: string }) => {
    if (selectedCategory) {
      updateCategoryMutation.mutate({ id: selectedCategory.id, data });
    } else {
      createCategoryMutation.mutate(data);
    }
  };

  const handleEditContact = (contact: Contact) => {
    setSelectedContact(contact);
    setIsFormOpen(true);
  };

  const handleDeleteContact = (contact: Contact) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      deleteContactMutation.mutate(contact.id);
    }
  };

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setIsCategoryFormOpen(true);
  };

  const handleDeleteCategory = (category: Category) => {
    if (window.confirm(`Are you sure you want to delete the category "${category.name}"? This will remove the category from all contacts.`)) {
      deleteCategoryMutation.mutate(category.id);
    }
  };

  // Filtering
  const filteredContacts = Array.isArray(contacts) 
    ? contacts.filter((contact: Contact) => {
        const matchesSearch = 
          contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.phone?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = 
          categoryFilter === 'all' || 
          contact.category?.toString() === categoryFilter;

        return matchesSearch && matchesCategory;
      })
    : [];

  // Loading state
  const isLoading = isLoadingContacts || isLoadingCategories;

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Main Contacts Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <CardTitle className="text-2xl font-bold">Contacts</CardTitle>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Contact
          </Button>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category: Category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Categories Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Categories</h3>
              <Button 
                variant="outline" 
                onClick={() => setIsCategoryFormOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Category
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category:any) => (
                <Card key={category.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{category.name}</span>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditCategory(category)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteCategory(category)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contacts Table */}
          {contactsError ? (
            <Alert variant="destructive">
              <AlertDescription>
                Error loading contacts. Please try again later.
              </AlertDescription>
            </Alert>
          ) : isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm || categoryFilter !== 'all' 
                ? 'No contacts found matching your search criteria' 
                : 'No contacts yet. Click "Add Contact" to create one.'}
            </div>
          ) : (
            <div className="rounded-md border">
              <ContactsTable
                contacts={filteredContacts}
                onEdit={handleEditContact}
                onDelete={handleDeleteContact}
              />
            </div>
          )}

          {/* Statistics */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{contacts.length}</div>
                <div className="text-sm text-gray-500">Total Contacts</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{categories.length}</div>
                <div className="text-sm text-gray-500">Categories</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                    {contacts.filter((c: Contact) => c.category).length}
                </div>
                <div className="text-sm text-gray-500">Categorized Contacts</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Forms */}
      <ContactForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedContact(null);
        }}
        onSubmit={handleContactSubmit}
        initialData={selectedContact}
      />

      <CategoryForm
        isOpen={isCategoryFormOpen}
        onClose={() => {
          setIsCategoryFormOpen(false);
          setSelectedCategory(null);
        }}
        onSubmit={handleCategorySubmit}
        initialData={selectedCategory}
      />
    </div>
  );
}