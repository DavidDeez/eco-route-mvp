import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EcoRoute MVP',
  description: 'Waste Management & Circular Economy Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 flex min-h-screen flex-col md:flex-row`}>
        <Sidebar />
        <main className="flex-1 w-full overflow-y-auto mt-16 md:mt-0 pt-4 md:pt-0">
          {children}
        </main>
      </body>
    </html>
  )
}
