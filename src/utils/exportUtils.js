export function exportCanvas({ gl, scene, camera, width, height, format, transparent, background }) {
  const previousSize = gl.getSize({ width: 0, height: 0 });
  const previousPixelRatio = gl.getPixelRatio();
  const previousClearAlpha = gl.getClearAlpha();
  const previousClearColor = gl.getClearColor({ r: 0, g: 0, b: 0 });

  gl.setPixelRatio(1);
  gl.setSize(width, height, false);
  gl.setClearAlpha(transparent ? 0 : 1);
  if (!transparent && background?.color) gl.setClearColor(background.color, 1);
  gl.render(scene, camera);

  const mime = format === "jpg" ? "image/jpeg" : `image/${format}`;
  const dataUrl = gl.domElement.toDataURL(mime, 0.94);
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = `mockup.${format === "jpg" ? "jpg" : format}`;
  link.click();

  gl.setPixelRatio(previousPixelRatio);
  gl.setSize(previousSize.width, previousSize.height, false);
  gl.setClearColor(previousClearColor, previousClearAlpha);
}
