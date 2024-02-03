import { createSlice } from "@reduxjs/toolkit"
import { AppDispatch } from "./store"
import axios from "axios"
import { authorUrl, newTweetUrl, parentTweetUrl, repliesUrl, toggleLikeTweetUrl, tweetUrl, tweetsByAuthorUrl, tweetsUrl } from "../variables/urls"
import TweetType from "../types/TweetType"

type TweetState = {
  tweets: TweetType[],
  profileTweets: TweetType[],
  currentTweet: TweetType | null,
  parentTweets: TweetType[],
  replies: TweetType[],
}

const initialState: TweetState = {
  tweets: [],
  profileTweets: [],
  currentTweet: null,
  parentTweets: [],
  replies: [],
}

export const tweetSlice = createSlice({
  name: 'tweet',
  initialState,
  reducers: {
    setTweets(state, action) {
      state.tweets = action.payload
    },
    setProfileTweets(state, action) {
      state.profileTweets = action.payload
    },
    setReplies(state, action) {
      state.replies = action.payload
    },
    setCurrentTweet(state, action) {
      state.currentTweet = action.payload
    },
    setParentTweets(state, action) {
      state.parentTweets = action.payload
    },
    toggleLikeTweetReducer(state, action) {
      const toggle = (tweet: TweetType | null) => {
        if (tweet) {
          const index = tweet.likes.findIndex((username) => username === action.payload.username);
          if (index !== -1) {
            tweet.likes.splice(index);
          }
          else {
            tweet.likes.push(action.payload.username);
          }
        }
      }
      const toggles = (tweets : TweetType[]) => {
        let tweet = tweets.find((tweet) => tweet.id === action.payload.tweetId);
        if (tweet) toggle(tweet)
      }
      toggles(state.tweets);
      toggles(state.profileTweets);
      toggles(state.parentTweets);
      toggles(state.replies);
      toggle(state.currentTweet);
    },
    addTweet(state, action) {
      state.tweets.unshift(action.payload);
    },
    addProfileTweet(state, action) {
      state.profileTweets.unshift(action.payload);
    },
    addReply(state, action) {
      state.replies.unshift(action.payload);
      if (state.currentTweet) state.currentTweet.replies.unshift(action.payload.author)
    },
    addReply_brief(state, action) {
      const add = (tweets: TweetType[]) => {
        let tweet = tweets.find((tweet) => tweet.id === action.payload.is_reply_of);
        if (tweet) tweet.replies.unshift(action.payload.id);
      }
      add(state.tweets);
      add(state.parentTweets);
      add(state.profileTweets);
    }
  }
})

export const { 
  setTweets, 
  setProfileTweets, 
  setCurrentTweet, 
  setReplies, 
  setParentTweets, 
  toggleLikeTweetReducer, 
  addReply, 
  addTweet, 
  addProfileTweet, 
  addReply_brief 
} = tweetSlice.actions;

export const getTweets = () => async (dispatch: AppDispatch) => {
  const res = await axios.get(tweetsUrl);
  // console.log(res.data);
  dispatch(setTweets(res.data))
}

export const getProfileTweets = (username: any) => async (dispatch: AppDispatch) => {
  try {
    const res = await axios.get(tweetsByAuthorUrl + username);
    dispatch(setProfileTweets(res.data));
    return res.data;
  } catch(err) {
    return [];
  }
}

export const getReplies = (tweetId: number) => async (dispatch: AppDispatch) => {
  const res = await axios.get(repliesUrl + tweetId);
  dispatch(setReplies(res.data));
  return res.data;
}

const getTweet = async (tweetId: number) => {
  try {
    const res = await axios.get(tweetUrl + tweetId);
    return res.data;
  } catch(err) {
    return null;
  }
}

export const getCurrentTweet = (tweetId: number) => async (dispath: AppDispatch) => {
  const res = await getTweet(tweetId);
  dispath(setCurrentTweet(res));
  return res;
}

export const getParentTweet = (parentId: number) => async (dispatch: AppDispatch) => {
  let id = parentId;
  let parentTweets = [];
  while (id) {
    const res = await getTweet(id);
    parentTweets.push(res);
    id = res.is_reply_of;
  }
  parentTweets.reverse();
  parentTweets.pop();
  dispatch(setParentTweets(parentTweets));
  return parentTweets;
}

export const newTweet = async (author: string, text: string, media?: File | null, is_reply_of?: number) => {
  const mediaType = media?.type.split('/')[0];
  const b64Media = media && Buffer.from(new Uint8Array(await media.arrayBuffer())).toString('base64');
  const photos = mediaType === 'image' ? [b64Media] : [];
  const video = mediaType === 'video' ? b64Media : null;
  const res = await axios.post(newTweetUrl, {
    author,
    text,
    photos,
    video,
    is_reply_of: is_reply_of ?? null,
  });
  return res.data;
}

export const toggleLikeTweet = (tweetId: number, username: string) => async (dispatch: AppDispatch) => {
  dispatch(toggleLikeTweetReducer({tweetId, username}));
  try {
    await axios.post(toggleLikeTweetUrl, {
      tweet_id: tweetId,
      username,
    });
  } catch (err) {
    dispatch(toggleLikeTweetReducer({tweetId, username}));
  }
}

export const tweetSliceReducer = tweetSlice.reducer;