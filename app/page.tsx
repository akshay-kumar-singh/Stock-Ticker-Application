import SearchBar from "@/components/SearchBar";
import StockSlider from "@/components/StockSlider";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 relative">
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-block mb-4 p-2 bg-white/30 backdrop-blur-sm rounded-full shadow-lg">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-3 rounded-full">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800 leading-tight">
            Stock Ticker
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-3xl mx-auto font-medium">
            Track <span className="text-blue-600 font-semibold">real-time</span>{" "}
            Indian stock prices with interactive charts
          </p>

          {/* Search bar needs to be placed above everything else */}
          <div className="relative z-50 max-w-3xl mx-auto mb-6">
            <SearchBar />
          </div>

          <div className="text-sm text-gray-500 italic">
            Popular stocks:{" "}
            <span className="text-blue-600 not-italic font-medium">
              RELIANCE
            </span>
            , <span className="text-green-600 not-italic font-medium">TCS</span>
            ,{" "}
            <span className="text-purple-600 not-italic font-medium">INFY</span>
            ,{" "}
            <span className="text-indigo-600 not-italic font-medium">HDFC</span>
          </div>
        </div>

        {/* Slider Section */}
        <div className="mb-12 bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20 relative z-0">
          <StockSlider />
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {[
            {
              title: "Smart Search",
              color: "blue",
              iconPath:
                "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
              description:
                "Instantly find stocks with intelligent autocomplete and fuzzy search",
            },
            {
              title: "Live Charts",
              color: "green",
              iconPath:
                "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
              description:
                "Interactive candlestick charts with technical indicators",
            },
            {
              title: "Real-time Data",
              color: "purple",
              iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
              description:
                "Delayed by only 15 minutes for NSE/BSE listed stocks",
            },
          ].map(({ title, color, iconPath, description }, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/20"
            >
              <div
                className={`inline-flex items-center justify-center mb-4 p-4 bg-${color}-50 rounded-full`}
              >
                <svg
                  className={`w-10 h-10 text-${color}-600`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={iconPath}
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {title}
              </h3>
              <p className="text-gray-600 text-lg">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
