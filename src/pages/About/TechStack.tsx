import { Typography, Space } from 'antd'

const { Title, Text } = Typography

const TechStack = () => {
  return (
    <>
      <Title level={3} className="text-gray-900 dark:text-white">技术栈</Title>
      <Space direction="vertical">
        <Text className="text-gray-700 dark:text-gray-300">• React - 用户界面库</Text>
        <Text className="text-gray-700 dark:text-gray-300">• TypeScript - 类型安全</Text>
        <Text className="text-gray-700 dark:text-gray-300">• Vite - 快速的开发环境</Text>
        <Text className="text-gray-700 dark:text-gray-300">• Ant Design - UI 组件库</Text>
        <Text className="text-gray-700 dark:text-gray-300">• Tailwind CSS - 实用优先的 CSS 框架</Text>
        <Text className="text-gray-700 dark:text-gray-300">• Zustand - 状态管理</Text>
        <Text className="text-gray-700 dark:text-gray-300">• React Router - 路由管理</Text>
      </Space>
    </>
  )
}

export default TechStack