'use client'

import { useEffect } from 'react';

import Cookies from 'js-cookie'

import { CartContext } from "./CartContext"
import { ICart } from "@/interfaces"
import { cartReducer } from "./CartReducer"
import { useReducer } from "react"

export interface CartState {
    isLoaded     : boolean;
    cart         : ICart[];
    numberOfItems: number;
    subtotal     : number;
    tax          : number;
    total        : number;

    shippingAddress: ShippingAddress | any;
}

export interface ShippingAddress {
    name     : string;
    lastname : string;
    address  : string;
    address2?: string;
    zip      : string;
    city     : string;
    country  : string;
    telephone: string;
}

const CART_INITIAL_STATE: CartState = {
    isLoaded: false,
    cart: [],
    numberOfItems: 0,
    subtotal: 0,
    tax: 0,
    total: 0,
    shippingAddress: undefined
}

interface Props { children: React.ReactNode }

export const CartProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)

    useEffect(() => {
        if (Cookies.get('name')) {
            const shippingAddress = {
                name: Cookies.get('name') || '',
                lastname: Cookies.get('lastname') || '',
                address: Cookies.get('address') || '',
                address2: Cookies.get('address2') || '',
                zip: Cookies.get('zip') || '',
                city: Cookies.get('city') || '',
                country: Cookies.get('country') || '',
                telephone: Cookies.get('telephone') || '',
            }
            dispatch({ type: '[Cart] - Load address from cookies', payload: shippingAddress })
        }
    }, [])
 
    useEffect(() => {
        try {
            const cookieProducts = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')!) : []
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts })
        } catch (error) {
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] })
        }

    }, [])

    useEffect(() => {
        Cookies.set('cart', JSON.stringify(state.cart))
    }, [state.cart])

    useEffect(() => {
        const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0)
        const subtotal = state.cart.reduce((prev, current) => (current.price * current.quantity) + prev, 0)
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)

        const orderSummary = {
            numberOfItems,
            subtotal,
            tax: subtotal * taxRate,
            total: subtotal * (taxRate + 1)
        }

        dispatch({ type: '[Cart] - Update order summary', payload: orderSummary })
    }, [state.cart])

    const addProductToCart = (product: ICart) => {
        const productInCart = state.cart.some(p => p.id === product.id);
        // SI NO EXISTE LO AGREGA
        if (!productInCart) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] })

        const productInCarButDifferenteSize = state.cart.some(p => p.id === product.id && p.size === product.size)
        if (!productInCarButDifferenteSize) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] })

        // acumular
        const updatedProducts = state.cart.map(p => {
            if (p.id !== product.id) return p
            if (p.size !== product.size) return p

            // ACTUALIZA CANTIDAD
            p.quantity += product.quantity
            return p;
        })

        dispatch({ type: '[Cart] - Update products in cart', payload: updatedProducts })
    }

    const updateCartQuantity = (product: ICart) => {
        dispatch({ type: '[Cart] - Change cart quantity', payload: product })
    }

    const removeCartProduct = (product: ICart) => {
        dispatch({ type: '[Cart] - Remove product in cart', payload: product })
    }

    const updateAddress = (address: ShippingAddress) => {

        if(address){
            Cookies.set('name',       address.name)
            Cookies.set('lastname',   address.lastname)
            Cookies.set('address',    address.address)
            Cookies.set('address2',   address.address2 || '')
            Cookies.set('zip',        address.zip)
            Cookies.set('city',       address.city)
            Cookies.set('country',    address.country)
            Cookies.set('telephone',  address.telephone)
        }
        dispatch({ type: '[Cart] - Update address', payload: address })
    }

    return (
        <CartContext.Provider
            value={{
                ...state,

                // METHODS
                addProductToCart,
                removeCartProduct,
                updateCartQuantity,
                updateAddress
            }}
        >
            {/* <ThemeProvider> */}
            {children}
            {/* </ThemeProvider> */}
        </CartContext.Provider>
    )
}