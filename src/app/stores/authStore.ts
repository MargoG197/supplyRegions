import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  is_staff: boolean;
}

interface AuthState {
  currentUser: User | null;
  isLoading: boolean;
  setRole: (isStaff: boolean) => void; 
}

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: {
    id: '1',
    name: 'Test Volunteer',
    is_staff: true, 
  },
  isLoading: false,
  setRole: (isStaff) => 
    set((state) => ({
      currentUser: state.currentUser 
        ? { ...state.currentUser, is_staff: isStaff } 
        : null
    })),
}));