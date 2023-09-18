'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

import { signOut, useSession } from 'next-auth/react'
import Topbar from './components/Topbar'
import { useContext, useState } from 'react'
import { AuthContext, CartContext } from '@/contexts'
import ContentLayout from '@/app/layouts/ContentLayout'
import { Logo, SearchEngine } from '..'
import { AiOutlineHeart, AiOutlineUser } from 'react-icons/ai'
import { RiShoppingBag3Line } from 'react-icons/ri'
import MenuMobile from './components/MenuMobile'

const Header = () => {

    const session = useSession()
    const user: any = session.data?.user

    const searchParams = useSearchParams()
    const destination = searchParams.get('p') || '/'

    const { logout } = useContext(AuthContext)
    const { numberOfItems } = useContext(CartContext)

    const [mobileMenu, setMobileMenu] = useState(false);

    return (
        <>
            <Topbar />
            <header className='bg-black/90 text-white/90'>
                <ContentLayout>
                    <div className={`hidden sm:flex items-center justify-center sm:justify-between border-b border-[#888888] text-[#999] text-[13px] leading-[45px] h-[45px]`}>
                        <div className='justify-center flex'>CRC</div>
                        <ul className="flex gap-4 font-light justify-end">
                            {user ? (
                                <>
                                    <li className="flex gap-2 items-center hover:text-white">
                                        <Image className="rounded-full" src={user.image ? user.image as string : user.avatar || '/images/no-picture.png'}
                                            alt={`Image of ${user.name}`} width={30} height={30} />
                                        <Link href={'/account/profile'}>{user.username ? user.username : user.username}</Link>
                                    </li>
                                    |
                                    <li className="hover:text-white">
                                        <button
                                            onClick={() => {
                                                signOut({ callbackUrl: destination }),
                                                    logout()
                                            }}
                                        >Salir</button>
                                    </li>
                                </>
                            ) : (
                                <Link href={'/account/login?p'} className="hidden sm:flex gap-1 items-center py-2 px-2 text-white">
                                    Ingresar <AiOutlineUser className="w-5 h-5" />
                                </Link>
                            )}
                        </ul>
                    </div>
                </ContentLayout>
            </header>
            <nav className='sticky top-0 z-10 bg-black/90 text-white/90 py-2'>
                <ContentLayout >
                    <div className="hidden sm:flex flex-col sm:flex-row items-center justify-between">

                        <div className="w-full sm:w-auto flex justify-between items-center">
                            <Logo />
                            <Link href={'/account/login'} className="flex gap-1 items-center sm:hidden py-2 px-2 text-white">
                                Ingresar <AiOutlineUser className="w-5 h-5" />
                            </Link>
                        </div>

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

                    <div className="flex sm:hidden flex-col content-center">
                        <div className="w-full flex justify-between items-center py-2">
                            <Logo />
                            <Link href={'/account/login'} className="flex gap-1 items-center sm:hidden text-white">
                                Ingresar <AiOutlineUser className="w-5 h-5" />
                            </Link>
                        </div>

                        <MenuMobile />
                    </div>
                </ContentLayout>
            </nav>
        </>
    )
}

export default Header



