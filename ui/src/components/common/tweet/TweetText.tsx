import { Box, Typography } from "@mui/material"
import { fontConfig } from "../../../configs/fontConfig"

type Props = {
  text: string,
  detail?: boolean,
}

const TweetText = (props: Props) => {
  return (
    <Typography
      sx={[
        {
          whiteSpace: "pre-line",
          marginBottom: "12px",
          display: '-webkit-box',
          color: fontConfig.color.primaryText,
        },
        !props.detail && {
          WebkitLineClamp: 5,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: "ellipsis",
        }
      ]}
    >
      {props.text}
    </Typography>
  )
}

export default TweetText