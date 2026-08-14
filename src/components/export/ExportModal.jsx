import { X } from "lucide-react";
import { useEditorStore } from "../../store/editorStore.js";
import { exportCanvas } from "../../utils/exportUtils.js";

const resolutions = [
  ["1080 x 1080", 1080, 1080],
  ["1920 x 1080", 1920, 1080],
  ["2048 x 2048", 2048, 2048],
  ["3840 x 2160", 3840, 2160],
];

export function ExportModal() {
  const exportSettings = useEditorStore((state) => state.exportSettings);
  const background = useEditorStore((state) => state.background);
  const updateExportSettings = useEditorStore((state) => state.updateExportSettings);
  const setExportOpen = useEditorStore((state) => state.setExportOpen);

  function handleExport() {
    if (!window.__mockifyScene) {
      window.alert("The 3D scene is still loading.");
      return;
    }
    exportCanvas({ ...window.__mockifyScene, ...exportSettings, background });
    setExportOpen(false);
  }

  return (
    <div className="modal-backdrop">
      <div className="export-modal">
        <div className="modal-header">
          <h2>Export Mockup</h2>
          <button className="icon-button" onClick={() => setExportOpen(false)}><X size={17} /></button>
        </div>
        <label className="select-row">Format
          <select value={exportSettings.format} onChange={(event) => updateExportSettings({ format: event.target.value })}>
            <option value="png">PNG</option>
            <option value="jpg">JPG</option>
            <option value="webp">WebP</option>
          </select>
        </label>
        <label className="select-row">Resolution
          <select
            value={`${exportSettings.width}x${exportSettings.height}`}
            onChange={(event) => {
              const [, width, height] = resolutions.find(([label]) => label.replaceAll(" ", "") === event.target.value) || resolutions[1];
              updateExportSettings({ width, height });
            }}
          >
            {resolutions.map(([label, width, height]) => <option key={label} value={`${width}x${height}`}>{label}</option>)}
          </select>
        </label>
        <label className="toggle-row"><input type="checkbox" checked={exportSettings.transparent} onChange={(event) => updateExportSettings({ transparent: event.target.checked })} />Transparent background</label>
        <div className="modal-actions">
          <button onClick={() => setExportOpen(false)}>Cancel</button>
          <button className="primary-button" onClick={handleExport}>Export</button>
        </div>
      </div>
    </div>
  );
}
