import { OPTIONS } from './rapidapi-config'
export async function fetcher<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, OPTIONS)

    if (!res.ok) {
      const error = new Error(`Error fetching data: ${res.status} ${res.statusText}`)
      throw error
    }

    const data: T = await res.json()
    return data
  } catch (error) {
    console.error('Fetcher error:', error)
    return null // O devuelve un objeto de error según lo que necesites
  }
}
