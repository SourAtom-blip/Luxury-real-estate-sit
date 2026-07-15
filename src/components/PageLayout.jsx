import Navbar from './Navbar'
import Footer from './Footer'
import { useEffect } from 'react'

export default function PageLayout({ children }) {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div className="bg-obsidian-black min-h-screen flex flex-col">
      <Navbar inner />
      <main className="flex-1 pt-24">{children}</main>
      <Footer />
    </div>
  )
}
