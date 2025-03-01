import { TPost } from "@/interfaces";
import React from "react";
import Image from "next/image";

const Card: React.FC<{ result: TPost; source: string }> = ({
  result,
  source,
}) => {
  return (
    <div className={`flex-1 flex flex-col gap-4 ${source === 'youtube' ? 'max-h-[360px]' : ''}`}>
      <div className="block rounded-3xl c-picture w-[300px] overflow-hidden">
        <Image
          src={result.thumbnail}
          alt={result.title}
          layout="responsive"
          width={9}
          height={16}
        />
      </div>
      <div className="card-content">
        <a href={result.link} target="_blank">
          <h2 className="text-body font-semibold underline cursor-pointer">
            {result.title}
          </h2>
        </a>
        <div className="flex flex-col justify-baseline items-start">
          <div className="flex gap-2">
            <strong>Channel:</strong>
            <p>{result.channelTitle}</p>
          </div>
          <div className="flex gap-2">
            <strong>Date:</strong>
            <p>{new Date(result.publishedAt).toLocaleDateString("en-GB")}</p>
          </div>
          <div className="flex gap-2">
            <strong>Views:</strong>
            <p>{result.views}</p>
          </div>
          <div className="flex gap-2">
            <strong>Like:</strong>
            <p>{result.likes}</p>
          </div>
          <div className="flex gap-2">
            <strong>Comments:</strong>
            <p>{result.comments}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
