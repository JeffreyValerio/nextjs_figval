import Link from 'next/link';

import { IProduct } from '@/interfaces'
import delve from 'dlv';
import { Breadcrumb, ProductCarousel, Rating } from '..'

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

    const brand = delve(product, 'attributes.brand.data.attributes')
    const category = delve(product, 'attributes.category.data.attributes')
    const additional_features = delve(product, 'attributes.additional_features')

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
                    <h1
                        className={`font-bold text-xl md:text-[25px] uppercase leading-6 text-black/80`}>
                        <span className=" relative block pb-[18px] before:content-[''] before:w-[50px] before:h-[0px] before:border-2 before:border-[#78b7c6] before:absolute before:left-0 before:bottom-0">
                            {product.attributes.name}
                        </span>
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
                        <p className="text-turquoise mr-3 text-[24px] font-bold">
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
                        <table className='w-[300px] text-[12px] '>
                            <tbody className="">
                                <tr>
                                    <td className="font-bold">Código</td>
                                    <td>{product.attributes.code}</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Marca</td>
                                    <td>{brand.name}</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Modelo</td>
                                    <td>{product.attributes.model}</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Categoría</td>
                                    <td>
                                        <Link
                                            href={`../category/${category.slug}`}
                                            title='clic para ver la categoría'
                                            className="text-turquoise hover:text-black line-clamp-1">
                                            {product.attributes.subcategory?.data?.attributes?.name}
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Condición</td>
                                    <td>
                                        {product.attributes.isNew === true
                                            ? (<p className="text-[12px]">Nuevo</p>)
                                            : (<p className="text-[12px]">Producto usado</p>)
                                        }
                                    </td>
                                </tr>
                                {additional_features && additional_features[0] && Object.keys(additional_features[0]) && (
                                    <>
                                        {additional_features &&
                                            additional_features[0] &&
                                            Object.keys(additional_features[0])
                                                .sort((keyA, keyB) => keyA.localeCompare(keyB))
                                                .map((key, index) => {
                                                    // Excluir la clave "tallas" al momento de renderizar
                                                    if (key !== '__component' && key !== 'id' && key !== 'tallas' && additional_features[0][key] !== null) {
                                                        return (
                                                            <tr key={`${index}-${key}`}>
                                                                <td className="font-bold capitalize">
                                                                    {key}
                                                                </td>
                                                                <td>
                                                                    {/* Si additional_features[0][key] es un objeto con la clave "size", muestra su valor */}
                                                                    {typeof additional_features[0][key] === 'object' && additional_features[0][key].hasOwnProperty('size')
                                                                        ? additional_features[0][key].size
                                                                        : String(additional_features[0][key])} {/* Convierte el valor a cadena de texto antes de mostrarlo */}
                                                                </td>
                                                            </tr>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                    </>
                                )}
                                {/* DISPONIBILIDAD */}
                                <tr>
                                    <td className="font-bold">Disponibilidad</td>
                                    <td>
                                        {product.attributes.stock > 0
                                            ? (<p className="text-turquoise text-[12px]">Disponible</p>)
                                            : (<p className="text-[#DC2626] text-[12px]">Agotado 😥</p>)
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* <pre>{JSON.stringify(product, null, 2)}</pre> */}
        </>
    )
}

export default ProductInfo