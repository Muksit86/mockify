import { Header } from "./components/layout/Header.jsx";
import { Sidebar } from "./components/layout/Sidebar.jsx";
import { PropertiesPanel } from "./components/layout/PropertiesPanel.jsx";
import { BottomToolbar } from "./components/layout/BottomToolbar.jsx";
import { Editor } from "./components/editor/Editor.jsx";
import { ExportModal } from "./components/export/ExportModal.jsx";
import { useEditorStore } from "./store/editorStore.js";

export default function App() {
  const exportOpen = useEditorStore((state) => state.exportOpen);

  return (
    <div className="app-shell">
      <Header />
      <main className="editor-layout">
        <Sidebar />
        <Editor />
        <PropertiesPanel />
      </main>
      <BottomToolbar />
      {exportOpen ? <ExportModal /> : null}
    </div>
  );
}
