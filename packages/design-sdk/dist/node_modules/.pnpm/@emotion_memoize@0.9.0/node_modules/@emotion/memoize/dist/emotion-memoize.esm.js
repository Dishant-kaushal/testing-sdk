function u(t) {
  var n = /* @__PURE__ */ Object.create(null);
  return function(e) {
    return n[e] === void 0 && (n[e] = t(e)), n[e];
  };
}
export {
  u as default
};
