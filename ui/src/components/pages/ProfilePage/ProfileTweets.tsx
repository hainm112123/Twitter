import { Box } from "@mui/material"
import Tweet from "../../common/Tweet"

type Props = {

}

const ProfileTweets = (props: Props) => {
  return (
    <Box>
      <Tweet />
      <Tweet />
      <Tweet />
      <Tweet />
    </Box>
  )
}

export default ProfileTweets