import { createSlice } from "@reduxjs/toolkit"
import { AppDispatch } from "./store"
import axios from "axios"
import { userIdentityUrl, userOthersUrl, userUpdateBioUrl, userUrl } from "../variables/urls"
import { UserIdentity } from "../types/UserIdentity"
window.Buffer = window.Buffer || require('buffer').Buffer

type userState = {
  userIdentity: UserIdentity | null,
  others: UserIdentity[],
  users: UserIdentity[], 
}

const initialState: userState = {
  userIdentity: null,
  others: [],
  users: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserIdentity(state, action) {
      state.userIdentity = action.payload
    },
    setOtherUsers(state, action) {
      state.others = action.payload
    },
    setUsers(state, action) {
      state.users = action.payload
    }
  }
})

export const { setUsers, setUserIdentity, setOtherUsers } = userSlice.actions;

export const getUserIdentity = () => async (dispath: AppDispatch) => {
  try {
    const res = await axios.get(userIdentityUrl);
    dispath(setUserIdentity(res.data))
  } catch(err) {
    console.error(err);
  }
}

export const getOtherUsers = () => async (dispatch: AppDispatch) => {
  try {
    const res = await axios.get(userOthersUrl);
    dispatch(setOtherUsers(res.data))
  } catch(err) {
    console.error(err);
  }
}

export const getUser = (username: any) => async (dispatch: AppDispatch) => {
  const res = await axios.get(userUrl + username);
  console.log(res.data);
  return res.data;
}

export const updateBio = async (fileCover?: File, fileAvatar?: File, name?: string, bio?: string) => {
  const arrCover = fileCover && new Uint8Array(await fileCover.arrayBuffer());
  const cover = arrCover && Buffer.from(arrCover).toString('base64');
  const arrAvatar = fileAvatar && new Uint8Array(await fileAvatar.arrayBuffer());
  const avatar = arrAvatar && Buffer.from(arrAvatar).toString('base64');
  // console.log(cover);
  const res = await axios.post(userUpdateBioUrl, {
    cover,
    avatar,
    name,
    bio
  });
}

export const userSliceReducer = userSlice.reducer