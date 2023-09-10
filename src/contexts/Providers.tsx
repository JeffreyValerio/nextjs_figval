'use client'

import { SessionProvider } from "next-auth/react"
import { AuthProvider, CartProvider } from "."

interface Props {
    children: React.ReactNode
}
const Providers = ({ children }: Props) => {
    return (
        <SessionProvider>
            <AuthProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </AuthProvider>
        </SessionProvider>
    )
}

export default Providers