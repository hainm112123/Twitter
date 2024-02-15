import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { colorConfig } from "../../../configs/colorConfig";
import { Link } from "react-router-dom";
import TweetAvatar from "./TweetAvatar";
import TweetAuthor from "./TweetAuthor";
import TweetText from "./TweetText";
import TweetMedia from "./TweetMedia";
import TweetInteract from "./TweetInteract";
import moment from "moment";
import { fontConfig } from "../../../configs/fontConfig";
import Loader from "../Loader";
import NewTweetModal from "./NewTweetModal";
import { TweetType } from "../../../types/TweetType";
import { UserIdentity } from "../../../types/UserIdentity";
import { useAppDispatch } from "../../../redux/store";
import { addReply_brief } from "../../../redux/tweetSlice";
import { RepeatOutlined } from "@mui/icons-material";
import { InView } from "react-intersection-observer";

type Props = {
  tweet: TweetType,
  user: UserIdentity | undefined,
  loadMoreTweets?: Function,
  detail?: boolean, 
  isReply?: boolean, 
  isParent?: boolean,
  replySuccess?: Function,
}

const Tweet = ({tweet, user, ...props}: Props) => {
  const [isLoaded, setLoaded] = useState(false);
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [tweetsLoading, setTweetsLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoaded) {
      setLoaded(true);
      return;
    }
  }, [isLoaded])

  if (!user) {
    return <Loader />
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
  
  // console.log(user);
  const Avatar = <TweetAvatar username={user.username} avatar={user.avatar} onReply={props.isParent} />
  const Author = <TweetAuthor username={user.username} name={user.name} created_at={tweet.created_at} detail={props.detail} />
  const Text = <TweetText text={tweet.text} detail={props.detail} />
  const Media = <TweetMedia {...tweet} />
  const Interact = <TweetInteract 
    {...tweet} 
    detail={props.detail} 
    setReplyModalOpen={setReplyModalOpen}
  />

  const replySuccess = (response: TweetType | null) => {
    if (response) dispatch(addReply_brief(response));
  }

  return (
    <InView onChange={(inView) => {
      if (inView && !tweetsLoading && props.loadMoreTweets) {
        setTweetsLoading(true);
        props.loadMoreTweets().then(() => {
          setTweetsLoading(false);
        })
      }
    }}>

      <NewTweetModal 
        modalOpen={replyModalOpen} 
        setModalOpen={setReplyModalOpen} 
        isReplyOf={tweet.id} 
        BriefTweet={BriefTweet} 
        success={props.replySuccess ?? replySuccess} 
      />

      <Box
        sx={{
          border: 1,
          borderTop: 0,
          borderBottom: (props.detail || props.isParent) ? 0 : 1,
          borderColor: colorConfig.border,
          padding: 2,
          pb: props.isParent ? 0 : 2,
          "&:hover": {
            cursor: "pointer"
          }
        }}
      >
        <Link to={`/${user.username}/tweet/${tweet.id}`} style={{all: "unset"}}>
          {/* Note */}
          {
            tweet.retweet_user && (
              <Box
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
                  <Link 
                    to={'/profile/' + tweet.retweet_user}
                    style={{
                      all: 'unset',
                    }}
                  >
                    <Box
                      sx={{
                        "&:hover": {
                          textDecoration: "underline",
                          cursor: "pointer"
                        }
                      }}
                    >
                      {tweet.retweet_user} &#160;&#160; retweeted
                    </Box>
                  </Link>
                </Typography>
              </Box>
            )
          }

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
    </InView>
  )
}

export default Tweet