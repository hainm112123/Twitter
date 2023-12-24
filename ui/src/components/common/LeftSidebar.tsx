import { Box, Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Popover, Typography } from "@mui/material";
import React, { ReactNode, useState } from "react";
import { fontConfig } from "../../configs/fontConfig";
import { colorConfig } from "../../configs/colorConfig";
import logo from "../../assets/images/logo.png"
import appRoutes from "../../routes/appRoutes";
import HomePage from "../../pages/HomePage";
import { RouteType } from "../../routes/RouteType";
import { sizeConfig } from "../../configs/sizeConfig";
import UserInfor from "./UserInfor";
import { RootState, useAppDispatch } from "../../redux/store";
import { useCookies } from "react-cookie";
import { logout } from "../../redux/authSlice";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

type Props = {}

let items: RouteType[] = appRoutes.filter((route) => route.state !== "tweet")
items.unshift({
  element: <HomePage/>,
  state: "home",
  path: "/",
  sidebarProps: {
    icon: <img src={logo} style={{}}/>,
  }
})

const LeftSidebar = (props: Props) => {
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  
  const token = useSelector((state: RootState) => state.auth);
  const access_token = token.access_token ?? cookies.access_token;
  const refresh_token = token.refresh_token ?? cookies.refresh_token;

  const onLogoutClicked = () => {
    removeCookie('access_token', {path: '/'});
    removeCookie('refresh_token', {path: '/'});
    dispatch(logout({access_token, refresh_token}));
    navigate('/auth/login');
  }

  return (
    <Box 
      sx={{
        position: "sticky",
        top: 0,
        right: 0,
        left: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "column" 
      }}
    >
      <List>
        {
          items.map((item, index) => (
            <ListItem key={index} disablePadding sx={{width: "fit-content"}}>
              <Link 
                to={item.path}
                style={{
                  textDecoration: "none",
                  color: "unset"
                }}
              >
                <ListItemButton
                  sx={[
                    {
                      fontSize: fontConfig.size.sidebarText,
                      borderRadius: index === 0 ? "56px" : sizeConfig.sidebarBtnBR,
                      "&:hover": {
                        bgcolor: colorConfig.sidebarBtnHover
                      }
                    },
                    index !== 0 && {
                      paddingRight: "24px",
                    }
                  ]}
                >
                  <ListItemIcon
                    sx={{
                      color: "inherit",
                    }}
                  >
                    {item.sidebarProps?.icon}
                  </ListItemIcon>
                  <ListItemText disableTypography>{item.sidebarProps?.displayText}</ListItemText>
                </ListItemButton>
              </Link>
            </ListItem>
          ))
        }
      </List>

      {/* tweet */}
      <Box
        sx={{
          marginLeft: "12px",
          marginRight: "20px",
        }}
      >  
        <Button
          sx={{
            bgcolor: colorConfig.primaryBtnBg,
            padding: "16px 12px",
            borderRadius: "24px",
            textTransform: "none",
            width: "100%",
            "&:hover": {
              bgcolor: colorConfig.primaryBtnBg,
            }
          }}
        >
          <Typography
            sx={{
              fontSize: fontConfig.size.btn,
              fontWeight: fontConfig.weight.bold,
              textAlign: "center",
              lineHeight: "1.0",
              color: fontConfig.color.primaryText, 
            }}
          >
            Tweet
          </Typography>
        </Button>
      </Box>

      {/* user */}
      <Box
        sx={{
          visibility: isUserMenuOpen ? "visible" : "hidden",
          zIndex: 1,
          bgcolor: colorConfig.mainBg,
          color: fontConfig.color.primaryText,
          marginTop: "auto",
          boxShadow: colorConfig.popOverShadow,
          marginBottom: "14px",
          borderRadius: "14px",
          fontWeight: fontConfig.weight.bold,
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={onLogoutClicked}>
              <ListItemText disableTypography>Log out @yuuhi</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Box
        sx={{
          marginRight: "16px",
        }}
      >
        <Button  
          variant="contained" 
          onClick={() => setUserMenuOpen(true)}
          sx={{
            bgcolor: colorConfig.mainBg,
            borderRadius: sizeConfig.sidebarBtnBR,
            textTransform: "none",
            width: "100%",
            "&:hover": {
              bgcolor: colorConfig.sidebarBtnHover,
            }
          }}
        >
          <UserInfor self={true} />
        </Button>

        <Box
          sx={{
            position: "fixed",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            visibility: isUserMenuOpen ? "visible" : "hidden",
          }}
          onClick={() => setUserMenuOpen(false)}
        >
        </Box>
      </Box>
    </Box>
  )
}

export default LeftSidebar