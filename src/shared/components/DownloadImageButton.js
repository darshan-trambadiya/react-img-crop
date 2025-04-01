// external
import { Button } from "@mui/material";

// utils
import { downloadImage } from "../utils";

const DownloadImageButton = ({ uri, name }) => {
  return (
    <Button
      variant="contained"
      sx={{ marginTop: "16px", backgroundColor: "var(--primary)" }}
      onClick={() => downloadImage(uri, name)}
    >
      Download
    </Button>
  );
};

export default DownloadImageButton;
