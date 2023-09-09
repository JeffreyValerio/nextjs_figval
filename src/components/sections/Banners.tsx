import Image from "next/image"
import delve from 'dlv';

const Bannners = ({ banners }: any) => {
    const principal = delve(banners, 'data.attributes.principal.data.attributes.url')
    const aside = delve(banners, 'data.attributes.aside.data.attributes.url')

    return (
        <section className="block md:grid grid-cols-4 gap-4 mt-4">
            <div className="col-start-1 col-end-5 md:col-end-4">
                <Image
                    className="w-full h-[139px] object-scale-down md:object-cover"
                    src={principal} alt="image" width={930} height={139} />
            </div>
            <aside className="hidden md:block col-start-4 col-end-5 sm:mt-0">
                <Image
                    className="w-full h-[139px] bg-center object-cover"
                    src={aside} alt="image" width={299} height={139} />
            </aside>
        </section>
    )
}

export default Bannners  