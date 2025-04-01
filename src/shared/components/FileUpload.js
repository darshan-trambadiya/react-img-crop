// external
import { Box } from "@mui/material";

const FileUpload = ({ onChange, sx }) => (
  <Box
    component="input"
    type="file"
    accept="image/*"
    onChange={onChange}
    onClick={(e) => (e.target.value = "")}
    sx={{
      display: "block",
      width: "100%",
      py: 2,
      "&::file-selector-button": {
        marginRight: 2,
        padding: "8px 16px",
        borderRadius: 1,
        border: 0,
        bgcolor: "action.hover",
        transition: "background-color 0.3s",
        "&:hover": { bgcolor: "action.selected" },
      },
      ...sx,
    }}
  />
);

export default FileUpload;
