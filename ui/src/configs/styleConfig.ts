import { colorConfig } from "../configs/colorConfig";
import { fontConfig } from "../configs/fontConfig";

export const styleConfig = {
  auth: {
    container: {
      bgcolor: "#252c34",
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    formControl: {
      bgcolor: colorConfig.mainBg,
      color: fontConfig.color.primaryText,
      padding: "32px",
      minWidth: "20%",
    },
    header: {
      marginBottom: "24px",
      fontWeight: fontConfig.weight.subHeader,
      fontSize: fontConfig.size.header,
    },
    input: {
      marginBottom: 3,
    },
    button: {
      bgcolor: colorConfig.primaryBtnBg,
      color: fontConfig.color.primaryText,
      fontWeight: fontConfig.weight.bold,
      marginBottom: 1,
      "&:hover": {
        bgcolor: colorConfig.primaryBtnBg,
      }
    },
    note: {
      textAlign: "right",
      color: fontConfig.color.secondaryText,
      fontSize: fontConfig.size.secondaryText,
    },
    link: {
      textDecoration: "none", 
      color: fontConfig.color.interactBtn
    }
  }
}