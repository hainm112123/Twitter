import { Box, Typography } from "@mui/material";
import React from "react";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import { sizeConfig } from "../../configs/sizeConfig";
import { fontConfig } from "../../configs/fontConfig";
import postImage from "../../assets/images/postImage.jpg"
import { BookmarkBorder, EqualizerOutlined, FavoriteBorder, FileUploadOutlined, RepeatOutlined } from "@mui/icons-material";
import { colorConfig } from "../../configs/colorConfig";

type Props = {}

const commonSx = {
  borderRadius: sizeConfig.interactBtnBR,
  padding: "4px 4px 2px",
  display: "flex",
  alignItems: "center",
}

const Tweet = (props: Props) => {
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
          Yuuhi reposted
        </Typography>
      </Box>

      {/* Main */}
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box>  
          <Box
            sx={{
              bgcolor: "#fff",
              borderRadius: sizeConfig.primaryBorderRadius,
              height: sizeConfig.primaryAvatar,
              width: sizeConfig.primaryAvatar,
              marginRight: "12px",
            }}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
          }}
        >
          {/* author */}
          <Box
            sx={{
              display: "flex"
            }}
          >
            <Box
              sx={{
                fontWeight: fontConfig.weight.author
              }}
            >
              白石定規（魔女旅、ナナかす、リリエール）
            </Box>
            <Box
              sx={{
                marginLeft: "8px",
                color: fontConfig.color.secondaryText
              }}
            >
              @jojojojougi &#183; 1h
            </Box>
          </Box>
          
          {/* text */}
          <Typography
            sx={{
              whiteSpace: "pre-line",
              paddingBottom: "12px",
            }}
          >
            { 
              `魔女学、たくさんの購入報告ありがとうございますー！
              嬉しい嬉しい🦉🦉🦉
  
              #魔女学
              制服姿のイレイナさんはいいぞ
  
              いいぞ！！`
            }
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
                <img 
                  src={postImage} 
                  style={{
                    maxHeight: sizeConfig.imgMaxHeight
                  }}
                />
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
            <Box
              sx={{
                ...commonSx,
                "&:hover": {
                  color: fontConfig.color.interactBtn,
                  bgcolor: colorConfig.interactBtnBg,
                  transition: colorConfig.btnTransition,
                }
              }}
            >
              <ChatBubbleOutlineIcon/>
            </Box>

            <Box
              sx={{
                ...commonSx,
                "&:hover": {
                  color: fontConfig.color.retweetBtn,
                  bgcolor: colorConfig.retweetBtnBg,
                  transition: colorConfig.btnTransition,
                }
              }}
            >
              <RepeatOutlined/>
            </Box>

            <Box
              sx={{
                ...commonSx,
                "&:hover": {
                  color: fontConfig.color.likeBtn,
                  bgcolor: colorConfig.likeBtnBg,
                  transition: colorConfig.btnTransition,
                }
              }}
            >
              <FavoriteBorder/>
            </Box>

            <Box
              sx={{
                ...commonSx,
                "&:hover": {
                  color: fontConfig.color.interactBtn,
                  bgcolor: colorConfig.interactBtnBg,
                  transition: colorConfig.btnTransition,
                }
              }}
            >
              <EqualizerOutlined/>
            </Box>
            
            <Box
              sx={{
                display: "flex"
              }}
            >
              <Box
                sx={{
                  ...commonSx,
                  "&:hover": {
                    color: fontConfig.color.interactBtn,
                    bgcolor: colorConfig.interactBtnBg,
                    transition: colorConfig.btnTransition,
                  }
                }}
              >
                <BookmarkBorder/>
              </Box>
              <Box
                sx={{
                  ...commonSx,
                  "&:hover": {
                    color: fontConfig.color.interactBtn,
                    bgcolor: colorConfig.interactBtnBg,
                    transition: colorConfig.btnTransition,
                  }
                }}
              >
                <FileUploadOutlined/>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Tweet