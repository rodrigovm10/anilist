'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function SettingsPage() {
  const { isAuthenticated, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/signin')
    }
  }, [])

  if (!isAuthenticated) {
    return <div>Redirigiendo...</div>
  }
  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>Settings</h1>
      <section className='space-y-6'>
        <Card>
          <CardHeader>
            <CardTitle>Email registered</CardTitle>
            <CardDescription>See the email which you registered.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Email: <span>rv0611200369@gmail.com</span>
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
            >
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
