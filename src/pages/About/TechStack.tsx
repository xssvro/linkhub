import { Typography, Space } from 'antd'

const { Title, Text } = Typography

const TechStack = () => {
  return (
    <>
      <Title level={3}>技术栈</Title>
      <Space direction="vertical">
        <Text>• React - 用户界面库</Text>
        <Text>• TypeScript - 类型安全</Text>
        <Text>• Vite - 快速的开发环境</Text>
        <Text>• Ant Design - UI 组件库</Text>
        <Text>• Tailwind CSS - 实用优先的 CSS 框架</Text>
        <Text>• Zustand - 状态管理</Text>
        <Text>• React Router - 路由管理</Text>
      </Space>
    </>
  )
}

export default TechStack