import { createUser, useGetUser } from '@/db/queries'
import { comparePassword, hashPassword } from '@/lib/bcrypt'
import { generateRandomWord } from '@/lib/jwt'
import { toast } from 'sonner'
import { useAuth } from './useAuth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useLocalStorage } from './useLocalStorage'

interface User {
  name: string
  password: string
}

export interface UserAuth {
  id: number
  name: string
}

export function useRegisterLogin() {
  const [user, setUser] = useState<User>({ name: '', password: '' })
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const userDb = useGetUser(user.name)
  const { login } = useAuth()
  const router = useRouter()

  const [userLocalStorage, setUserLocalStorage] = useLocalStorage<UserAuth>('user', {
    id: 0,
    name: ''
  })

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

      setUserLocalStorage({ id: userDb.user.id!, name: userDb.user.name })

      const tokenGenerated = generateRandomWord()
      toast.success('Sign in successfully', {
        duration: 3000
      })

      login(tokenGenerated)
      router.push('/')
      setError('')
      setUser({ name: '', password: '' })
    } catch (error) {
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
      const [error, success] = await createUser({ name: user.name, password: passwordHashed })

      if (error) {
        toast.success('User cannot be registered, try later', {
          duration: 3000
        })
        return
      }

      if (success) {
        const tokenGenerated = generateRandomWord()
        toast.success('User registered successfully', {
          duration: 3000
        })
        setUserLocalStorage({ id: user.id!, name: user.name })
        login(tokenGenerated)
        router.push('/')
        setError('')
        setConfirmPassword('')
        setUser({ name: '', password: '' })
      }
    } catch (error) {
      setError(`Something went wrong: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    handleChangeConfirmPassword,
    handleChangeName,
    handleChangePassword,
    handleSubmitRegister,
    handleSubmitSignIn,
    error,
    isLoading,
    user,
    confirmPassword
  }
}
