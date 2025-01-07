// external
import { Dialog, DialogTitle } from "@mui/material";

// internal
import ImageCropper from "./ImageCropper";

const Modal = ({ updateAvatar, onClose, open, imgSrc }) => (
  <Dialog
    fullWidth
    sx={{ minHeight: 300 }}
    maxWidth="xs"
    open={open}
    onClose={onClose}
  >
    <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>
      Upload Image To Circular Crop
    </DialogTitle>
    <ImageCropper
      updateAvatar={updateAvatar}
      onClose={onClose}
      imgSrc={imgSrc}
    />
  </Dialog>
);

export default Modal;
