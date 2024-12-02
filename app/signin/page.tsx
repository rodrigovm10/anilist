import { Chrome } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export default function SignInPage() {
  return (
    <main className='container mx-auto px-4 flex justify-center items-center '>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle>Sign In to AniList</CardTitle>
          <CardDescription>Use your Google account to sign in</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            // onClick={handleGoogleSignIn}
            className='w-full flex items-center justify-center'
          >
            <Chrome className='mr-2 h-4 w-4' />
            Sign in with Google
          </Button>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <p className='text-sm text-muted-foreground'>
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </main>
  )
}
