import Link from 'next/link'

export function Footer() {
  return (
    <footer className='mt-10 transition-all mb-2'>
      <p className='text-center font-medium opacity-60 hover:opacity-100  transition-all'>
        🚀 Built by{' '}
        <Link
          href='https://github.com/rodrigovm10'
          target='_blank'
          className='underline underline-offset-2 '
        >
          @rodrigovm10
        </Link>
      </p>
    </footer>
  )
}
