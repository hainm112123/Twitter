import { Box } from "@mui/material";
import React from "react";
import HeaderWithBack from "../components/common/header/HeaderWithBack";
import { fontConfig } from "../configs/fontConfig";
import { styleConfig } from "../configs/styleConfig";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Tweet from "../components/common/tweet/Tweet";

type Props = {}

const TweetPage = (props: Props) => {
  const params = useParams();
  const tweets = useSelector((state: RootState) => state.tweet.tweets)
  const tweet = tweets[tweets.findIndex((tweet) => tweet.id === Number(params.id))]

  return (
    <Box>
      <HeaderWithBack>
        <Box sx={styleConfig.HeaderText}>
          Tweet
        </Box>
      </HeaderWithBack>
      <Tweet {...tweet} detail />
    </Box>
  )
}

export default TweetPage