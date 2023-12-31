import { colorConfig } from "../configs/colorConfig";
import { fontConfig } from "../configs/fontConfig";
import { sizeConfig } from "./sizeConfig";

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
  },
  modal: {
    position: "absolute" as "absoulute",
    left: "50%",
    transform: "translateX(-50%)",
    border: 2,
    borderColor: colorConfig.mainBg,
    boxShadow: 24,
    minWidth: 400,
    width: "30%",
    bgcolor: colorConfig.mainBg,
    p: 2,
    borderRadius: 4,
  },
  avatar: {
    height: sizeConfig.primaryAvatar,
    width: sizeConfig.primaryAvatar,
    borderRadius: sizeConfig.primaryBorderRadius,
    backgroundPosition: "center",
    backgroundSize: "cover",
    "&:hover": {
      opacity: "0.8"
    }
  },
  HeaderText: {
    flex: 1,
    textAlign: "left",
    ml: 1,
    lineHeight: "1.0",
    fontSize: fontConfig.size.subHeader,
    fontWeight: fontConfig.weight.subHeader,
  }
}