import { Box, SvgIconTypeMap } from "@mui/material"
import { fontConfig } from "../../../configs/fontConfig"
import { OverridableComponent } from "@mui/material/OverridableComponent"
import { useState } from "react"
import { sizeConfig } from "../../../configs/sizeConfig"
import { colorConfig } from "../../../configs/colorConfig"
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { BookmarkBorder, EqualizerOutlined, FavoriteBorder, FileUploadOutlined, RepeatOutlined } from "@mui/icons-material";

type InterractButton = {
  count?: number,
  color: string,
  bgcolor: string,
  onClick?: any,
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
}
const InteractButton = (props: InterractButton) => {
  const [isHover, setHover] = useState(false);

  return (
    <Box 
      sx={{
        display: "flex",
        alignItems: "center"
      }}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <props.Icon sx={[
        {
          fontSize: fontConfig.size.secondaryIcon,
          borderRadius: sizeConfig.interactBtnBR,
          padding: "6px 6px 4px",
          display: "flex",
          alignItems: "center",
        },
        isHover && {
          color: props.color,
          bgcolor: props.bgcolor,
          transition: colorConfig.btnTransition,
        }
      ]} />
      {
        props.count !== undefined && <Box 
          sx={[
            {lineHeight: "1.0"},
            isHover && {
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
  likes: number[],
  retweets: number[],
  replies: number[],
  views: number,
} 

const TweetInteract = (props: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        color: fontConfig.color.secondaryText,
        justifyContent: "space-between",
        marginTop: "12px"
      }}
    >
  
      <InteractButton 
        color={fontConfig.color.interactBtn} 
        bgcolor={colorConfig.interactBtnBg} 
        count={props.replies.length} 
        Icon={ChatBubbleOutlineIcon}
      />

      <InteractButton 
        color={fontConfig.color.retweetBtn} 
        bgcolor={colorConfig.retweetBtnBg} 
        count={props.retweets.length} 
        Icon={RepeatOutlined}
      />
      
      <InteractButton 
        color={fontConfig.color.likeBtn} 
        bgcolor={colorConfig.likeBtnBg} 
        count={props.likes.length} 
        Icon={FavoriteBorder}
      />

      <InteractButton 
        color={fontConfig.color.interactBtn} 
        bgcolor={colorConfig.interactBtnBg} 
        count={props.replies.length} 
        Icon={EqualizerOutlined}
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
        />
        <InteractButton 
          color={fontConfig.color.interactBtn} 
          bgcolor={colorConfig.interactBtnBg}
          Icon={FileUploadOutlined}
        />
      </Box>
    </Box>
  )
}

export default TweetInteract