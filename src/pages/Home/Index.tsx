import { Card, Typography, Button } from 'antd'
import { Link } from 'react-router-dom'

const { Title, Paragraph } = Typography

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto dark:bg-gray-900 dark:text-white">
      <Card className="shadow-md dark:bg-gray-800 dark:border-gray-700">
        <Title level={2} className="dark:text-white">欢迎使用 LinkHub</Title>
        <Paragraph className="my-4 text-color-primary dark:text-gray-300">
          这是一个使用 React、TypeScript、Ant Design、Tailwind CSS 和 Zustand 构建的现代 Web 应用。
        </Paragraph>
        <div className="flex space-x-4">
          <Button type="primary" className="dark:bg-blue-600 dark:border-blue-600">
            <Link to="/about" className="dark:text-white">了解更多</Link>
          </Button>
          <Button className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="dark:text-white">
              访问 GitHub
            </a>
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default Home