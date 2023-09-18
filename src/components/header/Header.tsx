'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'


import { signOut, useSession } from 'next-auth/react'
import Topbar from './components/Topbar'
import { useContext } from 'react'
import { AuthContext } from '@/contexts'
import ContentLayout from '@/app/layouts/ContentLayout'
import { Logo, SearchEngine } from '..'
import { AiOutlineUser } from 'react-icons/ai'

const Header = () => {

    const session = useSession()
    const user: any = session.data?.user

    const searchParams = useSearchParams()
    const destination = searchParams.get('p') || '/'

    const { logout } = useContext(AuthContext)

    return (
        <>
            <Topbar />
            <header className='bg-black/90 text-white/90'>
                <ContentLayout>
                    <div className={`hidden sm:flex items-center justify-center sm:justify-between border-b border-[#888888] text-[#999] text-[13px] leading-[45px]`}>
                        <div className='justify-center flex'>CRC</div>
                        <ul className="flex gap-4 font-extralight justify-end">
                            {user ? (
                                <>
                                    <li className="flex gap-2 items-center">
                                        <Image className="rounded-full" src={user.image ? user.image as string : user.avatar || '/images/no-picture.png'}
                                            alt={`Image of ${user.name}`} width={30} height={30} />
                                        <Link href={'/account/profile'}>{user.username ? user.username : user.username}</Link>
                                    </li>
                                    |
                                    <li>
                                        <button
                                            onClick={() => {
                                                signOut({ callbackUrl: destination }),
                                                    logout()
                                            }}
                                        >Salir</button>
                                    </li>
                                </>
                            ) : (
                                <Link href={'/account/login'} className="hidden sm:flex gap-1 items-center py-2 px-2 text-white">
                                    Ingresar <AiOutlineUser className="w-5 h-5" />
                                </Link>
                            )}
                        </ul>
                    </div>
                </ContentLayout>
            </header>
            <nav className='sticky top-0 z-10 bg-black/90 text-white/90'>
                <ContentLayout className="flex flex-col sm:flex-row items-center justify-between">
                    <div className="w-full sm:w-auto flex justify-between items-center">
                        <Logo />
                        <Link href={'/account/login'} className="flex gap-1 items-center sm:hidden py-2 px-2 text-white">
                            Ingresar <AiOutlineUser className="w-5 h-5" />
                        </Link>
                    </div>
                    <SearchEngine />
                    <ul className='hidden sm:flex gap-4 justify-center items-center'>
                        <li> <Link href={'/store'}>Tienda</Link> </li>
                        <li> <Link href={'/categories'}>Categorías</Link> </li>
                    </ul>
                </ContentLayout>
            </nav>
        </>
    )
}

export default Header



