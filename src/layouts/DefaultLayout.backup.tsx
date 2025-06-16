import { Button } from 'antd';
import { SunOutlined, MoonOutlined, SettingOutlined, LinkOutlined } from '@ant-design/icons';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useThemeStore } from '../stores/themeStore';
import { useEffect } from 'react';

const DefaultLayout = () => {
  const { theme, toggleTheme } = useThemeStore();
  const location = useLocation();

  useEffect(() => {
    // 根据主题状态添加或移除 dark 类
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // 判断当前路径是否匹配
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <header 
        className="bg-white dark:bg-gray-800 px-6 flex items-center justify-between flex-shrink-0"
        style={{ height: '64px' }}
      >
        <div className="flex items-center space-x-8">
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center">
              <LinkOutlined className="text-white text-lg" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-800 dark:from-indigo-400 dark:to-indigo-600 bg-clip-text text-transparent group-hover:from-indigo-700 group-hover:to-indigo-900 dark:group-hover:from-indigo-300 dark:group-hover:to-indigo-500 transition-all duration-300">
              网鸦-LinkHub
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/chat" 
              className={`font-medium transition-colors relative group ${
                isActive('/chat') 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
              }`}
            >
              AI聊天
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 transition-all ${
                isActive('/chat') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            <Link 
              to="/settings" 
              className={`font-medium transition-colors relative group ${
                isActive('/settings') 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
              }`}
            >
              设置
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 transition-all ${
                isActive('/settings') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
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
            className="!w-10 !h-10 bg-gray-100 hover:bg-gray-200 dark:!bg-gray-700 dark:hover:!bg-gray-600 !border-0 transition-all duration-200 !flex !items-center !justify-center"
            title={theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'}
          />
          <Link to="/settings">
            <Button 
              type="text" 
              icon={<SettingOutlined className="text-lg text-gray-600 dark:text-gray-400" />}
              className="!w-10 !h-10 bg-gray-100 hover:bg-gray-200 dark:!bg-gray-700 dark:hover:!bg-gray-600 !border-0 transition-all duration-200 !flex !items-center !justify-center"
              title="设置"
            />
          </Link>
        </div>
      </header>
      <main className="flex-1 bg-gray-50 dark:bg-gray-900 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout; 