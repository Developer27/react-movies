import Image from 'next/image'
import React from 'react'
import SignoutBtn from './SignoutBtn'
import Link from 'next/link'

function Header() {
  return (
    <header className='flex w-full border justify-between'>
      <Link href={"/"} className='hover:cursor-pointer'>
        <Image src="/images/logo.jpg" alt='logo' width={50} height={50}/>
      </Link>
      
      <div className='flex pr-5'>
        <SignoutBtn />
      </div>
      
    </header>
  )
}

export default Header