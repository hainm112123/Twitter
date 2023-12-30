export type UserIdentity = {
  id: number,
  name: string,
  username: string,
  followers: number[]
  following: number[],
  avatar: string,
}

export const defaultUser = {
  username: "",
  name: "",
  tweets: [],
  followers: [],
  following: [],
  cover: null,
  avatar: null,
  bio: "",
  joined_date: null,
}