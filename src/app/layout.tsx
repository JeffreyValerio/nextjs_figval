import { Providers } from '@/contexts'
import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Footer, Header } from '@/components'
import ContentLayout from './layouts/ContentLayout'

const poppins = Poppins({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })

export const metadata: Metadata = {
  title: 'Figval su tienda en línea',
  description: 'Todo lo que busca en un mismo lugar',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${poppins.className} font-sans`}>
        <Providers>
          {/* <Header />  */}
          <ContentLayout>
            {children}
          </ContentLayout>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}