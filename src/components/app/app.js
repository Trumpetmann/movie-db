/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable no-await-in-loop */
import React, { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'
import { Result, Pagination } from 'antd'
import './app.css'
import { debounce } from 'lodash'

import Header from '../header'
import List from '../list/list'
import Spinner from '../spinner'
import Error from '../error'
import MovieService from '../../serices/movie-service'

export default class App extends Component {
  movieSearch = new MovieService()

  state = {
    mode: 'popular',
    currentPage: 1,
    movieList: [],
    loading: true,
    error: false,
    queryString: '',
  }

  searchMovie = debounce((e) => {
    this.setState({
      loading: true,
      error: false,
    })
    const query = e.target.value

    this.setState({ queryString: query })

    if (!query) {
      return this.popularList()
    }

    return this.movieSearch
      .getResource(query)
      .then((res) => {
        this.setState({
          mode: 'search',
          movieList: res,
          loading: false,
          error: false,
        })
      })
      .catch((e) => {
        console.log(e)
        this.setState({
          loading: false,
          error: true,
        })
      })
  }, 1000)

  componentDidMount() {
    this.popularList()
  }

  changePagination = (e) => {
    const { mode, queryString } = this.state

    this.setState({
      loading: true,
    })

    if (mode === 'popular') {
      return this.movieSearch
        .getPopularMovies(e)
        .then((res) => {
          this.setState({
            currentPage: e,
            mode: 'popular',
            movieList: res,
            loading: false,
          })
        })
        .catch((e) => {
          console.log(e)
          this.setState({
            loading: false,
            error: true,
          })
        })
    }
    return this.movieSearch
      .getResource(queryString, e)
      .then((res) => {
        this.setState({
          mode: 'search',
          currentPage: e,
          movieList: res,
          loading: false,
          error: false,
        })
      })
      .catch((e) => {
        console.log(e)
        this.setState({
          loading: false,
          error: true,
        })
      })
  }

  popularList() {
    return this.movieSearch
      .getPopularMovies()
      .then((res) => {
        this.setState({
          mode: 'popular',
          movieList: res,
          loading: false,
        })
      })
      .catch((e) => {
        console.log(e)
        this.setState({
          loading: false,
          error: true,
        })
      })
  }

  render() {
    const { movieList, loading, error, currentPage } = this.state

    const errorText = error ? <Error /> : null
    const loader = loading ? <Spinner /> : null
    const list = !loading && !error ? <List movieList={movieList} /> : null
    const pages = this.movieSearch.totalPage >= 500 ? 500 : this.movieSearch.totalPage
    const pagination =
      !loading && !error ? (
        <div className="pagination">
          <Pagination
            showQuickJumper
            defaultCurrent={currentPage}
            total={pages * 10}
            onChange={this.changePagination}
          />
        </div>
      ) : null
    const noResults = movieList.length === 0 && !loading ? <span className="no-results">No results :(</span> : null

    return (
      <div className="app">
        <div className="list-container">
          <Online>
            <Header searchMovie={this.searchMovie} />
            {errorText}
            {list}
            {noResults}
            {loader}
            {pagination}
          </Online>
          <Offline>
            <InternetConnection />
          </Offline>
        </div>
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
