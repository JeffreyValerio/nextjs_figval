'use client'

import { SessionProvider } from "next-auth/react"
import { AuthProvider, CartProvider } from "."

interface Props {
    children: React.ReactNode
}
const Providers = ({ children }: Props) => {
    return (
        <SessionProvider>
            <CartProvider>
                {children}
            </CartProvider>
        </SessionProvider>
    )
}

export default Providers