// external
import React, { useState, useRef } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import { Box, Button, Slider, Stack, Typography } from "@mui/material";

// internal
import { canvasPreview } from "../canvasPreview";
import { useDebounceEffect } from "../useDebounceEffect";

const ASPECT_RATIO = 16 / 9;
const rotate = 0;
const aspect = 16 / 9;

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
  const hiddenAnchorRef = useRef(null);

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
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
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
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
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
