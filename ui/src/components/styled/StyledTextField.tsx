import { Box, Button, FormControl, FormGroup, TextField, Typography, styled } from "@mui/material"
import { colorConfig } from "../../configs/colorConfig"
import { fontConfig } from "../../configs/fontConfig"

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    color: fontConfig.color.primaryText,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: fontConfig.color.secondaryText,
    },
    '&:hover fieldset': {
      borderColor: "#1677b8",
    },
    '&:filled fieldset': {
      bgcolor: "#000"
    }
  },
  '& label': {
    color: fontConfig.color.secondaryText,
  },
})

export default StyledTextField