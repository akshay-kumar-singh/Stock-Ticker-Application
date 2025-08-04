# Stock Ticker Application

A Next.js application for tracking Indian stock market data with real-time prices, interactive charts, and search functionality.

![Stock Ticker Screenshot](/screenshot.png)

## Features

- 🔍 Stock search with autocomplete
- 📈 Interactive price charts (using Recharts)
- 📱 Responsive design
- 🔄 Real-time data (15-minute delay)
- 📊 Detailed stock information
- 🏷 SEO optimized with dynamic meta tags
- 🎨 Modern UI with smooth animations

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Recharts
- Fetch API

## API Usage

The application uses the following APIs from Tradebrains:

1. **Search API** - `/api/assignment/search?keyword=RELIANCE&length=10`

   - Used for stock search functionality
   - Returns matching stocks for autocomplete

2. **Stock Prices API** - `/api/assignment/stock/SILVERLINE/prices`
   - Provides historical price data
   - Used for chart rendering and price displays

**Note**: The Stock Ticker API (`/api/assignment/index/NIFTY/movers/`) is currently non-functional and not implemented in this application.

## Project Structure

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

## Application Workflow

End-to-End User Journey
Initial Page Load

User accesses the application root URL (/)

Next.js serves the homepage (app/page.tsx)

Layout component (app/layout.tsx) initializes with SEO metadata

Featured stocks slider loads with hardcoded popular symbols (RELIANCE, TCS, etc.)

Search Interaction

User begins typing in the search bar (SearchBar component)

Input triggers debounced API call after 300ms of inactivity

Search API (/api/assignment/search) is queried with the input text

Results are filtered to remove null symbols and displayed in dropdown

Loading spinner appears during API requests

Stock Selection

User selects a stock from search results

Application navigates to dynamic route /stock/[symbol]

Loading component displays animated placeholder content

Two parallel API calls are made:

Search API (to get company name)

Stock Prices API (/api/assignment/stock/[symbol]/prices)

Stock Detail Page

Data is processed and formatted:

Prices are reversed for chronological chart display

Currency values are formatted for INR

Metadata is generated for SEO

Three main components render:

StockCard (key statistics)

StockChart (price visualization)

Market Statistics (additional metrics)

Dynamic meta tags are injected into page head

Navigation

User can return home via:

Back button in header

Browser back navigation

Clicking application logo

Smooth transitions between pages

Error Handling

Invalid stock symbols show "Not Found" page

API errors display graceful error states

Loading skeletons maintain layout stability

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/stock-ticker.git
   cd stock-ticker

   Install dependencies:
   npm install
   ```

Run the development server:
npm run dev

Open http://localhost:3000 in your browser


👨‍💻 Author

Built with ❤️ by Akshay