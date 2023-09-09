import React from 'react'
import Image from 'next/image'
import { ProductCard, Title } from '..'

const NewArrivals = ({ newArrivals }: any) => {
    return (
        <section className="mt-4 md:mt-8">
            <div className="flex justify-center">
                <Title>Nuevos Ingresos</Title>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-start-1 col-end-2 md:col-start-1 md:col-end-2">
                    <Image
                        className='object-cover h-full w-full'
                        src={`/images/new-arrivals.png`}
                        alt='New arrivals'
                        width={650}
                        height={760}
                        priority={true}
                    />
                </div>
                <div className="col-start-1 col-end-2 md:col-start-2 md:col-end-3">
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 gap-4">
                        {newArrivals.data.map((product: any) => (
                            <React.Fragment key={product.id}>
                                <ProductCard product={product} />
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NewArrivals