'use client'

import { Bannners, Categories, Hero, NewArrivals } from "@/components";
import { strapiFetch } from "@/libs";

export default async function HomePage() {

  const [resHero, resCategories, resNewArrivals, resBanners, resMostViewed, resTopSellers, resBrands] =
    await Promise.all([
      strapiFetch(`/hero?populate=carousel,top,bottom`, 'force-cache'),
      strapiFetch(`/categories?populate=*`, 'force-cache'),
      strapiFetch(`/products?pagination[limit]=6&populate=*&sort=id:desc`, 'no-cache'),
      strapiFetch(`/banner?populate=principal,aside`, 'force-cache'),
      strapiFetch(`/products?pagination[limit]=6&populate=*`, 'no-cache'),
      strapiFetch(`/products?pagination[limit]=3&populate=*`, 'no-cache'),
      strapiFetch(`/brands?populate=*`, 'force-cache'),
    ])
  const [hero, categories, newArrivals, banners, mostViewed, topSellers, brands] =
    await Promise.all([resHero, resCategories, resNewArrivals, resBanners, resMostViewed, resTopSellers, resBrands])

  return (
    <main>
      <Hero hero={hero} />
      {/* <Categories categories={categories} /> */}

      <NewArrivals newArrivals={newArrivals} />

      <Bannners banners={banners} />
    </main>
  )
}   