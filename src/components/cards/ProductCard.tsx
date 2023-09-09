import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import delve from 'dlv'
import { format } from '@/utils';
import { AddToCartButtom, Rating } from '..';

const ProductCard = ({ product: { attributes: product }, className }: any) => {
    const image = delve(product, 'thumbnail.data.attributes.url');
    const imageName = delve(product, 'thumbnail.data.attributes.name');
 
    return (
        <div className={`w-full ${className || ""}`}>
            <Link href={`../${product.slug}`} className="overflow-hidden">
                {product.stock === 0 && (
                    <span className="absolute z-10 bg-[#64B8C8] text-center text-white w-full py-1 text-[13px] top-[14px] left-7 -translate-x-1/2 transform -rotate-45">Agotado</span>
                )}
                <Image
                    className="bg-[#f2f2f2] object-scale-down bg-center w-full border h-[250px] p-2"
                    src={image || '/images/no-image.png'}
                    alt={`${imageName || 'no image'}`}
                    width={200}
                    height={250} 
                />
            </Link>
            <div className="mb-2 mt-3 ">
                <Link className={`line-clamp-2 md:line-clamp-3 overflow-hidden leading-[22px] text-[12px] text-[#7B7B7B]`} href={`../${product.slug}`}>{product.name}</Link>
            </div>
            <div className="flex justify-between items-center flex-wrap">
                <div className="flex items-center flex-wrap">
                    <p className="text-[#78b7c6] mr-3 text-[18px] font-bold">{format(product.price * 1.13)}
                        <span className="ml-1 text-[14px] text-black/80">IVAI</span>
                    </p>
                    {product.special_price > 0 ? (
                        <p className="line-through text-[#7B7B7B] text-[16px] font-bold">${product.special_price}</p>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <div className="my-2 flex justify-between">
                <Rating value={product?.rating} max={5} />
                <p>SKU: {product.code}</p>
            </div>

            <div>
            </div>
          <AddToCartButtom product={product}/>
        </div>
    )
}

export default ProductCard 