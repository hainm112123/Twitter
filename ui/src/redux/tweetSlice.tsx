import { createSlice } from "@reduxjs/toolkit"
import Tweet from "../types/TweetType"
import { AppDispatch } from "./store"
import axios from "axios"
import { newTweetUrl, tweetUrl, tweetsUrl } from "../variables/urls"

type TweetState = {
  tweets: Tweet[],
}

const initialState: TweetState = {
  tweets: [],
}

export const tweetSlice = createSlice({
  name: 'tweet',
  initialState,
  reducers: {
    setTweets(state, action) {
      state.tweets = action.payload
    }
  }
})

export const { setTweets } = tweetSlice.actions;

export const getTweets = () => async (dispatch: AppDispatch) => {
  const res = await axios.get(tweetsUrl);
  // console.log(res.data);
  dispatch(setTweets(res.data))
}

export const getTweet = async (tweetId: number) => {
  const res = await axios.get(tweetUrl + tweetId);
  return res.data
}

export const newTweet = async (author: string, text: string, media?: File | null) => {
  const mediaType = media?.type.split('/')[0];
  const b64Media = media && Buffer.from(new Uint8Array(await media.arrayBuffer())).toString('base64');
  const photos = mediaType === 'image' ? [b64Media] : [];
  const video = mediaType === 'video' ? b64Media : null;
  await axios.post(newTweetUrl, {
    author,
    text,
    photos,
    video,
  })
}

export const tweetSliceReducer = tweetSlice.reducer;