'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import naruto from '@/assets/naruto.png'
import { ITEMS_ROUTES } from '@/constants/item'
import { ThemeToggle } from './theme/theme-toggle'

export function Header() {
  const pathname = usePathname()

  return (
    <header className='flex justify-between items-center py-2 px-3 border-b-2 border-red-400'>
      <Link
        href='/'
        className='text-lg font-semibold'
      >
        <div className='flex items-center gap-x-2'>
          <Image
            width={20}
            height={20}
            src={naruto}
            alt='Anilist logo, naruto image.'
          />
          <p>Anilist</p>
        </div>
      </Link>
      <ul className='flex items-center gap-x-3'>
        {ITEMS_ROUTES.map(item => (
          <li
            key={item.id}
            className={cn(
              pathname === item.href && 'text-rose-500 underline underline-offset-8',
              'font-semibold'
            )}
          >
            <Link href={item.href}>{item.text}</Link>
          </li>
        ))}
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </header>
  )
}
