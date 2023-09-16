'use client'

import Image from 'next/image'

import delve from 'dlv';

import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'

const Hero = ({ hero }: any) => {

  if (!hero) return <></>

  const carousel = delve(hero, 'data.attributes.carousel.data')
  const top = delve(hero, 'data.attributes.top.data.attributes.url')
  const bottom = delve(hero, 'data.attributes.bottom.data.attributes.url')

  return (
    <section className="w-full max-h-[542px] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-4 w-full">

        {/* LEFT SIDE */}
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
            showArrows={true}
          >

            {carousel && carousel.map((img: any) => {
              return (
                <Image
                  className='w-auto h-auto'
                  key={img.id}
                  src={img.attributes.url}
                  alt={img.attributes?.name}
                  width={870}
                  height={510}
                  priority={true}
                />
              )
            })}

          </Carousel>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-start-4 col-end-5 hidden md:flex flex-col justify-between h-full gap-4">
          <Image
            className="w-auto h-auto"
            src={top}
            alt="image"
            width={310}
            height={247}
            priority={true} />

          <Image
            className="w-auto h-auto"
            src={bottom}
            alt="image"
            width={310}
            height={247}
            priority={true}
          />
        </div>

      </div>

    </section>
  )
}

export default Hero