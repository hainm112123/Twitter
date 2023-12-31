import { Box, Button, Typography } from "@mui/material"
import Header from "../../common/header/Header"
import { ArrowBack } from "@mui/icons-material"
import { fontConfig } from "../../../configs/fontConfig"
import { colorConfig } from "../../../configs/colorConfig"
import { useNavigate } from "react-router-dom"
import HeaderWithBack from "../../common/header/HeaderWithBack"

type Props = {
  name: any,
  tweetsCount: any,
}

const ProfileHeader = (props: Props) => {
  return (
    <HeaderWithBack>
      <Box
        sx={{
          flex: 1,
          textAlign: "left",
          marginLeft: "16px",
        }}
      >
        <Typography 
          sx={{
            fontSize: fontConfig.size.subHeader,
            fontWeight: fontConfig.weight.subHeader,
          }}
        >
          {props.name}
        </Typography>
        <Typography
          sx={{
            fontSize: fontConfig.size.secondaryText,
            color: fontConfig.color.secondaryText
          }}
        >
          {props.tweetsCount} tweets
        </Typography>
      </Box>
    </HeaderWithBack>
  )
}

export default ProfileHeader