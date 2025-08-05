# 📈 Stock Ticker Application

A **Next.js** application for tracking Indian stock market data with real-time prices, interactive charts, and search functionality.

---

## 🚀 Features

- 🔍 Stock search with autocomplete  
- 📈 Interactive price charts (using Recharts)  
- 📱 Responsive design  
- 📊 Detailed stock information  
- 🏷 SEO optimized with dynamic meta tags  
- 🎨 Modern UI with smooth animations  

---

## 🛠 Technologies Used

- **Next.js 14**  
- **React 18**  
- **TypeScript**  
- **Tailwind CSS**  
- **Recharts**  
- **Fetch API**

---

## 🔌 API Usage

This application uses the following APIs from **Tradebrains**:

### 1. 🔎 Search API

/api/assignment/search?keyword=RELIANCE&length=10

- Returns matching stocks for autocomplete

### 2. 📉 Stock Prices API

/api/assignment/stock/SILVERLINE/prices


- Provides historical price data  
- Used for chart rendering and price displays

### 3. 📉 Stock Ticker API

> ⚠️ **Note**: The Stock Ticker API (`/api/assignment/index/NIFTY/movers/`) is currently non-functional and not implemented in this project.

---

## 📁 Project Structure
```
stock-ticker/
├── app/
│ ├── layout.tsx # Root layout with metadata
│ ├── page.tsx # Homepage component
│ ├── stock/
│ │ └── [symbol]/
│ │ └── page.tsx # Dynamic stock detail page
│ └── loading.tsx # Loading component
├── components/
│ ├── SearchBar.tsx # Search functionality
│ ├── StockCard.tsx # Stock information display
│ ├── StockChart.tsx # Recharts implementation
│ └── StockSlider.tsx # Featured stocks carousel
├── lib/
│ └── api.ts # API functions and utilities
├── types/
│ └── stock.ts # TypeScript interfaces
├── public/ # Static assets
├── styles/ # Global CSS
├── next.config.js # Next.js configuration
├── package.json # Project dependencies
└── tsconfig.json # TypeScript configuration

```

---

## 🧭 Application Workflow

### ✅ End-to-End User Journey

#### 1. Initial Page Load
- User lands on `/`
- Next.js serves homepage and layout with SEO metadata
- Featured stock slider loads with popular symbols (e.g., `RELIANCE`, `TCS`, etc.)

#### 2. Search Interaction
- User types in `SearchBar` component
- Debounced API call triggers after 300ms
- `/api/assignment/search` returns matched results
- Results displayed in dropdown

#### 3. Stock Selection
- On selection, user navigates to `/stock/[symbol]`
- Loading component shows while data is fetched
- Two APIs are called in parallel:
  - Search API (for company name)
  - Stock Prices API (for chart data)

#### 4. Stock Detail Page
- Data is formatted and reversed chronologically
- INR currency formatting applied
- SEO metadata is dynamically injected
- Three key components rendered:
  - `StockCard` (key statistics)
  - `StockChart` (price graph)
  - Market metrics section

#### 5. Navigation
- Back via:
  - App header
  - App logo
  - Browser back

#### 6. Error Handling
- Invalid symbol shows 404-style "Not Found"
- API errors show graceful fallback UI
- Loading skeletons preserve layout while fetching

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```
git clone https://github.com/yourusername/stock-ticker.git
cd stock-ticker
2. Install Dependencies

- npm install

3. Start the Development Server

- npm run dev


Visit your app at:
📍 http://localhost:3000

```

👨‍💻 Author
- Built with ❤️ by Akshay

📄 License
- This project is licensed under the MIT License.
