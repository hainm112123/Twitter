import { Box } from "@mui/material"
import Tweet from "../../common/tweet/Tweet"
import TweetType from "../../../types/TweetType"

type Props = {
  tweets: TweetType[],
}

const ProfileTweets = ({ tweets }: Props) => {
  return (
    <Box>
      {
        tweets.map((tweet, index) => (
          <Tweet {...tweet} key={index} />
        ))
      }
    </Box>
  )
}

export default ProfileTweets