import { useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [state, setState] = useState<T>(() => {
    try {
      const value = window.localStorage.getItem(key)
      return value ? (JSON.parse(value) as T) : initialValue
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return initialValue
    }
  })

  const setValue = (value: T) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
      setState(value)
    } catch (error) {
      console.error('Error writing to localStorage:', error)
    }
  }

  return [state, setValue]
}
