import { Box, CircularProgress } from "@mui/material";
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
import { getTweet } from "../../../redux/tweetSlice";

const Tweet = (props: {tweetId: number, detail?: boolean} | any) => {
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
  })

  useEffect(() => {
    if (!isLoaded) {
      setLoaded(true);
      return;
    }
    const fn = async () => {
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


  const Avatar = <TweetAvatar username={user.username} avatar={user.avatar} />
  const Author = <TweetAuthor username={user.username} name={user.name} created_at={tweet.created_at} detail={props.detail} />
  const Text = <TweetText text={tweet.text} />
  const Media = <TweetMedia {...tweet} />
  const Interact = <TweetInteract {...tweet} />

  return (
    <Box
      sx={{
        border: 1,
        borderTop: 0,
        borderColor: colorConfig.border,
        padding: "12px",
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
              borderBottom: 1,
              borderColor: colorConfig.border,
            }}>
              {moment(tweet.created_at).format('h:mm A')} &#183; {moment(tweet.created_at).format('MMM DD, YYYY')}
            </Box>

            {Interact}
          </Box>  
        }
       
      </Link>
    </Box>
  )
}

export default Tweet