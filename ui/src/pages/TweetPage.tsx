import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import HeaderWithBack from "../components/common/header/HeaderWithBack";
import { fontConfig } from "../configs/fontConfig";
import { styleConfig } from "../configs/styleConfig";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import Tweet from "../components/common/tweet/Tweet";
import Loader from "../components/common/Loader";
import NewTweet from "../components/common/tweet/NewTweet";
import { colorConfig } from "../configs/colorConfig";
import { addReply, getCurrentTweet, getParentTweet, getReplies } from "../redux/tweetSlice";
import { TweetType } from "../types/TweetType";
import Tweets from "../components/common/tweet/Tweets";

type Props = {}

const TweetPage = (props: Props) => {
  const [loaded, setLoaded] = useState(false);
  const tweetId = Number(useParams().id);
  const dispatch = useAppDispatch();

  const tweet = useSelector((state: RootState) => state.tweet.currentTweet);
  const data = useSelector((state: RootState) => state.tweet.reply);
  const parentTweets = useSelector((state: RootState) => state.tweet.parentTweets);
  
  const users = useSelector((state: RootState) => state.user.users);
  const user = users.find((user) => user.username === tweet?.author);
  
  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      return;
    }
    dispatch(getCurrentTweet(tweetId));
    dispatch(getParentTweet(tweetId));
    dispatch(getReplies.get(tweetId));
  }, [dispatch, tweetId, loaded])

  if (!tweet || !user) {
    return (
      <Loader />
    )
  }

  const replySuccess = (response: TweetType | null) => {
    if (response) dispatch(addReply(response));
  }

  return (
    <Box>
      <HeaderWithBack>
        <Box sx={styleConfig.HeaderText}>
          Tweet
        </Box>
      </HeaderWithBack>
      {
        parentTweets.map((tweet, index) => {
          const user = users.find((user) => user.username === tweet.author);
          return (<Tweet tweet={tweet} user={user} key={index} isParent />)
        })
      }
      <Tweet tweet={tweet} user={user} detail replySuccess={replySuccess} />
      <Box sx={{
        border: 1,
        borderTop: 0,
        borderColor: colorConfig.border,
      }}>
        <NewTweet 
          isReplyOf={tweet.id} 
          success={replySuccess} 
        />
      </Box>
      {/* {
        replies.map((reply, index) => {
          const user = users.find((user) => user.username === reply.author);
          return (<Tweet tweet={reply} user={user} key={index} isReply />);
        })
      } */}
      <Tweets data={data} getMore={getReplies.getMore} urlSuffix={tweetId} isReply />
    </Box>
  )
}

export default TweetPage