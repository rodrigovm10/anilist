'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from './ui/button'
import { Link } from 'lucide-react'
import { toast } from 'sonner'

export function ShareAnime({ animeName }: { animeName: string }) {
  const handleShareAnime = () => {
    const options = {
      title: animeName,
      text: 'Hey check out this anime!\n',
      url: window.location.href
    }

    if (!navigator.share) return toast.error('You navigator has not permission to share')

    navigator
      .share(options)
      .then(() => toast.success('Anime shared'))
      .catch(() => toast.error('Error to share anime'))
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='outline'
            onClick={handleShareAnime}
          >
            <Link />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Share this anime</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
