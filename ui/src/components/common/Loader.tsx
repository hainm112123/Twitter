import { Box, CircularProgress } from "@mui/material"
import { colorConfig } from "../../configs/colorConfig"

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 600,
        border: 1,
        borderTop: 0,
        borderColor: colorConfig.border,
      }}
    >
      <CircularProgress />
    </Box>
  )
}

export default Loader