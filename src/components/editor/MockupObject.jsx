import { useLoader } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { useEditorStore } from "../../store/editorStore.js";
import { configureArtworkTexture } from "../../utils/textureUtils.js";

function ArtworkPlane({ args, position, rotation = [0, 0, 0] }) {
  const uploadedImage = useEditorStore((state) => state.uploadedImage);

  if (!uploadedImage) return null;
  return <TexturedArtwork args={args} position={position} rotation={rotation} url={uploadedImage.url} />;
}

function TexturedArtwork({ args, position, rotation, url }) {
  const imageTransform = useEditorStore((state) => state.imageTransform);
  const texture = useLoader(THREE.TextureLoader, url);

  useEffect(() => {
    configureArtworkTexture(texture, imageTransform);
  }, [texture, imageTransform]);

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={args} />
      <meshStandardMaterial map={texture} roughness={0.42} metalness={0.02} toneMapped={false} />
    </mesh>
  );
}

function PhoneMockup() {
  return (
    <group rotation={[0, -0.2, 0]} position={[0, 0.05, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.55, 3.1, 0.18]} />
        <meshStandardMaterial color="#16171a" metalness={0.72} roughness={0.34} />
      </mesh>
      <ArtworkPlane args={[1.34, 2.72]} position={[0, 0, 0.096]} />
      <mesh position={[0.38, 1.22, 0.2]} castShadow>
        <boxGeometry args={[0.42, 0.42, 0.08]} />
        <meshStandardMaterial color="#0c0d0f" metalness={0.6} roughness={0.28} />
      </mesh>
    </group>
  );
}

function LaptopMockup() {
  return (
    <group position={[0, -0.4, 0]} rotation={[0, -0.35, 0]}>
      <mesh castShadow receiveShadow position={[0, -0.55, 0.15]}>
        <boxGeometry args={[3.8, 0.18, 2.25]} />
        <meshStandardMaterial color="#b9bec6" metalness={0.55} roughness={0.28} />
      </mesh>
      <group position={[0, 0.55, -0.88]} rotation={[-0.28, 0, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.5, 2.15, 0.12]} />
          <meshStandardMaterial color="#202226" metalness={0.45} roughness={0.35} />
        </mesh>
        <ArtworkPlane args={[3.18, 1.78]} position={[0, 0, 0.071]} rotation={[0, 0, 0]} />
      </group>
      <mesh position={[0, -0.44, 0.35]}>
        <boxGeometry args={[2.3, 0.025, 1.05]} />
        <meshStandardMaterial color="#7e858e" roughness={0.55} />
      </mesh>
    </group>
  );
}

function PosterMockup() {
  return (
    <group position={[0, 0, 0]}>
      <mesh receiveShadow position={[0, 0, -0.08]}>
        <boxGeometry args={[2.35, 3.25, 0.09]} />
        <meshStandardMaterial color="#1f2023" roughness={0.5} />
      </mesh>
      <ArtworkPlane args={[2.08, 2.95]} position={[0, 0, -0.025]} />
    </group>
  );
}

function BookMockup() {
  return (
    <group rotation={[0.15, -0.55, -0.06]} position={[0, -0.08, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2, 2.85, 0.38]} />
        <meshStandardMaterial color="#e6e0d2" roughness={0.72} />
      </mesh>
      <ArtworkPlane args={[1.86, 2.62]} position={[0, 0, 0.201]} />
      <mesh position={[-1.04, 0, 0.03]}>
        <boxGeometry args={[0.12, 2.84, 0.42]} />
        <meshStandardMaterial color="#29313b" roughness={0.42} />
      </mesh>
    </group>
  );
}

function BoxMockup() {
  return (
    <group rotation={[0, -0.55, 0]} position={[0, -0.15, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.05, 2.05, 2.05]} />
        <meshStandardMaterial color="#d9d1c0" roughness={0.62} />
      </mesh>
      <ArtworkPlane args={[1.62, 1.62]} position={[0, 0, 1.031]} />
    </group>
  );
}

export function MockupObject({ mockup }) {
  const Current = useMemo(() => {
    return {
      phone: PhoneMockup,
      laptop: LaptopMockup,
      poster: PosterMockup,
      book: BookMockup,
      box: BoxMockup,
    }[mockup.placeholder] || PhoneMockup;
  }, [mockup.placeholder]);

  return <Current />;
}
