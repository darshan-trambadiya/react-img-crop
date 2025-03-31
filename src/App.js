// external
import { Card, CardHeader, CardContent, Typography, Box } from "@mui/material";

// components
import CircularCropImage from "./sections/CircularCropImage";
import RectangularCropImage from "./sections/RectangularCropImage";
import BackgroundImage from "./sections/BackgroundImage";

// css
import "react-image-crop/dist/ReactCrop.css";

const App = () => {
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

export default App;
