// external
import { useRef, useState } from "react";
import { Box } from "@mui/material";

// components
import Modal from "src/shared/components/Modal";
import NoImage from "src/shared/components/NoImage";
import DownloadImageButton from "src/shared/components/DownloadImageButton";

const UploadLogo = () => {
  const avatarUrl = useRef("");
  const [modalOpen, setModalOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

  const base64ToBlob = (base64Data, contentType) => {
    const base64String = base64Data.split(",")[1];

    try {
      const byteCharacters = atob(base64String);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      return new Blob(byteArrays, { type: contentType });
    } catch (e) {
      console.error("Invalid base64 string:", e);
      return null;
    }
  };

  const updateAvatar = (imgSRC) => {
    const blob = base64ToBlob(imgSRC, "image/png");
    let file;
    if (blob) {
      file = new File(
        [blob],
        `smallLogo_image_${Math.floor(Date.now() / 1000)}.png`,
        {
          type: "image/png",
        }
      );
    }
    avatarUrl.current = imgSRC;
  };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => setImgSrc(reader.result?.toString() || ""),
        setModalOpen(true)
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {avatarUrl.current ? (
            <>
              <img
                src={avatarUrl.current}
                alt="Avatar"
                style={{ height: "480px" }}
              />
            </>
          ) : (
            <NoImage />
          )}

          <Box
            component="input"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={onSelectFile}
            onClick={(event) => (event.target.value = "")}
            sx={{
              display: "block",
              width: "100%",
              fontSize: "0.875rem",
              color: "text.secondary",
              py: 2,

              "&::file-selector-button": {
                marginRight: "1rem",
                paddingY: "0.25rem",
                paddingX: "0.5rem",
                borderRadius: "10px",
                border: 0,
                fontSize: "18px",
                color: "red",
                transition: "background-color 0.3s",
                py: 1,
                "&:hover": {
                  backgroundColor: "grey.300",
                },
              },
            }}
          />

          {avatarUrl.current && (
            <DownloadImageButton
              uri={avatarUrl.current}
              name="background-image"
            />
          )}
        </Box>
      </Box>
      {modalOpen && (
        <Modal
          title="Upload background Image"
          imgSrc={imgSrc}
          updateAvatar={updateAvatar}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

export default UploadLogo;
