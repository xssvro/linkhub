import { Card, Typography, Button } from 'antd'
import { Link } from 'react-router-dom'

const { Title, Paragraph } = Typography

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white dark:bg-gray-800">
        <Title level={2} className="text-gray-900 dark:text-white">欢迎使用 LinkHub</Title>
        <Paragraph className="my-4 text-gray-700 dark:text-gray-300">
          这是一个使用 React、TypeScript、Ant Design、Tailwind CSS 和 Zustand 构建的现代 Web 应用。
        </Paragraph>
        <div className="flex space-x-4">
          <Button type="primary">
            <Link to="/about" className="text-white">了解更多</Link>
          </Button>
          <Button className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-white">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-white">
              访问 GitHub
            </a>
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default Home