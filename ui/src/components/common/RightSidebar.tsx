import { Box, List, Typography, ListItem, ListItemButton } from "@mui/material";
import React from "react";
import { colorConfig } from "../../configs/colorConfig";
import { sizeConfig } from "../../configs/sizeConfig";
import { fontConfig } from "../../configs/fontConfig";
import UserInfor from "./UserInfor";

type Props = {}

const RightSidebar = (props: Props) => {
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        paddingLeft: "16px",
        paddingTop: "12px",
      }}
    >
      <Box
        sx={{
          bgcolor: colorConfig.secondaryBg,
          borderRadius: "20px",
        }}
      >
        <Box
          sx={{
            fontSize: fontConfig.size.subHeader,
            fontWeight: fontConfig.weight.subHeader,
            padding: "8px 14px 0px",
          }}
        >
          Who to follow
        </Box>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <UserInfor self={false}/>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <UserInfor self={false}/>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  )
}

export default RightSidebar