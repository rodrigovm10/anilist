'use client'

import { Anime } from '@/types/anime'
import { useState } from 'react'
import { useLocalStorage } from './useLocalStorage'

export function useFavorites(id: string) {
  const [animesFavorites, setAnimesFavorites] = useLocalStorage<Anime[]>('animes-favorites', [])

  const [isAnimeFavoriteSaved, setIsAnimeFavoriteSaved] = useState(() => {
    // Verifica si el anime ya está en la lista de favoritos
    return animesFavorites.some(item => item._id === id)
  })

  const handleClickAddFavorites = (anime: Anime) => {
    // Verifica si el anime ya está en favoritos
    const isAnimeInLocalStorage = animesFavorites.some(item => item._id === anime._id)

    if (isAnimeInLocalStorage) {
      // Elimina el anime si ya está en favoritos
      const updatedFavorites = animesFavorites.filter(item => item._id !== anime._id)
      setAnimesFavorites(updatedFavorites)
      setIsAnimeFavoriteSaved(false)
    } else {
      // Agrega el anime a favoritos
      const updatedFavorites = [...animesFavorites, anime]
      setAnimesFavorites(updatedFavorites)
      setIsAnimeFavoriteSaved(true)
    }
  }

  return { isAnimeFavoriteSaved, handleClickAddFavorites, animesFavorites }
}
