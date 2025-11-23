export type TokenCategory = 'new-pairs' | 'final-stretch' | 'migrated';
export type SortField = 'symbol' | 'name' | 'price' | 'change24h' | 'volume' | 'timeListed';
export type SortOrder = 'asc' | 'desc';
export type NetworkFilter = 'all' | 'ethereum' | 'solana' | 'polygon' | 'arbitrum';

export interface Token {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume: number;
  timeListed: number;
  liquidity: number;
  network: 'Ethereum' | 'Solana' | 'Polygon' | 'Arbitrum';
  category: TokenCategory;
}

export interface PriceUpdate {
  tokenId: string;
  newPrice: number;
  direction: 'up' | 'down';
}