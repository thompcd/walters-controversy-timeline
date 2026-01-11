import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Ryan Walters Era Timeline',
  description: 'An interactive timeline visualization of the Ryan Walters controversy and his 33-month tenure as Oklahoma State Superintendent of Education.',
  openGraph: {
    title: 'The Ryan Walters Era Timeline',
    description: 'An interactive timeline visualization of the Ryan Walters controversy and his early resignation.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {children}
      </body>
    </html>
  )
}
