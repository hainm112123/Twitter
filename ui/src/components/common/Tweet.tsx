import { Box, SvgIconTypeMap, Typography } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import { sizeConfig } from "../../configs/sizeConfig";
import { fontConfig } from "../../configs/fontConfig";
import postImage from "../../assets/images/postImage.jpg"
import { BookmarkBorder, EqualizerOutlined, FavoriteBorder, FileUploadOutlined, RepeatOutlined } from "@mui/icons-material";
import { colorConfig } from "../../configs/colorConfig";
import TweetType from "../../types/TweetType";
import { useAppDispatch } from "../../redux/store";
import { getUser } from "../../redux/userSlice";
import moment from "moment";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { styleConfig } from "../../configs/styleConfig";
import { Link } from "react-router-dom";

const toHours = (time_in_ms: number) => {
  return Math.round(time_in_ms / 1000 / 60 / 60)
}

const defaultAvatar = 'url(https://pbs.twimg.com/profile_images/1698531056839012352/QDbb_7_3_400x400.png)'

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

const Tweet = (props: TweetType) => {
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

  useEffect(() => {
    if (!isLoaded) {
      setLoaded(true);
      return;
    }
    const fn = async () => {
      const data = await dispatch(getUser(props.author));
      setUser(data);
    }
    fn();
  }, [isLoaded, dispatch])

  return (
    <Box
      sx={{
        border: 1,
        borderTop: 0,
        borderColor: colorConfig.border,
        padding: "12px",
      }}
    >
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
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Link to={`/profile/${user.username}`}>
          <Box>  
            <Box
              sx={{
                ...styleConfig.avatar,
                mr: 2,
                backgroundImage: (user.avatar ? `url('data:image/png;base64,${user.avatar}')` : defaultAvatar),
              }}
            />
          </Box>
        </Link>

        <Box
          sx={{
            flex: 1,
          }}
        >
          {/* author */}
          <Link to={`/profile/${user.username}`} style={{
            all: "unset"
          }}>
            <Box
              sx={{
                display: "flex"
              }}
            >
              <Box
                sx={{
                  fontWeight: fontConfig.weight.author,
                  "&:hover": {
                    textDecoration: "underline",
                    cursor: "pointer"
                  }
                }}
              >
                {user.name}
              </Box>
              <Box
                sx={{
                  marginLeft: "8px",
                  color: fontConfig.color.secondaryText,
                  "&:hover": {
                    cursor: "pointer"
                  }
                }}
              >
                @{user.username} &#183; {toHours(Date.now() - new Date(props.created_at).valueOf())}h
              </Box>
            </Box>
          </Link>
          
          {/* text */}
          <Typography
            sx={{
              whiteSpace: "pre-line",
              paddingBottom: "12px",
            }}
          >
            {props.text}
          </Typography>

          {/* image */}
          <Box>
            <Box
              sx={{
                borderRadius: "20px",
                blockSize: "fit-content",
                width: "fit-content",
                overflow: "hidden",
              }}
            >
              {props.photos.length > 0 && <img src={`data:image/png;base64,${props.photos[0]}`} style={{maxWidth: "100%", maxHeight: sizeConfig.imgMaxHeight}}/>}
              {props.video && <video controls style={{maxWidth: "100%", maxHeight: sizeConfig.imgMaxHeight}}>
                <source src={`data:video/mp4;base64,${props.video}`} type="video/mp4" />
              </video>}
            </Box>
          </Box>

          {/* interact */}
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
        </Box>
      </Box>
    </Box>
  )
}

export default Tweet