export const DownloadImage = ({ uri, name }) => {
  // Convert data URI to Blob
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  };

  // Convert data URI to Blob
  const blob = dataURItoBlob(uri);

  // Trigger Download
  const link = document.createElement("a");
  link.download = name;
  link.href = URL.createObjectURL(blob);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up the Blob URL
  URL.revokeObjectURL(link.href);
};
