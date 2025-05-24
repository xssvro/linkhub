import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/reset.css'
import './index.css'
import { ConfigProvider, theme } from 'antd'
import { BrowserRouter } from 'react-router-dom'
import { useThemeStore } from './stores/themeStore'

const { defaultAlgorithm, darkAlgorithm } = theme

const Main = () => {
  const { theme: currentTheme } = useThemeStore()

  return (
    <ConfigProvider
      theme={{
        algorithm: currentTheme === 'dark' ? darkAlgorithm : defaultAlgorithm,
        cssVar: {
          key: 'app'
        }
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
)