import { Inter } from 'next/font/google'
import './globals.css'
import SessionProvider from '@/provider/SessionProvider'
import AppConfig from '@/config/app'
import Sidebar from '@/components/ui/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: AppConfig.title,
  description: AppConfig.description,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en"> 
      <body className={inter.className}>
        <SessionProvider>
          <div className='flex'>
            <Sidebar/>
            <div className="flex-1 p-4 bg-gray-200">
              {children}
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
