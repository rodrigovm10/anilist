import { db, User } from './db'
import { useLiveQuery } from 'dexie-react-hooks'

export const createUser = async ({
  name,
  password
}: User): Promise<[error?: string, success?: string]> => {
  try {
    await db.users.add({ name: name, password })
    return [undefined, 'User created successfully']
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
  }, [name])

  return { user }
}

export const deleteUser = async (id: number): Promise<[error?: string, success?: string]> => {
  try {
    console.log(id)
    await db.users.delete(id)
    return [undefined, 'Your account was deleted successfully']
  } catch (error) {
    return [`You cannot delete your account. Try later: ${error}`, undefined]
  }
}
