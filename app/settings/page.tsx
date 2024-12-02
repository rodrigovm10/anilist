import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function SettingsPage() {
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
            <Button className='w-full'>Sign Out</Button>
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
