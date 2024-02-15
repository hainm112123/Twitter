import { Box } from "@mui/material";
import { InView, useInView } from "react-intersection-observer";
import { sizeConfig } from "../../../configs/sizeConfig";
import { useEffect, useRef, useState } from "react";

type Props = {
  photos: string[],
  video?: string | null
}

const TweetMedia = (props: Props) => {
  const [ref, inView, entry] = useInView();
  const [visible, setVisible] = useState(inView)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef && videoRef.current) {
      const isPlaying = videoRef.current.currentTime > 0 && !videoRef.current.paused && !videoRef.current.ended && videoRef.current.readyState > videoRef.current.HAVE_CURRENT_DATA;
      if (visible) {
        if (!isPlaying) videoRef.current.play();
      }
      else {
        if (isPlaying) videoRef.current.pause();
      }
    }
  }, [videoRef, visible])

  return (
    <Box>
      <Box
        sx={{
          borderRadius: "20px",
          blockSize: "fit-content",
          width: "fit-content",
          overflow: "hidden",
        }}
      >
        {/* {props.photos.length > 0 && <img src={`data:image/png;base64,${props.photos[0]}`} style={{maxWidth: "100%", maxHeight: sizeConfig.imgMaxHeight}}/>} */}
        {props.photos.length > 0 && <img loading="lazy" src={props.photos[0]} style={{maxWidth: "100%", maxHeight: sizeConfig.imgMaxHeight}} alt='media' />}
        <InView as="div" onChange={(inView) => {
          setVisible(inView);
          // console.log(inView)
        }}>
          {props.video && <video controls muted style={{maxWidth: "100%", maxHeight: sizeConfig.imgMaxHeight}}>
            {/* <source src={`data:video/mp4;base64,${props.video}`} type="video/mp4" /> */}
            <source src={props.video} type="video/mp4" />
          </video>}
        </InView>
      </Box>
    </Box>
  )
}

export default TweetMedia;