import React from 'react'
import { Alert } from 'antd'
import './error.css'

function Error() {
  return (
    <div className="error">
      <Alert message="Oops!" showIcon description="Something has gone terribly wrong!" type="error" />
    </div>
  )
}
export default Error
