import * as React from "react"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import { FC, ReactNode } from "react"
import Typography from "@mui/material/Typography"
import s from "./BasicModal.module.css"
import { IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  borderRadius: "2px",
  boxShadow: 24,
  p: 4,
  padding: 2,
}

type BasicModalPropsType = {
  children: ReactNode
  childrenOpen?: ReactNode
  title: string
}

export const BasicModal: FC<BasicModalPropsType> = ({ children, title, childrenOpen }) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <div onClick={handleOpen}>{childrenOpen}</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={s.header}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <hr className={s.line} />
          {children}
        </Box>
      </Modal>
    </div>
  )
}
