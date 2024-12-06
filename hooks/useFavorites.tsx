'use client'

import { addAnimeFavorite, deleteAnimeFromFavorites, useGetAnimesByUserId } from '@/db/queries'
import { Anime } from '@/types/anime'
import { useState, useEffect } from 'react'

export function useFavorites(id: string, userId: number) {
  // Retrieve user's favorite animes
  const animesFavorites = useGetAnimesByUserId(userId)

  // State to track if the anime is currently a favorite
  const [isAnimeFavoriteSaved, setIsAnimeFavoriteSaved] = useState(false)

  // Effect to update `isAnimeFavoriteSaved` whenever `animesFavorites` or `id` changes
  useEffect(() => {
    if (animesFavorites) {
      const isFavorite = animesFavorites.some(item => item._id === id)
      setIsAnimeFavoriteSaved(isFavorite)
    }
  }, [animesFavorites, id])

  // Handle adding or removing the anime from favorites
  const handleClickAddFavorites = (anime: Anime) => {
    if (!anime || !anime._id) return

    if (isAnimeFavoriteSaved) {
      // Remove from favorites
      deleteAnimeFromFavorites(anime._id)
        .then(() => setIsAnimeFavoriteSaved(false))
        .catch(err => console.error('Error removing anime from favorites:', err))
    } else {
      // Add to favorites
      addAnimeFavorite(userId, anime)
        .then(() => setIsAnimeFavoriteSaved(true))
        .catch(err => console.error('Error adding anime to favorites:', err))
    }
  }

  return { isAnimeFavoriteSaved, handleClickAddFavorites, animesFavorites }
}
