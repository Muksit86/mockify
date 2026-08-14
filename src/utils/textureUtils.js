import * as THREE from "three";

export function configureArtworkTexture(texture, transform) {
  if (!texture) return;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.center.set(0.5, 0.5);
  texture.offset.set(0.5 + transform.x, 0.5 + transform.y);
  texture.rotation = transform.rotation;

  const scale = Math.max(transform.scale, 0.05);
  if (transform.fit === "fill") {
    texture.repeat.set(1 / scale, 1 / scale);
  } else if (transform.fit === "contain") {
    texture.repeat.set(1 / scale, 1 / scale);
  } else {
    texture.repeat.set(1 / scale, 1 / scale);
  }

  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
}
