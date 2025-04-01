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

const RectangularCropImage = () => {
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
              alt="Rectangular Crop"
              style={{ height: 300, width: "100%", objectFit: "contain" }}
            />
          ) : (
            <NoImage />
          )}

          <FileUpload onChange={onSelectFile} />

          {avatarUrl.current && (
            <DownloadImageButton
              uri={avatarUrl.current}
              name="rectangular-crop-image"
            />
          )}
        </Box>
      </Box>

      <Modal
        title="Rectangular Crop"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="md"
      >
        <ImageCropper
          aspectRatio={16 / 9}
          imgSrc={imgSrc}
          updateAvatar={updateAvatar}
          onClose={() => setModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default RectangularCropImage;
