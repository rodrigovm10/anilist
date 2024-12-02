import { fetcher } from '@/services/fetcher'
import { GET_ALL_URL } from '@/services/rapidapi-config'
import { Animes } from '@/types/anime'
import { Suspense } from 'react'
import Loading from './loading'
import { AnimeCard } from '@/components/anime-card'

export default async function Home() {
  const animes = await fetcher<Animes>(GET_ALL_URL)

  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='font-bold text-3xl mb-8 text-center'>
        Anilist, explore distins animes and added to your collection.
      </h1>
      <Suspense fallback={<Loading />}>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {animes?.data.map(anime => (
            <AnimeCard
              key={anime._id}
              anime={anime}
            />
          ))}
        </div>
      </Suspense>
    </main>
  )
}
