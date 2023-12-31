import { Box } from "@mui/material"
import { styleConfig } from "../../../configs/styleConfig"
import { defaultAvatar } from "../../../variables/variables";
import { Link } from "react-router-dom";

type Props = {
  username: string,
  avatar?: string | null;
}

const TweetAvatar = (props: Props) => {
  return (
    <Box>  
      <Link to={`/profile/${props.username}`}>
        <Box
          sx={{
            ...styleConfig.avatar,
            mr: 2,
            backgroundImage: (props.avatar ? `url('data:image/png;base64,${props.avatar}')` : defaultAvatar),
          }}
        />
      </Link>
    </Box>
  )
}

export default TweetAvatar