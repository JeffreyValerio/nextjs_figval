import Link from 'next/link'

const Header = () => {
    return (
        <div className="bg-white">
            <nav>
                <ul className='py-10 border-b flex gap-4 justify-center'>
                    <li> <Link href={'/store'}>Tienda</Link> </li>
                    <li> <Link href={'/categories'}>Categorías</Link> </li>
                    <li> <Link href={'/contact'}>Contacto</Link> </li>
                </ul>
            </nav>
        </div>
    )
}

export default Header