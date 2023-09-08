export interface ICart {
    id: string;
    name: string;
    image?: any;
    price: number;
    size?: string; // corregir
    slug: string;
    quantity: number;
    stock: number;
} 