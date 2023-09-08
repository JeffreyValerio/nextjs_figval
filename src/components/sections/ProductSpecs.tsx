import Link from 'next/link';

import delve from 'dlv';
import { AiOutlineLink } from 'react-icons/ai'

const ProductSpecs = ({ product }: any) => {

    const brand = delve(product, 'attributes.brand.data.attributes')
    const category = delve(product, 'attributes.category.data.attributes')
    const additional_features = delve(product, 'attributes.additional_features')

    return (
        <table className='w-[400px] text-[12px] uppercase'>
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
                    <td className="font-bold line-clamp-1">Modelo</td>
                    <td>{product.attributes.model}</td>
                </tr>
                <tr>
                    <td className="font-bold">Categoría</td>
                    <td className="flex gap-1 items-center">
                        <AiOutlineLink className="w-4 h-4 text-green" />
                        <Link
                            href={`../category/${category?.slug}`}
                            title='clic para ver la categoría'
                            className="text-[12px] line-clamp-1">
                            {product.attributes.category?.data?.attributes?.name}
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
                                                <td className="font-bold uppercase">
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
    )
}

export default ProductSpecs