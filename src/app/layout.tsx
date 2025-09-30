import './globals.css'

export const metadata = {
  title: 'Auto Glass Cash Flow Management',
  description: 'Comprehensive cash flow management system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
