import { IProduct } from '@/interfaces'
import { Breadcrumb, ProductCarousel } from '..'

interface Props {
    product: {
        id: any,
        attributes: IProduct,
        quantity: number
    }
}

const ProductInfo = ({ product }: Props) => {

    // NO PRODUCT, NO PAGE
    if (!product) { return <></> }

    return (
        <>
            <Breadcrumb name={product.attributes.name} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProductCarousel images={product.attributes.images} />

                <div className="w-full flex flex-col gap-3">
                    {/* PRODUCT NAME */}
                    <h1
                        className={`font-bold text-lg md:text-[25px] uppercase leading-6 text-black/80`}>
                        <span className=" relative block pb-[18px] before:content-[''] before:w-[50px] before:h-[0px] before:border-2 before:border-[#78b7c6] before:absolute before:left-0 before:bottom-0">
                            {product.attributes.name}
                        </span>
                    </h1>
                </div>
            </div>

            <pre>{JSON.stringify(product, null, 2)}</pre>
        </>
    )
}

export default ProductInfo