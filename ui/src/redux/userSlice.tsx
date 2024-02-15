import { createSlice } from "@reduxjs/toolkit"
import { AppDispatch } from "./store"
import axios from "axios"
import { toggleFollowUrl, unfollowedUsersUrl, userIdentityUrl, userUpdateBioUrl, userUrl, usersUrl } from "../variables/urls"
import { UserIdentity } from "../types/UserIdentity"
window.Buffer = window.Buffer || require('buffer').Buffer

type userState = {
  userIdentity: UserIdentity | null,
  unfollowedUsers: UserIdentity[],
  users: UserIdentity[],
  currentUser: UserIdentity | null, 
}

const initialState: userState = {
  userIdentity: null,
  unfollowedUsers: [],
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
    setUnfollowedUsers(state, action) {
      state.unfollowedUsers = action.payload
    },
    setUsers(state, action) {
      state.users = action.payload
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload
    },
    toggleFollowReducer(state, action) {
      if (state.currentUser) state.currentUser.followers = action.payload.followers;
      if (state.userIdentity) state.userIdentity.following = action.payload.following;
      const index = state.unfollowedUsers.findIndex(user => user.username === action.payload.other_user);
      if (index !== -1) {
        state.unfollowedUsers.splice(index);
      }
      else {
        const other_user = state.users.find((user) => user.username === action.payload.other_user);
        if (other_user) state.unfollowedUsers.push(other_user);
      }
    }
  }
})

export const { setUsers, setUserIdentity, setUnfollowedUsers, setCurrentUser, toggleFollowReducer } = userSlice.actions;

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

export const getUnfollowedUsers = () => async (dispatch: AppDispatch) => {
  try {
    const res = await axios.get(unfollowedUsersUrl);
    dispatch(setUnfollowedUsers(res.data))
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

export const toggleFollow = (username: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axios.post(toggleFollowUrl, {username});
    dispatch(toggleFollowReducer({
      followers: res.data.following.followers,
      following: res.data.follower.following,
      other_user: res.data.following.username,
    }));
    return true;
  } catch(err) {
    return false;
  }
}

export const userSliceReducer = userSlice.reducer