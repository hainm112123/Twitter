import { Box, LinearProgress, SxProps } from "@mui/material"

type Props = {
  sx?: SxProps,
  loaderSx?: SxProps,
  show?: boolean
}

const LinearLoader = (props: Props) => {
  return (
    <Box sx={{ 
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      bgcolor: "rgba(231,233,234,0.2)",
      zIndex: 100,
      display: props.show ? "block" : "none",
      ...props.sx,
    }}>
      <LinearProgress sx={props.loaderSx} />
    </Box>
  )
}

export default LinearLoader