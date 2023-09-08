'use client'

import { SessionProvider } from "next-auth/react"
import { CartProvider } from "."

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