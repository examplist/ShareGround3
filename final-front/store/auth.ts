import { create } from 'zustand';

export interface AuthStore {
  dataStatus: string | null;
  photoStatus: string | null;
  email: string | null;
  name: string | null;
  photo: string | null;

  setData: (
    dataStatus: string | null,
    email: string | null,
    name: string | null
  ) => void;
  setPhoto: (photo: string | null) => void;
  setName: (name: string | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  dataStatus: null,
  photoStatus: null,
  email: null,
  name: null,
  photo: null,

  setData: (
    dataStatus: string | null,
    email: string | null,
    name: string | null
  ) => {
    set(() => ({ dataStatus, email, name }));
  },

  setPhoto: (photo: string | null) => {
    set(() => ({ photo }));
  },

  setName: (name: string | null) => {
    set(() => ({ name }));
  },
}));
