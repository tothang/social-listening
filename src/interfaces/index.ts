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
