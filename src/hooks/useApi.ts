import { useState, useCallback } from 'react';
import { get, post, put, del } from '../services/api';
import { AxiosRequestConfig } from 'axios';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseApiResult<T> extends ApiState<T> {
  execute: (params?: unknown, config?: AxiosRequestConfig) => Promise<void>;
  reset: () => void;
}

type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiConfig {
  method: ApiMethod;
  url: string;
  immediate?: boolean;
}

export function useApi<T>(apiConfig: ApiConfig): UseApiResult<T> {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (params?: unknown, requestConfig?: AxiosRequestConfig) => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        let response: T;

        switch (apiConfig.method) {
          case 'GET':
            response = await get<T>(apiConfig.url, params, requestConfig);
            break;
          case 'POST':
            response = await post<T>(apiConfig.url, params, requestConfig);
            break;
          case 'PUT':
            response = await put<T>(apiConfig.url, params, requestConfig);
            break;
          case 'DELETE':
            response = await del<T>(apiConfig.url, requestConfig);
            break;
          default:
            throw new Error(`不支持的请求方法: ${apiConfig.method}`);
        }

        setState({
          data: response,
          loading: false,
          error: null,
        });
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error : new Error('请求失败'),
        });
        throw error;
      }
    },
    [apiConfig.method, apiConfig.url]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return { ...state, execute, reset };
}

// 使用示例：
/*
// 1. 定义 API 配置
const userApi = {
  getUsers: {
    method: 'GET' as const,
    url: '/api/users',
  },
  createUser: {
    method: 'POST' as const,
    url: '/api/users',
  },
  updateUser: {
    method: 'PUT' as const,
    url: '/api/users/:id',
  },
  deleteUser: {
    method: 'DELETE' as const,
    url: '/api/users/:id',
  },
};

// 2. 在组件中使用
function UserList() {
  const { data: users, loading, error, execute: fetchUsers } = useApi<User[]>(userApi.getUsers);
  
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error.message}</div>;
  
  return (
    <div>
      {users?.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

// 3. 创建用户
function CreateUser() {
  const { execute: createUser } = useApi<User>(userApi.createUser);
  
  const handleSubmit = async (userData: UserData) => {
    try {
      await createUser(userData);
      // 处理成功
    } catch (error) {
      // 处理错误
    }
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
*/ 