import { Box, Button, FormControl, Input, InputLabel, Typography } from "@mui/material"
import { colorConfig } from "../../../configs/colorConfig"
import { fontConfig } from "../../../configs/fontConfig"
import { AddAPhotoOutlined, Close } from "@mui/icons-material"
import StyledTextField from "../../styled/StyledTextField"
import { styleConfig } from "../../../configs/styleConfig"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import ProfileCover from "./ProfileCover"
import ProfileAvatar from "./ProfileAvatar"
import { updateBio } from "../../../redux/userSlice"

type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>,
  currentAvatar?: any,
  currentCover?: any,
}

type ChangePhotoProps = {
  photoType: string,
  setPhoto: any,
  setFilePhoto: any,
}

const ChangePhoto = ({ setFilePhoto, photoType , setPhoto } : ChangePhotoProps) => {
  return (
    <Box sx={{bgcolor: "transparent"}}>
      <input 
        type="file" 
        id={photoType}
        name={photoType}
        style={{
          visibility: 'hidden',
          display: "none",
        }} 
        onChange={(e) => {
          if (e.target.files) {
            setPhoto(URL.createObjectURL(e.target.files[0]));
            setFilePhoto(e.target.files[0]);
          }
        }}
      />
      <label htmlFor={photoType} style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: "10px",
        backgroundColor: colorConfig.secondaryBg,
        color: fontConfig.color.primaryText,
        borderRadius: "24px",
        lineHeight: "1.0",
        cursor: "pointer",
      }}>
        <AddAPhotoOutlined />
      </label>
    </Box>
  )
}

const EditProfile = (props: Props) => {
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [cover, setCover] = useState()
  const [avatar, setAvatar] = useState()
  const [fileCover, setFileCover] = useState()
  const [fileAvatar, setFileAvatar] = useState()

  return (
    <FormControl sx={{
      ...styleConfig.modal,
      top: '50%',
      transform: 'translate(-50%, -50%)',
    }}>
      <Box sx={{
        display: "flex",
        alignItems: "center",
        color: fontConfig.color.primaryText,
        mb: 3,
      }}>
        <Close 
          className="closeBtn--modal"
          onClick={() => props.setModalOpen(false)}
        />
        <Typography
          sx={{
            fontWeight: fontConfig.weight.bold,
            fontSize: fontConfig.size.subHeader,
            flex: 1,
            ml: 3,
          }}
        >
          Edit profile
        </Typography>
          
        <Button 
          className="light" 
          sx={{
            padding: "4px 16px"
          }}
          onClick={() => {
            updateBio(fileCover, fileAvatar, name, bio).then(() => {
              window.location.reload();
            });
            props.setModalOpen(false);
          }}
        >
          Save
        </Button>
      </Box>

      {/* change photo */}
      <ProfileCover 
        sx={{
          position: 'relative',
          ml: -2,
          mr: -2,
        }}
        cover={cover}
        currentCover={props.currentCover}
      >
        <ChangePhoto photoType="cover" setPhoto={setCover} setFilePhoto={setFileCover} />
      </ProfileCover>

      <ProfileAvatar 
        sx={{
          position: 'relative',
        }}
        avatar={avatar}
        currentAvatar={props.currentAvatar}
      >
        <ChangePhoto photoType="avatar" setPhoto={setAvatar} setFilePhoto={setFileAvatar} />
      </ProfileAvatar>

      <StyledTextField 
        variant="outlined" 
        label="Name"
        name="name"
        sx={{
          ...styleConfig.auth.input,
          mt: 3,
        }} 
        value={name}
        onChange={(e) => {
          setName(e.target.value)
        }}
        autoComplete="off"
      />

      <StyledTextField 
        variant="outlined" 
        label="Bio"
        name="bio"
        sx={{
          ...styleConfig.auth.input,
        }} 
        value={bio}
        onChange={(e) => {
          setBio(e.target.value)
        }}
        autoComplete="off"
        multiline
      />
    </FormControl>
  )
}

export default EditProfile