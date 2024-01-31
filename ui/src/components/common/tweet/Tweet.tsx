import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { colorConfig } from "../../../configs/colorConfig";
import TweetType from "../../../types/TweetType";
import { useAppDispatch } from "../../../redux/store";
import { getUser } from "../../../redux/userSlice";
import { Link } from "react-router-dom";
import TweetAvatar from "./TweetAvatar";
import TweetAuthor from "./TweetAuthor";
import TweetText from "./TweetText";
import TweetMedia from "./TweetMedia";
import TweetInteract from "./TweetInteract";
import moment from "moment";
import { fontConfig } from "../../../configs/fontConfig";
import Loader from "../Loader";
import { getReplies, getTweet } from "../../../redux/tweetSlice";

type Props = {
  tweetId: number, 
  detail?: boolean, 
  isReply: boolean, 
  isParent: boolean,
  replySuccess?: Function,
}

const Tweet = (props: Props | any) => {
  const dispatch = useAppDispatch();
  const [isLoaded, setLoaded] = useState(false);
  const [user, setUser] = useState({
    username: "",
    name: "",
    tweets: [],
    followers: [],
    following: [],
    cover: null,
    avatar: null,
    bio: "",
    joined_date: null,
  });
  const [tweet, setTweet] = useState({
    id: -1,
    author: null,
    text: "",
    photos: [],
    likes: [],
    retweets: [],
    replies: [],
    views: 0,
    created_at: null,
    is_reply_of: null,
  });

  useEffect(() => {
    if (!isLoaded) {
      setLoaded(true);
      return;
    }
    const fn = async () => {
      // console.log(props.tweetId);
      const tweetData = await getTweet(props.tweetId);
      setTweet(tweetData);
      const userData = await dispatch(getUser(tweetData.author));
      setUser(userData);
    }
    fn();
     
  }, [isLoaded, dispatch, props])

  if (!tweet.author) {
    return (
      <Loader />
    )
  }

  const BriefTweet = (
    <Box
      sx={{
        display: "flex",
        mb: 1,
      }}
    >
      <TweetAvatar username={user.username} avatar={user.avatar} onReply />
      <Box
        sx={{
          flex: 1,
        }}
      >
        <TweetAuthor username={user.username} name={user.name} created_at={tweet.created_at} detail={false} />
        <TweetText text={tweet.text} detail={false} />
        <Typography sx={{
          color: fontConfig.color.secondaryText,
          fontSize: fontConfig.size.secondaryText,
        }}>
          Relying to @{user.username}
        </Typography>
      </Box>
    </Box>
  )

  const Avatar = <TweetAvatar username={user.username} avatar={user.avatar} onReply={props.isParent} />
  const Author = <TweetAuthor username={user.username} name={user.name} created_at={tweet.created_at} detail={props.detail} />
  const Text = <TweetText text={tweet.text} detail={props.detail} />
  const Media = <TweetMedia {...tweet} />
  const Interact = <TweetInteract 
    {...tweet} 
    setTweet={setTweet} 
    BriefTweet={BriefTweet} 
    detail={props.detail} 
    replySuccess={async () => {
      const tweetData = await getTweet(props.tweetId);
      setTweet(tweetData);
      props.replySuccess && props.replySuccess();
    }} 
  />

  return (
    <Box>
      {
        (tweet.is_reply_of && !props.isReply) && <Tweet tweetId={tweet.is_reply_of} isParent />
      }
      <Box
        sx={{
          border: 1,
          borderTop: 0,
          borderBottom: (props.detail || props.isParent) ? 0 : 1,
          borderColor: colorConfig.border,
          padding: "12px",
          pb: props.isParent ? 0 : "12px",
          "&:hover": {
            cursor: "pointer"
          }
        }}
      >
        <Link to={`/${user.username}/tweet/${tweet.id}`} style={{all: "unset"}}>
          {/* Note */}
          {/* <Box
            sx={{
              display: "flex",
              color: fontConfig.color.secondaryText,
              paddingBottom: "8px"
            }}
          >
            <RepeatOutlined
              sx={{
                fontSize: fontConfig.size.secondaryIcon,
                paddingLeft: "20px",
                paddingRight: "8px",
                fontWeight: fontConfig.weight.bold,
              }}
            />
            <Typography
              sx={{
                fontSize: fontConfig.size.secondaryText,
                fontWeight: fontConfig.weight.bold,
              }}
            >
              Yuuhi reposted
            </Typography>
          </Box> */}

          {/* Main */}
          {
            !props.detail &&  <Box
              sx={{
                display: "flex",
              }}
            >
              {Avatar}
              <Box
                sx={{
                  flex: 1,
                }}
              >
                {Author}
                {Text}
                {Media}
                {Interact}
              </Box>
            </Box>
          }

          {
            props.detail && <Box>
              <Box sx={{
                display: "flex",
                mb: 1,
              }}>
                {Avatar}
                {Author}
              </Box>
              {Text}
              {Media}
              
              <Box sx={{
                mt: 1,
                pb: 2,
                color: fontConfig.color.secondaryText,
                fontSize: fontConfig.size.text_2,
              }}>
                {moment(tweet.created_at).format('h:mm A')} &#183; {moment(tweet.created_at).format('MMM DD, YYYY')}
              </Box>

              {Interact}
            </Box>  
          }
        
        </Link>
      </Box>
    </Box>
  )
}

export default Tweet