import { Box, Button, ThemeProvider } from "@mui/material"
import { sizeConfig } from "../../configs/sizeConfig"
import { colorConfig } from "../../configs/colorConfig"
import { fontConfig } from "../../configs/fontConfig"
import { UserIdentity } from "../../types/UserIdentity"
import theme from "../styled/theme"
import { styleConfig } from "../../configs/styleConfig"

type Props = {
  self: boolean,
  userIdentity: UserIdentity,
}

const UserInfor = ({self, userIdentity}: Props) => {
  const defaultAvatar = 'url(https://pbs.twimg.com/profile_images/1698531056839012352/QDbb_7_3_400x400.png)'

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          ...styleConfig.avatar,
          backgroundImage: (userIdentity.avatar ? `url('data:image/png;base64,${userIdentity.avatar}')` : defaultAvatar),
        }}
      />
      <Box
        sx={{
          flex: 1,
          marginLeft: 2,
          textAlign: "left",
        }}
      >
        <Box
          sx={{
            fontWeight: fontConfig.weight.author
          }}
        >
          {userIdentity.name}
        </Box>
        <Box
          sx={{
            color: fontConfig.color.secondaryText
          }}
        >
          @{userIdentity.username}
        </Box>
      </Box>
      {
        !self && <ThemeProvider theme={theme}>
          <Button 
            className="light"
            sx={{
              padding: "2px 14px",
            }}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Follow
          </Button>
        </ThemeProvider>
      }
    </Box>
  )
}

export default UserInfor