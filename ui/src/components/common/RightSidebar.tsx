import { Box, List, Typography, ListItem, ListItemButton } from "@mui/material";
import React from "react";
import { colorConfig } from "../../configs/colorConfig";
import { sizeConfig } from "../../configs/sizeConfig";
import { fontConfig } from "../../configs/fontConfig";
import UserInfor from "./UserInfor";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Link } from "react-router-dom";

type Props = {}

const RightSidebar = (props: Props) => {
  const otherUsers = useSelector((state: RootState) => state.user.others);

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
          You might like
        </Box>
        <List>
          {
            otherUsers.map((user, index) => (
              <ListItem disablePadding key={index} sx={{
                '&:hover': {
                  bgcolor: "rgba(255,255,255,0.03)"
                }
              }}>
                <Link style={{textDecoration: "none", color: "unset", flex: 1}} to={`/profile/${user.username}`}>
                  <ListItemButton>
                    <UserInfor self={false} userIdentity={user} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))
          }
        </List>
      </Box>
    </Box>
  )
}

export default RightSidebar