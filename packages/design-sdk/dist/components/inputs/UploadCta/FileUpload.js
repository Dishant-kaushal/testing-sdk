import { jsxs as U, jsx as r } from "react/jsx-runtime";
import { cn as y } from "../../../utils/cn.js";
import { InputFieldHeader as I } from "../../forms/InputFieldHeader/InputFieldHeader.js";
import { InputFieldFooter as j } from "../../forms/InputFieldFooter/InputFieldFooter.js";
import { UploadCta as z } from "./UploadCta.js";
import { UploadItem as C } from "./UploadItem.js";
/* empty css               */
function S({
  mode: a = "single",
  label: i,
  necessityIndicator: c = "none",
  helpText: u,
  errorText: n,
  validationState: h = "none",
  isDisabled: x = !1,
  accept: f,
  files: e = [],
  onFilesSelect: g,
  onRemove: p,
  onDownload: s,
  onPreview: o,
  className: F,
  ...T
}) {
  const d = h === "error", m = d ? n : u, l = !(a === "single" && e.length > 0), N = l && !!m;
  return /* @__PURE__ */ U("div", { className: y("fds-file-upload", F), ...T, children: [
    i && /* @__PURE__ */ r(I, { label: i, necessityIndicator: c }),
    l && /* @__PURE__ */ r(
      z,
      {
        isDisabled: x,
        accept: f,
        multiple: a === "multiple",
        onFilesSelect: g
      }
    ),
    N && /* @__PURE__ */ r(
      j,
      {
        helpText: m,
        state: d ? "error" : "default"
      }
    ),
    e.length > 0 && /* @__PURE__ */ r("div", { className: "fds-file-upload__list", children: e.map((t) => /* @__PURE__ */ r(
      C,
      {
        fileName: t.name,
        fileSize: t.size,
        fileType: t.type,
        uploadState: t.state,
        progress: t.progress,
        errorText: t.errorText,
        onRemove: () => p == null ? void 0 : p(t.id),
        onDownload: () => s == null ? void 0 : s(t.id),
        onPreview: () => o == null ? void 0 : o(t.id)
      },
      t.id
    )) })
  ] });
}
S.displayName = "FileUpload";
export {
  S as FileUpload
};
