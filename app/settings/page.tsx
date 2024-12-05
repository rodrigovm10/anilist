'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { deleteUser, useGetUserById } from '@/db/queries'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

export default function SettingsPage() {
  const { isAuthenticated, logout, user: userLogged } = useAuth()

  const router = useRouter()
  const user = useGetUserById(userLogged.id)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/signin')
    }
  }, [])

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

  if (!isAuthenticated) {
    return <div>Redirigiendo...</div>
  }
  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>Settings</h1>
      <section className='space-y-6'>
        <Card>
          <CardHeader>
            <CardTitle>User name</CardTitle>
            <CardDescription>See your user name which you registered.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Username: <span>{user?.user?.name}</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Account actions</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
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
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
