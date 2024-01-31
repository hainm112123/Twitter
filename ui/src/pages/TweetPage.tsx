import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import HeaderWithBack from "../components/common/header/HeaderWithBack";
import { fontConfig } from "../configs/fontConfig";
import { styleConfig } from "../configs/styleConfig";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Tweet from "../components/common/tweet/Tweet";
import Loader from "../components/common/Loader";
import NewTweet from "../components/common/tweet/NewTweet";
import { colorConfig } from "../configs/colorConfig";
import { getReplies } from "../redux/tweetSlice";

type Props = {}

const TweetPage = (props: Props) => {
  const params = useParams();
  const tweet = Number(params.id)

  const [replies, setReplies] = useState([]);
  const get_replies = async () => {
    setReplies(await getReplies(tweet));
  }

  useEffect(() => {
    get_replies();
  }, [tweet])
  
  if (!tweet) {
    return (
      <Loader />
    )
  }

  return (
    <Box>
      <HeaderWithBack>
        <Box sx={styleConfig.HeaderText}>
          Tweet
        </Box>
      </HeaderWithBack>
      <Tweet tweetId={tweet} detail replySuccess={get_replies} />
      <Box sx={{
        border: 1,
        borderTop: 0,
        borderColor: colorConfig.border,
        p: "12px",
      }}>
        <NewTweet isReplyOf={tweet} success={get_replies} />
      </Box>
      {
        replies.map((reply, index) => (
          <Tweet tweetId={reply} key={index} isReply />
        ))
      }
    </Box>
  )
}

export default TweetPage