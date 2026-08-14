import { Upload, ImagePlus } from "lucide-react";
import { mockups, categories } from "../../data/mockups.js";
import { useEditorStore } from "../../store/editorStore.js";
import { validateImageFile, loadImageMetadata } from "../../utils/imageUtils.js";

export function Sidebar() {
  const uploadedImage = useEditorStore((state) => state.uploadedImage);
  const setUploadedImage = useEditorStore((state) => state.setUploadedImage);
  const selectedMockup = useEditorStore((state) => state.selectedMockup);
  const selectMockup = useEditorStore((state) => state.selectMockup);

  async function handleFile(file) {
    const error = validateImageFile(file);
    if (error) {
      window.alert(error);
      return;
    }
    const url = URL.createObjectURL(file);
    try {
      const metadata = await loadImageMetadata(url);
      if (uploadedImage?.url) URL.revokeObjectURL(uploadedImage.url);
      setUploadedImage({ file, url, ...metadata });
    } catch (err) {
      URL.revokeObjectURL(url);
      window.alert(err.message);
    }
  }

  return (
    <aside className="sidebar left-panel">
      <section className="panel-section">
        <h2>Assets</h2>
        <label
          className="upload-dropzone"
          onDrop={(event) => {
            event.preventDefault();
            handleFile(event.dataTransfer.files[0]);
          }}
          onDragOver={(event) => event.preventDefault()}
        >
          <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => handleFile(event.target.files[0])} />
          {uploadedImage ? (
            <img src={uploadedImage.url} alt="Uploaded design" />
          ) : (
            <>
              <ImagePlus size={24} />
              <strong>Upload Design</strong>
              <span>PNG, JPG or WEBP</span>
            </>
          )}
        </label>
      </section>

      <section className="panel-section">
        <h2>Mockups</h2>
        {categories.map((category) => (
          <div className="mockup-group" key={category}>
            <div className="group-title">{category}</div>
            <div className="mockup-list">
              {mockups.filter((mockup) => mockup.category === category).map((mockup) => (
                <button
                  className={`mockup-card ${selectedMockup === mockup.id ? "active" : ""}`}
                  key={mockup.id}
                  onClick={() => selectMockup(mockup.id)}
                >
                  <Upload size={14} />
                  {mockup.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>
    </aside>
  );
}
