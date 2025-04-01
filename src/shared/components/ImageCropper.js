// external
import React, { useState, useRef } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import { Box, Button, Slider, Typography } from "@mui/material";

// utils
import { canvasPreview, useDebounceEffect } from "../utils";

const centerAspectCrop = (mediaWidth, mediaHeight, aspect) =>
  centerCrop(
    makeAspectCrop({ unit: "%", width: 90 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight
  );

const ImageCropper = ({
  aspectRatio,
  circularCrop = false,
  onClose,
  updateAvatar,
  imgSrc,
}) => {
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  const rotate = 0;

  const onImageLoad = (e) => {
    if (aspectRatio) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspectRatio));
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
          <Box sx={{ width: 320, m: 3 }}>
            <Typography gutterBottom>Scale</Typography>
            <Slider
              valueLabelDisplay="auto"
              value={scale}
              onChange={(_, value) => setScale(value)}
              step={0.1}
              min={0}
              max={5}
            />
          </Box>

          <ReactCrop
            crop={crop}
            onChange={(_, c) => setCrop(c)}
            onComplete={setCompletedCrop}
            aspect={aspectRatio}
            circularCrop={circularCrop}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              style={{ transform: `scale(${scale})` }}
              onLoad={onImageLoad}
            />
          </ReactCrop>

          <Box sx={{ display: "flex", gap: 2, py: 3 }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "var(--primary)" }}
              onClick={() => {
                const dataUrl = previewCanvasRef.current.toDataURL();
                updateAvatar(dataUrl);
                onClose();
              }}
            >
              Crop Image
            </Button>
            <Button
              variant="outlined"
              sx={{ borderColor: "var(--primary)", color: "var(--primary)" }}
              onClick={onClose}
            >
              Close
            </Button>
          </Box>
        </Box>
      )}

      <canvas ref={previewCanvasRef} style={{ display: "none" }} />
    </Box>
  );
};

export default ImageCropper;
