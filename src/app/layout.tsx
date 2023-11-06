import type { Metadata } from 'next'
import { DM_Mono, Inter, Londrina_Solid } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'N900UNS',
   description: 'Mint an original copy of the first 900 Nouns',
}

export const ls = Londrina_Solid({ subsets: ['latin'], variable: '--font-londrina', weight: "400" })
export const dm = DM_Mono({ subsets: ['latin'], variable: '--font-dm', weight: ["300", "400", "500"]})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   <html lang="en">
      <body className={`${inter.className} ${ls.variable} ${dm.variable}`}>
         <Providers>{children}</Providers>
      </body>
   </html>
  )
}
