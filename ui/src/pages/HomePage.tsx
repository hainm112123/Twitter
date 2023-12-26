import { Box } from "@mui/material";
import React from "react";
import Tweet from "../components/common/Tweet";
import { colorConfig } from "../configs/colorConfig";
import Header from "../components/common/Header";

type Props = {}

const HomePage = (props: Props) => {
  return (
    <Box>
      <Header
        sx={{
          paddingTop: "16px",
          paddingBottom: "16px",
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
      </Header>
      <Tweet/>
      <Tweet/>
      <Tweet/>
    </Box>
  )
}

export default HomePage