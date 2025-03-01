import { TPost } from "@/interfaces";
import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";

const arrowSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

const CarouselResult: React.FC<{ results: TPost[], source: string }> = ({ results, source }) => {
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const checkScrollPosition = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", checkScrollPosition);
      return () => {
        carousel.removeEventListener("scroll", checkScrollPosition);
      };
    }
  }, []);

  return (
    <div className="carousel-container relative">
      {!isAtStart && (
        <button
          className="carousel-button left-[-20px] absolute top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
          onClick={() => {
            const carousel = carouselRef.current;
            if (carousel) {
              carousel.scrollBy({ left: -400, behavior: "smooth" });
            }
          }}
        >
          <div style={{ transform: "rotate(180deg)" }}>
            {arrowSVG}
          </div>
        </button>
      )}
      <div
        className="carousel flex gap-[5px] overflow-x-scroll overflow-y-hidden scroll-snap-x hide-scrollbar"
        ref={carouselRef}
        style={{ scrollSnapType: "x mandatory" }}
      >
        {results.map((result) => (
          <div key={result.id} style={{ scrollSnapAlign: "center" }}>
            <Card result={result} source={source} />
          </div>
        ))}
      </div>
      {!isAtEnd && (
        <button
          className="carousel-button right-[-20px] absolute top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
          onClick={() => {
            const carousel = carouselRef.current;
            if (carousel) {
              carousel.scrollBy({ left: 400, behavior: "smooth" });
            }
          }}
        >
          {arrowSVG}
        </button>
      )}
    </div>
  );
};

export default CarouselResult;
