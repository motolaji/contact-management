export interface Category {
    id: number;
    name: string;
  }
  
  export interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    category?: number;
    category_name?: string;
  }