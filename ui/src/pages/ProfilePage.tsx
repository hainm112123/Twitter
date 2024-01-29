import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import ProfileHeader from "../components/pages/ProfilePage/ProfileHeader";
import ProfileBio from "../components/pages/ProfilePage/ProfileBio";
import ProfileTabs from "../components/pages/ProfilePage/ProfileTabs";
import ProfileTweets from "../components/pages/ProfilePage/ProfileTweets";
import { getUser } from "../redux/userSlice";
import { useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "../redux/store";
import ProfileCover from "../components/pages/ProfilePage/ProfileCover";
import { useSelector } from "react-redux";
import { getTweetsByAuthor } from "../redux/tweetSlice";

type Props = {}

const ProfilePage = (props: Props) => {
  const dispatch = useAppDispatch();
  const [isLoaded, setLoaded] = useState(false);
  const { username } = useParams();
  const [user, setUser] = useState({
    username: "",
    name: "",
    tweets: [],
    followers: [],
    following: [],
    cover: null,
    avatar: null,
    bio: "",
    joined_date: null,
  });
  const [tweets, setTweets] = useState([])

  useEffect(() => {
    if (!isLoaded) {
      setLoaded(true);
      return;
    }
    const fn = async () => {
      const data = await dispatch(getUser(username));
      setUser(data);
      setTweets(await getTweetsByAuthor(username))
    }
    fn();
  }, [isLoaded, dispatch, username])

  return (
    <Box sx={{position: 'relative'}}>
      {/* profile */}
      <ProfileHeader name={user.name} tweetsCount={user.tweets.length} />

      <ProfileCover currentCover={user.cover} />

      <ProfileBio 
        name={user.name} 
        username={user.username} 
        followingCount={user.following.length} 
        follwersCount={user.followers.length} 
        currentAvatar={user.avatar} 
        currentCover={user.cover} 
        bio={user.bio}
        joined_date={user.joined_date}
      />
      <ProfileTabs username={user.username} />
      <ProfileTweets tweets={tweets} />
    </Box>
  )
}

export default ProfilePage