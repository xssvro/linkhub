import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

// 创建 axios 实例
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    // 可以在这里添加认证 token
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 全局错误处理
    if (error.response) {
      // 服务器返回错误状态码
      switch (error.response.status) {
        case 401:
          // 未授权，可以重定向到登录页
          break
        case 403:
          // 禁止访问
          break
        case 404:
          // 资源不存在
          break
        case 500:
          // 服务器错误
          break
        default:
          break
      }
    }
    return Promise.reject(error)
  }
)

// 封装 GET 请求
export const get = <T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> => {
  return apiClient.get(url, { params, ...config }).then((res: AxiosResponse<T>) => res.data)
}

// 封装 POST 请求
export const post = <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return apiClient.post(url, data, config).then((res: AxiosResponse<T>) => res.data)
}

// 封装 PUT 请求
export const put = <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return apiClient.put(url, data, config).then((res: AxiosResponse<T>) => res.data)
}

// 封装 DELETE 请求
export const del = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return apiClient.delete(url, config).then((res: AxiosResponse<T>) => res.data)
}

export default {
  get,
  post,
  put,
  del,
} 