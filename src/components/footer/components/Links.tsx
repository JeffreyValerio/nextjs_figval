import Link from "next/link"

const Links = ({ links }: any) => {

    return (
        <>
            {/* HEADER */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-center">
                {links.map((navigation: any) => (
                    <div key={navigation.id}>
                        <li className="list-none flex flex-col gap-4 text-[14px]">
                            <h5 className={`text-[16px] uppercase mb-[15px] before:content-[' '] before:border-l before:border-[#0cc0df] before:mr-2 before:border-2`}>
                                {navigation.header}
                            </h5>
                            {navigation.links.map((link: any) => (
                                <div key={link.id}>
                                    <Link href={link.href} className="hover:text-[#0cc0df]">{link.label}</Link>
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