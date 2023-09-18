import Image from "next/image";
import Link from "next/link";
import delve from 'dlv';
import { format } from "@/utils";


const TopSellerCard = ({ product: { attributes: product } }: any) => {
    const image = delve(product, 'thumbnail.data.attributes.url');
    const imageName = delve(product, 'thumbnail.data.attributes.name');

    return (
        <div className="md:flex md:flex-col content-start lg:grid lg:grid-cols-3">
            <div className="col-start-1 col-end-2">
                <Link href={`../${product.slug}`}>
                    <Image className="bg-[#f2f2f2] object-scale-down w-[90px] h-[90px]" src={image || '/images/no-image.png'} alt={imageName} width={86} height={111} />
                </Link>
            </div>
            <div className="ml-3 col-start-2 col-end-4">
                <Link className={`line-clamp-3 col-start-1 col-end-3 leading-[22px] text-[12px] text-[#7B7B7B]`} href={product.slug}>{product.name}</Link>

                <div className="mt-[5px] flex items-center ">
                    <p className="text-turquoise mr-3">{format(product.price)}</p>
                    {product.special_price > 0 ? (
                        <p className="line-through text-[#7B7B7B]">${product.original_price}</p>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TopSellerCard