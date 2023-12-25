import { createSlice } from "@reduxjs/toolkit"
import { AppDispatch } from "./store"
import axios from "axios"
import { userIdentityUrl, userOthersUrl } from "../variables/urls"
import { UserIdentity } from "../types/UserIdentity"

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

export const userSliceReducer = userSlice.reducer