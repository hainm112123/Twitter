import { createSlice } from "@reduxjs/toolkit"
import { AppDispatch } from "./store"
import axios from "axios"
import { followingTweetsUrl, newTweetUrl, repliesUrl, toggleLikeTweetUrl, toggleRetweetUrl, tweetUrl, tweetsByAuthorUrl, tweetsUrl } from "../variables/urls"
import { TweetType, TweetsData, initialTweetsData } from "../types/TweetType"

const perPage = 10;

type TweetState = {
  all: TweetsData,
  following: TweetsData,
  profile: TweetsData,
  reply: TweetsData,
  currentTweet: TweetType | null,
  parentTweets: TweetType[],
}

const initialState: TweetState = {
  all: initialTweetsData,
  following: initialTweetsData,
  profile: initialTweetsData,
  reply: initialTweetsData,
  currentTweet: null,
  parentTweets: [],
}

const ALL = 'all';
const FOLLOWING = 'following';
const PROFILE = 'profile';
const REPLY = 'reply';
const tweetKeys = [ALL, FOLLOWING, PROFILE, REPLY];

export const tweetSlice = createSlice({
  name: 'tweet',
  initialState,
  reducers: {
    setTweets(state, action) {
      const key: string = action.payload.key;
      if (key !== ALL && key !== FOLLOWING && key !== PROFILE && key !== REPLY) return;
      state[key].tweets = action.payload.tweets;
      state[key].tweetsCount = action.payload.tweets.length;
    },
    appTweets(state, action) {
      const key: string = action.payload.key;
      if (key !== ALL && key !== FOLLOWING && key !== PROFILE && key !== REPLY) return;
      state[key].tweets = state[key].tweets.concat(action.payload.tweets);
      state[key].tweetsCount += action.payload.tweets.length;
      if (action.payload.tweets.length === 0) state[key].loadedAll = true;
    },

    setCurrentTweet(state, action) {
      state.currentTweet = action.payload
    },
    setParentTweets(state, action) {
      state.parentTweets = action.payload
    },

    toggleTweetInteractReducer(state, action) {
      const key: string = action.payload.key;
      if (key !== 'likes' && key !== 'retweets') return;
      const toggle = (tweet: TweetType | null) => {
        if (tweet) {
          const index = tweet[key].findIndex((username) => username === action.payload.username);
          if (index !== -1) {
            tweet[key].splice(index);
          }
          else {
            tweet[key].push(action.payload.username);
          }
        }
      }
      const toggles = (tweets : TweetType[]) => {
        let tweet = tweets.find((tweet) => tweet.id === action.payload.tweetId);
        if (tweet) toggle(tweet)
      }
      for (const key of tweetKeys) {
        if (key !== ALL && key !== FOLLOWING && key !== PROFILE && key !== REPLY) return;
        toggles(state[key].tweets);
      }
      toggle(state.currentTweet);
    },

    addTweet(state, action) {
      state.all.tweets.unshift(action.payload.tweet);
      state.all.tweetsCount ++;
      if (action.payload.tweet.author === action.payload.currentUser) state.profile.tweets.unshift(action.payload.tweet);
    },
    addReply(state, action) {
      state.reply.tweets.unshift(action.payload);
      if (state.currentTweet) state.currentTweet.replies.unshift(action.payload.author)
    },
    addReply_brief(state, action) {
      const add = (tweets: TweetType[]) => {
        let tweet = tweets.find((tweet) => tweet.id === action.payload.is_reply_of);
        if (tweet) tweet.replies.unshift(action.payload.id);
      }
      add(state.all.tweets);
      add(state.parentTweets);
      add(state.profile.tweets);
    }
  }
})

export const { 
  setTweets, 
  appTweets, 
  setCurrentTweet, 
  setParentTweets, 
  toggleTweetInteractReducer, 
  addReply, 
  addTweet,  
  addReply_brief 
} = tweetSlice.actions;

const getTweet = async (tweetId: number) => {
  try {
    const res = await axios.get(tweetUrl + tweetId);
    return res.data;
  } catch(err) {
    return null;
  }
}

const configTweet = async (tweet: any) => {
  if (tweet.is_retweet_of) {
    return {
      ...tweet.original_tweet,
      retweet_user: tweet.author,
    }
  }
  else {
    return tweet;
  }
}

const GetTweetsFunctions = (url: string, key: string) => {
  return ({
    get: (suffix?: string | number) => async (dispatch: AppDispatch) => {
      try {
        const _url = suffix ? url + suffix : url;
        const res = await axios.get(_url + '?tweets-count=0');
        const tweets = await Promise.all(res.data.map(configTweet));
        dispatch(setTweets({ key, tweets }));
      } catch(err) {
        return null;
      }
    },
    getMore: (tweetsCount: number, suffix?: string | number) => async (dispatch: AppDispatch) => {
      try {
        const _url = suffix ? url + suffix : url;
        const res = await axios.get(_url + '?tweets-count=' + tweetsCount);
        const tweets = await Promise.all(res.data.map(configTweet));
        dispatch(appTweets({ key, tweets }));
      } catch(err) {
        return null;
      }
    }
  })
}

export const getTweets = GetTweetsFunctions(tweetsUrl, ALL);
export const getFollowingTweets = GetTweetsFunctions(followingTweetsUrl, FOLLOWING);
export const getProfileTweets = GetTweetsFunctions(tweetsByAuthorUrl, PROFILE);
export const getReplies = GetTweetsFunctions(repliesUrl, REPLY);

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

const toggleTweetInteract = (key: string, url: string) => {
  const toggleFn = (tweetId: number, username: string) => async (dispatch: AppDispatch) => {
    dispatch(toggleTweetInteractReducer({tweetId, username, key}));
    try {
      await axios.post(url, {
        tweet_id: tweetId,
        username,
      });
    } catch (err) {
      dispatch(toggleTweetInteractReducer({tweetId, username, key}));
    }
  }
  return toggleFn;
}

export const toggleLikeTweet = toggleTweetInteract("likes", toggleLikeTweetUrl);
export const toggleRetweet = toggleTweetInteract("retweets", toggleRetweetUrl);

export const tweetSliceReducer = tweetSlice.reducer;