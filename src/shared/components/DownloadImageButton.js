// external
import { Button } from "@mui/material";

// utils
import { DownloadImage } from "src/shared/utils";

const DownloadImageButton = ({ uri, name }) => {
  return (
    <Button
      variant="contained"
      sx={{ marginTop: "16px", backgroundColor: "#106470" }}
      onClick={() =>
        DownloadImage({
          uri,
          name,
        })
      }
    >
      Download
    </Button>
  );
};

export default DownloadImageButton;
