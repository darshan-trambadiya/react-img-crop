// external
import React, { useState, useRef } from "react";
import { Box, Button, Slider, Typography } from "@mui/material";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";

// utils
import { canvasPreview, useDebounceEffect } from "src/shared/utils";

const ASPECT_RATIO = 2.3 / 1;
const rotate = 0;
const aspect = 2.3 / 1;

const centerAspectCrop = (mediaWidth, mediaHeight, aspect) =>
  centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );

const ImageCropper = ({ onClose, updateAvatar, imgSrc }) => {
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const blobUrlRef = useRef("");
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);

  const onImageLoad = (e) => {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  };

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale
        );
      }
    },
    100,
    [completedCrop, scale]
  );

  return (
    <Box px={3}>
      {imgSrc && (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box>
            <Box sx={{ width: 320, m: 3 }}>
              <Typography gutterBottom>Scale</Typography>
              <Slider
                valueLabelDisplay="auto"
                onChange={(e, value) => {
                  setScale(Number(value));
                }}
                step={0.1}
                min={0}
                max={5}
                aria-label="custom thumb label"
                defaultValue={1}
              />
            </Box>
          </Box>
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={ASPECT_RATIO}
            minHeight={100}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              style={{
                transform: `scale(${scale}) rotate(${rotate}deg)`,
                maxHeight: "100vh",
              }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              columnGap: "16px",
              padding: "16px 0",
            }}
          >
            <Button
              variant="contained"
              sx={{ backgroundColor: "#106470" }}
              onClick={() => {
                const dataUrl = previewCanvasRef.current.toDataURL();
                updateAvatar(dataUrl);
                onClose();
              }}
            >
              Crop Image
            </Button>
            <Button
              type="button"
              variant="contained"
              color="error"
              onClick={onClose}
            >
              Close
            </Button>
          </Box>
        </Box>
      )}

      {crop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4"
          style={{
            display: "none",
            border: "1px solid black",
            objectFit: "contain",
            width: 150,
            height: 150,
          }}
        />
      )}
    </Box>
  );
};
export default ImageCropper;
