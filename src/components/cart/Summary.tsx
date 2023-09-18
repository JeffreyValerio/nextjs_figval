'use client'

import React, { useState, useContext } from 'react'

import { BiLoaderAlt } from "react-icons/bi"

import { format } from '@/utils';
import Link from 'next/link';
import { CartContext } from '@/contexts';

interface Props {
    text: string,
    href: string,
    className?: string
}
const CartSummary = ({ text, href, className }: Props) => {

    const { cart, numberOfItems, subtotal, tax, total } = useContext(CartContext)
    const [isLoading, setisLoading] = useState(false)
    const shippingAmount = subtotal < 100000 ? 4500 : 0
    const isDisabled = isLoading || cart.length! === 0
    const totalAmount = total! + shippingAmount

    if (numberOfItems === 0) return;

    return (
        <section
            aria-labelledby="summary-heading"
            className={`${className || ''} mt-16 rounded-lg border-1 px-4 py-6 shadow-md dark:border-gray-900 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 sticky`}
        >

            <h2 id="summary-heading" className="text-lg font-medium">
                Resumen del pedido
            </h2>

            <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                    <dt className="text-sm">No. Productos</dt>
                    <dd className="text-sm font-medium">{numberOfItems} {numberOfItems > 1 ? 'items' : 'item'}</dd>
                </div>
                <div className="flex items-center justify-between">
                    <dt className="text-sm">Subtotal</dt>
                    <dd className="text-sm font-medium">{format(subtotal)}</dd>
                </div>
                <div className="flex items-center justify-between">
                    <dt className="text-sm">Impuesto ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)</dt>
                    <dd className="text-sm font-medium">{format(tax)}</dd>
                </div>
                <div className="flex items-center justify-between">
                    <dt className="flex items-center text-sm">
                        <span>Estimación de envío</span>
                    </dt>
                    <dd className="text-sm font-medium">
                        {shippingAmount > 0 ? format(shippingAmount) : 'ENVÍO GRATIS'}
                    </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
                    <dt className="text-base font-medium">Total del pedido</dt>
                    <dd className="text-base font-medium">{format(totalAmount)}</dd>
                </div>
            </dl>

            <div className="mt-6">
                <Link
                    className="w-full bg-gray-700 py-2 text-white flex items-center justify-center"
                    href={href}>
                    {isLoading && <BiLoaderAlt className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? 'Calculando...' : text}
                </Link>
            </div>
        </section>
    )
}

export default CartSummary