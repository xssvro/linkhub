import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Input, Button, Spin, Select } from 'antd';
import { SendOutlined, LoadingOutlined } from '@ant-design/icons';
import { useStreamRequest } from '../../hooks/useRequest';
import AnswerAction from './actions/AnswerAction';

const { TextArea } = Input;
const API_URL = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';
const API_KEY = 'Bearer a3a70185-73df-4d8c-a3a2-78f943f9775b';

interface MessageProps {
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface StreamResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    delta: {
      content?: string;
    };
    finish_reason: string | null;
  }[];
}

import { useModelStore } from '../../stores/modelStore';

const Chat = () => {
  const { models, selectedModel, setSelectedModel } = useModelStore();
  
  // 将 Model 对象转换为 Select 组件需要的格式
  const modelOptions = models.map(model => ({
    value: model.name,
    label: model.name
  }));

  const [messages, setMessages] = useState<MessageProps[]>([
    { content: '你好，我是AI助手，有什么可以帮助你的?', sender: 'ai', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentAiMessage, setCurrentAiMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [aiMessageAdded, setAiMessageAdded] = useState(false);
  const [isComposing, setIsComposing] = useState(false);

  // 使用useCallback优化处理函数
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  }, []);

  // 处理输入法开始组合输入
  const handleCompositionStart = useCallback(() => {
    setIsComposing(true);
  }, []);

  // 处理输入法结束组合输入
  const handleCompositionEnd = useCallback(() => {
    setIsComposing(false);
  }, []);

  const handleAbort = useCallback(() => {
    abort();
    setLoading(false);
  }, []);

  // 使用useStreamRequest hook
  const { execute: executeStreamRequest, abort } = useStreamRequest<string>(
    API_URL,
    (chunk) => {
      // 检查是否是[DONE]标识
      if (chunk.trim() === '[DONE]') {
        console.log('接收到[DONE]标识，流式响应结束');
        setLoading(false);
        return;
      }
      
      // 解析JSON字符串为对象
      try {
        // 如果是空行，跳过处理
        if (!chunk.trim()) return;
        
        // 解析JSON
        const parsedChunk: StreamResponse = JSON.parse(chunk);
        console.log('收到流式数据:', parsedChunk);
        
        if (parsedChunk.choices && parsedChunk.choices[0]?.delta?.content) {
          const content = parsedChunk.choices[0].delta.content;
          setCurrentAiMessage(prev => prev + content);
        }
        
        // 检查是否完成
        if (parsedChunk.choices && parsedChunk.choices[0]?.finish_reason) {
          setLoading(false);
        }
      } catch (error) {
        console.error('解析流式数据失败:', error, chunk);
        
        // 对于无法解析的JSON，检查是否包含[DONE]标识
        if (typeof chunk === 'string' && chunk.includes('[DONE]')) {
          console.log('在错误数据中检测到[DONE]标识');
          setLoading(false);
        }
      }
    },
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': API_KEY,
      },
    },
    false // 不立即执行
  );
  
  // 当消息变化时滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentAiMessage]);

  // 使用useMemo优化消息列表渲染，代替memo
  const messageList = useMemo(() => {
    // 创建一个函数来格式化时间
    const formatTime = (date: Date) => {
      return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    // 创建一个函数来添加动画类
    const addMessageAnimation = (index: number) => {
      return `animate-[slide-in_0.3s_ease-out_${index * 0.05}s_both]`;
    };

    return messages.map((message, index) => (
      <div 
        key={`${index}-${message.timestamp.getTime()}`}
        className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'} ${addMessageAnimation(index)}`}
      >
        {message.sender === 'ai' ? (
          <div className="w-full max-w-full bg-white dark:bg-gray-800 p-3">
            <AnswerAction content={message.content} />
          </div>
        ) : (
          <div className="max-w-[70%] mx-2 p-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <div className="text-sm break-words whitespace-pre-wrap text-left">{message.content}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">{formatTime(message.timestamp)}</div>
          </div>
        )}
      </div>
    ));
  }, [messages]);

  // 使用useCallback优化发送消息函数
  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim()) return;
    
    // 添加用户消息
    const userMessage: MessageProps = {
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue; // 保存当前输入值
    setInputValue('');
    setLoading(true);
    setCurrentAiMessage('');
    setAiMessageAdded(false);

    // 构建请求数据
    const requestData = {
      model: 'ep-20250511174049-2dgcr',
      messages: [
        ...messages
          .filter(msg => msg.sender === 'user' || msg.sender === 'ai')
          .map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.content
          })),
        { role: 'user', content: currentInput }
      ],
      stream: true,
    };

    try {
      // 执行流式请求
      await executeStreamRequest({
        data: requestData
      });
      
      // 如果正常完成请求但未设置loading为false
      setLoading(false);
    } catch (error) {
      console.error('请求出错:', error);
      setLoading(false);
    }
  }, [inputValue, messages, executeStreamRequest]);

  // 优化按键处理
  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [isComposing, handleSendMessage]);

  // 当currentAiMessage改变时，如果未添加AI消息则添加一条
  useEffect(() => {
    if (currentAiMessage && !aiMessageAdded && loading) {
      // 添加新的AI回复消息
      const aiMessage: MessageProps = {
        content: currentAiMessage,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
      setAiMessageAdded(true);
    } else if (currentAiMessage && aiMessageAdded) {
      // 更新现有AI回复消息
      setMessages(prevMessages => 
        prevMessages.map((msg, index) => 
          index === prevMessages.length - 1 && msg.sender === 'ai'
            ? { ...msg, content: currentAiMessage }
            : msg
        )
      );
    }
  }, [currentAiMessage, aiMessageAdded, loading]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-800 p-4 mb-4 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400 dark:scrollbar-track-gray-800 dark:scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500 dark:hover:scrollbar-thumb-gray-500">
        {messageList}
        {loading && !currentAiMessage && (
          <div className="flex mb-4 items-center gap-1 text-gray-600 dark:text-gray-400 animate-pulse">
            <Spin indicator={<LoadingOutlined style={{ color: '#6b7280' }} spin />} size="small" />
            <span className="text-gray-700 dark:text-gray-300">思考中...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-4">
        <TextArea
          value={inputValue}
          onChange={handleInputChange}
          placeholder="输入消息..."
          autoSize={{ minRows: 1, maxRows: 4 }}
          onPressEnter={handleKeyPress}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          className="border-0 p-0 resize-none bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          style={{ 
            boxShadow: 'none',
            outline: 'none'
          }}
        />
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
          <div className="flex space-x-2">
            <Select 
              value={selectedModel}
              onChange={setSelectedModel}
              options={modelOptions}
              size="small"
              className="text-sm"
              dropdownStyle={{ minWidth: 200 }}
              dropdownClassName="custom-select-dropdown"
            />
            {loading && (
              <Button 
                danger
                size="small"
                onClick={handleAbort}
                className="text-xs"
              >
                停止生成
              </Button>
            )}
          </div>
          <Button 
            type="primary" 
            icon={<SendOutlined />} 
            onClick={handleSendMessage}
            disabled={loading || !inputValue.trim()}
            size="small"
            className="text-xs btn-primary"
          >
            发送
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;