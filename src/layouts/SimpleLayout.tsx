import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const SimpleLayout = () => {
  return (
    <Layout className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Content className="p-6 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default SimpleLayout; 