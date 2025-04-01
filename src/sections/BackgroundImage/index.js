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

const BackgroundImage = () => {
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
              alt="Background"
              style={{ height: 480, width: "100%", objectFit: "contain" }}
            />
          ) : (
            <NoImage />
          )}

          <FileUpload onChange={onSelectFile} />

          {avatarUrl.current && (
            <DownloadImageButton
              uri={avatarUrl.current}
              name="background-image"
            />
          )}
        </Box>
      </Box>

      <Modal
        title="Background Image Crop"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="lg"
      >
        <ImageCropper
          aspectRatio={2.3 / 1}
          imgSrc={imgSrc}
          updateAvatar={updateAvatar}
          onClose={() => setModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default BackgroundImage;
