import React, { useEffect, useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { colorConfig } from '../../configs/colorConfig';
import { fontConfig } from '../../configs/fontConfig';
import LeftSidebar from '../common/sidebar/LeftSidebar';
import RightSidebar from '../common/sidebar/RightSidebar';
import { useCookies } from 'react-cookie';
import { RootState, useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { getUnfollowedUsers, getUserIdentity, getUsers } from '../../redux/userSlice';

function MainLayout() {
  const [ cookies ] = useCookies();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoaded, setLoaded] = useState(false)
  
  const token = useSelector((state: RootState) => state.auth);
  const access_token = token.access_token ?? cookies.access_token;
  const refresh_token = token.refresh_token ?? cookies.refresh_token;

  useEffect(() => {
    if (!isLoaded) {
      setLoaded(true);
      return;
    }
    // console.log(token.refresh_token, cookies.refresh_token)
    if (!refresh_token) {
      navigate('/auth/login')
      return;
    }
    dispatch(getUserIdentity());
    dispatch(getUnfollowedUsers());
    dispatch(getUsers());
  }, [navigate, access_token, refresh_token, dispatch, isLoaded])

  return (
    <Box 
      sx={{
        bgcolor: colorConfig.mainBg,
        minHeight: "100vh",
        color: fontConfig.color.primaryText,
      }}
    >
      <Container disableGutters>
        <Grid container>
          <Grid item xs={2.4}>
            <LeftSidebar/>
          </Grid>
          <Grid item xs={6}>
            <Outlet/>
          </Grid>
          <Grid item xs={3.6}>
            <RightSidebar/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default MainLayout;
