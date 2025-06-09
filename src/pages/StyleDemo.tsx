import React from 'react';
import ModernCard from '../components/ModernCard';
import StatCard from '../components/StatCard';
import { 
  DesktopOutlined, 
  DatabaseOutlined, 
  CloudOutlined, 
  SignalFilled,
  ThunderboltOutlined,
  MonitorOutlined
} from '@ant-design/icons';

const StyleDemo: React.FC = () => {
  return (
    <div className="space-y-8 animate-in">
      {/* 标题区域 */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          现代化配色主题演示
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          基于监控界面设计的全新配色方案和组件系统
        </p>
      </div>

      {/* 统计卡片区域 */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
          系统监控样式卡片
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="GPU 利用率"
            value={99}
            unit="%"
            percentage={99}
            variant="danger"
            icon={<MonitorOutlined />}
            trend="up"
            trendValue="+5%"
          />
          <StatCard
            title="CPU 使用率"
            value={63}
            unit="%"
            percentage={63}
            variant="warning"
            icon={<DesktopOutlined />}
            trend="stable"
            trendValue="0%"
          />
          <StatCard
            title="GPU 显存"
            value="10396"
            unit="MB"
            percentage={66}
            variant="accent"
            icon={<DatabaseOutlined />}
            trend="up"
            trendValue="+2GB"
          />
          <StatCard
            title="系统内存"
            value="21.7"
            unit="GB"
            percentage={68}
            variant="secondary"
            icon={<CloudOutlined />}
            trend="down"
            trendValue="-1.2GB"
          />
        </div>
      </div>

      {/* 渐变卡片区域 */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
          渐变主题卡片
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ModernCard variant="gradient-danger">
            <div className="text-center space-y-3">
              <ThunderboltOutlined className="text-4xl text-white" />
              <h3 className="text-xl font-bold">高负载警告</h3>
              <p className="text-white/90">系统资源使用率过高，建议优化性能</p>
            </div>
          </ModernCard>
          
          <ModernCard variant="gradient-warning">
            <div className="text-center space-y-3">
              <SignalFilled className="text-4xl text-white" />
              <h3 className="text-xl font-bold">监控状态</h3>
              <p className="text-white/90">实时监控系统运行状态和性能指标</p>
            </div>
          </ModernCard>
          
          <ModernCard variant="gradient-secondary">
            <div className="text-center space-y-3">
              <CloudOutlined className="text-4xl text-white" />
              <h3 className="text-xl font-bold">内存管理</h3>
              <p className="text-white/90">智能内存分配和缓存优化策略</p>
            </div>
          </ModernCard>
        </div>
      </div>

      {/* 基础卡片区域 */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
          现代化基础卡片
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ModernCard>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                  <DesktopOutlined className="text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200">处理器信息</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">AMD Ryzen 7 9700X</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">基础频率</span>
                  <span className="font-medium">3.8 GHz</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">最大频率</span>
                  <span className="font-medium">5.4 GHz</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">核心数</span>
                  <span className="font-medium">8 核 16 线程</span>
                </div>
              </div>
            </div>
          </ModernCard>

          <ModernCard>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-warning-100 dark:bg-warning-900/30 rounded-lg flex items-center justify-center">
                  <MonitorOutlined className="text-warning-600 dark:text-warning-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200">显卡信息</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">AMD Radeon RX 9070 XT</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">显存</span>
                  <span className="font-medium">16 GB GDDR6</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">基础频率</span>
                  <span className="font-medium">2505 MHz</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">加速频率</span>
                  <span className="font-medium">2800 MHz</span>
                </div>
              </div>
            </div>
          </ModernCard>

          <ModernCard>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg flex items-center justify-center">
                  <CloudOutlined className="text-secondary-600 dark:text-secondary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200">内存信息</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">32 GB DDR5 6000</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">已使用</span>
                  <span className="font-medium">21.7 GB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">可用</span>
                  <span className="font-medium">10.3 GB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">使用率</span>
                  <span className="font-medium">67.8%</span>
                </div>
              </div>
            </div>
          </ModernCard>
        </div>
      </div>

      {/* 按钮示例区域 */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
          现代化按钮样式
        </h2>
        <div className="flex flex-wrap gap-4">
          <button className="btn-modern-primary">主要按钮</button>
          <button className="btn-modern-danger">危险按钮</button>
          <button className="btn-modern-warning">警告按钮</button>
          <button className="btn-modern-secondary">次要按钮</button>
        </div>
      </div>

      {/* 颜色板展示 */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
          配色方案
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="space-y-2">
            <div className="h-20 bg-gradient-primary rounded-lg shadow-lg"></div>
            <p className="text-sm font-medium text-center">Primary</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 bg-gradient-danger rounded-lg shadow-lg"></div>
            <p className="text-sm font-medium text-center">Danger</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 bg-gradient-warning rounded-lg shadow-lg"></div>
            <p className="text-sm font-medium text-center">Warning</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 bg-gradient-accent rounded-lg shadow-lg"></div>
            <p className="text-sm font-medium text-center">Accent</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 bg-gradient-secondary rounded-lg shadow-lg"></div>
            <p className="text-sm font-medium text-center">Secondary</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleDemo; 