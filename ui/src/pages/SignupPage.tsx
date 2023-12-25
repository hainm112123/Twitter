import { Box, Button, FormControl, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom";
import { styleConfig } from "../configs/styleConfig";
import StyledTextField from "../components/common/StyledTextField";
import { RootState, useAppDispatch } from "../redux/store";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { signup } from "../redux/authSlice";

type Props = {}

const Signup = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [ cookies ] = useCookies();

  const access_token = useSelector((state: RootState) => state.auth.access_token) ?? cookies.access_token;

  useEffect(() => {
    if (access_token) {
      navigate('/');
    }
  }, [navigate, access_token])

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [retype_password, setRetype_password] = useState('')

  const onSubmit = async (data: {name: string, username: string, password: string, retype_password: string}) => {
    const success = await dispatch(signup(data))
    if (success) {
      navigate('/');
      alert('success')
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
          Sign up
        </Typography>
        <StyledTextField
          autoComplete="off" 
          variant="outlined" 
          label="Name"
          name="name" 
          sx={styleConfig.auth.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <StyledTextField
          autoComplete="off" 
          variant="outlined" 
          label="Username"
          name="username"
          sx={styleConfig.auth.input} 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <StyledTextField
          autoComplete="off" 
          type="password"
          variant="outlined" 
          label="Password"
          name="password" 
          sx={styleConfig.auth.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledTextField
          autoComplete="off" 
          type="password"
          variant="outlined" 
          label="Retype password"
          name="retype_password" 
          sx={styleConfig.auth.input}
          value={retype_password}
          onChange={(e) => setRetype_password(e.target.value)}
        />
        <Button
          sx={styleConfig.auth.button}
          onClick={() => onSubmit({name, username, password, retype_password})}
        >
          Sign up
        </Button>

        <Typography
          sx={styleConfig.auth.note}
        >
          Have an account already? <Link to="/auth/login" style={styleConfig.auth.link}>Log in</Link>
        </Typography>
      </FormControl>
    </Box>
  )
}

export default Signup;