import { Metadata } from 'next';
import { ContactsPage } from '@/components/ContactPage';

export const metadata: Metadata = {
  title: 'Contacts Management',
  description: 'Manage your contacts easily',
};

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="py-4">
        <ContactsPage />
      </div>
    </main>
  );
}