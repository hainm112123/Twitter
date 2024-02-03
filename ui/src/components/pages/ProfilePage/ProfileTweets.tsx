import { Box } from "@mui/material"
import Tweet from "../../common/tweet/Tweet"
import TweetType from "../../../types/TweetType"
import { UserIdentity } from "../../../types/UserIdentity"

type Props = {
  tweets: TweetType[],
  user: UserIdentity,
}

const ProfileTweets = ({ tweets, user }: Props) => {
  return (
    <Box>
      {
        tweets.map((tweet, index) => (
          <Tweet tweet={tweet} user={user} key={index} />
        ))
      }
    </Box>
  )
}

export default ProfileTweets