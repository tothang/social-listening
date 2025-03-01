import { TSocialSearchResults, TPost, TStatistics } from "@/interfaces";
import React from "react";
import Image from "next/image";

const getStatistics = (data: TSocialSearchResults) => {
  const updateStatistics = (results: TPost[]) => {
    const statistics: any = {
      total_views: 0,
      total_likes: 0,
      total_comments: 0,
      most_viewed: null,
      most_liked: null,
      most_commented: null,
    };

    results.forEach((result: TPost) => {
      statistics.total_views += result.views;
      statistics.total_likes += result.likes;
      statistics.total_comments += result.comments;

      if (!statistics.most_viewed || result.views > statistics.most_viewed.views) {
        statistics.most_viewed = result;
      }

      if (!statistics.most_liked || result.likes > statistics.most_liked.likes) {
        statistics.most_liked = result;
      }

      if (!statistics.most_commented || result.comments > statistics.most_commented.comments) {
        statistics.most_commented = result;
      }
    });

    return statistics;
  };

  const platforms = Object.keys(data.result) as (keyof TSocialSearchResults['result'])[];
  const statistics = platforms.reduce((acc, platform) => {
    acc[platform] = updateStatistics(data.result[platform]);
    return acc;
  }, {} as Record<string, any>);

  console.log(statistics)
  return statistics;
};

const Statistics: React.FC<{ data: TSocialSearchResults, source: string }> = ({ data, source }) => {
  const statistics = getStatistics(data)[source] as TStatistics;
  const [clicked, setClicked] = React.useState({
    viewed: false,
    liked: false,
    commented: false,
  });

  const handleClick = (type: "viewed" | "liked" | "commented") => {
    setClicked((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="flex gap-[50px] text-[12px]">
      <div className="flex flex-col gap-[5px]">
        <p>
          <strong>Total Viewed:</strong>{" "}
          {statistics.total_views.toLocaleString()}{" "}
        </p>
        <p>
          <strong>Total Liked:</strong>{" "}
          {statistics.total_likes.toLocaleString()}{" "}
        </p>
        <p>
          <strong>Total Commented:</strong>{" "}
          {statistics.total_comments.toLocaleString()}{" "}
        </p>
      </div>
      <div className="flex flex-col gap-[5px]">
        {["viewed", "liked", "commented"].map((type) => (
          <p
            key={type}
            onClick={() =>
              handleClick(type as "viewed" | "liked" | "commented")
            }
            className="cursor-pointer"
          >
            <strong>
              {type === "viewed" && "Most Viewed:"}
              {type === "liked" && "Most Likes:"}
              {type === "commented" && "Most Commented:"}
            </strong>{" "}
            <span className="underline">
              {type === "viewed" && statistics.most_viewed.views.toLocaleString()}
              {type === "liked" && statistics.most_liked.likes.toLocaleString()}
              {type === "commented" &&
                statistics.most_commented.comments.toLocaleString()}
            </span>
            {clicked[type as "liked" | "viewed" | "commented"] && (
              <div className="absolute bg-white border p-2 z-1">
                <Image
                  src={
                    type === "viewed"
                      ? statistics.most_viewed.thumbnail
                      : type === "liked"
                      ? statistics.most_liked.thumbnail
                      : statistics.most_commented.thumbnail
                  }
                  alt={`Most ${
                    type.charAt(0).toUpperCase() + type.slice(1)
                  } Post`}
                  width={100}
                  height={100}
                />
                <p>
                  {type === "viewed"
                    ? statistics.most_viewed.description
                    : type === "liked"
                    ? statistics.most_liked.description
                    : statistics.most_commented.description}
                </p>
              </div>
            )}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
