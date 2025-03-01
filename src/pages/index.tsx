import { Geist, Geist_Mono } from "next/font/google";
import { useState } from "react";
import { TPost, TSocialSearchResults } from "@/interfaces";
import CarouselResult from "@/components/CarouselResult";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<TSocialSearchResults | null>(null);
  const [statistics, setStatistics] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
      try {
        setLoading(true);
        const data = await fetch(`/api/social?search=${searchQuery}`).then((res) => res.json());
        console.log('Data:', data)
        setTimeout(() => {
          setLoading(false);
          setSearchResult(data);
        }, 500);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} items-center justify-items-center gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] p-[20px]`}
    >
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start w-full sm:w-1/2 ">
        <h1 className="text-4xl font-bold w-full text-center">
          Social Listening
        </h1>
        <input
          type="text"
          name="query"
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Prevents form submission if inside a form
              await handleSearch();
            }
          }}
          placeholder="Your keyword..."
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          className={`p-2 rounded w-full text-white ${
            loading ? "bg-gray-500" : "bg-blue-500"
          }`}
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </main>
      {searchResult && (
        <div className="w-full mt-[20px]">
          <div className="carousel-container">
            <h2 className="text-2xl font-bold">YouTube Results</h2>
            <br />
            <br />
            <CarouselResult
              results={searchResult.result.youtubeResults}
              source="youtube"
            />
            <br />
            <h2 className="text-2xl font-bold">Tiktok Results</h2>
            <br />
            <br />
            <CarouselResult
              results={searchResult.result.tiktokResults}
              source="tiktok"
            />
          </div>
        </div>
      )}
    </div>
  );
}
