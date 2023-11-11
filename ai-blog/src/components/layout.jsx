// layout component that renders the header and children
import { Inter } from 'next/font/google'
import Header from '@/components/header'

const inter = Inter({ subsets: ['latin'] })

const Layout = ({ children }) => {
  return (
    <div>
      <main className={`flex min-h-screen flex-col mx-auto max-w-[960px] px-4 ${inter.className}`}>
      <Header />
        {children}
      </main>
    </div>
  );
};

export default Layout