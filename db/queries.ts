import { Anime } from '@/types/anime'
import { db, User } from './db'
import { useLiveQuery } from 'dexie-react-hooks'

export const createUser = async ({
  name,
  password
}: User): Promise<[error?: string, success?: string, id?: number]> => {
  try {
    const id = await db.users.add({ name: name, password })

    return [undefined, 'User created successfully', id]
  } catch (error) {
    return [`You cannot create a user. Try later: ${error}`, undefined]
  }
}

export const useGetUser = (name: string) => {
  const user = useLiveQuery(async () => {
    const user = await db.users.where('name').equals(name).first()

    return user
  }, [name])

  return { user }
}

export const useGetUserById = (id: number) => {
  const user = useLiveQuery(async () => {
    const user = await db.users.where('id').equals(id).first()

    return user
  }, [id])

  return { user }
}

export const deleteUser = async (id: number): Promise<[error?: string, success?: string]> => {
  try {
    await db.users.delete(id)
    return [undefined, 'Your account was deleted successfully']
  } catch (error) {
    return [`You cannot delete your account. Try later: ${error}`, undefined]
  }
}

export const addAnimeFavorite = async (
  userId: number,
  anime: Anime
): Promise<[error?: string, success?: string]> => {
  try {
    await db.animes.add({ ...anime, userId })

    return [undefined, 'Anime added to favorites']
  } catch (error) {
    return [`You cannot add anime to favorites ${error}`, undefined]
  }
}

export const useGetAnimesByUserId = (userId: number) => {
  const animes = useLiveQuery(async () => {
    // Check that `userId` is defined and valid
    if (userId === undefined || userId === null) {
      return undefined
    }

    // Query the `animes` table
    const anime = await db.animes.where('userId').equals(userId).toArray()
    return anime
  }, [userId]) // Dependencies array to re-run when `userId` changes

  return animes
}

export const useGetAnimeById = (id: string) => {
  const animes = useLiveQuery(async () => {
    const anime = await db.animes.where('_id').equals(id).first()
    return anime
  }, [id])

  return { animes }
}

export const useGetAllAnimes = () => {
  const animes = useLiveQuery(async () => {
    const anime = await db.animes.toArray()
    return anime
  }, [])

  return { animes }
}

export const deleteAnimeFromFavorites = async (
  id: string
): Promise<[error?: string, success?: string]> => {
  try {
    await db.animes.delete(id)
    return [undefined, 'The anime was deleted']
  } catch (error) {
    return [`You can not delete this anime. Try later: ${error}`, undefined]
  }
}
