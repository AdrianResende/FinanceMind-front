import { create } from 'zustand';

// ---------------------------------------------------------------------------
// uiStore — estado global de UI (modais, overlays, etc.)
// Não persistido: estado efêmero de sessão.
// ---------------------------------------------------------------------------

interface UIState {
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

const useUIStore = create<UIState>()((set) => ({
  isLoginModalOpen: false,
  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),
}));

export default useUIStore;
