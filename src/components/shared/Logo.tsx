import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
    return (
        <Link href={'/'}>
            <Image className='hidden sm:block w-[60px] md:w-[80px] h-auto' src='/logo.svg' width={80} height={80} alt='Logo Figval' priority  />
        </Link>
    )
}

export default Logo