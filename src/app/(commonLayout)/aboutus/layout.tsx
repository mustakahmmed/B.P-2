import Link from 'next/link'
import React, { ReactNode } from 'react'

export default function layout({children}:{children:ReactNode}) {
  return (
    <div>
        <div className='flex gap-10'>
            <Link href="/aboutus/contruct">contruct</Link>
            <Link href="/aboutus/website">our website</Link>

        </div>
        {children}
    </div>
  )
}
