import Dexie, { EntityTable } from 'dexie'

export interface User {
  id?: number
  name: string
  password: string
}

export const db = new Dexie('anilist') as Dexie & { users: EntityTable<User, 'id'> }

db.version(1).stores({
  users: '++id, name, password'
})
