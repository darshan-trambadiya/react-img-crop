// external
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

const Modal = ({ title, children, open, onClose, maxWidth = "xs" }) => (
  <Dialog
    fullWidth
    maxWidth={maxWidth}
    open={open}
    onClose={onClose}
    slotProps={{ PaperProps: { sx: { p: 2 } } }}
  >
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>{children}</DialogContent>
  </Dialog>
);

export default Modal;
