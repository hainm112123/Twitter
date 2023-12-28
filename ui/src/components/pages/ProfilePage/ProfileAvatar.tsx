import { Avatar, Box, SxProps } from "@mui/material"
import { sizeConfig } from "../../../configs/sizeConfig"
import { Theme } from "@emotion/react"
import { ReactNode } from "react"
import { current } from "@reduxjs/toolkit"

type Props = {
  sx: SxProps<Theme>,
  children?: ReactNode,
  avatar?: any,
  currentAvatar?: any,
}

const ProfileAvatar = (props: Props) => {
  const defaultAvatar = 'url(https://pbs.twimg.com/profile_images/1698531056839012352/QDbb_7_3_400x400.png)'

  return (
    <Box sx={{
      marginTop: sizeConfig.profileAvatarMT,
      border: "4px solid black",
      borderRadius: sizeConfig.profileAvatar,
      width: "fit-content",
      blockSize: "fit-content",
      ...props.sx,
    }}
  >
    <Box 
      sx={{
        width: sizeConfig.profileAvatar,
        height: sizeConfig.profileAvatar,
        borderRadius: sizeConfig.profileAvatar,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundImage: props.avatar ? `url(${props.avatar})` : (props.currentAvatar ? `url('data:image/png;base64,${props.currentAvatar}')` : defaultAvatar),
      }}
      onLoad={() => {
        URL.revokeObjectURL(props.avatar);
      }}
    >
      {props.children}
    </Box>
  </Box>
  )
}

export default ProfileAvatar