import { CartItemsEmpty } from '@/components'
import React from 'react'

const CartEmpty = () => {
    return (
        <main className="mx-auto max-w-2xl px-4 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-12">
                Carrito
            </h1>
            <CartItemsEmpty />
        </main>
    )
}

export default CartEmpty 