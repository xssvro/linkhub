import { Card, Typography, Divider } from 'antd'
import { Link } from 'react-router-dom'
import TechStack from './TechStack'

const { Title, Paragraph } = Typography

const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white dark:bg-gray-800">
        <Title level={2} className="text-gray-900 dark:text-white">关于 LinkHub</Title>
        <Paragraph className="text-gray-700 dark:text-gray-300">
          LinkHub 是一个使用现代前端技术栈构建的应用。
        </Paragraph>
        
        <Divider />
        
        <TechStack />
        
        <Divider />
        
        <Link to="/" className="link-primary hover:underline">返回首页</Link>
      </Card>
    </div>
  )
}

export default About