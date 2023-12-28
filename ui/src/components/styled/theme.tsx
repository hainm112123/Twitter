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
        }
      ]
    }
  }
})

export default theme