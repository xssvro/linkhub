import { Button } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { Outlet, Link } from 'react-router-dom';
import { useThemeStore } from '../stores/themeStore';
import { useEffect } from 'react';

const DefaultLayout = () => {
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    // 根据主题状态添加或移除 dark 类
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <header 
        className="bg-white dark:bg-gray-800 px-6 flex items-center justify-between flex-shrink-0"
        style={{ height: '64px' }}
      >
        <div className="flex items-center space-x-8">
          <Link 
            to="/" 
            className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            LinkHub
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors relative group"
            >
              首页
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all group-hover:w-full"></span>
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors relative group"
            >
              关于
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all group-hover:w-full"></span>
            </Link>
            <Link 
              to="/chat" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors relative group"
            >
              AI聊天
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all group-hover:w-full"></span>
            </Link>
            <Link 
              to="/admin/dashboard" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors relative group"
            >
              管理后台
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all group-hover:w-full"></span>
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            type="text" 
            icon={theme === 'dark' ? 
              <SunOutlined className="text-lg text-yellow-500" /> : 
              <MoonOutlined className="text-lg text-gray-600" />
            } 
            onClick={toggleTheme}
            className="!w-10 !h-10 !rounded-full bg-gray-100 hover:bg-gray-200 dark:!bg-gray-700 dark:hover:!bg-gray-600 !border-0 transition-all duration-200 hover:scale-105 !flex !items-center !justify-center"
            title={theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'}
          />
        </div>
      </header>
      <main className="flex-1 bg-gray-50 dark:bg-gray-900 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout; 