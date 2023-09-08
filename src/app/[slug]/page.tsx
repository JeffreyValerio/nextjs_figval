import type { Metadata, ResolvingMetadata } from 'next'

import { ProductInfo } from "@/components"
import { strapiFetch } from "@/libs"

interface Props {
    params: { slug: string }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const data = strapiFetch(`/products?populate[additional_features][populate]=*&populate[thumbnail][populate]=*&populate[brand][populate]=*&populate[images][populate]=*&populate[category][populate]=*&populate[subcategory][populate]=*&populate[warranty][populate]=*&filters[slug][$eqi]=${params.slug}`, 'no-cache')
    const [productData] = await Promise.all([data])
    const product: any = productData.data[0]
    const previousImages = (await parent).openGraph?.images || []

    return {
        title: product.attributes.name,
        description: product.attributes.description,
        category: product.attributes.category?.data?.attributes?.name,
        openGraph: {
            images: [`${product.attributes.thumbnail.data.attributes.formats.small.url}`, ...previousImages],
        },
    }

}

const ProductDetailsPage = async ({ params }: Props) => {

    const data = strapiFetch(`/products?populate[additional_features][populate]=*&populate[thumbnail][populate]=*&populate[brand][populate]=*&populate[images][populate]=*&populate[category][populate]=*&populate[subcategory][populate]=*&populate[warranty][populate]=*&filters[slug][$eqi]=${params.slug}`, 'no-cache')
    const [productData] = await Promise.all([data])
    const product: any = productData.data[0]

    // NO PRODUCT, NO PAGE
    if (!product) { return <></> }

    return (
        <>
            {product && (
                <>
                    <ProductInfo product={product} />
                </>
            )}
        </>
    )
}

export default ProductDetailsPage