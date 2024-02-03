import { Box } from "@mui/material";
import React, { useState } from "react";
import Tweet from "../components/common/tweet/Tweet";
import { colorConfig } from "../configs/colorConfig";
import Header from "../components/common/header/Header";
import NewTweet from "../components/common/tweet/NewTweet";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import Loader from "../components/common/Loader";
import { fontConfig } from "../configs/fontConfig";
import { addTweet } from "../redux/tweetSlice";
import TweetType from "../types/TweetType";

type Props = {}

type TabProps = {
  text: string, 
  active: boolean,
  onClick: any
}

const Tab = (props: TabProps) => {
  return (
    <Box 
      sx={{
        flex: 1,
        height: "100%",
        "&:hover": {
          cursor: "pointer",
          bgcolor: colorConfig.secondaryBg,
        }
      }}
      onClick={props.onClick}
    >
      <Box sx={[
        {
          width: "fit-content",
          m: "auto",
          paddingTop: "16px",
          paddingBottom: "16px",
        },
        props.active && {
          fontWeight: fontConfig.weight.subHeader,
          position: "relative",
          '&::after': {
            content: '""',
            height: "4px",
            width: "100%",
            bgcolor: colorConfig.primaryBtnBg,
            position: "absolute",
            bottom: 0,
            left: 0,
            borderRadius: "2px",
          }
        }
      ]}>
        {props.text}
      </Box>
    </Box>
  )
}

const HomePage = (props: Props) => {
  const dispatch = useAppDispatch();

  const FORYOU = 'for-you', FOLLOWING = 'following';
  const tweets = useSelector((state: RootState) => state.tweet.tweets);
  const users = useSelector((state: RootState) => state.user.users);
  const userIdentity = useSelector((state: RootState) => state.user.userIdentity);
  const [filter, setFilter] = useState(FORYOU)

  if (!userIdentity) {
    return (
      <Loader />
    )
  }

  // if (filter === FOLLOWING) tweets = tweets.filter((tweet) => userIdentity.following.findIndex((user) => user === tweet.author) !== -1)

  return (
    <Box>
      <Header>
        <Tab text="For you" active={filter === FORYOU} onClick={() => setFilter(FORYOU)}/>
        <Tab text="Following" active={filter === FOLLOWING} onClick={() => setFilter(FOLLOWING)} />
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
        <NewTweet success={(response: TweetType | null) => {
          if (response) dispatch(addTweet(response));
        }} />
      </Box>

      {/* tweets */}
      {
        tweets.map((tweet, index) => (
          <Tweet 
            tweet={tweet} 
            user={users.find((user) => user.username === tweet.author)}
            key={index} 
          />
        ))
      }
    </Box>
  )
}

export default HomePage