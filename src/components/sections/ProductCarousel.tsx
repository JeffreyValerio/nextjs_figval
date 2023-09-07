'use client'

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface Props {
    images: {
        data: any // CORREGIR TIPADO
    }
}

const ProductCarousel = ({ images }: Props) => {
    return (
        <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-8">
            <Carousel
                infiniteLoop={true}
                showIndicators={false}
                showStatus={false}
                thumbWidth={60}
                className="productCarousel"
            >
                {images.data?.map((image: any) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        className="object-scale-down bg-[#f2f2f2]"
                        key={image.id}
                        src={`${image.attributes.url || '/images/no-image.png'}`}
                        alt={image.attributes.name}
                    />
                ))}
            </Carousel>
        </div>
    )
}

export default ProductCarousel