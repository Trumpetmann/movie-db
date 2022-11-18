import React from 'react'

import ListItem from '../list-item'
import './list.css'

function List({ movieList }) {
  const elements = movieList.map((el) => <ListItem props={el} key={el.id} />)

  return <ul className="list">{elements}</ul>
}

export default List
