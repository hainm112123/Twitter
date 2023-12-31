import { Typography } from "@mui/material"

type Props = {
  text: string,
}

const TweetText = (props: Props) => {
  return (
    <Typography
      sx={{
        whiteSpace: "pre-line",
        paddingBottom: "12px",
      }}
    >
      {props.text}
    </Typography>
  )
}

export default TweetText