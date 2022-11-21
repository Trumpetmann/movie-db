/* eslint-disable no-plusplus */
import React from 'react'

import './list-item.css'
import noImg from './no-image-icon-23485(1).png'

function ListItem({ props }) {
  // const genres = props.genres.map(el)
  const img = props.img === null ? noImg : props.img
  let id = 0
  let dramaElements
  if (props.drama) {
    dramaElements = props.drama.map((el) => {
      id++
      return (
        <span className="drama" key={id}>
          {el}{' '}
        </span>
      )
    })
  } else {
    dramaElements = null
  }

  return (
    <li className="list-item">
      <img className="image" src={img} alt="" />
      <div className="item-descriptions">
        <h2>{props.name}</h2>
        <span className="date">{props.date}</span>
        <div className="drama-elements">{dramaElements}</div>
        <p>{props.description}</p>
      </div>
    </li>
  )
}

export default ListItem
