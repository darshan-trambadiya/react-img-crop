// external
import { useState, useRef } from "react";

const useImageCrop = () => {
  const avatarUrl = useRef("");
  const [modalOpen, setModalOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

  const base64ToBlob = (base64Data) => {
    try {
      const byteString = atob(base64Data.split(",")[1]);
      const mimeType = base64Data.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ab], { type: mimeType });
    } catch (error) {
      console.error("Error converting base64 to Blob:", error);
      return null;
    }
  };

  const updateAvatar = (imgSRC) => {
    const blob = base64ToBlob(imgSRC);
    if (blob) {
      avatarUrl.current = imgSRC;
    }
  };

  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgSrc(reader.result.toString());
        setModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return {
    avatarUrl,
    modalOpen,
    setModalOpen,
    imgSrc,
    updateAvatar,
    onSelectFile,
  };
};

export default useImageCrop;
