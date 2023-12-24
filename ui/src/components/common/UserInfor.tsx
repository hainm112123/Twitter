import { Box } from "@mui/material"
import { sizeConfig } from "../../configs/sizeConfig"
import { colorConfig } from "../../configs/colorConfig"
import { fontConfig } from "../../configs/fontConfig"

type Props = {
  self: boolean
}

const UserInfor = (props: Props) => {
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
          height: sizeConfig.secondaryAvatar,
          width: sizeConfig.secondaryAvatar,
          borderRadius: sizeConfig.secondaryBorderRadius,
          bgcolor: "#fff"
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
          yuuhi
        </Box>
        <Box
          sx={{
            color: fontConfig.color.secondaryText
          }}
        >
          @yuuhi
        </Box>
      </Box>
      {
        !props.self && <Box
          sx={{
            bgcolor: colorConfig.followBtnBg,
            color: fontConfig.color.followBtn,
            fontWeight: fontConfig.weight.bold,
            padding: "4px 8px",
            borderRadius: "14px"
          }}
        >
          Follow
        </Box>
      }
    </Box>
  )
}

export default UserInfor