import { Avatar, Box, Button, CircularProgress, Modal, ThemeProvider, Typography } from "@mui/material"
import { sizeConfig } from "../../../configs/sizeConfig"
import { fontConfig } from "../../../configs/fontConfig"
import { colorConfig } from "../../../configs/colorConfig"
import { CalendarMonthOutlined } from "@mui/icons-material"
import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../../../redux/store"
import { useState } from "react"
import theme from "../../styled/theme"
import EditProfile from "./EditProfile"
import ProfileAvatar from "./ProfileAvatar"
import moment from "moment"
import Loader from "../../common/Loader"
import { toggleFollow } from "../../../redux/userSlice"

type Props = {
  name: any,
  username: any,
  follwers: any,
  following: any,
  currentAvatar: any,
  currentCover: any,
  bio: any,
  joined_date: any,
}

const ProfileBio = (props: Props) => {
  const userIdentity = useSelector((state: RootState) => state.user.userIdentity);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [followLoading, setFollowLoading] = useState(false);

  if (!userIdentity) {
    return <Loader />
  }

  const index = userIdentity.following.findIndex((temp => temp === props.username));
  const themeClass = index === -1 ? 'light' : 'dark';
  const buttonText = index === -1 ? 'Follow' : 'Following'

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
        {/* avatar */}
        <ProfileAvatar sx={{}} currentAvatar={props.currentAvatar}/>

        {
          userIdentity?.username === props.username && <ThemeProvider theme={theme}>
            <Button  
              onClick={() => setModalOpen(true)}
              className="dark"
            >
              Edit Profile
            </Button>
          </ThemeProvider>
        }

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          sx={{
            bgcolor: colorConfig.modelBackdrop,
          }}
        >
          <>
            <EditProfile setModalOpen={setModalOpen} currentAvatar={props.currentAvatar} currentCover={props.currentCover} />
          </>
        </Modal>

        {
          userIdentity?.username !== props.username && <ThemeProvider theme={theme}>
            <Button 
              className={themeClass}
              onClick={() => {
                if (followLoading) return;
                setFollowLoading(true)
                dispatch(toggleFollow(props.username)).then(() => {
                  setFollowLoading(false);
                });
              }}
              sx={[
                index !== -1 && {
                  "&:hover": {
                    color: colorConfig.danger,
                    borderColor: colorConfig.danger,
                    bgcolor: "transparent"
                  }
                }
              ]}
            >
              {followLoading ? <CircularProgress size="24px" sx={{ml: 3, mr: 3}} /> : buttonText}
            </Button>
          </ThemeProvider>
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
          {props.bio}
        </Typography>
        
        <Box sx={{
          display: "flex",
          fontSize: fontConfig.size.text_2,
          color: fontConfig.color.secondaryText,
          mb: 2,
        }}>
          <CalendarMonthOutlined sx={{fontSize: fontConfig.size.secondaryIcon, marginRight: "4px"}} />
          <Box>Joined {moment(props.joined_date).format('MMMM YYYY')}</Box>
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
              {props.following.length}
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
              {props.follwers.length}
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