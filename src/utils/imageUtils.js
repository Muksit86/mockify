const supportedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

export function validateImageFile(file) {
  if (!file) return "No file selected.";
  if (!supportedTypes.includes(file.type)) return "Use a PNG, JPG, JPEG, or WEBP image.";
  if (file.size > 30 * 1024 * 1024) return "Use an image smaller than 30 MB.";
  return "";
}

export function loadImageMetadata(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight });
    image.onerror = () => reject(new Error("Unable to read this image."));
    image.src = url;
  });
}
