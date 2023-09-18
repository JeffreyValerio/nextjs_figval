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
        <div className="grid grid-cols-4 justify-between sm:hidden">
            <div className="col-start-1 col-end-4">
                <SearchEngine /> 
            </div>

            <ul className='col-start-4 col-end-5 flex gap-1 justify-end items-center overflow-hidden'>
                <li>
                    <Link href={'/favorites'} className="flex">
                        <AiOutlineHeart className="h-5 w-5" />
                        <span className="text-sm font-bold">0</span>
                    </Link>
                </li>
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