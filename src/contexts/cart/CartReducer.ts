import { ICart } from '@/interfaces';
import { CartState, ShippingAddress } from './CartProvider';

type CartActionType =
    | { type: '[Cart] - LoadCart from cookies | storage', payload: ICart[] }
    | { type: '[Cart] - Update products in cart', payload: ICart[] }
    | { type: '[Cart] - Change cart quantity', payload: ICart }
    | { type: '[Cart] - Remove product in cart', payload: ICart }
    | { type: '[Cart] - Load address from cookies', payload: ShippingAddress }
    | { type: '[Cart] - Update address', payload: ShippingAddress }
    | {
        type: '[Cart] - Update order summary',
        payload: {
            numberOfItems: number;
            subtotal: number;
            tax: number;
            total: number;
        }
    }

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
    switch (action.type) {

        case '[Cart] - LoadCart from cookies | storage':
            return {
                ...state,
                isLoaded: true,
                cart: [...action.payload]
            }

        case '[Cart] - Update products in cart':
            return {
                ...state,
                cart: [...action.payload]
            }

        case '[Cart] - Change cart quantity':
            return {
                ...state,
                cart: state.cart.map(product => {
                    if (product.id !== action.payload.id) return product;
                    if (product.size !== action.payload.size) return product;
                    return action.payload
                })
            }

        case '[Cart] - Remove product in cart':
            return {
                ...state,
                cart: state.cart.filter(product => !(product.id === action.payload.id && product.size === action.payload.size))
            }

        case '[Cart] - Update order summary':
            return {
                ...state,
                ...action.payload
            }

        case '[Cart] - Update address':
        case '[Cart] - Load address from cookies':
            return {
                ...state,
                shippingAddress : action.payload
            }

        default:
            return state;
    }

}