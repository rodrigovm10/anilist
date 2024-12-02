'use client'

import { useFavorites } from '@/hooks/useFavorites'
import { Button } from './ui/button'
import { Heart } from 'lucide-react'
import { Anime } from '@/types/anime'
import { cn } from '@/lib/utils'

export function AddFavorites({ id, anime }: { id: string; anime: Anime }) {
  const { handleClickAddFavorites, isAnimeFavoriteSaved } = useFavorites(id)

  return (
    <Button
      onClick={() => handleClickAddFavorites(anime)}
      variant='outline'
      className='w-full sm:w-auto font-semibold'
    >
      <Heart className={cn('mr-2 size-4', isAnimeFavoriteSaved ? 'text-red-500' : '')} /> Add to
      favorites
    </Button>
  )
}
