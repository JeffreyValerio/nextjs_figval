import Link from "next/link"

const Links = ({ links }: any) => {

    return (
        <>
            {/* HEADER */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-center">
                {links.map((navigation: any) => (
                    <div key={navigation.id}>
                        <li className="list-none flex flex-col gap-4 text-[14px]">
                            <h3 className={`text-[16px] uppercase mb-[15px] before:content-[' '] before:border-l before:border-turquoise before:mr-2 before:border-2`}>
                                {navigation.header}
                            </h3> 
                            {navigation.links.map((link: any) => (
                                <div key={link.id}>
                                    <Link href={link.href} className="hover:text-turquoise">{link.label}</Link>
                                </div>
                            ))}
                        </li>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Links