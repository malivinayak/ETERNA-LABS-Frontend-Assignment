# Spectral Orderbook – Token Discovery Table

A production-grade Next.js 14 token discovery application inspired by Axiom Trade's Pulse dashboard, featuring a unique visual theme and advanced Hyperplexed-style interactions.

## 🎨 Visual Theme & Inspiration

### Color Palette
- **Deep Base**: Pure black and `purple-950` (`#0f0a1b`)
- **Accents**: Neon purple (`rgba(168, 85, 247)`) and warm amber (`rgba(251, 146, 60)`)
- **Text**: Desaturated purples and whites with high contrast (AA+)
- **Unique**: No standard SaaS palette; entirely custom and cohesive

### Hyperplexed-Inspired Interactions

1. **Canvas-Based Custom Cursor**
   - Purple gradient core (14px) with glow ring
   - Orbiting particle trail that responds to velocity
   - Expands on hover over interactive elements
   - Respects `prefers-reduced-motion` for accessibility

2. **Animated Background Blob**
   - Dual-layer glowing blobs using radial gradients
   - Subtle movement following cursor position
   - Blur-heavy (60-80px) for ambient effect
   - Non-intrusive and mobile-friendly

3. **Gradient Wipe Price Updates**
   - Real-time price updates every 2.5 seconds
   - Gradient animation flows left→right across price cells
   - Different colors for up (purple) vs down (orange)
   - Smooth 600ms easing transition

4. **Table Row Depth**
   - Hover states with background transitions
   - Shadow elevation on interactive rows
   - Gradient text for token symbols

---

## 🏗️ Architecture & Structure

### Atomic Design Pattern

```
src/components/
├── atoms/              # Primitives: Button, Badge, SortIcon, etc.
├── molecules/          # Composed: CursorTrail, TokenRow, SkeletonRow, etc.
└── organisms/          # Full sections: TokenTable, TokenDetailsDialog, TabNav
```

### State Management

**Redux Toolkit (Centralized State)**
- `tokensSlice`: Token data, WebSocket connection, live price updates
- `uiSlice`: Active tab, sort state, selected token, filters
- `preferencesSlice`: Reduced motion, cursor toggle

**React Query (Server State)**
- Fetch initial tokens from `/api/tokens`
- 30s stale time, 10min cache
- Automatic refetch on error (3 retries)

### Custom Hooks

- `useLivePrices()` – Simulates WebSocket updates and dispatches to Redux
- `useTokenTableState()` – Manages sorting, tab, selection
- `useCursorTrail()` – Canvas animation and mouse tracking
- `useBlobFollower()` – Blob position updates on cursor move
- `useReducedMotionPreference()` – Detects system preference and syncs Redux
- `useTokens()` – Fetches tokens via React Query

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm/yarn/pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/spectral-orderbook.git
cd spectral-orderbook

# Install dependencies
npm install

# Install shadcn/ui components (optional if not bundled)
npx shadcn-ui@latest init
npx shadcn-ui@latest add tooltip popover dialog

# Create .env.local (if needed for API routes)
echo "NEXT_PUBLIC_API_URL=http://localhost:3000" > .env.local
```

### Development

```bash
npm run dev
# Open http://localhost:3000/pulse
```

### Build & Deploy

```bash
npm run build
npm start
```

---

## 📊 Performance Optimizations

### Lighthouse Targets (90+)

1. **Bundle Optimization**
   - Code-split modals and heavy components
   - Tree-shaking unused Redux slices
   - Optimized Tailwind CSS purge

2. **Rendering Efficiency**
   - `React.memo` on `TokenTableRow` (prevents re-renders on parent updates)
   - `useMemo` for token filtering and sorting
   - `useCallback` for event handlers
   - Memoized Redux selectors

3. **Animation Performance**
   - Canvas-based cursor (no DOM thrashing)
   - CSS transforms for hover/scale effects
   - RequestAnimationFrame for smooth 60fps

4. **Image & Asset Optimization**
   - `next/image` for any logos (unoptimized in dev, optimized in prod)
   - CSS-based gradients (no PNG files)
   - SVG icons via `lucide-react`

### Interaction Latency (<100ms)

- Debounced sort/filter operations
- Immediate visual feedback on click/hover
- No blocking computations during scroll

---

## 🎛️ Configuration

### Environment Variables

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Tailwind Configuration

Custom extensions in `tailwind.config.ts`:
- Purple color scale (950 variant)
- Shimmer and pulse animations
- No breaking changes to Tailwind defaults

### Next.js Configuration

`next.config.js`:
- `reactStrictMode: true` – Catches side effects in dev
- `compress: true` – Gzip output
- `swcMinify: true` – Faster builds
- `experimental.optimizePackageImports` – Reduce bundle size

---

## 🧪 Testing & Validation

### Type Safety

```bash
npm run type-check
# Full TypeScript strict mode enabled
```

### Running Lighthouse

```bash
# Build for production
npm run build

# Start production server
npm start

# In another terminal, run Lighthouse CLI
lighthouse http://localhost:3000/pulse --chrome-flags="--headless --no-sandbox"
```

### Manual Testing Checklist

- [ ] Cursor trail visible on all pages
- [ ] Animated blob follows cursor smoothly
- [ ] Price updates show gradient wipe animations
- [ ] Tab switching smooth with no layout shift
- [ ] Sorting works on all columns
- [ ] Token detail modal opens/closes cleanly
- [ ] Filters popover works
- [ ] Mobile responsive (test at 320px, 768px)
- [ ] Reduced motion preference respected
- [ ] No console errors or warnings

---

## 📱 Mobile & Responsive

### Breakpoints
- **320px** (mobile) – Stacked card layout, single-column
- **768px** (tablet) – Two-column layout
- **1024px+** (desktop) – Full table with all columns

### Mobile-Specific Features
- Larger tap targets (44px minimum)
- Bottom sheets for modals (optional with Radix)
- Horizontal scroll with sticky headers (fallback)
- Reduced animation intensity via `prefers-reduced-motion`

---

## 🔧 Development Workflow

### Branch Strategy

```
main (production)
├── develop (staging)
└── feature/your-feature (feature branches)
```

### Commit Message Format

```
feat: Add live price update animations
fix: Resolve cursor trail performance issue
refactor: Extract useCursorTrail hook
docs: Update README with deployment steps
```

### Code Style

- **ESLint** + **Prettier** (configured in `next.config.js`)
- **TypeScript strict mode** (no `any` without comment)
- **Component naming**: PascalCase for components, camelCase for functions
- **File organization**: Co-locate related files (e.g., component + hook in same folder is OK)

---

## 📦 Dependencies

### Core
- `next@^14.0.0`
- `react@^18.3.1`
- `typescript@^5.3.3`

### State & Data
- `@reduxjs/toolkit@^1.9.7`
- `react-redux@^8.1.3`
- `@tanstack/react-query@^5.28.0`

### UI & Accessibility
- `@radix-ui/react-tooltip`
- `@radix-ui/react-popover`
- `@radix-ui/react-dialog`
- `lucide-react@^0.292.0`

### Styling
- `tailwindcss@^3.3.6`

---

## 🚢 Deployment to Vercel

### Prerequisites
- Vercel account (free)
- GitHub repo

### Steps

1. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/spectral-orderbook.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com/new
   - Select your GitHub repo
   - Click "Import"

3. **Configure**
   - Framework: Next.js (auto-detected)
   - Build command: `npm run build` (default)
   - Output dir: `.next` (default)
   - Environment: Leave empty (unless needed)

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

5. **Access**
   - Live URL: `https://spectral-orderbook.vercel.app`
   - Visit `/pulse` route

---

## 📹 Video Demo

A 1–2 minute walkthrough is recommended to showcase:
- Desktop view with custom cursor and animated blob
- Mobile responsive layout
- Sorting and filtering interactions
- Live price update animations
- Token detail modal
- Reduced motion preference

**Video platform**: YouTube, Vimeo, or Loom

---

## 🎓 Key Learning Points

### Performance
- Canvas-based cursor avoids DOM overhead
- Redux selector memoization prevents unnecessary re-renders
- Skeleton loaders prevent layout shift

### Design
- Custom color palette creates visual uniqueness
- Hyperplexed-inspired effects add polish without gimmick
- Accessibility (AA+ contrast, reduced motion support)

### Architecture
- Atomic design keeps components reusable and scalable
- Custom hooks encapsulate complex logic
- Redux + React Query handle different state domains clearly

---

## 📝 Future Enhancements

- [ ] Real WebSocket integration (Binance API, custom stream)
- [ ] Advanced filtering (date range, liquidity thresholds)
- [ ] Export to CSV
- [ ] Watchlist persistence
- [ ] Dark/light mode toggle
- [ ] User authentication & saved preferences

---

## 📄 License

MIT

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Support

For questions or issues:
- Open a GitHub issue
- Check existing discussions
- Review code comments for complex logic

---

**Built with ❤️ using Next.js 14, Redux Toolkit, and Tailwind CSS.**