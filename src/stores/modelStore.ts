import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Model, AiConfig } from '../core/model';

interface ModelStore {
  models: Model[];
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  addModel: (config: AiConfig) => void;
  removeModel: (modelName: string) => void;
}

export const useModelStore = create<ModelStore>()(
  persist(
    (set, get) => ({
      models: [
        new Model({
          apiKey: '',
          apiUrl: 'https://api.deepseek.com/v1',
          name: 'deepseek-r1-250120'
        }),
        new Model({
          apiKey: '',
          apiUrl: 'https://api.anthropic.com/v1',
          name: 'claude-3.5-sonnet'
        })
      ],
      selectedModel: 'deepseek-r1-250120',
      setSelectedModel: (model) => set({ selectedModel: model }),
      addModel: (config) => set((state) => ({
        models: [...state.models, new Model(config)]
      })),
      removeModel: (modelName) => set((state) => ({
        models: state.models.filter(model => model.name !== modelName)
      })),
    }),
    {
      name: 'model-store', // 本地存储的键名
      // 自定义序列化方法，确保 Model 对象正确存储
      serialize: (state) => JSON.stringify(state),
      // 自定义反序列化方法，将存储的数据重新转换为 Model 对象
      deserialize: (str) => {
        const parsed = JSON.parse(str);
        return {
          ...parsed,
          models: parsed.models.map((modelData: any) => new Model(modelData))
        };
      },
    }
  )
);