// store.jsx
import create from "zustand";

export const useStore = create((set) => ({
  colors: {
    Westbury_Compact_Sofa_Fabric_Seat: "#ff0000",
    Westbury_Compact_Sofa_Fabric: "#00ff00",
    Westbury_Compact_Sofa_Scatter: "#0000ff",
    Westbury_Compact_Sofa_Piping: "#ffff00",
    Westbury_Compact_Sofa_Fabric_Buttons: "#ff00ff",
    Westbury_Compact_Sofa_Fabric_Back: "#00ffff",
    Westbury_Compact_Sofa_Scatter_Piping: "#ffa500",
    Westbury_Compact_Sofa_Fabric_Seat_Piping: "#800080",
    Shadow_Rextangle003: "#808080",
    Westbury_Compact_Sofa_Wood: "#8b4513",
    Westbury_Compact_Sofa_Stud: "#d2691e",
    Westbury_Compact_Sofa_Fabric_Seat_Piping001: "#ffff00",
    Westbury_Compact_Sofa_Scatter_Piping001: "#ffff00",
    Westbury_Compact_Sofa_Fabric_Back001: "#ffff00",
    Westbury_Compact_Sofa_Fabric_Buttons001: "#ffff00",
    Westbury_Compact_Sofa_Scatter_Piping002: "#ffff00",
    Westbury_Compact_Sofa_Piping001: "#ffff00",
  },
  setColor: (meshName, color) =>
    set((state) => ({
      colors: {
        ...state.colors,
        [meshName]: color,
      },
    })),
}));
