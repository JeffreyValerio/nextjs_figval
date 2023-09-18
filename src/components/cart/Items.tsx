'use client'

import React, { useContext, useEffect } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { useRouter } from 'next/navigation'


import { BsClock } from "react-icons/bs"
import { HiMiniXMark } from "react-icons/hi2"
import { ItemCounter } from '..'
import { ICart } from '@/interfaces'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from '@/utils'
import { CartContext } from '@/contexts'

const CartItems = () => {

    const router = useRouter();

    const { cart, updateCartQuantity, removeCartProduct, isLoaded } = useContext(CartContext)

    const onNewCartQuantityValue = (product: ICart, newQuantityValue: number) => {
        product.quantity = newQuantityValue
        updateCartQuantity(product)
    }

    useEffect(() => {
        if (isLoaded && cart.length === 0) {
            router.replace('/cart/empty')
        }
    }, [isLoaded, cart, router])

    // NO RENDERIZA LA PANTALLA DEL CARRITO
    if (!isLoaded && cart.length !== 0) return <></>

    return (
        <>
            {cart.map(product => {
                return (
                    <li key={product.slug + product.size} className="flex py-6 sm:py-10">
                        <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                        <div className="shrink-0">
                            <Image
                                src={`${product.image || '/images/no-image.png'}`}
                                alt={product.id}
                                width={100}
                                height={100}
                                className='bg-[#f2f2f2] p-2'
                            />
                        </div>
                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                            <div className="relative justify-between pr-9 sm:flex sm:gap-x-6 sm:pr-0">
                                <div>
                                    <div className="flex justify-between">
                                        <h3 className="text-sm">
                                            <Link href={`../${product.slug}`} className="font-medium line-clamp-2">
                                                {product.name}
                                            </Link>
                                        </h3>
                                    </div>
                                    <p className="mt-1 text-sm font-medium">{format(product.price)}</p>

                                    {product.size && (
                                        <p className="mt-1 text-sm font-medium">
                                            Talla: <strong> {product.size}</strong>
                                        </p>
                                    )}
                                </div>

                                <div className="mt-4 sm:mt-0 sm:pr-9">
                                    <label className="sr-only">Quantity, {product.name}</label>
                                    <ItemCounter
                                        currentValue={product.quantity}
                                        maxValue={product.stock}
                                        updatedQuantity={(value) => onNewCartQuantityValue(product, value)}
                                    />
                                    <div className="absolute right-0 top-0">
                                        <button
                                            type="button"
                                            className="-mr-2 inline-flex p-2"
                                            onClick={() => {
                                                removeCartProduct(product)
                                                toast.error(`¡${product.name} 😭 SE ELIMINÓ DEL CARRITO!`, {
                                                    toastId: product.id,
                                                    className: "uppercase",
                                                    position: "bottom-right",
                                                    autoClose: 5000,
                                                    hideProgressBar: false,
                                                    closeOnClick: true,
                                                    pauseOnHover: true,
                                                    draggable: true,
                                                    progress: undefined,
                                                    theme: "light",
                                                });
                                            }}
                                        >
                                            <span className="sr-only">Remove</span>
                                            <HiMiniXMark className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <p className="mt-4 flex space-x-2 text-sm">
                                <BsClock className="h-5 w-5 shrink-0" aria-hidden="true" />
                                <span>ENTREGA: 24 horas</span>
                            </p>
                        </div>
                    </li>
                )
            })}
        </>
    )
}

export default CartItems