'use client'

import { AccountActions } from '@/components/account-actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetUserById } from '@/db/queries'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function SettingsPage() {
  const { isAuthenticated, user: userLogged } = useAuth()

  const router = useRouter()
  const user = useGetUserById(userLogged.id)

  useEffect(() => {
    console.log(user)
    if (!isAuthenticated) {
      router.push('/signin')
    }
  }, [])

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
            <AccountActions />
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
