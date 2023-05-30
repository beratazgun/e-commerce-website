import { create } from "zustand";

type SigninModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useSigninModal = create<SigninModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
