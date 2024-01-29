import { Box } from "@mui/material"
import Tweet from "../../common/tweet/Tweet"

type Props = {
  tweets: number[],
}

const ProfileTweets = ({ tweets }: Props) => {
  return (
    <Box>
      {
        tweets.map((tweet, index) => (
          <Tweet tweetId={tweet} key={index} />
        ))
      }
    </Box>
  )
}

export default ProfileTweets