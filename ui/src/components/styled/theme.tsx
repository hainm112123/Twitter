import { createTheme } from "@mui/material";
import { fontConfig } from "../../configs/fontConfig";
import { colorConfig } from "../../configs/colorConfig";
import { sizeConfig } from "../../configs/sizeConfig";

const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
    
      variants: [
        {
          props: {className: "light"},
          style: {
            backgroundColor: fontConfig.color.primaryText,
            color: colorConfig.mainBg,
            border: "1px solid" + fontConfig.color.primaryText,
            borderRadius: sizeConfig.sidebarBtnBR,
            textTransform: "none",
            fontWeight: fontConfig.weight.bold,
            alignSelf: "center",
            "&:hover": {
              backgroundColor: fontConfig.color.primaryText,
              opacity: "0.8"
            }
          }
        },
        {
          props: {className: "dark"},
          style: {
            backgroundColor: colorConfig.mainBg,
            color: fontConfig.color.primaryText,
            border: "1px solid" + fontConfig.color.primaryText,
            borderRadius: sizeConfig.sidebarBtnBR,
            textTransform: "none",
            fontWeight: fontConfig.weight.bold,
            alignSelf: "center",
            "&:hover": {
              backgroundColor: colorConfig.secondaryBg,
            }
          }
        },
        {
          props: {className: "primary"},
          style: {
            backgroundColor: colorConfig.primaryBtnBg,
            color: fontConfig.color.primaryText,
            borderRadius: sizeConfig.sidebarBtnBR,
            textTransform: "none",
            fontWeight: fontConfig.weight.bold,
            alignSelf: "center",
            "&:hover": {
              backgroundColor: colorConfig.primaryBtnBgHover
            }
          }
        }
      ]
    },

    MuiSvgIcon: {
      variants: [
        {
          props: {className: "closeBtn--modal"},
          style: {
            padding: "6px",
            borderRadius: "32px",
            color: fontConfig.color.primaryText,
            marginLeft: "-6px",
            "&:hover": {
              cursor: "pointer",
              backgroundColor: colorConfig.secondaryBg,
            }
          }
        }
      ]
    }
  }
})

export default theme