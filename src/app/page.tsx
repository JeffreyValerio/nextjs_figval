'use client'

import { Bannners, Categories, Hero, NewArrivals } from "@/components";
import { strapiFetch } from "@/libs";

export default async function HomePage() {

  const [
    resHero,
    resCategories,
    resNewArrivals,
    resBanners,
  ] = await Promise.all([
    strapiFetch(`/hero?populate=carousel,top,bottom`, 'default', { next: { revalidate: 3600 } }),
    strapiFetch(`/categories?populate=*`, 'force-cache'),
    strapiFetch(`/products?pagination[limit]=6&populate=*&sort=id:desc`, 'no-cache'),
    strapiFetch(`/banner?populate=principal,aside`, 'no-cache', { next: { revalidate: 3600 } }),
  ])
  const [hero, categories, newArrivals, banners] = await Promise.all([
    resHero, resCategories, resNewArrivals, resBanners,
  ])

  return (
    <main>
      <Hero hero={hero} />
      {/* <Categories categories={categories} /> */}

      <NewArrivals newArrivals={newArrivals} />

      <Bannners banners={banners} />
    </main>
  )
}   