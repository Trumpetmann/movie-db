export default class MovieService {
  apiKey = '?api_key=57f868ec52483fb281bfc50125cca3e7'

  defaultPath = 'https://api.themoviedb.org/3/movie/'

  imagePath = 'https://image.tmdb.org/t/p/original'

  genrePath = 'https://api.themoviedb.org/3/'

  async getResource(url) {
    const res = await fetch(`${this.defaultPath}${url}${this.apiKey}`)

    if (!res.ok) {
      throw new Error(`Could not fetch url , received ${res.status}`)
    }
    return res.json()
  }

  async getGenre() {
    const genres = 'genre/movie/list'
    const res = await fetch(`${this.genrePath}${genres}${this.apiKey}`)
    if (!res.ok) {
      throw new Error(`Could not fetch url , received ${res.status}`)
    }
    return res.json()
  }

  async getImage(url) {
    const res = await fetch(`${this.imagePath}${url}`)

    if (!res.ok) {
      throw new Error(`Could not fetch url , received ${res.status}`)
    }
    return res.url
  }
}
