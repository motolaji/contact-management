export interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    category?: number;
    created_at: string;
    updated_at: string;
    category_name?: string;
  }
  
  export interface Category {
    id: number;
    name: string;
  }