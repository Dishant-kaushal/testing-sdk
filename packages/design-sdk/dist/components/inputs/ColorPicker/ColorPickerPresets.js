import { jsx as o } from "react/jsx-runtime";
import { cn as s } from "../../../utils/cn.js";
import { ColorPalette as m } from "./ColorPalette.js";
/* empty css                       */
const D = [
  { name: "Blue", colors: ["#E7F6FE", "#CFEDFC", "#A8DFFA", "#79CEF8", "#57C1F6", "#15B0F3", "#1291D0", "#0F78AD", "#0C608A", "#094868"] },
  { name: "Green", colors: ["#EBFAF3", "#DAF5E8", "#B6ECD1", "#91E3BA", "#48D08C", "#00BE5F", "#00A251", "#008743", "#006C36", "#005128"] },
  { name: "Orange", colors: ["#FFF3EB", "#FFE1CC", "#FFC499", "#FFAC70", "#FF9040", "#FF7A1A", "#E9690C", "#C65C10", "#A24D10", "#813E0E"] },
  { name: "Red", colors: ["#FFF5F5", "#FEE4E2", "#FEC6C3", "#FD9D96", "#F96C62", "#F04438", "#D92D20", "#B42318", "#9A0E0E", "#880C0C"] },
  { name: "Neutral", colors: ["#F8FAFC", "#F1F5FA", "#E3EAF3", "#CBD5E2", "#B1C1D2", "#90A5BB", "#768EA7", "#6C849D", "#58728D", "#40566D"] }
];
function n({
  palettes: r = D,
  selectedColor: C,
  onColorSelect: E,
  className: e,
  ...A
}) {
  return /* @__PURE__ */ o("div", { className: s("fds-color-presets", e), ...A, children: r.map((F) => /* @__PURE__ */ o(
    m,
    {
      name: F.name,
      colors: F.colors,
      selectedColor: C,
      onColorSelect: E
    },
    F.name
  )) });
}
n.displayName = "ColorPickerPresets";
export {
  n as ColorPickerPresets,
  D as DEFAULT_PALETTES
};
