'use client'

import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { useAuth } from '@/hooks/useAuth'
import { deleteUser, useGetUserById } from '@/db/queries'
import { toast } from 'sonner'

export function AccountActions() {
  const { logout, user: userLogged } = useAuth()

  const router = useRouter()
  const user = useGetUserById(userLogged.id)

  const handleClickDeleteAccount = async () => {
    if (!user.user) return
    const [error, success] = await deleteUser(user.user.id!)

    if (error) {
      toast.error(error)
      return
    }
    if (success) {
      toast.success(success)

      router.push('/')
      logout()
    }
  }

  return (
    <>
      <Button
        className='w-full'
        onClick={() => {
          router.push('/')
          logout()
        }}
      >
        Sign Out
      </Button>
      <Button
        variant='destructive'
        className='w-full'
        onClick={handleClickDeleteAccount}
      >
        Delete Account
      </Button>
    </>
  )
}
