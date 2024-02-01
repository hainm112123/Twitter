import { Box, Modal } from "@mui/material";
import { colorConfig } from "../../../configs/colorConfig";
import { Dispatch, SetStateAction, useState } from "react";
import NewTweet from "./NewTweet";

type Props = {
  modalOpen: boolean,
  setModalOpen: Dispatch<SetStateAction<boolean>>,
  isReplyOf?: number,
  BriefTweet?: JSX.Element,
  success: Function
}

const NewTweetModal = (props: Props) => {
  return (
    <Box>
      <Modal
        open={props.modalOpen}
        onClose={() => props.setModalOpen(false)}
        sx={{
          bgcolor: colorConfig.modelBackdrop,
        }}
      >
        <Box 
          sx={{
            position: "absolute" as "absoulute",
            left: "50%",
            top: "50px",
            transform: "translateX(-50%)",
            boxShadow: 24,
            width: "30%",
            bgcolor: colorConfig.mainBg,
            p: 2,
            borderRadius: 4,
          }}
          // onClick={(e) => e.preventDefault()}
        >
          <NewTweet minRows={5} border isModal setModalOpen={props.setModalOpen} isReplyOf={props.isReplyOf} BriefTweet={props.BriefTweet} success={props.success} />
        </Box>
      </Modal>
    </Box>
  );
}

export default NewTweetModal;