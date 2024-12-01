import { Badge } from '@/components/ui/badge'
import { fetcher } from '@/services/fetcher'
import { GET_BY_ID_URL } from '@/services/rapidapi-config'
import { Anime } from '@/types/anime'
import Image from 'next/image'
import { Status } from '@/types/anime'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'

export default async function AnimeDescriptionPage({ params }: { params: { id: string } }) {
  const anime = await fetcher<Anime>(GET_BY_ID_URL(params.id))
  if (!anime) return

  return (
    <Card className='max-w-4xl mx-auto my-8'>
      <CardHeader className='p-0'>
        <div className='relative h-[300px] md:h-[400px]'>
          <Image
            src={anime.image}
            alt={anime.title}
            fill
            quality={100}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='object-cover rounded-t-lg'
          />
        </div>
      </CardHeader>
      <CardContent className='p-6'>
        <div className='flex flex-col md:flex-row md:items-start md:justify-between mb-4'>
          <div>
            <h1 className='text-3xl font-bold mb-2 text-wrap'>{anime.title}</h1>
            <div className='flex items-center space-x-2 mb-2'>
              <Badge variant={anime.status === Status.FinishedAiring ? 'secondary' : 'default'}>
                {anime.status}
              </Badge>
              <span className='text-sm text-muted-foreground'>Episodes: {anime.episodes}</span>
            </div>
          </div>
          <div className='mt-2 md:mt-0'>
            <h2 className='text-lg font-semibold mb-2'>Genres</h2>
            <div className='flex flex-wrap gap-2'>
              {anime.genres.map(genre => (
                <Badge
                  key={genre}
                  variant='outline'
                >
                  {genre}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className='mb-4'>
          <Button
            variant='outline'
            className='w-full sm:w-auto font-semibold'
          >
            <Heart className='mr-2 size-4' /> Add to favorites
          </Button>
        </div>
        <div>
          <h2 className='text-xl font-semibold mb-2'>Synopsis</h2>
          <p className='text-muted-foreground'>{anime.synopsis}</p>
        </div>
      </CardContent>
      <CardFooter className='bg-muted/50 p-6'>
        <p className='text-sm text-muted-foreground'>
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </CardFooter>
    </Card>
  )
}
