"use client"

import { BiPlus } from "react-icons/bi"

import Link from "next/link"
import Image from "next/image"

export function CartItemsEmpty() {
  
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border-2 border-dashed border-gray-300 dark:border-gray-800">
      <div className="mx-auto flex flex-col items-center justify-center text-center">
        <Image
          src={`/images/empty-cart.svg`} 
          alt="no products"
          width={300}
          height={300}
        />
        <h3 className="mt-4 text-lg font-semibold">No se han añadido productos</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          Añade productos a tu carrito.
        </p>
        <Link href="/">
          <button className="relative flex items-center gap-1">
            <BiPlus className="mr-2 h-4 w-4" />
            Agregar productos
          </button>
        </Link>
      </div>
    </div>
  )
}
