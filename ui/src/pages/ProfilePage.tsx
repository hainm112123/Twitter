import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import ProfileHeader from "../components/pages/ProfilePage/ProfileHeader";
import ProfileBio from "../components/pages/ProfilePage/ProfileBio";
import ProfileTabs from "../components/pages/ProfilePage/ProfileTabs";
import ProfileTweets from "../components/pages/ProfilePage/ProfileTweets";
import { getUser } from "../redux/userSlice";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../redux/store";

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
  });

  useEffect(() => {
    if (!isLoaded) {
      setLoaded(true);
      return;
    }
    const fn = async () => {
      const data = await dispatch(getUser(username));
      setUser(data);
    }
    fn();
  }, [isLoaded, dispatch, username])

  return (
    <Box sx={{position: 'relative'}}>
      {/* profile */}
      <ProfileHeader name={user.name} tweetsCount={user.tweets.length} />

      <Box
        sx={{
          bgcolor: "#333639",
          height: "200px",
          overflow: "hidden",
        }}
      >
        <Box/>
      </Box>

      <ProfileBio name={user.name} username={user.username} followingCount={user.following.length} follwersCount={user.followers.length}  />
      <ProfileTabs />
      <ProfileTweets />
    </Box>
  )
}

export default ProfilePage