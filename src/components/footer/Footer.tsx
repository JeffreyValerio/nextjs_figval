import { FaClock, FaFacebookF, FaInstagram, FaRegEnvelope, FaWhatsapp } from "react-icons/fa";

import Image from "next/image";
import Link from "next/link";
import { strapiFetch } from "@/libs";
import Links from "./components/Links";
import ContentLayout from "@/app/layouts/ContentLayout";

const Footer = async () => {

    const [resFooter] = await Promise.all([
        // INFORMACION SE RENUEVA CADA 24 HORAS 
        strapiFetch(`/global?populate[footer][populate][footerColumns][populate]=*`, 'force-cache', { next: { revalidate: 86400 } })
    ]);
    const [navigation] = await Promise.all([resFooter]);
    const links = navigation?.data?.attributes?.footer?.footerColumns;

    return (
        <footer className="dark:bg-black/90 text-white/90">
            <ContentLayout className="pb-[30px] sm:pb-[60px] px-[15px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center justify-center pt-[30px] sm:pt-[60px]">
                    {/* PANEL 1 */}
                    <div className="flex flex-col gap-4">
                        <h3 className={`text-[16px] uppercase mb-[15px] before:content-[' '] before:border-l before:border-turquoise before:mr-2 before:border-2`}>
                            CONTACTO
                        </h3>
                        <span className="flex gap-2 items-center text-[14px] hover:text-blue-400">
                            <FaWhatsapp className="w-5 h-5" />
                            <Link href={`https://wa.me/50687654321`} target="_blank">(506) 8765-4321</Link>
                        </span>
                        <span className="flex gap-2 items-center text-[14px] hover:text-blue-turquoise">
                            <FaRegEnvelope className="w-5 h-5" />
                            <Link href={`mailto:ventas@figval.com`} target="_blank">ventas@figval.com</Link>
                        </span>
                        <span className="flex gap-2 items-center text-[14px] hover:text-blue-turquoise">
                            <FaClock className="w-5 h-5" />
                            Lun-vie: 8am-5pm | sáb: 8am-12pm
                        </span>
                        <Image src={`https://blueskytechmage.com/eren/media/wysiwyg/payment.png`} alt="payments-methods" width={218} height={28} />
                    </div>

                    {/* PANEL 2 */}
                    <div className="sm:col-start-2 sm:col-end-5">
                        <Links links={links} />
                    </div>

                </div>
            </ContentLayout>

            <div className="py-[15px] bg-[#2D2D2D]">
                <div className="px-[15px]">
                    <div className="max-w-[1230px] mx-auto flex flex-wrap items-center justify-between">
                        <p className={`text-center text-[#999999] leading-[22px] text-[14px]`}>&copy; 2023 Figval.com</p>
                        <div className="flex gap-6 text-[#999999]">
                            <Link href="/">
                                <FaFacebookF />
                            </Link>

                            <Link href="/">
                                <FaInstagram />
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer