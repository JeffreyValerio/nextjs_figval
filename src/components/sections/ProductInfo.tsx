'use client'

import { useContext, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { ICart, IProduct } from '@/interfaces'
import delve from 'dlv';

import { Breadcrumb, ItemCounter, ProductCarousel, ProductSpecs, Rating } from '..'

import { CiBoxes } from 'react-icons/ci'
import { GoShieldCheck } from 'react-icons/go'
import { MdOutlineShoppingBag } from 'react-icons/md'
import { FaWhatsapp } from 'react-icons/fa'
import { format } from '@/utils'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartContext } from '@/contexts';


interface Props {
    product: {
        id: any,
        attributes: IProduct,
        quantity: number
    }
}

const ProductInfo = ({ product }: Props) => {

    const imageBrand = delve(product, 'attributes.brand.data.attributes.image.data.attributes.url')
    const warranty = delve(product, 'attributes.warranty.data.attributes')

    const { addProductToCart } = useContext(CartContext)

    const [tempCartProduct, setTempCartProduct] = useState<ICart>({
        id: product.id,
        name: product.attributes.name,
        image: product?.attributes?.thumbnail?.data?.attributes?.formats.small.url,
        price: product.attributes.price,
        size: undefined,
        slug: product.attributes.slug,
        quantity: 1,
        stock: product.attributes.stock
    })

    const updatedQuantity = (quantity: number) => {
        setTempCartProduct(currentProduct => ({
            ...currentProduct,
            quantity
        }))
    }

    const addToCart = () => {
        // if (!tempCartProduct.size) { return }
        addProductToCart(tempCartProduct)
        toast.success(`¡${product.attributes.name} 🎉 SE AGREGÓ AL CARRITO!`, {
            toastId: product.id,
            className: "uppercase text-bold",
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

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
                    <h1 className={`font-bold text-3xl md:text-4xl uppercase leading-8 text-black/90`}>
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
                        <p className="text-black/90 mr-3 text-3xl font-bold">
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

                    <Link href={'https://wa.me/50660265671'} target='_blank' className='flex justify-center bg-[#f2f2f2] w-full md:w-[300px]'>
                        <Image className='w-[300px] h-[50px]' src={'/images/whatsapp-btn.png'} alt='whatsapp-number' width={300} height={50} />
                    </Link>

                    {/* SHORT DESCRIPTION */}
                    <p className="border-b pb-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, ea error eos veniam necessitatibus molestias delectus ad quo quod mollitia, soluta alias quaerat illum iure obcaecati cupiditate fugit suscipit! Sapiente!
                    </p>

                    {/* SPECS */}
                    <div className=" border-b pb-2">
                        <ProductSpecs product={product} />
                    </div>


                    <div className="grid grid-cols-4 items-center">

                        <ItemCounter
                            currentValue={tempCartProduct.quantity || 1}
                            maxValue={product.attributes.stock}
                            updatedQuantity={updatedQuantity}
                        />
                        {(product.attributes.stock > 0) ? (
                            <div className='grid gap-1 items-center py-4 w-full'>
                                <button
                                    onClick={addToCart}
                                    aria-label={`Add ${product.attributes.name} to your cart`}
                                    type="button"
                                    className="bg-black px-4 py-3 text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
                                >
                                    <span className="flex justify-center items-center gap-1">
                                        <MdOutlineShoppingBag className="w-5 h-5" />
                                        <span>Agregar</span>
                                    </span>
                                </button> 
                            </div>
                        ) : (
                            <div className='py-4'>
                                <div className='flex items-center'>
                                    <button
                                        type="button"
                                        className="bg-black/60 px-4 py-3 text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
                                    >
                                        <span className="flex items-center gap-1">
                                            <FaWhatsapp className="w-5 h-5" /> Consultar disponibilidad
                                        </span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* BRAND & WARRANTY */}
                    <div className="grid grid-cols-2 gap-4 items-center">
                        {/* IMAGE BRAND */}
                        <div className='gap-2 items-center justify-center p-2'>
                            <Image
                                src={imageBrand}
                                width={200}
                                height={100}
                                alt='name'
                                className="w-full object-scale-down max-h-[75px]"
                            />
                        </div>

                        {/* WARRANTY */}
                        <div className='items-center justify-center'>
                            {warranty?.description != null
                                ? (<div className='p-2 bg-[#f2f2f2]'>
                                    <h2 className='font-bold text-[14px] md:text-[16px] flex gap-1 items-center'>
                                        <GoShieldCheck className='w-6 h-6 text-green' /> GARANTÍA DE PROVEEDOR
                                    </h2>
                                    <p className='font-light lowercase text-[12px]'>{warranty.description}</p>
                                </div>)
                                : (<></>)
                            }
                        </div>
                    </div>

                </div>
            </div >

            {/* <pre>{JSON.stringify(product, null, 2)}</pre> */}
        </>
    )
}

export default ProductInfo