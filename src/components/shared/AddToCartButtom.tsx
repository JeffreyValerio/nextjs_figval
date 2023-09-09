'use client'

import { useContext, useState } from 'react';

import { MdOutlineShoppingBag } from 'react-icons/md'
import { FaWhatsapp } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartContext } from '@/contexts';
import { ICart, IProduct } from '@/interfaces';
import { ItemCounter } from '.';
import Link from 'next/link';

interface Props {
    product: {
        id: any,
        attributes: IProduct,
        quantity: number
    }
}

const AddToCartButtom = ({ product }: any) => {


    const { addProductToCart } = useContext(CartContext)

    const [tempCartProduct, setTempCartProduct] = useState<ICart>({
        id: product?.id,
        name: product?.name,
        image: product?.thumbnail?.data?.attributes?.formats?.small?.url,
        price: product?.price,
        size: undefined,
        slug: product?.slug,
        quantity: 1,
        stock: product?.stock
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
        toast.success(`¡${product.name} 🎉 SE AGREGÓ AL CARRITO!`, {
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

    if (!product) { return <></> }

    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <div className="flex justify-between items-center">
                {(product?.stock > 0)
                    ? (< ItemCounter
                        currentValue={tempCartProduct.quantity || 1}
                        maxValue={product?.stock}
                        updatedQuantity={updatedQuantity}
                    />)
                    : (<></>)
                }
                {(product?.stock > 0)
                    ? (<div className='py-2 flex justify-end'> 
                        <button
                            onClick={addToCart}
                            aria-label={`Add ${product?.name} to your cart`}
                            type="button"
                            className="bg-black px-2 py-3 text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        >
                            <MdOutlineShoppingBag className="w-6 h-6" />
                        </button>
                    </div>)
                    : (<div className='py-2 w-full flex items-center'>
                        <Link
                            href={`https://wa.me/50660265671?text=Hola, me interesa comprar el producto código: ${product.code} %0A${process.env.NEXT_PUBLIC_URL}/${encodeURIComponent(product.slug)}`} target='_blank'
                            className="justify-center w-full flex gap-2 items-center bg-black/60 px-2 py-3 text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        >
                            <FaWhatsapp className="w-5 h-5" />
                            <p className='text-[12px]'>No disponibe</p>
                        </Link>
                    </div>)
                }
            </div>
        </>
    )
}

export default AddToCartButtom 