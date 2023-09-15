
import ContentLayout from '@/app/layouts/ContentLayout'
import Link from 'next/link'

const links = [
    { href: '/site/about-us', label: 'Quiénes somos' },
    { href: '/site/contact', label: 'Contacto' },
    { href: '/site/blog', label: 'Blog' },
]

const Topbar = () => {
    return (
        <div className="hidden bg-black text-white sm:flex items-center h-8">
            <ContentLayout className="w-full flex justify-between">
                <nav>
                    <ul className="flex gap-4">
                        {links.map((link: any) => (
                            <li key={link.href}>
                                <Link href={link.href}>{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <Link href={`mailto:ventas@figval.com`} target="_blank">
                    ventas@figval.com
                </Link>
            </ContentLayout>
        </div>
    )
}

export default Topbar