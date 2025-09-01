import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Good Day Bend - Discover What\'s Good in Bend',
  description: 'Your daily guide to authentic local events, stories, and experiences in Bend, Oregon. We celebrate what makes this place special—for locals, by locals.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
