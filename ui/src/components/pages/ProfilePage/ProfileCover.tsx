import { Theme } from "@emotion/react"
import { Box, SxProps } from "@mui/material"
import { ReactNode } from "react"

type Props = {
  children?: ReactNode,
  sx?: SxProps<Theme>,
  cover?: any,
  currentCover?: any,
}

const ProfileCover = (props: Props) => {
  const defaultCover = `url("https://pbs.twimg.com/profile_banners/2941313791/1699425381/1500x500")`

  return (
    <Box
      sx={{
        bgcolor: "#333639",
        height: "200px",
        overflow: "hidden",
        // backgroundImage: props.cover ? `url(${props.cover})` : (props.currentCover ? `url('data:image/png;base64,${props.currentCover}')` : defaultCover),
        backgroundImage: props.cover ? `url(${props.cover})` : (props.currentCover ? `url(${props.currentCover})` : defaultCover),
        backgroundPosition: "center",
        backgroundSize: "cover",
        ...props.sx,
      }}
      onLoad={() => {
        URL.revokeObjectURL(props.cover);
      }}
    >
      {props.children}
    </Box>
  )
}

export default ProfileCover