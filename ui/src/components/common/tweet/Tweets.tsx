import { Box } from "@mui/material"
import { RootState, useAppDispatch } from "../../../redux/store";
import { useSelector } from "react-redux";
import { TweetsData } from "../../../types/TweetType";
import Tweet from "./Tweet";

type Props = {
  data: TweetsData,
  getMore: Function,
  isReply?: boolean,
  urlSuffix?: string | number,
}

const Tweets = ({ data, getMore, isReply, urlSuffix } : Props) => {
  const dispatch = useAppDispatch();

  const users = useSelector((state: RootState) => state.user.users);

  return (
    <Box>
      {
        data.tweets.map((tweet, index) => (
          <Tweet 
            tweet={tweet} 
            user={users.find((user) => user.username === tweet.author)}
            key={index}
            loadMoreTweets={async () => {
              if (index !== data.tweetsCount - 2 || data.loadedAll) return;
              await dispatch(getMore(data.tweetsCount, urlSuffix));
            }}
            isReply={isReply} 
          />
        ))
      }
    </Box>
  )
}

export default Tweets;