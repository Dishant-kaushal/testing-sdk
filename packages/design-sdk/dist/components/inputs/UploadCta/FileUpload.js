import { jsxs as A, jsx as i } from "react/jsx-runtime";
import { cn as B } from "../../../utils/cn.js";
import { InputFieldHeader as C } from "../../forms/InputFieldHeader/InputFieldHeader.js";
import { InputFieldFooter as G } from "../../forms/InputFieldFooter/InputFieldFooter.js";
import { UploadCta as J } from "./UploadCta.js";
import { UploadItem as K } from "./UploadItem.js";
/* empty css               */
function L({
  uploadType: F,
  mode: b,
  label: f,
  necessityIndicator: I = "none",
  helpText: N,
  errorText: U,
  validationState: x = "none",
  isDisabled: j = !1,
  accept: E,
  maxSize: o,
  maxCount: r,
  files: e = [],
  onFilesSelect: p,
  onRemove: a,
  onDownload: m,
  onPreview: d,
  onReupload: c,
  className: M,
  ..._
}) {
  const l = F ?? b ?? "single", h = x === "error", u = h ? U : N, k = l === "multiple" && typeof r == "number" && e.length >= r, g = !(l === "single" && e.length > 0) && !k, z = g && !!u, H = (t) => {
    if (!p) return;
    if (typeof o != "number" && typeof r != "number") {
      p(t);
      return;
    }
    const n = [], q = typeof r == "number" ? Math.max(0, r - e.length) : 1 / 0;
    for (let s = 0; s < t.length; s++) {
      const T = t[s];
      if (!(typeof o == "number" && T.size > o)) {
        if (n.length >= q) break;
        n.push(T);
      }
    }
    if (n.length === 0) return;
    const y = new DataTransfer();
    n.forEach((s) => y.items.add(s)), p(y.files);
  };
  return /* @__PURE__ */ A("div", { className: B("fds-file-upload", M), ..._, children: [
    f && /* @__PURE__ */ i(C, { label: f, necessityIndicator: I }),
    g && /* @__PURE__ */ i(
      J,
      {
        isDisabled: j,
        accept: E,
        multiple: l === "multiple",
        onFilesSelect: H
      }
    ),
    z && /* @__PURE__ */ i(
      G,
      {
        helpText: u,
        state: h ? "error" : "default"
      }
    ),
    e.length > 0 && /* @__PURE__ */ i("div", { className: "fds-file-upload__list", children: e.map((t) => /* @__PURE__ */ i(
      K,
      {
        fileName: t.name,
        fileSize: t.size,
        fileType: t.type,
        uploadState: t.state,
        progress: t.progress,
        errorText: t.errorText,
        onRemove: () => a == null ? void 0 : a(t.id),
        onDownload: () => m == null ? void 0 : m(t.id),
        onPreview: () => d == null ? void 0 : d(t.id),
        onRetry: () => c == null ? void 0 : c(t.id)
      },
      t.id
    )) })
  ] });
}
L.displayName = "FileUpload";
export {
  L as FileUpload
};
