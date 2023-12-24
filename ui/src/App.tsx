import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import routes from './routes';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { RootState, useAppDispatch } from './redux/store';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { access_token_life, refresh_token_life } from './variables/variables';
import { refresh } from './redux/authSlice';

function App() {
  const dispatch = useAppDispatch();
  const [ cookies, setCookie ] = useCookies();
  const token = useSelector((state:RootState) => state.auth);
  const access_token = token.access_token ?? cookies.access_token;
  const refresh_token = token.refresh_token ?? cookies.refresh_token;

  useEffect(() => {
    // if (access_token && refresh_token) {
      // if (cookies.access_token && !token.access_token) {
      //   dispatch(refresh(refresh_token))
      // }
      // if (access_token !== cookies.access_token) setCookie('access_token', access_token, {path: '/', expires: new Date(Date.now() + access_token_life)});
      // if (refresh_token !== cookies.refresh_token) setCookie('refresh_token', refresh_token, {path: '/', expires: new Date(Date.now() + refresh_token_life)});

      // console.log('App render')
    //   setTimeout(() => {
    //     dispatch(refresh(refresh_token));
    //   }, access_token_life / 2)
    // }
  }, [access_token, refresh_token, access_token_life, refresh_token_life, cookies, setCookie, dispatch])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          {routes}
        </Route>
        <Route path="/auth/login" element={<LoginPage/>}/>
        <Route path="/auth/signup" element={<SignupPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
