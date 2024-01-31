import { Box, SvgIconTypeMap } from "@mui/material"
import { fontConfig } from "../../../configs/fontConfig"
import { OverridableComponent } from "@mui/material/OverridableComponent"
import { SetStateAction, useEffect, useState } from "react"
import { sizeConfig } from "../../../configs/sizeConfig"
import { colorConfig } from "../../../configs/colorConfig"
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { BookmarkBorder, EqualizerOutlined, FavoriteBorder, FileUploadOutlined, RepeatOutlined, Favorite, ChatBubble, Bookmark } from "@mui/icons-material";
import { RootState, useAppDispatch } from "../../../redux/store"
import { getAuthor, getTweet, toggleLikeTweet } from "../../../redux/tweetSlice"
import { useSelector } from "react-redux"
import NewTweetModal from "./NewTweetModal"

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
      <Icon sx={[
        {
          fontSize: fontConfig.size.secondaryIcon,
          borderRadius: sizeConfig.interactBtnBR,
          padding: "6px 6px 4px",
          display: "flex",
          alignItems: "center",
        },
        (isHover || props.active) && {
          color: props.color,
          transition: colorConfig.btnTransition,
        },
        isHover && {
          bgcolor: props.bgcolor,
        }
      ]} />
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
  setTweet: any,
  detail: boolean,
  BriefTweet: JSX.Element,
  replySuccess?: Function,
} 

const TweetInteract = (props: Props) => {
  const dispatch = useAppDispatch();
  const userIdentity = useSelector((state: RootState) => state.user.userIdentity);
  const [modalOpen, setModalOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      return;
    }
  }, [loaded])

  return (
    <Box>
      <NewTweetModal 
        modalOpen={modalOpen} 
        setModalOpen={setModalOpen} 
        isReplyOf={props.id} 
        BriefTweet={props.BriefTweet} 
        success={props.replySuccess ? props.replySuccess : () => {}} 
      />
      <Box
        sx={[
          {
            display: "flex",
            color: fontConfig.color.secondaryText,
            justifyContent: "space-between",
            pt: 1, 
          },
          props.detail && {
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
            setModalOpen(true);
          }}
          active={props.replies.findIndex(async (temp) => {
            const author = await getAuthor(temp);
            return author === userIdentity?.username
          }) != -1}
        />

        <InteractButton 
          color={fontConfig.color.retweetBtn} 
          bgcolor={colorConfig.retweetBtnBg} 
          count={props.retweets.length} 
          Icon={RepeatOutlined}
          ActiveIcon={RepeatOutlined}
          onClick={(e) => {
            e.preventDefault();
          }}
          active={false}
        />
        
        <InteractButton 
          color={fontConfig.color.likeBtn} 
          bgcolor={colorConfig.likeBtnBg} 
          count={props.likes.length} 
          Icon={FavoriteBorder}
          ActiveIcon={Favorite}
          onClick={(e) => {
            e.preventDefault();
            const fn = async () => {
              await dispatch(toggleLikeTweet(props.id, userIdentity?.username));
              const tweetData = await getTweet(props.id)
              props.setTweet(tweetData);
            }
            fn();
          }}
          active={props.likes.findIndex((temp) => temp === userIdentity?.username) !== -1}
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