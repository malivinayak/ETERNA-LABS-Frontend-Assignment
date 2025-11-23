
/**
 * Mock WebSocket service for simulating real-time price updates
 * In production, replace with actual WebSocket client (e.g., ws library)
 */

import { Token, PriceUpdate } from '@/lib/redux/types';

export class WebSocketMock {
  private subscribers = new Set<(update: PriceUpdate) => void>();
  private interval: NodeJS.Timeout | null = null;

  constructor(private tokens: Token[]) {}

  subscribe(callback: (update: PriceUpdate) => void): () => void {
    this.subscribers.add(callback);

    if (this.interval === null) {
      this.start();
    }

    return () => {
      this.subscribers.delete(callback);
      if (this.subscribers.size === 0) {
        this.stop();
      }
    };
  }

  private start(): void {
    this.interval = setInterval(() => {
      this.tokens.forEach(token => {
        if (Math.random() < 0.3) {
          const change = (Math.random() - 0.5) * 0.2;
          const newPrice = Math.max(token.price + change, 0.001);

          const update: PriceUpdate = {
            tokenId: token.id,
            newPrice,
            direction: newPrice > token.price ? 'up' : 'down',
          };

          this.subscribers.forEach(cb => cb(update));
        }
      });
    }, 2500);
  }

  private stop(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  destroy(): void {
    this.stop();
    this.subscribers.clear();
  }
}
