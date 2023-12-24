import { Box } from "@mui/material";
import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { colorConfig } from "../../configs/colorConfig";

type Props = {
  state?: string,
  children: ReactNode
}

const PageWrapper = (props: Props) => {
  return (
    <Box>
      {props.children}
    </Box>
  )
}

export default PageWrapper