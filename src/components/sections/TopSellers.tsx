import React from "react";
import TopSellersCard from "../cards/TopSellersCard";

const TopSellers = ({ topSellers }: any) => {
    return (
        <section className="">
            <h3 className="overflow-hidden relative after:content-[' '] after:inline-block box-border after:h-[2px] after:w-full after:absolute after:bg-[#ccc] after:right-0 after:top-[12px] mb-[39px] ">
                <span className=" bg-white uppercase relative text-[18px] font-semibold pr-3 tracking-tighter">
                    Los más vendidos
                </span>
            </h3>

            {topSellers && topSellers.data.map((product: any) => {
                return (
                    <React.Fragment key={product.id}>
                        <TopSellersCard product={product} />
                    </React.Fragment>
                )
            })}
        </section>
    )
}

export default TopSellers