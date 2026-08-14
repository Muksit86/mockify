import { ImageUp } from "lucide-react";
import { useEditorStore } from "../../store/editorStore.js";
import { validateImageFile, loadImageMetadata } from "../../utils/imageUtils.js";

export function EmptyState() {
  const setUploadedImage = useEditorStore((state) => state.setUploadedImage);

  async function handleFile(file) {
    const error = validateImageFile(file);
    if (error) {
      window.alert(error);
      return;
    }
    const url = URL.createObjectURL(file);
    try {
      const metadata = await loadImageMetadata(url);
      setUploadedImage({ file, url, ...metadata });
    } catch (err) {
      URL.revokeObjectURL(url);
      window.alert(err.message);
    }
  }

  return (
    <div className="empty-state">
      <h1>Create a 3D mockup</h1>
      <p>Turn your designs into realistic 3D presentations.</p>
      <label className="primary-button">
        <ImageUp size={17} />
        Upload your design
        <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => handleFile(event.target.files[0])} />
      </label>
      <div className="category-strip">
        <span>Phone</span><span>Laptop</span><span>Poster</span><span>Book</span><span>Packaging</span>
      </div>
    </div>
  );
}
