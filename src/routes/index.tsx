import { lazy, Suspense } from 'react'
import { RouteObject, Navigate } from 'react-router-dom'
import Loading from '@/components/Loading'
import DefaultLayout from '../layouts/DefaultLayout'
import SimpleLayout from '../layouts/SimpleLayout'

// 懒加载路由组件 - 直接引入组件文件
const NotFound = lazy(() => import('@/pages/NotFound/Index'))
const Chat = lazy(() => import('@/pages/Chat/Index'))
const Settings = lazy(() => import('@/pages/Settings/Index'))

// 路由配置
const routes: RouteObject[] = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/chat" replace />,
      },
      {
        path: 'chat',
        element: (
          <Suspense fallback={<Loading />}>
            <Chat />
          </Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<Loading />}>
            <Settings />
          </Suspense>
        ),
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