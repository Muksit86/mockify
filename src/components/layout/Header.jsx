import { Box, Download, Redo2, Save, Undo2 } from "lucide-react";
import { useEditorStore } from "../../store/editorStore.js";

export function Header() {
  const undo = useEditorStore((state) => state.undo);
  const redo = useEditorStore((state) => state.redo);
  const setExportOpen = useEditorStore((state) => state.setExportOpen);

  return (
    <header className="topbar">
      <div className="brand">
        <Box size={18} />
        <span>Mockify</span>
      </div>
      <div className="document-title">Untitled Mockup</div>
      <div className="topbar-actions">
        <button className="icon-button" title="Undo" onClick={undo}><Undo2 size={16} /></button>
        <button className="icon-button" title="Redo" onClick={redo}><Redo2 size={16} /></button>
        <button className="tool-button" title="Save"><Save size={16} />Save</button>
        <button className="primary-button" onClick={() => setExportOpen(true)}><Download size={16} />Export</button>
      </div>
    </header>
  );
}
