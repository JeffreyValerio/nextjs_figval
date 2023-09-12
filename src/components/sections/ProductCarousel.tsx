'use client'
import React from 'react';

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ZoomImage from '../shared/ZoomImage';

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
                    <React.Fragment key={image.id}>
                        <ZoomImage src={`${image.attributes.url || '/images/no-image.png'}`} />
                        <img
                            className="object-scale-down bg-[#f2f2f2]"
                            src={`${image.attributes.url || '/images/no-image.png'}`}
                            alt={image.attributes.name} role='img'
                            width={60} height={60}
                            fetchPriority='high'
                        />
                    </React.Fragment>
                ))}
            </Carousel>
        </div>
    )
}

export default ProductCarousel