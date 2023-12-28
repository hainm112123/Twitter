import { Box, Button } from "@mui/material"
import { useState } from "react"
import { colorConfig } from "../../../configs/colorConfig"
import { fontConfig } from "../../../configs/fontConfig"
import { Link } from "react-router-dom"

type Props = {

}

type Tab = {
  id: string,
  label: string,
}

const tabs: Tab[] = [
  {
    id: 'tweets',
    label: 'Tweets',
  },
  {
    id: 'tweets-replies',
    label: 'Tweets & Replies',
  },
  {
    id: 'media',
    label: 'Media',
  },
  {
    id: 'likes',
    label: "Likes"
  }
]

const ProfileTabs = (props: Props) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: 1,
        borderTop: 0,
        borderColor: colorConfig.border,
      }}
    >
      {
        tabs.map((tab, index) => {return (
          <Link 
            to={"/profile/" + "luculia/" + tab.id}
            style={{
              all: "unset",
              flex: 1,
            }}
            key={index}
          >
            <Box
              sx={{
                flex: 1,
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                "&:hover": {
                  bgcolor: colorConfig.secondaryBg,
                  cursor: "pointer"
                },
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              <Box
                className={activeTab === tab.id ? 'active-tab': 'inactive-tab'} 
                sx={{
                  color: fontConfig.color.secondaryText,
                  width: "fit-content",
                  paddingY: "16px",
                  position: "relative",
                  '&.active-tab' : {
                    color: fontConfig.color.primaryText,
                    fontWeight: fontConfig.weight.bold,
                    '&::after': {
                      content: '""',
                      height: "4px",
                      width: "100%",
                      bgcolor: colorConfig.primaryBtnBg,
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      borderRadius: "2px",
                    }
                  },
                }}
              >
                {tab.label}
              </Box>
            </Box>
          </Link>
        )})
      }
    </Box>
  )
}

export default ProfileTabs;