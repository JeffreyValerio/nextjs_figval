'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'


import { signOut, useSession } from 'next-auth/react'
import Topbar from './components/Topbar'
import { useContext } from 'react'
import { AuthContext } from '@/contexts'
import ContentLayout from '@/app/layouts/ContentLayout'

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
                    <div className={`block sm:flex items-center justify-center sm:justify-between sm:h-[45px] border-b border-[#888888} text-[#999] text-[13px] leading-[45px]`}>
                        <div className='justify-center flex'>CRC</div>
                        <ul className="flex gap-4 font-extralight justify-end">
                            {user ? (
                                <>
                                    <li className="flex gap-2 items-center">
                                        <Image className="rounded-full" src={user.image ? user.image as string : user.avatar || '/images/no-picture.png'}
                                            alt={`Image of ${user.name}`} width={30} height={30} />
                                        <Link href={'/account/profile'}>{user.name ? user.name : user.username}</Link>
                                    </li>
                                    |
                                    <li>
                                        <button
                                            onClick={() => {
                                                signOut({ callbackUrl: destination }),
                                                    logout()
                                            }}>Salir</button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li >
                                        <Link href={'/account/login'} className="bg-slate py-2 px-4 text-white">Ingresar</Link>
                                    </li>
                                    <li>
                                        <Link href={'/account/register'}>Registrarme</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </ContentLayout>
            </header>
            <nav className='sticky top-0 z-10 bg-black/90 text-white/90'>
                <ContentLayout> 
                    <ul className='flex gap-4 justify-center'>
                        <li> <Link href={'/'}>Homepage</Link> </li>
                        <li> <Link href={'/store'}>Tienda</Link> </li>
                        <li> <Link href={'/categories'}>Categorías</Link> </li>
                    </ul>
                </ContentLayout>
            </nav>
        </>
    )
}

export default Header