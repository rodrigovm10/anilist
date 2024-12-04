import { db, User } from './db'
import { useLiveQuery } from 'dexie-react-hooks'

export const createUser = async ({ name, password }: User) => {
  try {
    await db.users.add({ name: name, password })
  } catch (error) {
    throw error
  }
}

export const useGetUser = (name: string) => {
  const user = useLiveQuery(async () => {
    const user = await db.users.where('name').equals(name).first()

    return user
  }, [name])

  return { user }
}
