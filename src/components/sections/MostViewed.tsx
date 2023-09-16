'use client';

import React from "react";

import "react-multi-carousel/lib/styles.css";

import Carousel from "react-multi-carousel";
import { CarouselMobile, ProductCard, Title } from "..";

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
        partialVisibilityGutter: 40
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        partialVisibilityGutter: 30
    },
    tablet: {
        breakpoint: { max: 1024, min: 640 },
        items: 2,
        partialVisibilityGutter: 30
    },
    mobile: {
        breakpoint: { max: 640, min: 0 },
        items: 0,
    }
};

const MostViewed = ({ mostViewed }: any) => {
    return (
        <section>
            <div className='flex justify-center'>
                <Title className='text-center'>Los productos más vistos</Title>
            </div>

            <Carousel
                responsive={responsive}
                partialVisible={true}
                swipeable={true}
                draggable={true}
                focusOnSelect={true}
                infinite={true}
                pauseOnHover={true}
                sliderClass="sm:flex sm:gap-4 overflow-hidden"
                arrows={false}
            >
                {mostViewed && mostViewed.data.map((product: any) => {
                    return (
                        <React.Fragment key={product.id}>
                            <ProductCard product={product} />
                        </React.Fragment>
                    )
                })}
            </Carousel>

            <CarouselMobile products={mostViewed} />
        </section>
    )
}

export default MostViewed