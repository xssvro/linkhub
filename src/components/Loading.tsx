import { Spin } from 'antd'
import React from 'react'

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full min-h-[200px]">
      <Spin size="large" tip="加载中..." />
    </div>
  )
}

export default Loading