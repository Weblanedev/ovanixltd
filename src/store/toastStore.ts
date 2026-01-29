import { create } from 'zustand';

interface ToastState {
  message: string | null;
  visible: boolean;
  show: (message: string) => void;
  hide: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: null,
  visible: false,

  show: (message: string) => set({ message, visible: true }),
  hide: () => set({ message: null, visible: false }),
}));
