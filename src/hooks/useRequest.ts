import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

interface RequestState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseRequestResult<T> extends RequestState<T> {
  execute: (config?: AxiosRequestConfig) => Promise<AxiosResponse<T> | void>;
  reset: () => void;
}

interface UseStreamRequestResult<T> extends Omit<RequestState<T>, 'data'> {
  data: T | null;
  execute: (config?: AxiosRequestConfig) => Promise<void>;
  reset: () => void;
  abort: () => void;
}

/**
 * 用于处理API请求的自定义Hook
 * 
 * @param url - 请求的URL
 * @param options - axios请求配置
 * @param immediate - 是否在组件挂载时立即执行请求
 * @returns {UseRequestResult} 请求状态和控制函数
 * 
 * @example
 * // 基本用法
 * const { data, loading, error, execute } = useRequest('/api/users');
 * 
 * // 手动触发
 * const { data, loading, error, execute } = useRequest('/api/users', {}, false);
 * const handleFetch = () => execute();
 */
function useRequest<T>(
  url: string,
  options: AxiosRequestConfig = {},
  immediate: boolean = true
): UseRequestResult<T> {
  const [state, setState] = useState<RequestState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (config: AxiosRequestConfig = {}) => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const mergedConfig = { ...options, ...config };
        const response: AxiosResponse<T> = await axios(url, mergedConfig);
        
        setState({
          data: response.data,
          loading: false,
          error: null,
        });
        
        return response;
      } catch (error) {
        const axiosError = error as AxiosError;
        setState({
          data: null,
          loading: false,
          error: axiosError instanceof Error ? axiosError : new Error('请求失败'),
        });
        throw error;
      }
    },
    [url, options]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate]);

  return { ...state, execute, reset };
}

/**
 * 用于处理流式API请求的自定义Hook
 * 
 * @param url - 请求的URL
 * @param onData - 处理流数据的回调函数
 * @param options - axios请求配置
 * @param immediate - 是否在组件挂载时立即执行请求
 * @returns {UseStreamRequestResult} 请求状态和控制函数
 * 
 * @example
 * // 基本用法
 * const { loading, error, execute, abort } = useStreamRequest(
 *   '/api/stream',
 *   (chunk) => console.log(chunk)
 * );
 * 
 * // 手动触发
 * const { loading, error, execute, abort } = useStreamRequest(
 *   '/api/stream',
 *   (chunk) => console.log(chunk),
 *   {},
 *   false
 * );
 */
/**
 * 用于处理流式API请求的自定义Hook (使用fetch API)
 * 
 * @param url - 请求的URL
 * @param onData - 处理流数据的回调函数
 * @param options - 请求配置
 * @param immediate - 是否在组件挂载时立即执行请求
 * @returns {UseStreamRequestResult} 请求状态和控制函数
 * 
 * @example
 * // 基本用法
 * const { loading, error, execute, abort } = useStreamRequest(
 *   '/api/stream',
 *   (chunk) => console.log(chunk)
 * );
 * 
 * // 手动触发
 * const { loading, error, execute, abort } = useStreamRequest(
 *   '/api/stream',
 *   (chunk) => console.log(chunk),
 *   {},
 *   false
 * );
 */
function useStreamRequest<T>(
  url: string,
  onData: (data: string) => void,
  options: AxiosRequestConfig = {},
  immediate: boolean = true
): UseStreamRequestResult<T> {
  const [state, setState] = useState<RequestState<T>>({
    data: null,
    loading: false,
    error: null,
  });
  
  const [controller, setController] = useState<AbortController | null>(null);

  const execute = useCallback(
    async (config: AxiosRequestConfig = {}) => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // 创建新的AbortController
      const newController = new AbortController();
      setController(newController);

      try {
        // 从axios配置中提取fetch需要的选项
        const { data, headers, method = 'GET', ...restConfig } = { ...options, ...config };
        
        // 构建fetch请求选项
        const fetchOptions: RequestInit = {
          method,
          headers: headers as HeadersInit,
          signal: newController.signal as AbortSignal,
          body: data ? JSON.stringify(data) : undefined,
          ...restConfig
        };
        
        // 发送fetch请求
        const response = await fetch(url, fetchOptions);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // 获取响应的ReadableStream
        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('无法获取响应流');
        }
        
        const decoder = new TextDecoder();
        let done = false;
        
        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
          
          if (!done && value) {
            // 解码二进制数据
            const text = decoder.decode(value, { stream: !readerDone });
            
            // 按行分割文本
            const lines = text.split('\n').filter(line => line.trim());
            
            for (const line of lines) {
              // 只处理SSE格式（data:前缀），其他格式原样返回
              if (line.startsWith('data: ')) {
                const content = line.slice(6); // 移除"data: "前缀
                onData(content);
              } else {
                // 非SSE格式数据原样返回
                onData(line);
              }
            }
          }
        }
        
        setState(prev => ({ ...prev, loading: false }));
      } catch (error) {
        // 忽略中止请求导致的错误
        if ((error as Error).name !== 'AbortError') {
          setState({
            data: null,
            loading: false,
            error: error instanceof Error ? error : new Error('流请求失败')
          });
        }
      } finally {
        setController(null);
      }
    },
    [url, options, onData]
  );

  const abort = useCallback(() => {
    if (controller) {
      controller.abort();
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [controller]);

  const reset = useCallback(() => {
    abort();
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, [abort]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
    
    return () => {
      // 组件卸载时中断请求
      if (controller) {
        controller.abort();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate]);

  return { ...state, execute, reset, abort };
}

export { useRequest as default, useStreamRequest }; 