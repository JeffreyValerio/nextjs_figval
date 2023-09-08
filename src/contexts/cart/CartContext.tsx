'use client'

import { ICart } from "@/interfaces";
import { createContext } from "react";
import { ShippingAddress } from "./CartProvider";

interface ContextProps {
    isLoaded     : boolean;
    cart         : ICart[];
    numberOfItems: number; 
    subtotal     : number;
    tax          : number;
    total        : number;

    shippingAddress: ShippingAddress

    // METHODS
    addProductToCart  : (product: ICart) => void
    updateCartQuantity: (product: ICart) => void
    removeCartProduct : (product: ICart) => void
    updateAddress     : (address: ShippingAddress) => void
}

export const CartContext = createContext({} as ContextProps)