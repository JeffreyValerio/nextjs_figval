import React from "react";
import TopSellersCard from "../cards/TopSellersCard";
import { Title } from "..";

const TopSellers = ({ topSellers }: any) => {
    return (
        <section className="h-full flex flex-col">
            <Title className="flex justify-start ">Los más vendidos</Title>

            <div className="flex flex-col h-full justify-between">
                {topSellers && topSellers.data.map((product: any) => {
                    return (
                        <React.Fragment key={product.id}>
                            <TopSellersCard product={product} />
                        </React.Fragment>
                    )
                })}
            </div> 
        </section>
    )
}

export default TopSellers