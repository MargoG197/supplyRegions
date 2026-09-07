import { create } from 'zustand';

interface UIState {
  isMobileMenuOpen: boolean;
  isLoading: boolean;
  theme: 'light' | 'dark';
  modals: Record<string, { isOpen: boolean; data?: unknown }>;
  
  toggleMobileMenu: () => void;
  setLoading: (loading: boolean) => void;
  toggleTheme: () => void;
  openModal: (key: string, data?: unknown) => void;
  closeModal: (key: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  isLoading: false,
  theme: 'light',
  modals: {},

  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  setLoading: (loading) => set({ isLoading: loading }),

  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

  openModal: (key, data) =>
    set((state) => ({
      modals: { ...state.modals, [key]: { isOpen: true, data } },
    })),

  closeModal: (key) =>
    set((state) => ({
      modals: { ...state.modals, [key]: { isOpen: false } },
    })),
}));