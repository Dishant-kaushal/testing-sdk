import { useRef as a, useState as E, useCallback as h, useLayoutEffect as w, useEffect as L } from "react";
import { useDismissOnScrollOutside as b } from "./useDismissOnScrollOutside.js";
function D(e, n, u, s = 4) {
  const r = a(null), [m, c] = E(null), o = a(u);
  o.current = u;
  const f = h(() => o.current(), []);
  return w(() => {
    if (!n || !e.current) {
      c(null);
      return;
    }
    const t = e.current.getBoundingClientRect();
    c({ top: t.bottom + s, left: t.left, width: t.width });
  }, [n, e, s]), b(r, f, n), L(() => {
    if (!n) return;
    const t = (v) => {
      var d, i;
      const l = v.target;
      (d = e.current) != null && d.contains(l) || (i = r.current) != null && i.contains(l) || o.current();
    };
    return document.addEventListener("mousedown", t), document.addEventListener("touchstart", t), () => {
      document.removeEventListener("mousedown", t), document.removeEventListener("touchstart", t);
    };
  }, [n, e]), { portalRef: r, pos: m };
}
export {
  D as useDropdownPortal
};
