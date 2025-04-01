// external
import { Box } from "@mui/material";

// hooks
import useImageCrop from "../../hooks/useImageCrop";

// components
import Modal from "../../shared/components/Modal";
import ImageCropper from "../../shared/components/ImageCropper";
import NoImage from "../../shared/components/NoImage";
import DownloadImageButton from "../../shared/components/DownloadImageButton";
import FileUpload from "../../shared/components/FileUpload";

const CircularCropImage = () => {
  const {
    avatarUrl,
    modalOpen,
    setModalOpen,
    imgSrc,
    updateAvatar,
    onSelectFile,
  } = useImageCrop();

  return (
    <>
      <Box display="flex" justifyContent="center">
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          {avatarUrl.current ? (
            <img
              src={avatarUrl.current}
              alt="Avatar"
              style={{ borderRadius: "50%", height: 200, width: 200 }}
            />
          ) : (
            <NoImage />
          )}

          <FileUpload onChange={onSelectFile} />

          {avatarUrl.current && (
            <DownloadImageButton
              uri={avatarUrl.current}
              name="circular-crop-image"
            />
          )}
        </Box>
      </Box>

      <Modal
        title="Circular Crop"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <ImageCropper
          aspectRatio={1}
          circularCrop
          imgSrc={imgSrc}
          updateAvatar={updateAvatar}
          onClose={() => setModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default CircularCropImage;
