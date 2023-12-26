import { Button, styled } from "@mui/material";
import { colorConfig } from "../../configs/colorConfig";
import { sizeConfig } from "../../configs/sizeConfig";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode,
}

const StyledButton = styled(Button)({
  styles: {
    bgcolor: colorConfig.mainBg,
    borderRadius: sizeConfig.sidebarBtnBR,
    textTransform: "none",
    "&:hover": {
      bgcolor: colorConfig.sidebarBtnHover,
    }
  }
})

export default StyledButton