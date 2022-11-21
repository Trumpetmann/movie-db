/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable no-await-in-loop */
/* eslint-disable class-methods-use-this */

import { format } from 'date-fns'

export default class MovieService {
  apiKey = '?api_key=57f868ec52483fb281bfc50125cca3e7'

  apiKeySearch = '&api_key=57f868ec52483fb281bfc50125cca3e7'

  // defaultPath = 'https://api.themoviedb.org/3/movie/'

  searchPath = 'https://api.themoviedb.org/3/search/movie?query='

  imagePath = 'https://image.tmdb.org/t/p/original'

  genrePath = 'https://api.themoviedb.org/3/'

  totalPage = 5000

  getResource(url, pageNumber = 1) {
    return fetch(`${this.searchPath}${url}${this.apiKeySearch}&page=${pageNumber}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Could not fetch url , received ${res.status}`)
        }
        return res.json()
      })
      .then((body) => {
        this.totalPage = body.total_pages
        return this.pageMovies(body.results)
      })
  }

  getPopularMovies(pageNumber = 1) {
    return fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=57f868ec52483fb281bfc50125cca3e7&page=${pageNumber}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Could not fetch url , received ${res.status}`)
        }
        return res.json()
      })
      .then((body) => {
        this.totalPage = body.total_pages
        return this.pageMovies(body.results)
      })
  }

  async getGenre() {
    const genres = 'genre/movie/list'
    const res = await fetch(`${this.genrePath}${genres}${this.apiKey}`)
    if (!res.ok) {
      throw new Error(`Could not fetch url , received ${res.status}`)
    }
    return res.json()
  }

  async pageMovies(body) {
    const images = []
    const genres = await this.getGenre().then((dramas) => dramas.genres)

    for (let i = 0; i < body.length; i++) {
      if (body[i].poster_path === null) {
        const img = null
        images.push(img)
      } else {
        const img = await this.getImage(body[i].poster_path)
        images.push(img)
      }
    }

    let count = 0
    
    return body.map((el) => this.transformMovie(el, images[count++], genres))
  }

  transformMovie(el, img, genres) {
    const dramas = el.genre_ids.length !== 0 ? el.genre_ids.map((i) => genres.find((x) => x.id === i).name) : null
    const timeFormat = el.release_date ? format(new Date(el.release_date), 'MMMM dd, yyyy') : null
    return {
      id: el.id,
      name: el.title,
      drama: dramas,
      date: timeFormat,
      description: el.overview,
      img,
    }
  }

  async getImage(url) {
    const res = await fetch(`${this.imagePath}${url}`)

    if (!res.ok) {
      throw new Error(`Could not fetch url , received ${res.status}`)
    }
    return res.url
  }
}
