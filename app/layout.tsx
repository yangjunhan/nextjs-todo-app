import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from '@/app/lib/AntdRegistry'
import { RefreshProvider } from '@/app/components/refreshProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Todo List',
  description: 'Personal Todo List'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RefreshProvider>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </RefreshProvider>
      </body>
    </html>
  )
}
