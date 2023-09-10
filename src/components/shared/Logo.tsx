import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
    return (
        <Link href={'/'}>
            <Image className='w-[80px] h-[80px]' src='/logo.svg' width={80} height={80} alt='Logo Figval' priority />
        </Link>
    )
}

export default Logo