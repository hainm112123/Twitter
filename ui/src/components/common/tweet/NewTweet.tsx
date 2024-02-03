import { Box, Button, SvgIconTypeMap, TextField } from "@mui/material"
import { sizeConfig } from "../../../configs/sizeConfig"
import { fontConfig } from "../../../configs/fontConfig"
import { BrokenImageOutlined, Close, GifBoxOutlined, LocationOnOutlined, PendingActionsOutlined, PollOutlined, SentimentSatisfiedAltOutlined } from "@mui/icons-material"
import { OverridableComponent } from "@mui/material/OverridableComponent"
import { colorConfig } from "../../../configs/colorConfig"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../../../redux/store"
import { defaultUser } from "../../../types/UserIdentity"
import { defaultAvatar } from "../../../variables/variables"
import { styleConfig } from "../../../configs/styleConfig"
import { newTweet } from "../../../redux/tweetSlice"
import Loader from "../Loader"
import LinearLoader from "../LinearLoader"

type Props = {
  minRows?: number,
  border?: boolean,
  isModal?: boolean,
  isReplyOf?: number,
  setModalOpen?: Dispatch<SetStateAction<boolean>>,
  BriefTweet?: JSX.Element,
  success?: Function
}

type AttachProps = {
    type: string,
    Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    isModal?: boolean,
    isReplyOf?: number,
}

const iconPadding = '8px'

const Attach = (props: AttachProps) => {
  const inputId = props.type + (props.isModal ? '--modal' : '') + (props.isReplyOf ? '--reply-of-' + props.isReplyOf : '');

  return (
    <Box>
      <input 
        disabled={props.type !== 'media'}
        type="file"
        id={inputId}
        name={inputId}
        style={{    
          display: "none",
        }}
        onChange={props.onChange}
      />
    <label
      htmlFor={inputId}
      style={{
        
      }}
    >
      <props.Icon sx={{
        fontSize: fontConfig.size.secondaryIcon,
        color: fontConfig.color.interactBtn,
        padding: iconPadding,
        borderRadius: "24px",
        ":hover": {
          bgcolor: colorConfig.interactBtnBg,
          cursor: "pointer"
        }
      }} 
      />
    </label>
    </Box>
  )
}

const NewTweet = (props: Props) => {
  const userIdentity = useSelector((state: RootState) => state.user.userIdentity);
  const [isLoaded, setLoaded] = useState(false);
  const [text, setText] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>();
  const [loaderShow, setLoaderShow] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      setLoaded(true);
      return;
    }
  }, [isLoaded]);

  if (!userIdentity) {
    return <Loader />
  }

  return (
    <Box sx={{
      position: 'relative',
      p: 2,
    }}>
      <LinearLoader 
        show={loaderShow}
        sx={{
          borderRadius: props.isModal ? styleConfig.modal.borderRadius : 0,
        }}  
        loaderSx={[
          props.isModal === true && {
            mt: "10px",
          }
        ]}
      />
      {
        props.isModal && (
          <Box sx={{
            pb: 2,
          }}>
            <Close className="closeBtn--modal" onClick={() => props.setModalOpen && props.setModalOpen(false)} />
          </Box>
        )
      }

      {
        props.BriefTweet
      }

      <Box sx={{
        display: "flex",
      }}>
        <Box
          sx={{
            ...styleConfig.avatar,
            backgroundImage: (userIdentity.avatar ? `url(${userIdentity.avatar})` : defaultAvatar),
          }}
        />
        <TextField 
          placeholder={props.isReplyOf ? "Tweet your reply" : "What is happening?!"}
          fullWidth
          multiline
          minRows={props.minRows ?? 1}
          sx={{
            '& .MuiInputBase-input': {
              color: fontConfig.color.primaryText,
              border: 'none',
              fontSize: "20px",
              p: 1,
              pl: 2,
              pb: 3,
            },
            '& .MuiInputBase-multiline': {
              p: 0,
            },
            'fieldset': {
              border: 'none',
            },
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Box>

      <Box>
        {media?.type.split('/')[0] === 'image' && <img src={preview} style={{maxWidth: "100%", maxHeight: sizeConfig.imgMaxHeight}} alt='media' />}
        {media?.type.split('/')[0] === 'video' && <video controls style={{maxWidth: "100%", maxHeight: sizeConfig.imgMaxHeight}} muted >
          <source src={preview} type="video/mp4" />
        </video>}
      </Box>

      <Box sx={{
        pl: props.isModal ? 0 : `calc(${sizeConfig.primaryAvatar} + 16px - ${iconPadding})`,
        pt: 1,
        display: "flex",
        justifyContent: "space-between",
        borderTop: props.border ? 1 : 0,
        borderColor: colorConfig.border,
      }}>
        <Box sx={{
          display: "flex"
        }}>
          <Attach 
            type="media" Icon={BrokenImageOutlined} 
            isModal={props.isModal}
            onChange={(e) => {
              // console.log(e.target.files)
              if (e.target.files !== null && e.target.files.length > 0) {
                setMedia(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]))
              }
            }}
            isReplyOf={props.isReplyOf} 
          />
          <Attach type="gif" Icon={GifBoxOutlined} />
          <Attach type="poll" Icon={PollOutlined} />
          <Attach type="schedule" Icon={SentimentSatisfiedAltOutlined} />
          <Attach type="emoji" Icon={PendingActionsOutlined} />
          <Attach type="location" Icon={LocationOnOutlined} />
        </Box>

        <Button className="primary" onClick={() => {
          setLoaderShow(true);
          newTweet(userIdentity.username, text, media, props.isReplyOf).then((res) => {
            setText("");
            setMedia(null);
            if (props.success) props.success(res);
            if (props.isModal && props.setModalOpen) props.setModalOpen(false);
            setLoaderShow(false);
          });
        }}> 
          {props.isReplyOf ? 'Reply' : 'Tweet'} 
        </Button>
      </Box>
    </Box>
  )
}

export default NewTweet