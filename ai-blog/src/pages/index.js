import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/header'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col mx-auto max-w-[960px] ${inter.className}`}
    >
      <Header />
      <h2 className="text-3xl font-bold mt-12">
        Blog posts
      </h2>
    </main>
  )
}
