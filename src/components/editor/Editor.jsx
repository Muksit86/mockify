import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { EmptyState } from "./EmptyState.jsx";
import { Scene } from "./Scene.jsx";
import { useEditorStore } from "../../store/editorStore.js";

function SceneBridge() {
  useEffect(() => {
    function onKeyDown(event) {
      const isMod = event.ctrlKey || event.metaKey;
      if (!isMod || event.key.toLowerCase() !== "z") return;
      event.preventDefault();
      if (event.shiftKey) useEditorStore.getState().redo();
      else useEditorStore.getState().undo();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
  return null;
}

export function Editor() {
  const uploadedImage = useEditorStore((state) => state.uploadedImage);

  return (
    <section className="canvas-panel">
      <SceneBridge />
      {!uploadedImage ? <EmptyState /> : null}
      <Canvas
        shadows
        dpr={[1, 1.75]}
        gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }}
        camera={{ position: [0.2, 0.3, 6], fov: 35 }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </section>
  );
}
