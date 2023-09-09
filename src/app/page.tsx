'use client'

import Link from "next/link";

import { Categories, Hero } from "@/components";
import { strapiFetch } from "@/libs";

export default async function HomePage() {

  const [resHero, resCategories, resNewArrivals, resBanners, resMostViewed, resTopSellers, resBrands] =
    await Promise.all([
      strapiFetch(`/hero?populate=carousel,top,bottom`, 'no-cache'),
      strapiFetch(`/categories?populate=*`, 'no-cache'),
      strapiFetch(`/products?pagination[limit]=6&populate=*&sort=id:desc`, 'no-cache'),
      strapiFetch(`/banner?populate=principal,aside`, 'no-cache'),
      strapiFetch(`/products?pagination[limit]=6&populate=*`, 'no-cache'),
      strapiFetch(`/products?pagination[limit]=3&populate=*`, 'no-cache'),
      strapiFetch(`/brands?populate=*`, 'no-cache'),
    ])
  const [hero, categories, newArrivals, banners, mostViewed, topSellers, brands] =
    await Promise.all([resHero, resCategories, resNewArrivals, resBanners, resMostViewed, resTopSellers, resBrands])

  return (
    <main>
      <Hero hero={hero} />
      <Categories categories={categories} />

      <Link href={'/metabo-wev-17-125-quick-inox-600517420-esmeriladora-angular-125-mm-5-7600-rpm-1700-w-110-120-v-50-60-hz'}>Slug</Link>
    </main>
  )
}   