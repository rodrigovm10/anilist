'use client'

import { AnimeCard } from '@/components/anime-card'
import { useGetAnimesByUserId } from '@/db/queries'
import { useAuth } from '@/hooks/useAuth'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Anime } from '@/types/anime'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function FavoritesPage() {
  const { isAuthenticated, user } = useAuth()
  const animesFavorites = useGetAnimesByUserId(user.id)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/signin')
    }
  }, [])

  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='font-bold text-3xl mb-8'>Your Favorites</h1>
      <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {animesFavorites?.length === 0 && (
          <p className='text-gray-500'>You have no favorite animes yet.</p>
        )}
        {animesFavorites &&
          animesFavorites?.length > 0 &&
          animesFavorites?.map(anime => (
            <AnimeCard
              key={anime._id}
              anime={anime}
            />
          ))}
      </section>
    </main>
  )
}
