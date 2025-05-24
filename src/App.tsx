import { useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import { useThemeStore } from './stores/themeStore'
import routes from './routes'

const App = () => {
  const { theme } = useThemeStore()
  const element = useRoutes(routes)
  
  useEffect(() => {
    // 根据主题状态添加或移除 dark 类
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return element
}

export default App 