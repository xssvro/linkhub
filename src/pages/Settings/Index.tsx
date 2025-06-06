import { Card, Typography, Switch, Select, Button, Space, Divider } from 'antd'
import { useThemeStore } from '../../stores/themeStore'
import { useModelStore } from '../../stores/modelStore'
import { Link } from 'react-router-dom'

const { Title, Text } = Typography

const Settings = () => {
  const { theme, toggleTheme } = useThemeStore()
  const { models, selectedModel, setSelectedModel } = useModelStore()

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white dark:bg-gray-800">
        <Title level={2} className="text-gray-900 dark:text-white">设置</Title>
        
        <Space direction="vertical" size="large" className="w-full">
          {/* 主题设置 */}
          <div>
            <Title level={4} className="text-gray-900 dark:text-white mb-2">主题设置</Title>
            <div className="flex items-center justify-between">
              <Text className="text-gray-700 dark:text-gray-300">暗色模式</Text>
              <Switch 
                checked={theme === 'dark'} 
                onChange={toggleTheme}
                checkedChildren="暗色"
                unCheckedChildren="亮色"
              />
            </div>
          </div>

          <Divider />

          {/* AI模型设置 */}
          <div>
            <Title level={4} className="text-gray-900 dark:text-white mb-2">AI模型设置</Title>
            <div className="flex items-center justify-between">
              <Text className="text-gray-700 dark:text-gray-300">默认模型</Text>
              <Select 
                value={selectedModel}
                onChange={setSelectedModel}
                style={{ width: 200 }}
                options={models}
              />
            </div>
          </div>

          <Divider />

          {/* 其他设置 */}
          <div>
            <Title level={4} className="text-gray-900 dark:text-white mb-2">其他设置</Title>
            <Space direction="vertical">
              <Text className="text-gray-700 dark:text-gray-300">更多设置功能即将推出...</Text>
            </Space>
          </div>

          <Divider />

          {/* 返回按钮 */}
          <div className="flex justify-between items-center">
            <Link to="/" className="link-primary hover:underline">
              返回首页
            </Link>
            <Button type="primary" className="btn-primary">
              保存设置
            </Button>
          </div>
        </Space>
      </Card>
    </div>
  )
}

export default Settings 