import { createSlice } from "@reduxjs/toolkit"
import { AppDispatch } from "./store"
import axios from "axios"
import { userIdentityUrl, userOthersUrl, userUpdateBioUrl, userUrl, usersUrl } from "../variables/urls"
import { UserIdentity } from "../types/UserIdentity"
window.Buffer = window.Buffer || require('buffer').Buffer

type userState = {
  userIdentity: UserIdentity | null,
  others: UserIdentity[],
  users: UserIdentity[],
  currentUser: UserIdentity | null, 
}

const initialState: userState = {
  userIdentity: null,
  others: [],
  users: [],
  currentUser: null
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
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload
    }
  }
})

export const { setUsers, setUserIdentity, setOtherUsers, setCurrentUser } = userSlice.actions;

export const getUserIdentity = () => async (dispath: AppDispatch) => {
  try {
    const res = await axios.get(userIdentityUrl);
    dispath(setUserIdentity(res.data))
  } catch(err) {
    console.error(err);
  }
}

export const getUsers = () => async (dispatch: AppDispatch) => {
  try {
    const res = await axios.get(usersUrl);
    dispatch(setUsers(res.data));
    return res.data;
  }
  catch(err) {
    return null;
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

export const getCurrentUser = (username: any) => async (dispatch: AppDispatch) => {
  try {
    const res = await axios.get(userUrl + username);
    dispatch(setCurrentUser(res.data));
    return res.data;
  }
  catch(err) {
    return null;
  }
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
  return res.data;
}

export const userSliceReducer = userSlice.reducer