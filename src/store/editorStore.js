import { create } from "zustand";
import { getMockup } from "../data/mockups.js";

const initialState = {
  uploadedImage: null,
  selectedMockup: "phone",
  imageTransform: { scale: 1, x: 0, y: 0, rotation: 0, fit: "cover" },
  camera: { position: [0.2, 0.3, 6], target: [0, 0, 0], fov: 35, zoom: 100 },
  lighting: { intensity: 1.1, rotation: 25, shadows: true, softness: 0.62 },
  background: {
    type: "solid",
    color: "#d8dbe0",
    color2: "#aeb4bd",
    angle: 135,
    preset: "Studio",
    transparent: false,
  },
  exportSettings: { width: 1920, height: 1080, format: "png", transparent: false },
  exportOpen: false,
};

const historyKeys = ["selectedMockup", "imageTransform", "camera", "lighting", "background"];

function snapshot(state) {
  return historyKeys.reduce((acc, key) => {
    acc[key] = structuredClone(state[key]);
    return acc;
  }, {});
}

function withHistory(set, updater) {
  set((state) => {
    const next = typeof updater === "function" ? updater(state) : updater;
    return {
      past: [...state.past, snapshot(state)].slice(-60),
      future: [],
      ...next,
    };
  });
}

export const useEditorStore = create((set, get) => ({
  ...initialState,
  past: [],
  future: [],
  setUploadedImage: (uploadedImage) => set({ uploadedImage }),
  selectMockup: (id) =>
    withHistory(set, () => {
      const mockup = getMockup(id);
      return {
        selectedMockup: id,
        camera: { ...mockup.defaultCamera, zoom: 100 },
        lighting: mockup.defaultLighting,
        imageTransform: { ...get().imageTransform, fit: mockup.fit },
      };
    }),
  updateImageTransform: (patch) =>
    withHistory(set, (state) => ({ imageTransform: { ...state.imageTransform, ...patch } })),
  updateCamera: (patch) => withHistory(set, (state) => ({ camera: { ...state.camera, ...patch } })),
  updateLighting: (patch) =>
    withHistory(set, (state) => ({ lighting: { ...state.lighting, ...patch } })),
  updateBackground: (patch) =>
    withHistory(set, (state) => ({ background: { ...state.background, ...patch } })),
  updateExportSettings: (patch) =>
    set((state) => ({ exportSettings: { ...state.exportSettings, ...patch } })),
  setExportOpen: (exportOpen) => set({ exportOpen }),
  undo: () =>
    set((state) => {
      if (!state.past.length) return {};
      const previous = state.past[state.past.length - 1];
      return {
        ...previous,
        past: state.past.slice(0, -1),
        future: [snapshot(state), ...state.future],
      };
    }),
  redo: () =>
    set((state) => {
      if (!state.future.length) return {};
      const next = state.future[0];
      return {
        ...next,
        past: [...state.past, snapshot(state)],
        future: state.future.slice(1),
      };
    }),
}));
