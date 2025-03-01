// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { TSocialSearchResults, AppError } from "@/interfaces";
import { SampleData } from "@/utils/data";
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TSocialSearchResults | AppError>
) {
  try {
    const { search } = req.query;
    // make POST request to search query to social media APIs https://9y1xu4ogjk.execute-api.eu-central-1.amazonaws.com/stage/query/search
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      if (!API_BASE_URL) {
          throw new Error("API base URL is not defined");
      }
      const response = await fetch(`${API_BASE_URL}/query/search`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ keywords: search }),
      });
    const jsonRes = await response.json();
    res.status(200).json(jsonRes);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ statusCode: 500, message: error.message });
  }
}
