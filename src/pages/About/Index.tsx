import { Card, Typography, Divider } from 'antd'
import { Link } from 'react-router-dom'
import TechStack from './TechStack'

const { Title, Paragraph } = Typography

const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-md">
        <Title level={2}>关于 LinkHub</Title>
        <Paragraph>
          LinkHub 是一个使用现代前端技术栈构建的应用。
        </Paragraph>
        
        <Divider />
        
        <TechStack />
        
        <Divider />
        
        <Link to="/" className="text-blue-500 hover:underline">返回首页</Link>
      </Card>
    </div>
  )
}

export default About