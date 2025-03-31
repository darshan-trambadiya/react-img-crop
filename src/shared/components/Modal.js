// external
import { Dialog, DialogTitle } from "@mui/material";

// internal
import ImageCropper from "../../sections/BackgroundImage/ImageCropper";

const Modal = ({ title, updateAvatar, onClose, open, imgSrc }) => {
  return (
    <Dialog
      fullWidth
      sx={{ minHeight: 300 }}
      maxWidth="xs"
      open={open}
      onClose={onClose}
    >
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>
        {title}
      </DialogTitle>
      <ImageCropper
        updateAvatar={updateAvatar}
        onClose={onClose}
        imgSrc={imgSrc}
      />
    </Dialog>
  );
};
export default Modal;
