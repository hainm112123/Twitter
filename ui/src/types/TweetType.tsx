type TweetType = {
  id: number,
  author: string,
  text: string,
  photos: string[],
  video?: string,
  likes: number[],
  retweets: number[],
  replies: number[],
  views: number,
  created_at: string,
}

export default TweetType