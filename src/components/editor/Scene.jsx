import { ContactShadows, OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { getMockup } from "../../data/mockups.js";
import { useEditorStore } from "../../store/editorStore.js";
import { MockupObject } from "./MockupObject.jsx";

export function Scene() {
  const controlsRef = useRef();
  const { camera, gl, scene } = useThree();
  const selectedMockup = useEditorStore((state) => state.selectedMockup);
  const cameraState = useEditorStore((state) => state.camera);
  const lighting = useEditorStore((state) => state.lighting);
  const background = useEditorStore((state) => state.background);
  const mockup = getMockup(selectedMockup);

  const lightPosition = useMemo(() => {
    const radians = THREE.MathUtils.degToRad(lighting.rotation);
    return [Math.sin(radians) * 4, 5, Math.cos(radians) * 4];
  }, [lighting.rotation]);

  useEffect(() => {
    camera.position.set(...cameraState.position);
    camera.fov = cameraState.fov || mockup.defaultCamera.fov;
    camera.zoom = cameraState.zoom / 100;
    camera.updateProjectionMatrix();
    controlsRef.current?.target.set(...(cameraState.target || mockup.defaultCamera.target));
    controlsRef.current?.update();
  }, [camera, cameraState, mockup.defaultCamera]);

  useEffect(() => {
    scene.background = background.transparent ? null : new THREE.Color(background.color);
  }, [scene, background]);

  useFrame(() => {
    window.__mockifyScene = { gl, scene, camera };
  });

  return (
    <>
      <ambientLight intensity={0.55 * lighting.intensity} />
      <directionalLight
        castShadow
        position={lightPosition}
        intensity={1.45 * lighting.intensity}
        shadow-mapSize={[1024, 1024]}
      />
      <MockupObject mockup={mockup} />
      {lighting.shadows ? (
        <ContactShadows position={[0, -1.45, 0]} opacity={0.45} scale={8} blur={lighting.softness * 4} far={4} />
      ) : null}
      <OrbitControls ref={controlsRef} enableDamping dampingFactor={0.08} makeDefault />
    </>
  );
}
