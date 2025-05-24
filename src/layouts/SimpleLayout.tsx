import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const SimpleLayout = () => {
  return (
    <Layout className="min-h-screen">
      <Content className="p-6 flex items-center justify-center">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default SimpleLayout; 