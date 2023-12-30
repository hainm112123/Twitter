import { Box } from "@mui/material";
import React from "react";
import Tweet from "../components/common/Tweet";
import { colorConfig } from "../configs/colorConfig";
import Header from "../components/common/Header";
import NewTweet from "../components/pages/HomePage/NewTweet";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type Props = {}

const HomePage = (props: Props) => {
  const tweets = useSelector((state: RootState) => state.tweet.tweets)

  return (
    <Box>
      <Header
        sx={{
          paddingTop: "16px",
          paddingBottom: "16px",
        }}
      >
        <Box
          sx={{
            flex: 1,
          }}
        >
          For you
        </Box>
        <Box
          sx={{
            flex: 1,
          }}
        >
          Following
        </Box>
      </Header>

      {/* new tweet */}

      <Box
        sx={{
          border: 1,
          borderTop: 0,
          borderColor: colorConfig.border,
          p: 2,
        }}
      >
        <NewTweet />
      </Box>

      {/* tweets */}
      {
        tweets.map((tweet, index) => (
          <Tweet {...tweet} key={index} />
        ))
      }
    </Box>
  )
}

export default HomePage