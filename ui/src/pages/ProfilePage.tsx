import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import ProfileHeader from "../components/pages/ProfilePage/ProfileHeader";
import ProfileBio from "../components/pages/ProfilePage/ProfileBio";
import ProfileTabs from "../components/pages/ProfilePage/ProfileTabs";
import ProfileTweets from "../components/pages/ProfilePage/ProfileTweets";
import { getCurrentUser } from "../redux/userSlice";
import { useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "../redux/store";
import ProfileCover from "../components/pages/ProfilePage/ProfileCover";
import { getProfileTweets } from "../redux/tweetSlice";
import { useSelector } from "react-redux";
import Loader from "../components/common/Loader";

type Props = {}

const ProfilePage = (props: Props) => {
  const dispatch = useAppDispatch();
  const [isLoaded, setLoaded] = useState(false);
  const { username } = useParams();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const profileTweetsData = useSelector((state: RootState) => state.tweet.profile);

  useEffect(() => {
    if (!isLoaded) {
      setLoaded(true);
      return;
    }
    dispatch(getCurrentUser(username));
    dispatch(getProfileTweets.get(username));
  }, [isLoaded, dispatch, username])

  if (!currentUser) {
    return <Loader />
  }

  return (
    <Box sx={{position: 'relative'}}>
      {/* profile */}
      <ProfileHeader name={currentUser?.name} tweetsCount={profileTweetsData.tweets.length} />

      <ProfileCover currentCover={currentUser?.cover} />

      <ProfileBio 
        name={currentUser.name} 
        username={currentUser.username} 
        following={currentUser.following} 
        follwers={currentUser.followers} 
        currentAvatar={currentUser.avatar} 
        currentCover={currentUser.cover} 
        bio={currentUser.bio}
        joined_date={currentUser.joined_date}
      />
      <ProfileTabs username={currentUser.username} />
      <ProfileTweets data={profileTweetsData} username={currentUser.username} />
    </Box>
  )
}

export default ProfilePage