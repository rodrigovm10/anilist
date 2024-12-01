import { cn } from '@/lib/utils'
import { Anime, Status } from '@/types/anime'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Badge } from './ui/badge'

export function AnimeCard({ anime }: { anime: Anime }) {
  return (
    <Card className='flex flex-col h-full'>
      <CardHeader className='p-0'>
        <Image
          src={anime.image}
          alt={anime.title}
          width={300}
          height={450}
          className='w-full object-contain rounded-t-lg'
        />
      </CardHeader>
      <CardContent className='flex-grow p-4'>
        <h2 className='text-xl font-semibold mb-2'>{anime.title}</h2>
        <p className=' text-sm mb-2 text-muted-foreground'>{anime.synopsis.slice(0, 200)}...</p>
        <div className='flex justify-between items-center mb-2'>
          <span className='text-sm text-muted-foreground'>Episodes: {anime.episodes}</span>
          <p
            className={cn(
              'tracking-wide text-xs font-semibold',
              anime.status === Status.FinishedAiring ? 'text-rose-500' : 'text-emerald-500'
            )}
          >
            {anime.status}
          </p>
        </div>
        <div className='flex flex-wrap gap-1'>
          {anime.genres.slice(0, 3).map(genre => (
            <Badge
              key={genre}
              className='text-xs'
            >
              {genre}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className='p-4 pt-0'>
        <Link
          href={`/anime/${anime._id}`}
          className='text-sm text-primary hover:underline '
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  )
}

//   <CardContent className='flex-grow p-4'>
//     <h2 className='text-xl font-semibold mb-2'>{anime.title}</h2>
//     <p className='text-sm text-muted-foreground mb-2'>{anime.shortDescription}</p>
//     <div className='flex justify-between items-center mb-2'>
//       <span className='text-sm text-muted-foreground'>Episodes: {anime.episodes}</span>
//       <Badge variant={anime.isFinished ? 'secondary' : 'default'}>
//         {anime.isFinished ? 'Completed' : 'Ongoing'}
//       </Badge>
//     </div>
//     <div className='flex flex-wrap gap-1'>
//       {anime.genres.slice(0, 3).map(genre => (
//         <Badge
//           key={genre}
//           variant='outline'
//           className='text-xs'
//         >
//           {genre}
//         </Badge>
//       ))}
//     </div>
//   </CardContent>
//   <CardFooter className='p-4 pt-0'>
//     <Link
//       href={`/anime/${anime.id}`}
//       className='text-sm text-primary hover:underline'
//     >
//       View Details
//     </Link>
//   </CardFooter>
// </Card>
