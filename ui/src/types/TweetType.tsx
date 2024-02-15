export type TweetType = {
  id: number,
  author: string,
  text: string,
  photos: string[],
  video?: string,
  likes: string[],
  retweets: string[],
  replies: number[],
  views: number,
  created_at: string,
  is_reply_of: number | null,
  is_retweet_of: number | null,
  retweet_user?: string
}

export type TweetsData = {
  tweets: TweetType[],
  tweetsCount: number,
  loadedAll: boolean,
}

export const initialTweetsData = {
  tweets: [],
  tweetsCount: 0,
  loadedAll: false,
}