import { Box } from "@mui/material"
import { styleConfig } from "../../../configs/styleConfig"
import { defaultAvatar } from "../../../variables/variables";
import { Link } from "react-router-dom";
import { sizeConfig } from "../../../configs/sizeConfig";
import { fontConfig } from "../../../configs/fontConfig";

type Props = {
  username: string,
  avatar?: string | null;
  onReply?: boolean
}

const TweetAvatar = (props: Props) => {
  return (
    <Box sx={{
      mr: 2,
    }}>  
      <Link to={`/profile/${props.username}`}>
        <Box
          sx={{
            ...styleConfig.avatar,
            // backgroundImage: (props.avatar ? `url('data:image/png;base64,${props.avatar}')` : defaultAvatar),
            backgroundImage: (props.avatar ? `url(${props.avatar})` : defaultAvatar),
          }}
        />
      </Link>
      {
        props.onReply && (
          <Box sx={{
            width: "2px",
            bgcolor: "#333639",
            height: `calc(100% - ${sizeConfig.primaryAvatar})`,
            margin: 'auto',
            mt: "4px"
          }} />
        )
      }
    </Box>
  )
}

export default TweetAvatar