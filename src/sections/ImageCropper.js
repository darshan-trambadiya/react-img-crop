// external
import { Card, CardHeader, CardContent, Typography, Box } from "@mui/material";

// internal
import CircularCropImage from "./CircularCropImage";
import RectangularCropImage from "./RectangularCropImage";
import BackgroundImage from "./BackgroundImage";

import "react-image-crop/dist/ReactCrop.css";

const ImageCropper = () => {
  return (
    <Box
      sx={{
        padding: "25px",
      }}
    >
      <Typography textAlign="center" variant="h4" pt={4} pb={4}>
        Image Cropping Tool
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "16px",
          padding: "0 200px",
        }}
      >
        <Card>
          <CardHeader title="Circular Crop Image" />
          <CardContent>
            <CircularCropImage />
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Rectangular Crop Image" />
          <CardContent>
            <RectangularCropImage />
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Background Image" />
          <CardContent>
            <BackgroundImage />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
export default ImageCropper;
