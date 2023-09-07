import Link from 'next/link'

const Header = () => {
    return (
        <div>
            <nav>
                <ul className='py-10 border-b flex gap-4 justify-center'>
                    <li> <Link href={'/'}>Homepage</Link> </li>
                    <li> <Link href={'/1'}>Slug</Link> </li>
                    <li> <Link href={'/cart'}>Cart</Link> </li>
                </ul>
            </nav>
        </div>
    )
}

export default Header