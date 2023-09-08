import { IProduct } from '@/interfaces'
import delve from 'dlv';
import { Breadcrumb, ProductCarousel, ProductSpecs, Rating } from '..'

import { CiBoxes } from 'react-icons/ci'
import { FaWhatsapp } from 'react-icons/fa'
import { GoShieldCheck } from 'react-icons/go'
import { MdOutlineShoppingBag } from 'react-icons/md'
import { format } from '@/utils'

interface Props {
    product: {
        id: any,
        attributes: IProduct,
        quantity: number
    }
}

const ProductInfo = ({ product }: Props) => {

    const warranty = delve(product, 'attributes.warranty.data.attributes')

    // NO PRODUCT, NO PAGE
    if (!product) { return <></> }

    return (
        <>
            <Breadcrumb name={product.attributes.name} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="w-full md:w-auto lg:max-w-full mx-auto lg:mx-0">
                    <ProductCarousel images={product.attributes.images} />
                </div>

                <div className="w-full flex flex-col gap-3">
                    {/* PRODUCT NAME */}
                    <h1 className={`font-bold text-3xl md:text-4xl uppercase leading-8 text-black/80`}>
                        {product.attributes.name}
                    </h1>

                    {/* PRODUCT RATING */}
                    <div className="flex items-center gap-2 text-[12px]">
                        <Rating value={product.attributes.rating} max={5} />
                        <span>Aún no hay reseñas</span>
                    </div>

                    {/* PRODUCT STOCK AVAILABLE */}
                    <div className="text-[13px] uppercase flex items-center">
                        <CiBoxes className="w-6 h-6" /> Existencia:
                        <strong className="pl-1 capitalize">
                            {product.attributes.stock || 0} {product.attributes.stock === 1 ? 'item' : 'items'}
                        </strong>
                    </div>

                    {/* PRICE */}
                    <div className="flex items-center flex-wrap">
                        <p className="text-black mr-3 text-3xl font-bold">
                            {format(product.attributes.price * 1.13)}
                            <span className="ml-1 text-[14px] text-black/80">IVAI</span>
                        </p>
                        {product.attributes.special_price > 0
                            ? (
                                <p className="line-through text-[#7B7B7B] text-[20px] font-bold">
                                    {format(product.attributes.special_price)}
                                </p>
                            )
                            : (
                                <></>
                            )}
                    </div>

                    {/* SHORT DESCRIPTION */}
                    <p className="border-b pb-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, ea error eos veniam necessitatibus molestias delectus ad quo quod mollitia, soluta alias quaerat illum iure obcaecati cupiditate fugit suscipit! Sapiente!
                    </p>

                    {/* SPECS */}
                    <div className=" border-b pb-2">
                        <ProductSpecs product={product} />
                    </div>

                    {/* WARRANTY              */}
                    {warranty?.description != null ? (
                        <div className='p-2 bg-[#f2f2f2]'>
                            <h2 className='font-bold text-[14px] mb-1 flex gap-1 items-center'>
                                <GoShieldCheck className='text-[18px] text-green' /> GARANTÍA DE PROVEEDOR
                            </h2>
                            <p className='font-light lowercase text-[12px]'>{warranty.description}</p>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>

            {/* <pre>{JSON.stringify(product, null, 2)}</pre> */}
        </>
    )
}

export default ProductInfo