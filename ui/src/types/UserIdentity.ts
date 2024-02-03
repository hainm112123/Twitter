export type UserIdentity = {
  id: number,
  name: string,
  username: string,
  followers: string[],
  following: string[],
  tweets: number[],
  avatar: string,
  cover: string,
  bio: string,
  joined_date: Date
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