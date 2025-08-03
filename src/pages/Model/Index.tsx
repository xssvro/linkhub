import { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, Input, Space, Typography, Empty, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useModelStore } from '../../stores/modelStore';
import { AiConfig } from '../../core/model';

const { Title, Text } = Typography;
const { TextArea } = Input;

const ModelPage = () => {
  const { models, addModel, removeModel } = useModelStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedModel, setSelectedModel] = useState<any>(null);
  const [form] = Form.useForm();

  // 调试信息
  useEffect(() => {
    console.log('ModelPage 加载，当前模型数量:', models.length);
  }, [models]);

  // 显示新增模型弹窗
  const showAddModal = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  // 隐藏新增模型弹窗
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // 提交新增模型
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log('新增模型:', values);
      addModel(values);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  // 显示模型详情
  const showModelDetail = (model: any) => {
    setSelectedModel(model);
    setIsDetailModalVisible(true);
  };

  // 删除模型
  const handleDeleteModel = (modelName: string) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除模型 "${modelName}" 吗？`,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        removeModel(modelName);
      },
    });
  };

  return (
    <div className="min-w-[1480px] max-w-7xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <Title level={2} className="text-gray-900 dark:text-white mb-0">
            AI 模型管理
          </Title>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={showAddModal}
            className="btn-primary"
          >
            新增模型
          </Button>
        </div>
        <Text className="text-gray-600 dark:text-gray-400">
          管理您的 AI 模型配置，包括 API 密钥、服务地址等信息
        </Text>
      </div>



      {/* 模型列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {models.length > 0 ? (
          models.map((model, index) => (
            <Card
              key={index}
              hoverable
              className="bg-white dark:bg-gray-800 border-0 shadow-sm hover:shadow-md transition-shadow w-full"
              bodyStyle={{ padding: '20px' }}
              actions={[
                <Button
                  key="detail"
                  type="text"
                  size="small"
                  icon={<InfoCircleOutlined />}
                  onClick={() => showModelDetail(model)}
                  className="text-gray-500 hover:text-blue-600"
                >
                  详情
                </Button>,
                <Button
                  key="delete"
                  type="text"
                  size="small"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteModel(model.name)}
                  className="text-gray-500 hover:text-red-600"
                >
                  删除
                </Button>
              ]}
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-600 dark:text-gray-400 font-medium text-sm">
                      {model.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <Title level={5} className="text-gray-900 dark:text-white mb-0 truncate flex-1">
                    {model.name}
                  </Title>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <Text className="text-gray-500 dark:text-gray-400 text-sm block mb-2">API 地址</Text>
                    <Text className="text-gray-900 dark:text-gray-100 text-sm break-all leading-relaxed">
                      {model.apiUrl}
                    </Text>
                  </div>
                  
                  <div className="flex items-center justify-between pt-1">
                    <Text className="text-gray-500 dark:text-gray-400 text-sm">API 密钥</Text>
                    <div className={`w-3 h-3 rounded-full ${model.apiKey ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full">
            <Empty
              description="暂无模型配置"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            >
              <Button type="primary" onClick={showAddModal}>
                添加第一个模型
              </Button>
            </Empty>
          </div>
        )}
      </div>

      {/* 新增模型弹窗 */}
      <Modal
        title="新增 AI 模型"
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            apiUrl: 'https://api.openai.com/v1',
            apiKey: '',
            name: ''
          }}
        >
          <Form.Item
            label="模型名称"
            name="name"
            rules={[
              { required: true, message: '请输入模型名称' },
              { min: 2, message: '模型名称至少2个字符' }
            ]}
          >
            <Input placeholder="例如: GPT-4, Claude-3" />
          </Form.Item>

          <Form.Item
            label="API 地址"
            name="apiUrl"
            rules={[
              { required: true, message: '请输入 API 地址' },
              { type: 'url', message: '请输入有效的 URL' }
            ]}
          >
            <Input placeholder="例如: https://api.openai.com/v1" />
          </Form.Item>

          <Form.Item
            label="API 密钥"
            name="apiKey"
            rules={[
              { required: true, message: '请输入 API 密钥' },
              { min: 10, message: 'API 密钥格式不正确' }
            ]}
          >
            <Input.Password placeholder="请输入您的 API 密钥" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 模型详情弹窗 */}
      <Modal
        title="模型详情"
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsDetailModalVisible(false)}>
            关闭
          </Button>
        ]}
        width={600}
      >
        {selectedModel && (
          <div className="space-y-4">
            <div>
              <Text strong className="text-gray-700 dark:text-gray-300">模型名称:</Text>
              <div className="mt-1">
                <Text className="text-gray-900 dark:text-gray-100">{selectedModel.name}</Text>
              </div>
            </div>

            <div>
              <Text strong className="text-gray-700 dark:text-gray-300">API 地址:</Text>
              <div className="mt-1">
                <Text className="text-gray-900 dark:text-gray-100 break-all">{selectedModel.apiUrl}</Text>
              </div>
            </div>

            <div>
              <Text strong className="text-gray-700 dark:text-gray-300">API 密钥:</Text>
              <div className="mt-1">
                <Text className="text-gray-900 dark:text-gray-100">
                  {selectedModel.apiKey ? 
                    `${selectedModel.apiKey.substring(0, 8)}...${selectedModel.apiKey.substring(selectedModel.apiKey.length - 4)}` : 
                    '未配置'
                  }
                </Text>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded">
              <Text className="text-gray-600 dark:text-gray-400 text-sm">
                <InfoCircleOutlined className="mr-1" />
                提示：API 密钥已脱敏显示，实际使用时将使用完整密钥进行 API 调用。
              </Text>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ModelPage; 