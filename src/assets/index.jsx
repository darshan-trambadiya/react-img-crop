import { Box } from "@mui/material";

import NoFile from "./images/thumbnail.jpg";

const NoFileImage = () => (
  <Box sx={{ height: "200px", width: "200px" }}>
    <img src={NoFile} style={{ width: "100%", height: "100%" }} />
  </Box>
);
export default NoFileImage;
