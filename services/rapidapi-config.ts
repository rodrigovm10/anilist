export const GET_ALL_URL =
  'https://anime-db.p.rapidapi.com/anime?page=1&size=20&sortOrder=asc&types=TV'

export const GET_BY_ID_URL = (id: string) => `https://anime-db.p.rapidapi.com/anime/by-id/${id}`

export const OPTIONS = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '4a9fe83da3mshfff0e7c23dc5424p16eb5ejsn57350bfc520a',
    'x-rapidapi-host': 'anime-db.p.rapidapi.com'
  }
}
