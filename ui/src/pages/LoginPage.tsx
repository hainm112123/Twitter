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

type Props = {}

const LoginPage = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [ cookies, setCookie ] = useCookies();
  
  const access_token = useSelector((state: RootState) => state.auth.access_token) ?? cookies.access_token;
  useEffect(() => {
    if (access_token) {
      navigate('/');
    }
  }, [navigate, access_token])

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (data: {username: string, password: string}) => {
    const token = await dispatch(login(data))
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
          onClick={() => onSubmit({username, password})}
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