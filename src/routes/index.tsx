import { lazy, Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import Loading from '@/components/Loading'
import DefaultLayout from '../layouts/DefaultLayout'
import SimpleLayout from '../layouts/SimpleLayout'
import AdminLayout from '../layouts/AdminLayout'

// 懒加载路由组件 - 直接引入组件文件
const Home = lazy(() => import('@/pages/Home/Index'))
const About = lazy(() => import('@/pages/About/Index')) 
const NotFound = lazy(() => import('@/pages/NotFound/Index'))
const Chat = lazy(() => import('@/pages/Chat/Index'))

// 路由配置
const routes: RouteObject[] = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<Loading />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: 'chat',
        element: (
          <Suspense fallback={<Loading />}>
            <Chat />
          </Suspense>
        ),
      },
    ]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'dashboard',
        element: <div>管理后台仪表盘页面</div>,
      },
      {
        path: 'users',
        element: <div>用户管理页面</div>,
      },
      {
        path: 'settings',
        element: <div>系统设置页面</div>,
      },
    ]
  },
  {
    path: '*',
    element: <SimpleLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <NotFound />
          </Suspense>
        ),
      }
    ]
  },
]

export default routes