var i = !0;
function u(r, e, t) {
  var s = "";
  return t.split(" ").forEach(function(n) {
    r[n] !== void 0 ? e.push(r[n] + ";") : n && (s += n + " ");
  }), s;
}
var o = function(e, t, s) {
  var n = e.key + "-" + t.name;
  // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (s === !1 || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  i === !1) && e.registered[n] === void 0 && (e.registered[n] = t.styles);
}, y = function(e, t, s) {
  o(e, t, s);
  var n = e.key + "-" + t.name;
  if (e.inserted[t.name] === void 0) {
    var f = t;
    do
      e.insert(t === f ? "." + n : "", f, e.sheet, !0), f = f.next;
    while (f !== void 0);
  }
};
export {
  u as getRegisteredStyles,
  y as insertStyles,
  o as registerStyles
};
