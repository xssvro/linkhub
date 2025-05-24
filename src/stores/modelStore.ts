import { create } from 'zustand';

interface ModelStore {
  models: { value: string; label: string }[];
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

export const useModelStore = create<ModelStore>((set) => ({
  models: [
    { value: 'deepseek-r1-250120', label: 'DeepSeek R1' },
    { value: 'claude-3.5-sonnet', label: 'Claude 3.5 Sonnet' }
  ],
  selectedModel: 'deepseek-r1-250120',
  setSelectedModel: (model) => set({ selectedModel: model }),
}));