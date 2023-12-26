import { Box, Button, FormControl, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom";
import { styleConfig } from "../configs/styleConfig";
import StyledTextField from "../components/common/StyledTextField";
import { RootState, useAppDispatch } from "../redux/store";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { login } from "../redux/authSlice";
import { access_token_life, refresh_token_life } from '../variables/variables';
import { getCsrfToken } from "../redux/appSlice";
import axios from "axios";
import { baseUrl, csrfTokenUrl } from "../variables/urls";

type Props = {}

const LoginPage = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [ cookies, setCookie ] = useCookies();
  const [isLoaded, setLoaded] = useState(false)
  // const [ csrf_token, setCsrf_token ] = useState();
  
  const access_token = useSelector((state: RootState) => state.auth.access_token) ?? cookies.access_token;

  useEffect(() => {
    if (!isLoaded) {
      setLoaded(true) 
      return;
    }
    if (access_token) {
      navigate('/');
    }
    // axios.get('/auth/login').then(res => {
    //   setCsrf_token(res.data);
    //   // console.log(res)
    // })
    
    // dispatch(getCsrfToken())
  }, [navigate, access_token, dispatch, isLoaded])

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const csrf_token = useSelector((state: RootState) => state.app.csrf_token)

  const onSubmit = async (username: string, password: string) => {
    console.log(csrf_token);
    const token = await dispatch(login({username, password, csrf_token}))
    if (token) {
      setCookie('access_token', token.access_token, {path: '/', expires: new Date(Date.now() + access_token_life)});
      setCookie('refresh_token', token.refresh_token, {path: '/', expires: new Date(Date.now() + refresh_token_life)});
      navigate('/');
    }
    else {
      alert('fail')
    }
  }

  return (
    <Box
      sx={styleConfig.auth.container}
    >
      <FormControl
        sx={styleConfig.auth.formControl}
      >
        <Typography
          sx={styleConfig.auth.header}
        >
          Log in
        </Typography>
        <StyledTextField 
          variant="outlined" 
          label="Username"
          name="username"
          sx={styleConfig.auth.input} 
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
          }}
          autoComplete="off"
        />
        <StyledTextField 
          variant="outlined" 
          label="Password"
          type="password"
          name="password" 
          sx={styleConfig.auth.input}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <Button
          type="submit"
          sx={styleConfig.auth.button}
          onClick={() => onSubmit(username, password)}
        >
          Log in
        </Button>

        <Typography
          sx={styleConfig.auth.note}
        >
          Don't have an account? <Link to="/auth/signup" style={styleConfig.auth.link}>Sign up</Link>
        </Typography>
      </FormControl>
    </Box>
  )
}

export default LoginPage;