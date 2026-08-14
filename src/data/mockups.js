export const mockups = [
  {
    id: "phone",
    name: "iPhone",
    category: "Devices",
    placeholder: "phone",
    surface: "screen",
    fit: "cover",
    defaultCamera: { position: [0.2, 0.3, 6], target: [0, 0, 0], fov: 35 },
    defaultLighting: { intensity: 1.1, rotation: 25, shadows: true, softness: 0.62 },
  },
  {
    id: "laptop",
    name: "Laptop",
    category: "Devices",
    placeholder: "laptop",
    surface: "screen",
    fit: "cover",
    defaultCamera: { position: [4, 2.5, 5], target: [0, 0.2, 0], fov: 35 },
    defaultLighting: { intensity: 1.05, rotation: -18, shadows: true, softness: 0.58 },
  },
  {
    id: "poster",
    name: "Poster",
    category: "Print",
    placeholder: "poster",
    surface: "artwork",
    fit: "contain",
    defaultCamera: { position: [0, 0.2, 5.2], target: [0, 0, 0], fov: 32 },
    defaultLighting: { intensity: 1, rotation: 0, shadows: true, softness: 0.5 },
  },
  {
    id: "book",
    name: "Book",
    category: "Print",
    placeholder: "book",
    surface: "cover",
    fit: "cover",
    defaultCamera: { position: [3.2, 2.2, 4.2], target: [0, 0, 0], fov: 34 },
    defaultLighting: { intensity: 1.15, rotation: 32, shadows: true, softness: 0.66 },
  },
  {
    id: "box",
    name: "Box",
    category: "Packaging",
    placeholder: "box",
    surface: "front",
    fit: "cover",
    defaultCamera: { position: [3.6, 2.4, 4.5], target: [0, 0, 0], fov: 34 },
    defaultLighting: { intensity: 1.1, rotation: 20, shadows: true, softness: 0.64 },
  },
];

export const categories = ["Devices", "Print", "Packaging", "Apparel"];

export function getMockup(id) {
  return mockups.find((mockup) => mockup.id === id) || mockups[0];
}
