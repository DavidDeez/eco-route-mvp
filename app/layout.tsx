import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EcoRoute | Smart Waste Management',
  description: 'Tech-enabled circular economy platform for waste management.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jakarta.className} bg-slate-50 text-slate-900 flex min-h-screen flex-col md:flex-row antialiased selection:bg-emerald-200 selection:text-emerald-900`}>
        <Sidebar />
        <main className="flex-1 w-full overflow-y-auto mt-16 md:mt-0 pt-4 md:pt-0">
          {children}
        </main>
      </body>
    </html>
  )
}
