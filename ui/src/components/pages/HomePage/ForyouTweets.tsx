import { Box } from "@mui/material"
import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../../../redux/store"
import { getTweets } from "../../../redux/tweetSlice";
import Tweet from "../../common/tweet/Tweet";
import Tweets from "../../common/tweet/Tweets";

const ForyouTweets = () => {
  const data = useSelector((state: RootState) =>  state.tweet.all)

  return <Tweets data={data} getMore={getTweets.getMore} />
}

export default ForyouTweets