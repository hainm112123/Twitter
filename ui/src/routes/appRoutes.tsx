import { ReactNode } from "react"
import HomePage from "../pages/HomePage"
import ProfilePage from "../pages/ProfilePage"
import { RouteType } from "./RouteType"
import ExplorePage from "../pages/ExplorePage"
import { Article, ArticleOutlined, Bookmark, BookmarkBorderOutlined, Email, Home, HomeOutlined, MailOutline, Notifications, NotificationsOutlined, PeopleAlt, PeopleAltOutlined, Person, PersonOutline, SearchOutlined } from "@mui/icons-material";
import NotificationsPage from "../pages/NotificationsPage"
import MessagesPage from "../pages/MessagesPage"
import ListsPage from "../pages/ListsPage"
import CommunitiesPage from "../pages/CommunitiesPage"
import BookmarkPage from "../pages/BookmarkPage"
import TweetPage from "../pages/TweetPage"
import { fontConfig } from "../configs/fontConfig"

const appRoutes: RouteType[] = [
  {
    element: <HomePage/>,
    state: "home",
    path: "/",
    index: true,
    sidebarProps: {
      displayText: "Home",
      icon: <HomeOutlined sx={{fontSize: fontConfig.size.primaryIcon}}/>,
      iconActive: <Home sx={{fontSize: fontConfig.size.primaryIcon}} />,
    }
  },
  {
    element: <ExplorePage/>,
    state: "explore",
    path: "/explore",
    sidebarProps: {
      displayText: "Explore",
      icon: <SearchOutlined sx={{fontSize: fontConfig.size.primaryIcon}} />,
      iconActive: <SearchOutlined sx={{fontSize: fontConfig.size.primaryIcon}} />,
    }
  },
  {
    element: <NotificationsPage/>,
    state: "notifications",
    path: "/notifications",
    sidebarProps: {
      displayText: "Notifications",
      icon: <NotificationsOutlined sx={{fontSize: fontConfig.size.primaryIcon}} />,
      iconActive: <Notifications sx={{fontSize: fontConfig.size.primaryIcon}} />,
    }
  },
  {
    element: <MessagesPage/>,
    state: "messages",
    path: "/messages",
    sidebarProps: {
      displayText: "Messages",
      icon: <MailOutline sx={{fontSize: fontConfig.size.primaryIcon}} />,
      iconActive: <Email sx={{fontSize: fontConfig.size.primaryIcon}} />,
    }
  },
  {
    element: <ListsPage/>,
    state: "lists",
    path: "/lists",
    sidebarProps: {
      displayText: "Lists",
      icon: <ArticleOutlined sx={{fontSize: fontConfig.size.primaryIcon}} />,
      iconActive: <Article sx={{fontSize: fontConfig.size.primaryIcon}} />,
    }
  },
  {
    element: <BookmarkPage/>,
    state: "bookmark",
    path: "/bookmark",
    sidebarProps: {
      displayText: "Bookmark",
      icon: <BookmarkBorderOutlined sx={{fontSize: fontConfig.size.primaryIcon}} />,
      iconActive: <Bookmark sx={{fontSize: fontConfig.size.primaryIcon}} />,
    }
  },
  {
    element: <CommunitiesPage/>,
    state: "communities",
    path: "/communities",
    sidebarProps: {
      displayText: "Communities",
      icon: <PeopleAltOutlined sx={{fontSize: fontConfig.size.primaryIcon}} />,
      iconActive: <PeopleAlt sx={{fontSize: fontConfig.size.primaryIcon}} />,
    }
  },
  {
    element: <ProfilePage/>,
    state: "profile",
    path: "/profile/:username/:tab?",
    sidebarProps: {
      displayText: "Profile",
      icon: <PersonOutline sx={{fontSize: fontConfig.size.primaryIcon}} />,
      iconActive: <Person sx={{fontSize: fontConfig.size.primaryIcon}} />,
    }
  },
  {
    element: <TweetPage/>,
    state: "tweet",
    path: "/:user/tweet/:tweetId"
  }
]

export default appRoutes