import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { getMockup } from "../../data/mockups.js";
import { useEditorStore } from "../../store/editorStore.js";

const views = {
  Front: [0, 0.2, 5.5],
  "45°": [3.6, 2.2, 4.4],
  Side: [5.4, 1.2, 0],
  Top: [0, 6, 0.2],
  Close: [0.2, 0.25, 3.4],
};

export function BottomToolbar() {
  const selectedMockup = useEditorStore((state) => state.selectedMockup);
  const camera = useEditorStore((state) => state.camera);
  const updateCamera = useEditorStore((state) => state.updateCamera);

  return (
    <footer className="bottom-toolbar">
      <button onClick={() => updateCamera({ ...getMockup(selectedMockup).defaultCamera, zoom: 100 })}><RotateCcw size={15} />Reset Camera</button>
      <button onClick={() => updateCamera({ zoom: Math.max(40, camera.zoom - 10) })}><ZoomOut size={15} /></button>
      <span className="zoom-label">{camera.zoom}%</span>
      <button onClick={() => updateCamera({ zoom: Math.min(220, camera.zoom + 10) })}><ZoomIn size={15} /></button>
      {Object.entries(views).map(([label, position]) => (
        <button key={label} onClick={() => updateCamera({ position })}>{label}</button>
      ))}
    </footer>
  );
}
