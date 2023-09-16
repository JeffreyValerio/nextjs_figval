'use client';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { Carousel } from 'react-responsive-carousel';
import React from "react";
import { ProductCard } from "..";

const CarouselMobile = ({ products }: any) => {
    return (
        <div className="sm:hidden grid grid-cols-1 min-[768px]:grid-cols-4 min-[768px]:gap-[30px]">
            <div className="col-start-1 col-end-2 sm:col-start-1 sm:col-end-4">
                <Carousel
                    autoPlay={true}
                    infiniteLoop={true}
                    showThumbs={false}
                    showIndicators={false}
                    showStatus={false}
                    swipeable={true}
                    interval={6000}
                    stopOnHover={true}
                >
                    {products && products.data.map((product: any) => {
                        return (
                            <React.Fragment key={product.id}>
                                <ProductCard product={product} />
                            </React.Fragment>
                        )
                    })}
                </Carousel>
            </div>
        </div>
    )
}

export default CarouselMobile