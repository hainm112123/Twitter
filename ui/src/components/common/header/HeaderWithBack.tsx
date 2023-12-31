import { Box, Button, SxProps } from "@mui/material"
import { colorConfig } from "../../../configs/colorConfig"
import { ReactNode } from "react"
import Header from "./Header"
import { ArrowBack } from "@mui/icons-material"
import { fontConfig } from "../../../configs/fontConfig"
import { useNavigate } from "react-router-dom"
import { sizeConfig } from "../../../configs/sizeConfig"

type Props = {
  children?: ReactNode,
  sx?: SxProps
}

const HeaderWithBack = (props: Props) => {
  const navigate = useNavigate();

  return (
    <Header sx={{
      borderBottom: 0,
      paddingY: "6px",
      zIndex: 100,
      display: "flex",
      alignItems: "center",
    }}>
      <Box 
        sx={{
          p: 1,
        }}
      >
        <ArrowBack 
          sx={{
            color: fontConfig.color.primaryText,
            borderRadius: sizeConfig.primaryBorderRadius,
            p: 1,
            mb: "-6px",
            "&:hover": {
              bgcolor: colorConfig.sidebarBtnHover,
              cursor: "pointer"
            },
          }} 
          onClick={() => navigate(-1)}
        />
      </Box>
      {props.children}
    </Header>
  )
}

export default HeaderWithBack