import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Portfolio } from '@/types/finance';

// ---------------------------------------------------------------------------
// portfolioStore — carteira do usuário (persistida entre sessões)
// ---------------------------------------------------------------------------

type FetchStatus = 'idle' | 'loading' | 'success' | 'error';

interface PortfolioState {
  portfolio: Portfolio | null;
  status: FetchStatus;
  error: string | undefined;

  setPortfolio: (portfolio: Portfolio) => void;
  setStatus: (status: FetchStatus, error?: string) => void;
  clearPortfolio: () => void;
}

const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set) => ({
      portfolio: null,
      status: 'idle',
      error: undefined,

      setPortfolio: (portfolio) => set({ portfolio, status: 'success', error: undefined }),
      setStatus: (status, error) => set({ status, error }),
      clearPortfolio: () => set({ portfolio: null, status: 'idle', error: undefined }),
    }),
    {
      name: 'portfolio-storage',
      // Persiste apenas o portfólio, não metadados de fetch
      partialize: (state) => ({ portfolio: state.portfolio }),
    }
  )
);

export default usePortfolioStore;
