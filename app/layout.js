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
      <body className={`${inter.className} bg-dark-bg text-dark-text`}>
        <SessionProvider>
          <div className='flex w-screen h-screen'>
            <Sidebar/>
            <div className="w-full h-screen overflow-y-auto">
              {children}
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
