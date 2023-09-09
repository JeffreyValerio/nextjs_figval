import { format } from "util";

export const metadata = (product: any, previousImages: any) => {
    const metadata = {
        metadataBase: new URL('https:nextjs-figval.vercel.app'),
        alternates: {
            canonical: '/',
        },
        title: product?.attributes?.name,
        description: `product?.attributes?.description`,
        category: product?.attributes?.category?.data?.attributes?.name,
        openGraph: {
            title: product?.attributes?.name,
            description: `product?.attributes?.description`,
            images: [product?.attributes?.thumbnail?.data?.attributes?.formats?.small?.url, ...previousImages],
            siteName: 'Figval',
            type: 'website',
            emails: 'ventas@figval.com',
            phoneNumbers: '(506) 87654321',
            url: product?.attributes?.slug,
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Figval',
            description: `product?.attributes?.description`,
            creator: 'Figval',
            images: [product?.attributes?.thumbnail?.data?.attributes?.formats?.small?.url, ...previousImages],
        },
        formatDetection: {
            url: product?.attributes?.slug,
            email: false,
            address: false,
            telephone: false,
        },
        robots: {
            index: true,
            follow: true,
            nocache: true,
            googleBot: {
                index: true,
                follow: true,
                noimageindex: false,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        icons: {
            icon: '/favicon.icon',
            shortcut: '/favicon.icon',
            apple: '/favicon.icon',
            other: {
                rel: 'favicon',
                url: '/favicon.icon',
            },
        },
        other: {
            price: format(product?.attributes?.price),
            rating: product?.attributes?.rating
        },
    };

    return metadata;
}