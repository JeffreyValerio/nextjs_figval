'use client'

import { Bannners, Categories, Hero, MostViewed, NewArrivals, TopSellers } from "@/components";
import { strapiFetch } from "@/libs";

export default async function HomePage() {

  const [
    resHero,
    resCategories,
    resNewArrivals,
    resBanners,
    resMostViewed,
    resTopSellers,
  ] = await Promise.all([
    strapiFetch(`/hero?populate=carousel,top,bottom`, 'default', { next: { revalidate: 3600 } }),
    strapiFetch(`/categories?populate=*`, 'force-cache'),
    strapiFetch(`/products?pagination[limit]=6&populate=*&sort=id:desc`, 'no-cache'),
    strapiFetch(`/banner?populate=principal,aside`, 'no-cache', { next: { revalidate: 3600 } }),
    strapiFetch(`/products?pagination[limit]=6&populate=*`, 'no-cache'),
    strapiFetch(`/products?pagination[limit]=4&populate=*`, 'no-cache'),
  ])
  const [hero, categories, newArrivals, banners, mostViewed, topSellers] = await Promise.all([
    resHero, resCategories, resNewArrivals, resBanners, resMostViewed, resTopSellers,
  ])

  return (
    <main>
      <Hero hero={hero} />
      {/* <Categories categories={categories} /> */}

      <NewArrivals newArrivals={newArrivals} />

      <Bannners banners={banners} />

      <div className="overflow-hidden grid grid-cols-1 min-[768px]:grid-cols-4 min-[768px]:gap-8 my-8">
        <div className="col-start-1 col-end-2 sm:col-start-1 sm:col-end-4">
          <MostViewed mostViewed={mostViewed} />
        </div>
        <div className="col-start-4 col-end-5">
          <div className="hidden min-[768px]:block h-full">
            <TopSellers topSellers={topSellers} />
          </div>
        </div>
      </div>
    </main>
  )
}   