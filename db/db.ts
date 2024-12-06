import { Status, Type } from '@/types/anime'
import Dexie, { EntityTable } from 'dexie'

export interface User {
  id?: number
  name: string
  password: string
}

export interface AnimeDB {
  _id: string
  title: string
  alternativeTitles: string[]
  ranking: number
  genres: string[]
  episodes: number
  hasEpisode: boolean
  hasRanking: boolean
  image: string
  link: string
  status: Status
  synopsis: string
  thumb: string
  type: Type
  userId: number
}

export const db = new Dexie('anilist') as Dexie & {
  users: EntityTable<User, 'id'>
  animes: EntityTable<AnimeDB, '_id'>
}

db.version(1).stores({
  users: '++id, name, password',
  animes:
    '_id, title, alternativeTitles, ranking, genres, episodes, hasEpisode, hasRanking, image, link, status, synopsis, thumb, type, userId'
})
