'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Loader } from 'lucide-react'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createUser, useGetUser } from '@/db/queries'
import { toast } from 'sonner'
import { comparePassword, hashPassword } from '@/lib/bcrypt'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { generateRandomWord } from '@/lib/jwt'

interface User {
  name: string
  password: string
}

export default function SignInPage() {
  const [user, setUser] = useState<User>({ name: '', password: '' })
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const userDb = useGetUser(user.name)
  const [token, setToken] = useLocalStorage<string>('token', '')

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    setUser(prevUser => ({ ...prevUser, name: value }))
  }

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    setUser(prevUser => ({ ...prevUser, password: value.trimEnd() }))
  }

  const handleChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    setConfirmPassword(value.trimEnd())
  }

  const handleSubmitSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(userDb.user)
    setIsLoading(true)
    try {
      if (!userDb.user) {
        setError('There is not user with that name')
        return
      }

      const passwordCorrect = comparePassword(user.password, userDb.user.password)

      if (!passwordCorrect) {
        setError('Password wrong. Please try again.')
        return
      }

      const tokenGenerated = generateRandomWord()
      toast.success('Sign in successfully', {
        duration: 3000
      })
      setToken(tokenGenerated)
      setError('')
      setUser({ name: '', password: '' })
    } catch (error) {
      console.error(error)
      setError(`Something went wrong: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (user.password !== confirmPassword) return setError('Password does not match')

      const passwordHashed = hashPassword(user.password)
      await createUser({ name: user.name, password: passwordHashed })
      toast.success('User registered successfully', {
        duration: 3000
      })
      setError('')
      setConfirmPassword('')
      setUser({ name: '', password: '' })
    } catch (error) {
      setError(`Something went wrong: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className='container mx-auto px-4 flex justify-center items-center '>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle>Welcome to AniList</CardTitle>
          <CardDescription>Sign In into your account or create a new one</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue='sign-in'
            className='w-full'
          >
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger
                value='sign-in'
                className='font-bold'
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value='register'
                className='font-bold'
              >
                Register
              </TabsTrigger>
            </TabsList>
            <TabsContent value='sign-in'>
              <form
                onSubmit={handleSubmitSignIn}
                className='space-y-4'
              >
                <div className='space-y-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    value={user.name}
                    placeholder='John Doe'
                    onChange={handleChangeName}
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='password'>Password</Label>
                  <Input
                    id='password'
                    value={user.password}
                    placeholder='********'
                    onChange={handleChangePassword}
                    type='password'
                    required
                  />
                </div>
                {error && <p className='text-destructive dark:text-red-600'>{error}</p>}
                <Button
                  type='submit'
                  className={cn('w-full', isLoading && 'opacity-70')}
                >
                  {isLoading && <Loader className='animate-spin' />}
                  Sign In
                </Button>
              </form>
            </TabsContent>
            <TabsContent value='register'>
              <form
                onSubmit={handleSubmitRegister}
                className='space-y-4'
              >
                <div className='space-y-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    value={user.name}
                    placeholder='John Doe'
                    onChange={handleChangeName}
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='password'>Password</Label>
                  <Input
                    id='password'
                    value={user.password}
                    placeholder='********'
                    onChange={handleChangePassword}
                    type='password'
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='confirm-password'>Confirm Password</Label>
                  <Input
                    id='confirm-password'
                    value={confirmPassword}
                    placeholder='********'
                    onChange={handleChangeConfirmPassword}
                    type='password'
                    required
                  />
                </div>
                {error && <p className='text-destructive dark:text-red-600'>{error}</p>}
                <Button
                  type='submit'
                  className={cn('w-full font-medium', isLoading && 'opacity-70')}
                >
                  {isLoading && <Loader className='animate-spin' />}
                  Register
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  )
}
