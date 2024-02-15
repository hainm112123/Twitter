import { Box } from "@mui/material"
import { RootState, useAppDispatch } from "../../../redux/store"
import { useSelector } from "react-redux";
import Tweet from "../../common/tweet/Tweet";
import { getFollowingTweets } from "../../../redux/tweetSlice";
import Tweets from "../../common/tweet/Tweets";

const FollowingTweets = () => {
  const data = useSelector((state: RootState) =>  state.tweet.following)

  return <Tweets data={data} getMore={getFollowingTweets.getMore} />
}

export default FollowingTweets