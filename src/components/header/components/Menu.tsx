import React from 'react';

import Link from "next/link";

import { Logo } from '@/components';
import { INavigation } from '@/interfaces';

const Menu = ({ links }: any) => {

    return (
        <div className="w-full hidden sm:flex justify-between min-h-[90px] items-center md:gap-[60px] h-[90px]">
            <Logo />

            <div>
                <ul className="flex justify-end gap-6 text-[12px] font-[500] uppercase leading-[22px]">
                    {links && links.map((link: INavigation) => {
                        return (
                            <React.Fragment key={link.id}>
                                <li><Link href={`${link.href}`}>{link.label}</Link></li>
                            </React.Fragment>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Menu