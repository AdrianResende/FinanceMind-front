import { create } from 'zustand';
import type { Quote, MarketSummary } from '@/types/finance';

// ---------------------------------------------------------------------------
// marketStore — cotações e resumo do mercado em tempo real
// Separado do authStore seguindo o princípio de single-responsibility por domínio.
// ---------------------------------------------------------------------------

type FetchStatus = 'idle' | 'loading' | 'success' | 'error';

interface MarketState {
  // --- estado ---
  quotes: Record<string, Quote>; // indexado por ticker
  summary: MarketSummary | null;
  watchlist: string[];            // tickers favoritos do usuário
  status: FetchStatus;
  error: string | undefined;

  // --- ações ---
  setQuotes: (quotes: Quote[]) => void;
  setSummary: (summary: MarketSummary) => void;
  addToWatchlist: (ticker: string) => void;
  removeFromWatchlist: (ticker: string) => void;
  setStatus: (status: FetchStatus, error?: string) => void;
}

const useMarketStore = create<MarketState>()((set) => ({
  quotes: {},
  summary: null,
  watchlist: [],
  status: 'idle',
  error: undefined,

  setQuotes: (quotes) =>
    set({
      quotes: Object.fromEntries(quotes.map((q) => [q.ticker, q])),
      status: 'success',
      error: undefined,
    }),

  setSummary: (summary) => set({ summary }),

  addToWatchlist: (ticker) =>
    set((state) => ({
      watchlist: state.watchlist.includes(ticker)
        ? state.watchlist
        : [...state.watchlist, ticker],
    })),

  removeFromWatchlist: (ticker) =>
    set((state) => ({
      watchlist: state.watchlist.filter((t) => t !== ticker),
    })),

  setStatus: (status, error) => set({ status, error }),
}));

export default useMarketStore;
