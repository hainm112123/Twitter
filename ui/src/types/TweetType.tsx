type TweetType = {
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
  is_reply_of: number | null
}

export default TweetType