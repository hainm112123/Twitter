import { Box } from "@mui/material";
import React from "react";
import Tweet from "../components/common/Tweet";
import { colorConfig } from "../configs/colorConfig";

type Props = {}

const HomePage = (props: Props) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center",
          paddingTop: "16px",
          paddingBottom: "16px",
          border: 1,
          borderTop: 0,
          borderColor: colorConfig.border,
          position: "sticky",
          top: 0,
          right: 0,
          left: 0,
          bgcolor: colorConfig.bluredMainBg,  
        }}
      >
        <Box
          sx={{
            flex: 1,
          }}
        >
          For you
        </Box>
        <Box
          sx={{
            flex: 1,
          }}
        >
          Following
        </Box>
      </Box>
      <Tweet/>
      <Tweet/>
      <Tweet/>
    </Box>
  )
}

export default HomePage