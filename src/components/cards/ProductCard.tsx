import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import delve from 'dlv'
import { format } from '@/utils';
import { AddToCartButtom, Rating } from '..';

const ProductCard = ({ product, className }: any) => {
    const image = delve(product, 'attributes.thumbnail.data.attributes.url');
    const imageName = delve(product, 'attributes.thumbnail.data.attributes.name');

    if (!product) { return <></> }
    return (
        <>
            {product && (
                <div className={`w-full ${className || ""}`}>
                    <Link href={`../${product.attributes.slug}`} className="overflow-hidden">
                        <Image
                            className="bg-[#f2f2f2] object-scale-down bg-center w-full border h-[250px] p-2"
                            src={image || '/images/no-image.png'}
                            alt={`${imageName || 'no image'}`}
                            width={200}
                            height={250}
                        />
                    </Link>
                    <div className="mb-2 mt-3 ">
                        <Link className={`line-clamp-2 md:line-clamp-3 overflow-hidden leading-[22px] text-[12px] text-[#7B7B7B]`} href={`../${product.attributes.slug}`}>{product.attributes.name}</Link>
                    </div>
                    <div className="flex justify-between items-center flex-wrap overflow-hidden">
                        <div className="flex items-center flex-wrap">
                            <p className="text-turquoise text-lg lg:text-xl font-bold">{format(product.attributes.price * 1.13)}
                                <span className="ml-1 text-[14px] text-black/80">IVAI</span>
                            </p>
                            {product.attributes.special_price > 0 ? (
                                <p className="line-through text-[#7B7B7B] text-sm md:text-lg lg:text-xl font-bold">${product.attributes.special_price}</p>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    <div className="my-2 flex flex-wrap gap-2 justify-between">
                        {/* <Rating value={product?.rating} max={5} /> */}
                        <p>SKU: {product.attributes.code}</p>
                    </div>
                    <AddToCartButtom product={product} />
                </div>
            )}
        </>
    )
}

export default ProductCard 