import { Avatar, Box, Button, Typography } from "@mui/material"
import { sizeConfig } from "../../../configs/sizeConfig"
import { fontConfig } from "../../../configs/fontConfig"
import { colorConfig } from "../../../configs/colorConfig"
import { CalendarMonthOutlined, PrivacyTipSharp } from "@mui/icons-material"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

type Props = {
  name: any,
  username: any,
  follwersCount: any,
  followingCount: any,
}

const ProfileBio = (props: Props) => {
  const userIdentity = useSelector((state: RootState) => state.user.userIdentity);

  return (
    <Box
      sx={{
        padding: "8px 20px",
        position: "relative",
        border: 1,
        borderTop: 0,
        borderBottom: 0,
        borderColor: colorConfig.border,
      }}
    >
      {/* top */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{
            marginTop: sizeConfig.profileAvatarMT,
            border: "4px solid black",
            borderRadius: sizeConfig.profileAvatar
          }}
        >
          <Avatar sx={{
            width: sizeConfig.profileAvatar,
            height: sizeConfig.profileAvatar,
          }} />
        </Box>

        {
          userIdentity?.username === props.username && <Button
            variant="contained"
            sx={{
              bgcolor: colorConfig.mainBg,
              color: fontConfig.color.primaryText,
              border: "1px solid" + fontConfig.color.primaryText,
              borderRadius: sizeConfig.sidebarBtnBR,
              textTransform: "none",
              fontWeight: fontConfig.weight.bold,
              alignSelf: "center",
              "&:hover": {
                bgcolor: colorConfig.secondaryBg,
              }
            }}
          >
            Edit Profile
          </Button>
        }

        {
          userIdentity?.username !== props.username && <Button
            variant="contained"
            sx={{
              bgcolor: fontConfig.color.primaryText,
              color: colorConfig.mainBg,
              border: "1px solid" + fontConfig.color.primaryText,
              borderRadius: sizeConfig.sidebarBtnBR,
              textTransform: "none",
              fontWeight: fontConfig.weight.bold,
              alignSelf: "center",
              "&:hover": {
                bgcolor: fontConfig.color.primaryText,
                opacity: "0.8"
              }
            }}
          >
            Follow
          </Button>
        }
      </Box>

      {/* detail */}
      <Box sx={{
        marginTop: "20px",
      }}>
        <Typography sx={{
          fontSize: fontConfig.size.subHeader,
          fontWeight: fontConfig.weight.subHeader,
        }}
        >
          {props.name}
        </Typography>
        <Typography sx={{
          color: fontConfig.color.secondaryText,
          fontSize: fontConfig.size.text_2,
          mb: 2,
        }}>
          @{props.username}
        </Typography>
        
        <Typography sx={{
          mb: 2,
        }}>
          Hi, I'm {props.name}
        </Typography>
        
        <Box sx={{
          display: "flex",
          fontSize: fontConfig.size.text_2,
          color: fontConfig.color.secondaryText,
          mb: 2,
        }}>
          <CalendarMonthOutlined sx={{fontSize: fontConfig.size.secondaryIcon, marginRight: "4px"}} />
          <Box>Joined December 2023</Box>
        </Box>

        <Box sx={{
          display: "flex",
        }}>
          <Box sx={{
            display: "flex",
            alignItems: "center",
            marginRight: "16px",
          }}>
            <Typography sx={{
              marginRight: "4px",                
              fontWeight: fontConfig.weight.bold,
              fontSize: fontConfig.size.text_2
            }}>
              {props.followingCount}
            </Typography>
            <Typography sx={{
              color: fontConfig.color.secondaryText,
              fontSize: fontConfig.size.text_2,
            }}>
              Following
            </Typography>
          </Box>

          <Box sx={{
            display: "flex",
            alignItems: "center"
          }}>
            <Typography sx={{
              marginRight: "4px",
              fontWeight: fontConfig.weight.bold,
              fontSize: fontConfig.size.text_2
            }}>
              {props.follwersCount}
            </Typography>
            <Typography sx={{
              color: fontConfig.color.secondaryText,
              fontSize: fontConfig.size.text_2,
            }}>
              Followers
            </Typography>
          </Box>
        </Box>
        
        {/* followed by */}
        <Box>

        </Box>
      </Box>
    </Box>
  )
}

export default ProfileBio