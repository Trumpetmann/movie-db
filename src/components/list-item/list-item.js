/* eslint-disable no-plusplus */
import React from 'react'

import './list-item.css'

function ListItem({ props }) {
  // const genres = props.genres.map(el)
  let id = 0
  const dramaElements = props.drama.map((el) => {
    id++
    return (
      <span className="drama" key={id}>
        {el}{' '}
      </span>
    )
  })

  return (
    <li className="list-item">
      <img className="image" src={props.img} alt="" />
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
