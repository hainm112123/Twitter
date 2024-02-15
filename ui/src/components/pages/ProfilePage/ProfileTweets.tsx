import { Box } from "@mui/material"
import Tweet from "../../common/tweet/Tweet"
import { TweetType, TweetsData } from "../../../types/TweetType"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import Tweets from "../../common/tweet/Tweets"
import { getProfileTweets } from "../../../redux/tweetSlice"

type Props = {
  data: TweetsData,
  username: string,
}

const ProfileTweets = ({ data, username }: Props) => {
  return (
    <Tweets data={data} getMore={getProfileTweets.getMore} urlSuffix={username} />
  )
}

export default ProfileTweets