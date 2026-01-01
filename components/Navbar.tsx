import Link from "next/link"
import Image from "next/image"

const Navbar = () => {
  return (
    <header>
      <nav>
        <Link href="/" className="logo">
            <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
            <p>Event</p>
        </Link>
        <ul className="flex flex-row items-center gap-6 list-none">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/">Event</Link></li>
            <li><Link href="/">Create Events</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
