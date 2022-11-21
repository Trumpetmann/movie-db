import React from 'react'
import { Tabs, Input } from 'antd'
import './header.css'

function Header({ searchMovie }) {
  return (
    <div className="tabs">
      <Tabs defaultActiveKey="1" centered>
        <Tabs.TabPane tab="Search" key="1">
          <div className="input">
            <Input placeholder="Type to search..." onChange={searchMovie} />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Rated" key="2" />
      </Tabs>
    </div>
  )
}
export default Header
