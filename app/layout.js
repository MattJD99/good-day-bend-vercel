import { Inter, Roboto } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({ 
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Good Day Bend - Discover What\'s Good in Bend',
  description: 'Your daily guide to authentic local events, stories, and experiences in Bend, Oregon. We celebrate what makes this place special—for locals, by locals.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${roboto.className}`}>{children}</body>
    </html>
  )
}
