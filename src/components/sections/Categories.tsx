'use client';
import React from "react";

import "react-multi-carousel/lib/styles.css";

import Carousel from "react-multi-carousel";
import { CategoryCard } from "..";

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
        partialVisibilityGutter: 40
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
        partialVisibilityGutter: 30
    },
    tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 4,
        partialVisibilityGutter: 30
    },
    mobile: {
        breakpoint: { max: 640, min: 0 },
        items: 1,
        partialVisibilityGutter: 30
    }
};

const Categories = ({ categories }: any) => {
    return (
        <div className="pt-[30px] overflow-hidden">
            <Carousel
                responsive={responsive}
                partialVisible={true}
                swipeable={true}
                draggable={true}
                ssr={true}
                autoPlay={true}
                autoPlaySpeed={10000}
                infinite={true}
                pauseOnHover={true}
                sliderClass="sm:flex sm:gap-4"
                arrows={false}
            >
                {categories && categories.data.map((category: any) => {
                    if (category.attributes?.products?.data.length > 0) {
                        if (category.attributes?.category.data === null) {
                            return (
                                <React.Fragment key={category.id}>
                                    <CategoryCard
                                        category={category}
                                    />
                                </React.Fragment>
                            )
                        }
                    }
                })}
            </Carousel>
        </div >
    )
}

export default Categories