export type UserIdentity = {
  id: number,
  name: string,
  username: string,
  followers: string[]
  following: string[],
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