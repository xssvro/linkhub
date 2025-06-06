import { Layout, Menu, Button } from 'antd';
import { 
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  SunOutlined, 
  MoonOutlined 
} from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import { useThemeStore } from '../stores/themeStore';
import { useState } from 'react';

const { Header, Content, Footer, Sider } = Layout;

const AdminLayout = () => {
  const { theme, toggleTheme } = useThemeStore();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: '仪表盘',
      onClick: () => navigate('/admin/dashboard')
    },
    {
      key: 'users',
      icon: <UserOutlined />,
      label: '用户管理',
      onClick: () => navigate('/admin/users')
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '系统设置',
      onClick: () => navigate('/admin/settings')
    }
  ];

  return (
    <Layout className="min-h-screen">
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        className="h-screen fixed left-0 top-0"
      >
        <div className="text-white text-center p-4 font-bold">
          {collapsed ? 'LH' : 'LinkHub Admin'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          items={menuItems}
        />
      </Sider>
      <Layout className={collapsed ? 'ml-[80px]' : 'ml-[200px]'}>
        <Header className="bg-white dark:bg-gray-800 flex items-center justify-between px-4">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined className="text-gray-700 dark:text-gray-300" /> : <MenuFoldOutlined className="text-gray-700 dark:text-gray-300" />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-700 dark:text-gray-300"
          />
          <Button 
            type="text" 
            icon={theme === 'dark' ? <SunOutlined className="text-yellow-500" /> : <MoonOutlined className="text-gray-600" />} 
            onClick={toggleTheme}
            className="text-gray-700 dark:text-gray-300"
          />
        </Header>
        <Content className="m-6 p-6 bg-white dark:bg-gray-800">
          <Outlet />
        </Content>
        <Footer className="text-center text-gray-600 dark:text-gray-400">LinkHub Admin ©{new Date().getFullYear()}</Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;