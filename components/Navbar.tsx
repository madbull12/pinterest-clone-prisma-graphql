import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='py-4 px-2 max-w-7xl mx-auto'>
        <ul>
            <Link href="/">
                <Image className='cursor-pointer' width={30} height={30} alt='logo' src="https://www.freepnglogos.com/uploads/pinterest-logo-p-png-0.png" />
            
            </Link>
        </ul>
    </nav>
  )
}

export default Navbar