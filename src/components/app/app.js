/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable no-await-in-loop */
import React, { Component } from 'react'
import { format } from 'date-fns'
import { Offline, Online } from 'react-detect-offline'
import { Result } from 'antd'
import './app.css'

import List from '../list/list'
import Spinner from '../spinner'
import Error from '../error'
import MovieService from '../../serices/movie-service'

export default class App extends Component {
  movieSearch = new MovieService()

  state = {
    movieList: [],
    loading: true,
    error: false,
  }

  constructor() {
    super()
    this.movieSearch
      .getResource('popular')
      .then((res) => this.setPopularMovies(res.results))
      .catch(() => {
        this.setState({
          loading: false,
          error: true,
        })
      })
  }

  async setPopularMovies(body) {
    const images = []
    const genres = await this.movieSearch.getGenre().then((body) => body.genres)

    for (let i = 0; i < body.length; i++) {
      const img = await this.movieSearch.getImage(body[i].poster_path)
      images.push(img)
    }

    let i = 0

    const movieArr = body.map((el) => {
      const dramas = el.genre_ids.map((el) => genres.find((x) => x.id === el).name)

      return {
        id: el.id,
        name: el.title,
        drama: dramas,
        date: format(new Date(el.release_date), 'MMMM dd, yyyy'),
        description: el.overview,
        img: images[i++],
      }
    })
    this.setState({
      movieList: movieArr,
      loading: false,
    })
  }

  render() {
    const { movieList, loading, error } = this.state
    const errorText = error ? <Error /> : null
    const loader = loading ? <Spinner /> : null
    const list = !loading && !error ? <List movieList={movieList} /> : null

    return (
      <div className="app">
        <Online>
          {errorText}
          {list}
          {loader}
        </Online>
        <Offline>
          <InternetConnection />
        </Offline>
      </div>
    )
  }
}

function InternetConnection() {
  return (
    <div className="no-internet">
      <Result title="No internet." />
    </div>
  )
}
