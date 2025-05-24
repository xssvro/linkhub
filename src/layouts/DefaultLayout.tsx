import { Layout, Button } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { Outlet, Link } from 'react-router-dom';
import { useThemeStore } from '../stores/themeStore';
import { useEffect } from 'react';

const { Header, Content } = Layout;

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
    <Layout className="min-h-screen dark:bg-gray-900">
      <Header className="flex items-center justify-between px-4 dark:bg-gradient-to-r dark:from-pink-900 dark:via-purple-900 dark:to-pink-900 dark:border-b dark:border-pink-500 dark:border-opacity-50 dark:shadow-lg dark:shadow-pink-500/20">
        <div className="flex items-center">
          <Link to="/" className="text-white text-xl font-bold dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-pink-400 dark:to-pink-600 dark:shadow-sm">LinkHub</Link>
          <nav className="ml-6">
            <Link to="/" className="text-white mx-2 dark:text-pink-300 dark:hover:text-cyan-400 transition-colors">首页</Link>
            <Link to="/about" className="text-white mx-2 dark:text-pink-300 dark:hover:text-cyan-400 transition-colors">关于</Link>
            <Link to="/chat" className="text-white mx-2 dark:text-pink-300 dark:hover:text-cyan-400 transition-colors dark:font-bold flicker">AI聊天</Link>
            <Link to="/admin/dashboard" className="text-white mx-2 dark:text-pink-300 dark:hover:text-cyan-400 transition-colors">管理后台</Link>
          </nav>
        </div>
        <Button 
          type="text" 
          icon={theme === 'dark' ? <SunOutlined className="text-yellow-400" /> : <MoonOutlined />} 
          onClick={toggleTheme}
          className="text-white dark:bg-black dark:bg-opacity-30 dark:border dark:border-pink-500 dark:border-opacity-50 dark:hover:border-cyan-500"
        />
      </Header>
      <Content className="p-4 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-950">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default DefaultLayout; 