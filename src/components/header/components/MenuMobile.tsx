'use client'

import React, { useContext } from 'react';

import Link from "next/link";

import { AiOutlineHeart } from "react-icons/ai";
import { RiShoppingBag3Line } from "react-icons/ri";

import { CartContext } from "@/contexts";
import { SearchEngine } from "@/components";



const MenuMobile = () => {

    const { numberOfItems } = useContext(CartContext)

    return (
        <div className="flex gap-2 justify-between sm:hidden overflow-hidden">
            <SearchEngine />

            <ul className='flex gap-2 justify-center items-center'>
                <li>
                    <Link href={'/favorites'} className="flex">
                        <AiOutlineHeart className="h-5 w-5" />
                        <span className="text-sm font-bold">0</span>
                    </Link>
                </li>
                |
                <li>
                    <Link href="/cart" className="flex">
                        <RiShoppingBag3Line className="h-5 w-5" />
                        <span className="text-sm font-bold">{numberOfItems > 9 ? '+9' : numberOfItems}</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default MenuMobile