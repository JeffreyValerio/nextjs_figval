import Link from "next/link";
import React from 'react';


const MenuMobile = ({ links }: any) => {

    return (
        <div className="w-full ml-[-15px] py-[15px] px-[30px] absolute buttom-0 flex flex-col gap-6 sm:hidden z-30 bg-black/90">
            <div>
                <ul className="flex flex-col justify-end gap-6 text-[12px] font-[500] uppercase leading-[22px]">
                    {links.map((item: any) => {
                        return (
                            <React.Fragment key={item.id}>
                                <li><Link href={`../${item.href}`}>{item.label}</Link></li>
                            </React.Fragment>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default MenuMobile