var i = Math.abs, c = String.fromCharCode, o = Object.assign;
function f(n, r) {
  return t(n, 0) ^ 45 ? (((r << 2 ^ t(n, 0)) << 2 ^ t(n, 1)) << 2 ^ t(n, 2)) << 2 ^ t(n, 3) : 0;
}
function u(n) {
  return n.trim();
}
function s(n, r) {
  return (n = r.exec(n)) ? n[0] : n;
}
function a(n, r, e) {
  return n.replace(r, e);
}
function h(n, r) {
  return n.indexOf(r);
}
function t(n, r) {
  return n.charCodeAt(r) | 0;
}
function m(n, r, e) {
  return n.slice(r, e);
}
function p(n) {
  return n.length;
}
function b(n) {
  return n.length;
}
function d(n, r) {
  return r.push(n), n;
}
function g(n, r) {
  return n.map(r).join("");
}
export {
  i as abs,
  d as append,
  o as assign,
  t as charat,
  g as combine,
  c as from,
  f as hash,
  h as indexof,
  s as match,
  a as replace,
  b as sizeof,
  p as strlen,
  m as substr,
  u as trim
};
