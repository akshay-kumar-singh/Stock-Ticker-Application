# 📈 Stock Ticker Application

A modern **Next.js 14** application for tracking Indian stock market data with real-time prices, interactive charts, and intelligent search functionality.

🔗 **Live Demo**: [https://stock-ticker-application.vercel.app/](https://stock-ticker-application.vercel.app)

---

## ✨ Key Features

- 🔍 **Smart Search** - Debounced autocomplete with fuzzy matching
- 📊 **Interactive Charts** - Real-time price visualization using Recharts
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🎯 **SEO Optimized** - Dynamic meta tags and Open Graph support

---

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Charts**: Recharts for interactive visualizations
- **API**: Tradebrains REST APIs
- **Deployment**: Vercel

---

## 🔌 API Integration

### ✅ Working APIs
1. **Search API** - `/api/assignment/search`
   - Autocomplete stock search
   - Company name resolution

2. **Stock Prices API** - `/api/assignment/stock/{symbol}/prices`
   - Historical price data
   - OHLCV data for charts

### ❌ Non-functional API
- **Stock Ticker API** - `/api/assignment/index/NIFTY/movers/` (Currently unavailable)

---

## 🚀 Performance Optimizations

- **Debouncing**: 300ms delay on search to reduce API calls
- **Loading States**: Skeleton screens and progressive loading
- **Responsive Images**: Optimized assets and lazy loading

---

## 📱 User Workflow

1. **Homepage** → Search stocks or browse featured carousel
2. **Search** → Debounced autocomplete with instant results
3. **Stock Details** → Comprehensive charts and market data
4. **Navigation** → Smooth transitions with loading states

---

## 📁 Project Structure

```
stock-ticker/
├── app/
│   ├── layout.tsx          # Root layout & SEO
│   ├── page.tsx            # Homepage
│   ├── stock/[symbol]/     # Dynamic stock pages
│   └── loading.tsx         # Loading UI
├── components/
│   ├── SearchBar.tsx       # Debounced search
│   ├── StockChart.tsx      # Recharts integration
│   ├── StockCard.tsx       # Stock data display
│   └── StockSlider.tsx     # Animated carousel
├── lib/
│   └── api.ts              # API utilities
├── types/
│   └── stock.ts            # TypeScript interfaces
└── hook/
    └── useDebounce.ts      # Custom debounce hook
```

---

## 🔧 Quick Start

```bash
# Clone repository
git clone https://github.com/yourusername/stock-ticker.git
cd stock-ticker

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit: **http://localhost:3000**

---

## 🎯 Features Showcase

- **Intelligent Search**: Real-time stock discovery with company matching
- **Market Dashboard**: Featured stocks with live price updates  
- **Data Visualization**: Interactive charts with hover tooltips
- **Mobile Responsive**: Seamless experience across all devices
- **Error Handling**: Graceful fallbacks for API failures

---

Built with ❤️ using Next.js | **MIT License**