import { useState, useRef, useEffect } from 'react';
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
  const [messages, setMessages] = useState<MessageProps[]>([
    { content: '你好，我是AI助手，有什么可以帮助你的?', sender: 'ai', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentAiMessage, setCurrentAiMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [aiMessageAdded, setAiMessageAdded] = useState(false);

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

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // 添加用户消息
    const userMessage: MessageProps = {
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
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
        { role: 'user', content: inputValue }
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
  };

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

  // 格式化时间
  const formatTime = (date: Date) => {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  // 添加消息出现动画效果
  const addMessageAnimation = (index: number) => {
    return `animate-[slide-in_0.3s_ease-out_${index * 0.05}s_both]`;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      <div className="flex-1 overflow-auto bg-gray-50 dark:bg-black dark:bg-opacity-60 rounded-md p-4 mb-4 dark:border dark:border-pink-500 dark:border-opacity-30 dark:backdrop-blur-sm dark:shadow-lg dark:shadow-pink-500/10">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'} ${addMessageAnimation(index)}`}
          >
            <div className={`flex ${message.sender === 'user' ? 'flex-row-reverse' : ''} w-full`}>
              {message.sender === 'ai' ? 
                  <div className="w-full max-w-full dark:bg-black dark:bg-opacity-30 dark:p-3 dark:rounded-md dark:border-l-2 dark:border-pink-500 hover:dark:border-cyan-500 transition-colors duration-300">
                    <AnswerAction content={message.content} />
                  </div> : 
                  <div
                    className={`${
                      message.sender === 'user' 
                        ? 'mx-2 p-3 bg-gray-100 dark:bg-purple-900 dark:bg-opacity-40 rounded-md text-right dark:text-pink-300 dark:shadow-lg dark:shadow-purple-500/20 dark:border dark:border-pink-500 dark:border-opacity-30 hover:dark:border-cyan-400 transition-colors duration-300 neon-text-pink' 
                        : 'dark:text-pink-300'
                    }`}
                  >
                    <div className="text-sm break-words">{message.content}</div>
                    <div className="text-xs text-gray-500 dark:text-pink-400 mt-1 neon-text-pink">{formatTime(message.timestamp)}</div>
                  </div>
              }
            </div>
          </div>
        ))}
        {loading && !currentAiMessage && (
          <div className="flex mb-4 items-center gap-1 dark:text-pink-400 animate-pulse">
            <Spin indicator={<LoadingOutlined style={{ color: '#fc3bfb' }} spin />} size="small" />
            <span className="dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-pink-400 dark:to-pink-600 flicker">思考中...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="flex flex-col">
        <TextArea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="输入消息..."
          autoSize={{ minRows: 1, maxRows: 4 }}
          onPressEnter={(e) => {
            if (!e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          className="flex-1 mb-2 dark:bg-black dark:bg-opacity-70 dark:text-pink-300 dark:border-purple-600 dark:focus:border-pink-400 dark:placeholder-purple-400 dark:placeholder-opacity-60 dark:shadow-inner dark:shadow-purple-500/10 transition-all duration-300 focus:dark:shadow-pink-500/20"
        />
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Select 
              value={selectedModel}
              onChange={(value) => setSelectedModel(value)}
              style={{ width: 120 }}
              options={models}
              className="dark:bg-black dark:bg-opacity-70 dark:text-pink-300 transition-all duration-300"
              dropdownClassName="dark:bg-gray-900 dark:text-pink-300 dark:border-purple-600"
            />
            {loading && (
              <Button 
                danger
                onClick={() => {
                  abort();
                  setLoading(false);
                }}
                className="dark:bg-pink-900 dark:text-white dark:border-pink-600 dark:hover:bg-pink-700 dark:hover:border-pink-400 dark:shadow-md dark:shadow-pink-500/20 transition-all duration-300 dark:hover:neon-text-pink"
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
            className="dark:bg-gradient-to-r dark:from-pink-700 dark:to-purple-700 dark:border-pink-500 dark:hover:bg-pink-600 dark:text-white dark:hover:border-pink-400 dark:shadow-md dark:shadow-pink-500/30 transition-all duration-300 hover:dark:shadow-lg hover:dark:shadow-pink-500/40 dark:hover:neon-text-pink"
          >
            发送
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;