'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Loader } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { useRegisterLogin } from '@/hooks/useRegister'

export default function SignInPage() {
  const {
    error,
    handleChangeConfirmPassword,
    handleChangeName,
    handleChangePassword,
    handleSubmitRegister,
    handleSubmitSignIn,
    isLoading,
    user,
    confirmPassword
  } = useRegisterLogin()
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
