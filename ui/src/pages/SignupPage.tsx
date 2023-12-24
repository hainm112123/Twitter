import { Box, Button, FormControl, Typography } from "@mui/material"
import { Link } from "react-router-dom";
import { styleConfig } from "../configs/styleConfig";
import StyledTextField from "../components/common/StyledTextField";

type Props = {}

const Signup = (props: Props) => {
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
          variant="outlined" 
          label="Name"
          name="name" 
          sx={styleConfig.auth.input}
        />
        <StyledTextField 
          variant="outlined" 
          label="Username"
          name="username"
          sx={styleConfig.auth.input} 
        />
        <StyledTextField 
          variant="outlined" 
          label="Password"
          name="password" 
          sx={styleConfig.auth.input}
        />
        <StyledTextField 
          variant="outlined" 
          label="Retype password"
          name="retypePassword" 
          sx={styleConfig.auth.input}
        />
        <Button
          sx={styleConfig.auth.button}
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