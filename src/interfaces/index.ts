export type AppError = {
  statusCode: number;
  message: string;
};

export type TSocialSearchResults = {
  result: {
    tiktokResults: Array<TPost>;
    youtubeResults: Array<TPost>;
  };
};

export type TPost = {
  id: string;
  title: string;
  description: string;
  channelTitle: string;
  publishedAt: string;
  thumbnail: string;
  views: number;
  likes: number;
  comments: number;
  link: string;
};

export type TStatistics = {
  total_views: number;
  total_likes: number;
  total_comments: number;
  most_viewed: TPost;
  most_liked: TPost;
  most_commented: TPost;
};