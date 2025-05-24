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
        <Header className="bg-white flex items-center justify-between px-4 shadow-sm">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
          <Button 
            type="text" 
            icon={theme === 'dark' ? <SunOutlined /> : <MoonOutlined />} 
            onClick={toggleTheme}
          />
        </Header>
        <Content className="m-6 p-6 bg-white rounded-md">
          <Outlet />
        </Content>
        <Footer className="text-center">LinkHub Admin ©{new Date().getFullYear()}</Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;