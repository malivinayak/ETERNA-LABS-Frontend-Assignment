export const CATEGORIES = {
  'new-pairs': { label: 'New Pairs', icon: '✨' },
  'final-stretch': { label: 'Final Stretch', icon: '🏁' },
  'migrated': { label: 'Migrated', icon: '🚀' },
} as const;

export const NETWORKS = {
  ethereum: { label: 'Ethereum', color: 'from-blue-400 to-blue-600' },
  solana: { label: 'Solana', color: 'from-purple-400 to-purple-600' },
  polygon: { label: 'Polygon', color: 'from-pink-400 to-pink-600' },
  arbitrum: { label: 'Arbitrum', color: 'from-orange-400 to-orange-600' },
} as const;

export const SORT_FIELDS = ['symbol', 'name', 'price', 'change24h', 'volume', 'timeListed'] as const;

export const PAGE_TITLES = {
  pulse: 'Spectral Orderbook – Token Discovery',
  home: 'Spectral Orderbook',
} as const;