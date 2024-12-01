export interface Animes {
  data: Anime[]
  meta: Meta
}

export interface Anime {
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
}

export enum Status {
  FinishedAiring = 'Finished Airing',
  NotYetAired = 'Not yet aired'
}

export enum Type {
  Movie = 'Movie',
  Ova = 'OVA',
  TVSpecial = 'TV Special',
  Tv = 'TV'
}

export interface Meta {
  page: number
  size: number
  totalData: number
  totalPage: number
}
