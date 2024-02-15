import { Box, CircularProgress, SvgIconTypeMap } from "@mui/material"
import { fontConfig } from "../../../configs/fontConfig"
import { OverridableComponent } from "@mui/material/OverridableComponent"
import { useEffect, useState } from "react"
import { sizeConfig } from "../../../configs/sizeConfig"
import { colorConfig } from "../../../configs/colorConfig"
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { BookmarkBorder, EqualizerOutlined, FavoriteBorder, FileUploadOutlined, RepeatOutlined, Favorite, ChatBubble, Bookmark } from "@mui/icons-material";
import { RootState, useAppDispatch } from "../../../redux/store"
import { useSelector } from "react-redux"
import { toggleLikeTweet, toggleRetweet } from "../../../redux/tweetSlice"
import { motion } from 'framer-motion'

type InterractButton = {
  count?: number,
  color: string,
  bgcolor: string,
  onClick?: React.MouseEventHandler<HTMLDivElement>,
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>,
  ActiveIcon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>,
  active: boolean,
}
const InteractButton = (props: InterractButton) => {
  const [isHover, setHover] = useState(false);

  const Icon = props.active ? props.ActiveIcon : props.Icon

  return (
    <Box 
      sx={{
        display: "flex",
        alignItems: "center"
      }}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={props.onClick}
    >
      <motion.div
        whileTap={{
          scale: 2,
          transition: { duration: 1 },
        }}
      >
        <Icon 
          sx={[
            {
              fontSize: fontConfig.size.secondaryIcon,
              borderRadius: sizeConfig.interactBtnBR,
              padding: "6px 6px 4px",
              display: "flex",
              alignItems: "center",
              transition: 'transform 0.3s ease-in-out'
            },
            (isHover || props.active) && {
              color: props.color,
              transition: colorConfig.btnTransition,
            },
            isHover && {
              bgcolor: props.bgcolor,
            },
          ]} 
        />
      </motion.div>
      {
        props.count !== undefined && <Box 
          sx={[
            {lineHeight: "1.0"},
            (isHover || props.active) && {
              color: props.color,
              transition: colorConfig.btnTransition,
            }
          ]}
        >
          {props.count}
        </Box>
      }
    </Box>
  )
}

type Props = {
  id: number,
  likes: string[],
  retweets: string[],
  replies: number[],
  views: number,
  detail?: boolean,
  setReplyModalOpen: React.Dispatch<React.SetStateAction<boolean>>
} 

const TweetInteract = (props: Props) => {
  const userIdentity = useSelector((state: RootState) => state.user.userIdentity);
  const dispatch = useAppDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      return;
    }
  }, [loaded])

  if (!userIdentity) {
    return <CircularProgress />
  }

  return (
    <Box>
      <Box
        sx={[
          {
            display: "flex",
            color: fontConfig.color.secondaryText,
            justifyContent: "space-between",
            pt: 1, 
          },
          (props.detail === true) && {
            borderBottom: 1,
            borderTop: 1,
            borderColor: colorConfig.border,
            pb: 1,
          }
        ]}
      >
    
        <InteractButton 
          color={fontConfig.color.interactBtn} 
          bgcolor={colorConfig.interactBtnBg} 
          count={props.replies.length} 
          Icon={ChatBubbleOutlineIcon}
          ActiveIcon={ChatBubble}
          onClick={(e) => {
            e.preventDefault();
            props.setReplyModalOpen(true);
          }}
          active={false}
        />

        <InteractButton 
          color={fontConfig.color.retweetBtn} 
          bgcolor={colorConfig.retweetBtnBg} 
          count={props.retweets.length} 
          Icon={RepeatOutlined}
          ActiveIcon={RepeatOutlined}
          onClick={(e) => {
            e.preventDefault();
            dispatch(toggleRetweet(props.id, userIdentity.username));
          }}
          active={props.retweets.findIndex(temp => temp === userIdentity.username) !== -1}
        />
        
        <InteractButton 
          color={fontConfig.color.likeBtn} 
          bgcolor={colorConfig.likeBtnBg} 
          count={props.likes.length} 
          Icon={FavoriteBorder}
          ActiveIcon={Favorite}
          onClick={(e) => {
            e.preventDefault();
            dispatch(toggleLikeTweet(props.id, userIdentity.username));
          }}
          active={props.likes.findIndex((temp) => temp === userIdentity.username) !== -1}
        />

        <InteractButton 
          color={fontConfig.color.interactBtn} 
          bgcolor={colorConfig.interactBtnBg} 
          count={props.replies.length} 
          Icon={EqualizerOutlined}
          ActiveIcon={EqualizerOutlined}
          onClick={(e) => {
            e.preventDefault();
          }}
          active={false}
        />
        
        <Box
          sx={{
            display: "flex"
          }}
        >
          <InteractButton 
            color={fontConfig.color.interactBtn} 
            bgcolor={colorConfig.interactBtnBg}
            Icon={BookmarkBorder}
            ActiveIcon={Bookmark}
            onClick={(e) => {
              e.preventDefault();
            }}
            active={false}
          />
          <InteractButton 
            color={fontConfig.color.interactBtn} 
            bgcolor={colorConfig.interactBtnBg}
            Icon={FileUploadOutlined}
            ActiveIcon={FileUploadOutlined}
            onClick={(e) => {
              e.preventDefault();
            }}
            active={false}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default TweetInteract