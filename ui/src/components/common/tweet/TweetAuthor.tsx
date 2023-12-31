import { Box } from "@mui/material"
import { styleConfig } from "../../../configs/styleConfig"
import { defaultAvatar } from "../../../variables/variables";
import { Link } from "react-router-dom";
import { fontConfig } from "../../../configs/fontConfig";

type Props = {
  username: string,
  name: string,
  created_at?: any,
  detail?: boolean
}

const toHours = (time_in_ms: number) => {
  return Math.round(time_in_ms / 1000 / 60 / 60)
}

const TweetAuthor = (props: Props) => {
  return (
    <Box>  
      <Link to={`/profile/${props.username}`} style={{
        all: "unset"
      }}>
        <Box
          sx={[
            !props.detail && {
              display: "flex"
            }
          ]}
        >
          <Box
            sx={{
              fontWeight: fontConfig.weight.author,
              "&:hover": {
                textDecoration: "underline",
                cursor: "pointer"
              }
            }}
          >
            {props.name}
          </Box>
          <Box
            sx={{
              marginLeft: !props.detail ? "8px" : 0,
              color: fontConfig.color.secondaryText,
              "&:hover": {
                cursor: "pointer"
              }
            }}
          >
            {props.detail && <>@{props.username}</>}
            {!props.detail && <>@{props.username} &#183; {toHours(Date.now() - new Date(props.created_at).valueOf())}h</>}
          </Box>
        </Box>
      </Link>
    </Box>
  )
}

export default TweetAuthor