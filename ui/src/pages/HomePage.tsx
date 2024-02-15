import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Tweet from "../components/common/tweet/Tweet";
import { colorConfig } from "../configs/colorConfig";
import Header from "../components/common/header/Header";
import NewTweet from "../components/common/tweet/NewTweet";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import Loader from "../components/common/Loader";
import { fontConfig } from "../configs/fontConfig";
import { addTweet, getFollowingTweets, getTweets } from "../redux/tweetSlice";
import { TweetType } from "../types/TweetType";
import ForyouTweets from "../components/pages/HomePage/ForyouTweets";
import FollowingTweets from "../components/pages/HomePage/FollowingTweets";

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
  const [filter, setFilter] = useState(FORYOU);
  const [loaded, setLoaded] = useState(false);
  
  const userIdentity = useSelector((state: RootState) => state.user.userIdentity);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  useEffect(() => {
    Promise.all([
      dispatch(getTweets.get()),
      dispatch(getFollowingTweets.get())
    ]).then(() => {
      setLoaded(true);
    })
  }, [dispatch])

  if (!userIdentity || !loaded) {
    return (
      <Loader />
    )
  }

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
          if (response) dispatch(addTweet({
            tweet: response,
            currentUser: currentUser?.username,
          }));
        }} />
      </Box>

      {/* tweets */}
      {
        filter === FORYOU ? <ForyouTweets /> : <FollowingTweets />
      }
    </Box>
  )
}

export default HomePage