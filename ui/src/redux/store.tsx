import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { authSliceReducer } from './authSlice'
import { userSliceReducer } from './userSlice'
import { appSliceReducer } from './appSlice'
import { tweetSliceReducer } from './tweetSlice'

const reducer = combineReducers({
  auth: authSliceReducer,
  user: userSliceReducer,
  app: appSliceReducer,
  tweet: tweetSliceReducer,
})

const store = configureStore({
  reducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch =  useDispatch
export default store