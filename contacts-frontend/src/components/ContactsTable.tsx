'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Contact } from '../types/contact';
import { Badge } from "@/components/ui/badge";

interface ContactsTableProps {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
}

export function ContactsTable({ contacts, onEdit, onDelete }: ContactsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contacts.map((contact) => (
          <TableRow key={contact.id}>
            <TableCell>{contact.name}</TableCell>
            <TableCell>{contact.email}</TableCell>
            <TableCell>{contact.phone}</TableCell>
            <TableCell>{contact.address}</TableCell>
            <TableCell>
              {contact.category_name && (
                <Badge variant="secondary">
                  {contact.category_name}
                </Badge>
              )}
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" onClick={() => onEdit(contact)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon" onClick={() => onDelete(contact)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}