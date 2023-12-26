import { Box, Button, Typography } from "@mui/material"
import Header from "../../common/Header"
import { ArrowBack } from "@mui/icons-material"
import { fontConfig } from "../../../configs/fontConfig"
import { colorConfig } from "../../../configs/colorConfig"
import { useNavigate } from "react-router-dom"

type Props = {
  name: any,
  tweetsCount: any,
}

const ProfileHeader = (props: Props) => {
  const navigate = useNavigate();

  return (
    <Header
      sx={{
        borderBottom: 0,
        paddingY: "6px",
        zIndex: 100
      }}
    >
      <Button 
        variant="contained"
        sx={{
          bgcolor: "transparent",
          borderRadius: "100px",
          textTransform: "none",
          "&:hover": {
            bgcolor: colorConfig.sidebarBtnHover,
          },
        }}
        onClick={() => navigate(-1)}
      >
        <ArrowBack sx={{color: fontConfig.color.primaryText}} fontSize="small" />
      </Button>
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
    </Header>
  )
}

export default ProfileHeader