import { useEditorStore } from "../../store/editorStore.js";

function Range({ label, value, min, max, step = 0.01, onChange }) {
  return (
    <label className="control-row">
      <span>{label}</span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
      <b>{typeof value === "number" ? value.toFixed(step >= 1 ? 0 : 2) : value}</b>
    </label>
  );
}

export function PropertiesPanel() {
  const imageTransform = useEditorStore((state) => state.imageTransform);
  const lighting = useEditorStore((state) => state.lighting);
  const background = useEditorStore((state) => state.background);
  const updateImageTransform = useEditorStore((state) => state.updateImageTransform);
  const updateLighting = useEditorStore((state) => state.updateLighting);
  const updateBackground = useEditorStore((state) => state.updateBackground);

  return (
    <aside className="sidebar properties-panel">
      <section className="panel-section">
        <h2>Image</h2>
        <Range label="Scale" value={imageTransform.scale} min={0.35} max={2.5} onChange={(scale) => updateImageTransform({ scale })} />
        <Range label="Position X" value={imageTransform.x} min={-0.5} max={0.5} onChange={(x) => updateImageTransform({ x })} />
        <Range label="Position Y" value={imageTransform.y} min={-0.5} max={0.5} onChange={(y) => updateImageTransform({ y })} />
        <Range label="Rotation" value={imageTransform.rotation} min={-3.14} max={3.14} onChange={(rotation) => updateImageTransform({ rotation })} />
        <div className="segmented">
          {["cover", "contain", "fill"].map((fit) => (
            <button key={fit} className={imageTransform.fit === fit ? "active" : ""} onClick={() => updateImageTransform({ fit })}>{fit}</button>
          ))}
        </div>
      </section>

      <section className="panel-section">
        <h2>Lighting</h2>
        <Range label="Intensity" value={lighting.intensity} min={0.2} max={2.5} onChange={(intensity) => updateLighting({ intensity })} />
        <Range label="Rotation" value={lighting.rotation} min={-180} max={180} step={1} onChange={(rotation) => updateLighting({ rotation })} />
        <Range label="Softness" value={lighting.softness} min={0.1} max={1} onChange={(softness) => updateLighting({ softness })} />
        <label className="toggle-row"><input type="checkbox" checked={lighting.shadows} onChange={(event) => updateLighting({ shadows: event.target.checked })} />Shadows</label>
      </section>

      <section className="panel-section">
        <h2>Background</h2>
        <label className="color-row">Color <input type="color" value={background.color} onChange={(event) => updateBackground({ color: event.target.value, type: "solid" })} /></label>
        <div className="preset-grid">
          {[
            ["Studio", "#d8dbe0"],
            ["Light Gray", "#f2f3f5"],
            ["Dark", "#202226"],
            ["Warm", "#ded5c7"],
            ["Cool", "#c9d5de"],
            ["Minimal", "#ffffff"],
          ].map(([preset, color]) => (
            <button key={preset} onClick={() => updateBackground({ preset, color, type: "solid" })}>{preset}</button>
          ))}
        </div>
      </section>
    </aside>
  );
}
