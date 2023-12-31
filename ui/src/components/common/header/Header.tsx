import { Box, SxProps } from "@mui/material"
import { colorConfig } from "../../../configs/colorConfig"
import { ReactNode } from "react"

type Props = {
  children?: ReactNode,
  sx?: SxProps
}

const Header = (props: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        textAlign: "center",
        border: 1,
        borderTop: 0,
        borderColor: colorConfig.border,
        position: "sticky",
        top: 0,
        right: 0,
        left: 0,
        zIndex: 10,
        bgcolor: colorConfig.bluredMainBg, 
        backdropFilter: 'blur(4px)',
        ...props.sx, 
      }}
    >
      {props.children}
    </Box>
  )
}

export default Header