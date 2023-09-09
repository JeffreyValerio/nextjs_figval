import Image from "next/image";
import Link from "next/link";

import delve from 'dlv';

const CategoryCard = ({ category: { attributes: category } }: any) => {
    const { name, slug, image, products } = category;

    const imageUrl = delve(image, 'data.attributes.url');
    const imageName = delve(image, 'data.attributes.name');
    const width = delve(image, 'data.attributes.width');
    const height = delve(image, 'data.attributes.height');

    return (
        <div className="bg-[#f2f2f2] p-4 w-full min-w-[200px] h-full min-h-[200px] flex items-center justify-center">
            <div className="flex flex-col items-center text-center">
                <Image className="w-[50px] sm:w-[80px]" src={imageUrl} alt={`imageName`} width={50} height={50} priority />
                <Link href={`category/${slug}`} className="font-bold text-black/90 hover:text-[#74b525] hover:underline">{name}</Link>
                <span className="text-sm">
                    {products?.data?.length} {products.data.length === 1 ? 'producto' : 'productos'}
                </span>
            </div>
        </div>
    )
}

export default CategoryCard