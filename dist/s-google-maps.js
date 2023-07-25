import { setContext as it, createEventDispatcher as R, onMount as st, onDestroy as w, getContext as y } from "svelte";
var ft = function e(t, n) {
  if (t === n)
    return !0;
  if (t && n && typeof t == "object" && typeof n == "object") {
    if (t.constructor !== n.constructor)
      return !1;
    var i, s, o;
    if (Array.isArray(t)) {
      if (i = t.length, i != n.length)
        return !1;
      for (s = i; s-- !== 0; )
        if (!e(t[s], n[s]))
          return !1;
      return !0;
    }
    if (t.constructor === RegExp)
      return t.source === n.source && t.flags === n.flags;
    if (t.valueOf !== Object.prototype.valueOf)
      return t.valueOf() === n.valueOf();
    if (t.toString !== Object.prototype.toString)
      return t.toString() === n.toString();
    if (o = Object.keys(t), i = o.length, i !== Object.keys(n).length)
      return !1;
    for (s = i; s-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(n, o[s]))
        return !1;
    for (s = i; s-- !== 0; ) {
      var r = o[s];
      if (!e(t[r], n[r]))
        return !1;
    }
    return !0;
  }
  return t !== t && n !== n;
};
const $ = "__googleMapsScriptId";
var A;
(function(e) {
  e[e.INITIALIZED = 0] = "INITIALIZED", e[e.LOADING = 1] = "LOADING", e[e.SUCCESS = 2] = "SUCCESS", e[e.FAILURE = 3] = "FAILURE";
})(A || (A = {}));
class O {
  /**
   * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set
   * using this library, instead the defaults are set by the Google Maps
   * JavaScript API server.
   *
   * ```
   * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});
   * ```
   */
  constructor({ apiKey: t, authReferrerPolicy: n, channel: i, client: s, id: o = $, language: r, libraries: l = [], mapIds: u, nonce: a, region: f, retries: c = 3, url: d = "https://maps.googleapis.com/maps/api/js", version: h }) {
    if (this.CALLBACK = "__googleMapsCallback", this.callbacks = [], this.done = !1, this.loading = !1, this.errors = [], this.apiKey = t, this.authReferrerPolicy = n, this.channel = i, this.client = s, this.id = o || $, this.language = r, this.libraries = l, this.mapIds = u, this.nonce = a, this.region = f, this.retries = c, this.url = d, this.version = h, O.instance) {
      if (!ft(this.options, O.instance.options))
        throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(O.instance.options)}`);
      return O.instance;
    }
    O.instance = this;
  }
  get options() {
    return {
      version: this.version,
      apiKey: this.apiKey,
      channel: this.channel,
      client: this.client,
      id: this.id,
      libraries: this.libraries,
      language: this.language,
      region: this.region,
      mapIds: this.mapIds,
      nonce: this.nonce,
      url: this.url,
      authReferrerPolicy: this.authReferrerPolicy
    };
  }
  get status() {
    return this.errors.length ? A.FAILURE : this.done ? A.SUCCESS : this.loading ? A.LOADING : A.INITIALIZED;
  }
  get failed() {
    return this.done && !this.loading && this.errors.length >= this.retries + 1;
  }
  /**
   * CreateUrl returns the Google Maps JavaScript API script url given the [[LoaderOptions]].
   *
   * @ignore
   */
  createUrl() {
    let t = this.url;
    return t += `?callback=${this.CALLBACK}`, this.apiKey && (t += `&key=${this.apiKey}`), this.channel && (t += `&channel=${this.channel}`), this.client && (t += `&client=${this.client}`), this.libraries.length > 0 && (t += `&libraries=${this.libraries.join(",")}`), this.language && (t += `&language=${this.language}`), this.region && (t += `&region=${this.region}`), this.version && (t += `&v=${this.version}`), this.mapIds && (t += `&map_ids=${this.mapIds.join(",")}`), this.authReferrerPolicy && (t += `&auth_referrer_policy=${this.authReferrerPolicy}`), t;
  }
  deleteScript() {
    const t = document.getElementById(this.id);
    t && t.remove();
  }
  /**
   * Load the Google Maps JavaScript API script and return a Promise.
   */
  load() {
    return this.loadPromise();
  }
  /**
   * Load the Google Maps JavaScript API script and return a Promise.
   *
   * @ignore
   */
  loadPromise() {
    return new Promise((t, n) => {
      this.loadCallback((i) => {
        i ? n(i.error) : t(window.google);
      });
    });
  }
  /**
   * Load the Google Maps JavaScript API script with a callback.
   */
  loadCallback(t) {
    this.callbacks.push(t), this.execute();
  }
  /**
   * Set the script on document.
   */
  setScript() {
    if (document.getElementById(this.id)) {
      this.callback();
      return;
    }
    const t = this.createUrl(), n = document.createElement("script");
    n.id = this.id, n.type = "text/javascript", n.src = t, n.onerror = this.loadErrorCallback.bind(this), n.defer = !0, n.async = !0, this.nonce && (n.nonce = this.nonce), document.head.appendChild(n);
  }
  /**
   * Reset the loader state.
   */
  reset() {
    this.deleteScript(), this.done = !1, this.loading = !1, this.errors = [], this.onerrorEvent = null;
  }
  resetIfRetryingFailed() {
    this.failed && this.reset();
  }
  loadErrorCallback(t) {
    if (this.errors.push(t), this.errors.length <= this.retries) {
      const n = this.errors.length * Math.pow(2, this.errors.length);
      console.log(`Failed to load Google Maps script, retrying in ${n} ms.`), setTimeout(() => {
        this.deleteScript(), this.setScript();
      }, n);
    } else
      this.onerrorEvent = t, this.callback();
  }
  setCallback() {
    window.__googleMapsCallback = this.callback.bind(this);
  }
  callback() {
    this.done = !0, this.loading = !1, this.callbacks.forEach((t) => {
      t(this.onerrorEvent);
    }), this.callbacks = [];
  }
  execute() {
    if (this.resetIfRetryingFailed(), this.done)
      this.callback();
    else {
      if (window.google && window.google.maps && window.google.maps.version) {
        console.warn("Google Maps already loaded outside @googlemaps/js-api-loader.This may result in undesirable behavior as options and script parameters may not match."), this.callback();
        return;
      }
      this.loading || (this.loading = !0, this.setCallback(), this.setScript());
    }
  }
}
let _ = null;
async function ht(e, t = []) {
  if (_)
    return;
  _ = await new O({
    apiKey: e,
    libraries: t
  }).load();
}
const Jt = {
  load: ht,
  gmapApi: _
};
function T() {
}
function dt(e, t) {
  for (const n in t)
    e[n] = t[n];
  return e;
}
function ot(e) {
  return e();
}
function tt() {
  return /* @__PURE__ */ Object.create(null);
}
function x(e) {
  e.forEach(ot);
}
function rt(e) {
  return typeof e == "function";
}
function b(e, t) {
  return e != e ? t == t : e !== t || e && typeof e == "object" || typeof e == "function";
}
function gt(e) {
  return Object.keys(e).length === 0;
}
function q(e, t, n, i) {
  if (e) {
    const s = lt(e, t, n, i);
    return e[0](s);
  }
}
function lt(e, t, n, i) {
  return e[1] && i ? dt(n.ctx.slice(), e[1](i(t))) : n.ctx;
}
function H(e, t, n, i) {
  if (e[2] && i) {
    const s = e[2](i(n));
    if (t.dirty === void 0)
      return s;
    if (typeof s == "object") {
      const o = [], r = Math.max(t.dirty.length, s.length);
      for (let l = 0; l < r; l += 1)
        o[l] = t.dirty[l] | s[l];
      return o;
    }
    return t.dirty | s;
  }
  return t.dirty;
}
function Q(e, t, n, i, s, o) {
  if (s) {
    const r = lt(t, n, i, o);
    e.p(r, s);
  }
}
function V(e) {
  if (e.ctx.length > 32) {
    const t = [], n = e.ctx.length / 32;
    for (let i = 0; i < n; i++)
      t[i] = -1;
    return t;
  }
  return -1;
}
function U(e, t) {
  e.appendChild(t);
}
function ct(e, t, n) {
  e.insertBefore(t, n || null);
}
function X(e) {
  e.parentNode && e.parentNode.removeChild(e);
}
function j(e) {
  return document.createElement(e);
}
function pt(e) {
  return document.createTextNode(e);
}
function mt() {
  return pt(" ");
}
function C(e, t, n) {
  n == null ? e.removeAttribute(t) : e.getAttribute(t) !== n && e.setAttribute(t, n);
}
function _t(e) {
  return Array.from(e.childNodes);
}
let Y;
function N(e) {
  Y = e;
}
const v = [], J = [];
let P = [];
const et = [], yt = /* @__PURE__ */ Promise.resolve();
let W = !1;
function wt() {
  W || (W = !0, yt.then(ut));
}
function Z(e) {
  P.push(e);
}
const K = /* @__PURE__ */ new Set();
let M = 0;
function ut() {
  if (M !== 0)
    return;
  const e = Y;
  do {
    try {
      for (; M < v.length; ) {
        const t = v[M];
        M++, N(t), bt(t.$$);
      }
    } catch (t) {
      throw v.length = 0, M = 0, t;
    }
    for (N(null), v.length = 0, M = 0; J.length; )
      J.pop()();
    for (let t = 0; t < P.length; t += 1) {
      const n = P[t];
      K.has(n) || (K.add(n), n());
    }
    P.length = 0;
  } while (v.length);
  for (; et.length; )
    et.pop()();
  W = !1, K.clear(), N(e);
}
function bt(e) {
  if (e.fragment !== null) {
    e.update(), x(e.before_update);
    const t = e.dirty;
    e.dirty = [-1], e.fragment && e.fragment.p(e.ctx, t), e.after_update.forEach(Z);
  }
}
function kt(e) {
  const t = [], n = [];
  P.forEach((i) => e.indexOf(i) === -1 ? t.push(i) : n.push(i)), n.forEach((i) => i()), P = t;
}
const D = /* @__PURE__ */ new Set();
let E;
function Lt() {
  E = {
    r: 0,
    c: [],
    p: E
    // parent group
  };
}
function St() {
  E.r || x(E.c), E = E.p;
}
function I(e, t) {
  e && e.i && (D.delete(e), e.i(t));
}
function G(e, t, n, i) {
  if (e && e.o) {
    if (D.has(e))
      return;
    D.add(e), E.c.push(() => {
      D.delete(e), i && (n && e.d(1), i());
    }), e.o(t);
  } else
    i && i();
}
function Ct(e, t, n, i) {
  const { fragment: s, after_update: o } = e.$$;
  s && s.m(t, n), i || Z(() => {
    const r = e.$$.on_mount.map(ot).filter(rt);
    e.$$.on_destroy ? e.$$.on_destroy.push(...r) : x(r), e.$$.on_mount = [];
  }), o.forEach(Z);
}
function Ot(e, t) {
  const n = e.$$;
  n.fragment !== null && (kt(n.after_update), x(n.on_destroy), n.fragment && n.fragment.d(t), n.on_destroy = n.fragment = null, n.ctx = []);
}
function Et(e, t) {
  e.$$.dirty[0] === -1 && (v.push(e), wt(), e.$$.dirty.fill(0)), e.$$.dirty[t / 31 | 0] |= 1 << t % 31;
}
function k(e, t, n, i, s, o, r, l = [-1]) {
  const u = Y;
  N(e);
  const a = e.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: o,
    update: T,
    not_equal: s,
    bound: tt(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(t.context || (u ? u.$$.context : [])),
    // everything else
    callbacks: tt(),
    dirty: l,
    skip_bound: !1,
    root: t.target || u.$$.root
  };
  r && r(a.root);
  let f = !1;
  if (a.ctx = n ? n(e, t.props || {}, (c, d, ...h) => {
    const g = h.length ? h[0] : d;
    return a.ctx && s(a.ctx[c], a.ctx[c] = g) && (!a.skip_bound && a.bound[c] && a.bound[c](g), f && Et(e, c)), d;
  }) : [], a.update(), f = !0, x(a.before_update), a.fragment = i ? i(a.ctx) : !1, t.target) {
    if (t.hydrate) {
      const c = _t(t.target);
      a.fragment && a.fragment.l(c), c.forEach(X);
    } else
      a.fragment && a.fragment.c();
    t.intro && I(e.$$.fragment), Ct(e, t.target, t.anchor, t.customElement), ut();
  }
  N(u);
}
class L {
  $destroy() {
    Ot(this, 1), this.$destroy = T;
  }
  $on(t, n) {
    if (!rt(n))
      return T;
    const i = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
    return i.push(n), () => {
      const s = i.indexOf(n);
      s !== -1 && i.splice(s, 1);
    };
  }
  $set(t) {
    this.$$set && !gt(t) && (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1);
  }
}
function nt(e) {
  let t;
  const n = (
    /*#slots*/
    e[12].default
  ), i = q(
    n,
    e,
    /*$$scope*/
    e[11],
    null
  );
  return {
    c() {
      i && i.c();
    },
    m(s, o) {
      i && i.m(s, o), t = !0;
    },
    p(s, o) {
      i && i.p && (!t || o & /*$$scope*/
      2048) && Q(
        i,
        n,
        s,
        /*$$scope*/
        s[11],
        t ? H(
          n,
          /*$$scope*/
          s[11],
          o,
          null
        ) : V(
          /*$$scope*/
          s[11]
        ),
        null
      );
    },
    i(s) {
      t || (I(i, s), t = !0);
    },
    o(s) {
      G(i, s), t = !1;
    },
    d(s) {
      i && i.d(s);
    }
  };
}
function It(e) {
  let t, n, i, s, o = (
    /*mounted*/
    e[0] && nt(e)
  );
  return {
    c() {
      t = j("div"), n = j("div"), i = mt(), o && o.c(), C(
        n,
        "style",
        /*containerStyle*/
        e[2]
      ), C(n, "class", "s-google-map__container svelte-hsj0b5"), C(
        t,
        "style",
        /*wrapperStyle*/
        e[3]
      ), C(t, "class", "s-google-map__wrapper");
    },
    m(r, l) {
      ct(r, t, l), U(t, n), e[13](n), U(t, i), o && o.m(t, null), s = !0;
    },
    p(r, [l]) {
      (!s || l & /*containerStyle*/
      4) && C(
        n,
        "style",
        /*containerStyle*/
        r[2]
      ), /*mounted*/
      r[0] ? o ? (o.p(r, l), l & /*mounted*/
      1 && I(o, 1)) : (o = nt(r), o.c(), I(o, 1), o.m(t, null)) : o && (Lt(), G(o, 1, 1, () => {
        o = null;
      }), St()), (!s || l & /*wrapperStyle*/
      8) && C(
        t,
        "style",
        /*wrapperStyle*/
        r[3]
      );
    },
    i(r) {
      s || (I(o), s = !0);
    },
    o(r) {
      G(o), s = !1;
    },
    d(r) {
      r && X(t), e[13](null), o && o.d();
    }
  };
}
function Mt(e, t, n) {
  let i, s, { $$slots: o = {}, $$scope: r } = t, { width: l } = t, { height: u } = t, { borderRadius: a = "0" } = t, { zoom: f = null } = t, { options: c } = t, { center: d = null } = t;
  it("map", { getMap: () => g });
  let h = !1, g = null, S = null;
  const z = R();
  let m = null, B = null, F = null;
  st(() => {
    !S || !_ || (n(10, g = new _.maps.Map(S)), m = g.addListener("click", (p) => {
      z("click", p);
    }), B = g.addListener("dragend", () => {
      n(5, d = g.getCenter().toJSON());
    }), F = g.addListener("zoom_changed", () => {
      n(4, f = g.getZoom());
    }), n(0, h = !0));
  }), w(() => {
    n(10, g = null), m && m.remove(), B && B.remove(), F && F.remove();
  });
  function at(p) {
    J[p ? "unshift" : "push"](() => {
      S = p, n(1, S);
    });
  }
  return e.$$set = (p) => {
    "width" in p && n(6, l = p.width), "height" in p && n(7, u = p.height), "borderRadius" in p && n(8, a = p.borderRadius), "zoom" in p && n(4, f = p.zoom), "options" in p && n(9, c = p.options), "center" in p && n(5, d = p.center), "$$scope" in p && n(11, r = p.$$scope);
  }, e.$$.update = () => {
    e.$$.dirty & /*width, height*/
    192 && n(3, i = `width: ${l}; height: ${u}`), e.$$.dirty & /*width, height, borderRadius*/
    448 && n(2, s = `width: ${l}; height: ${u}; border-radius: ${a}`), e.$$.dirty & /*map, options, zoom, center*/
    1584 && (g && g.setOptions(c), g && f && g.setZoom(f), g && d && g.setCenter(d));
  }, [
    h,
    S,
    s,
    i,
    f,
    d,
    l,
    u,
    a,
    c,
    g,
    r,
    o,
    at
  ];
}
class zt extends L {
  constructor(t) {
    super(), k(this, t, Mt, It, b, {
      width: 6,
      height: 7,
      borderRadius: 8,
      zoom: 4,
      options: 9,
      center: 5
    });
  }
}
function vt(e, t, n) {
  let { radius: i = null } = t, { center: s = null } = t, { options: o = null } = t;
  const { getMap: r } = y("map"), l = r(), u = R(), a = new _.maps.Circle({ map: l }), f = a.addListener("radius_changed", () => {
    n(0, i = a.getRadius());
  }), c = a.addListener("center_changed", () => {
    n(1, s = a.getCenter().toJSON());
  }), d = a.addListener("click", (h) => {
    u("click", h);
  });
  return w(() => {
    a.setMap(null), d.remove(), c.remove(), f.remove();
  }), e.$$set = (h) => {
    "radius" in h && n(0, i = h.radius), "center" in h && n(1, s = h.center), "options" in h && n(2, o = h.options);
  }, e.$$.update = () => {
    e.$$.dirty & /*radius, center, options*/
    7 && (i && a.setRadius(i), s && a.setCenter(s), o && a.setOptions(o));
  }, [i, s, o];
}
class Bt extends L {
  constructor(t) {
    super(), k(this, t, vt, null, b, { radius: 0, center: 1, options: 2 });
  }
}
function At(e) {
  let t;
  const n = (
    /*#slots*/
    e[3].default
  ), i = q(
    n,
    e,
    /*$$scope*/
    e[2],
    null
  );
  return {
    c() {
      i && i.c();
    },
    m(s, o) {
      i && i.m(s, o), t = !0;
    },
    p(s, [o]) {
      i && i.p && (!t || o & /*$$scope*/
      4) && Q(
        i,
        n,
        s,
        /*$$scope*/
        s[2],
        t ? H(
          n,
          /*$$scope*/
          s[2],
          o,
          null
        ) : V(
          /*$$scope*/
          s[2]
        ),
        null
      );
    },
    i(s) {
      t || (I(i, s), t = !0);
    },
    o(s) {
      G(i, s), t = !1;
    },
    d(s) {
      i && i.d(s);
    }
  };
}
function Pt(e, t, n) {
  let { $$slots: i = {}, $$scope: s } = t, { options: o = null } = t, { position: r = null } = t;
  const { getMap: l } = y("map");
  it("marker", { getMarker: () => f });
  const u = l(), a = R(), f = new _.maps.Marker({ map: u }), c = f.addListener("mouseup", () => {
    n(0, r = f.getPosition().toJSON());
  }), d = f.addListener("click", (h) => {
    a("click", h);
  });
  return w(() => {
    f.setMap(null), d.remove(), c.remove();
  }), e.$$set = (h) => {
    "options" in h && n(1, o = h.options), "position" in h && n(0, r = h.position), "$$scope" in h && n(2, s = h.$$scope);
  }, e.$$.update = () => {
    e.$$.dirty & /*options, position*/
    3 && (o && f.setOptions(o), r && f.setPosition(r));
  }, [r, o, s, i];
}
class Ft extends L {
  constructor(t) {
    super(), k(this, t, Pt, At, b, { options: 1, position: 0 });
  }
}
function Rt(e, t, n) {
  let { options: i = null } = t;
  const { getMap: s } = y("map"), o = s(), r = new _.maps.visualization.HeatmapLayer({ map: o });
  return w(() => {
    r.setMap(null);
  }), e.$$set = (l) => {
    "options" in l && n(0, i = l.options);
  }, e.$$.update = () => {
    e.$$.dirty & /*options*/
    1 && i && r.setOptions(i);
  }, [i];
}
class Kt extends L {
  constructor(t) {
    super(), k(this, t, Rt, null, b, { options: 0 });
  }
}
function jt(e, t, n) {
  let { path: i = null } = t, { options: s = null } = t;
  const { getMap: o } = y("map"), r = o(), l = R(), u = new _.maps.Polygon({ map: r }), a = u.addListener("mouseup", () => {
    n(0, i = u.getPath().getArray().map((c) => c.toJSON()));
  }), f = u.addListener("click", (c) => {
    l("click", c);
  });
  return w(() => {
    u.setMap(null), f.remove(), a.remove();
  }), e.$$set = (c) => {
    "path" in c && n(0, i = c.path), "options" in c && n(1, s = c.options);
  }, e.$$.update = () => {
    e.$$.dirty & /*path, options*/
    3 && (i && u.setPath(i), s && u.setOptions(s));
  }, [i, s];
}
class Tt extends L {
  constructor(t) {
    super(), k(this, t, jt, null, b, { path: 0, options: 1 });
  }
}
function Nt(e, t, n) {
  let { path: i = null } = t, { options: s = null } = t;
  const { getMap: o } = y("map"), r = o(), l = R(), u = new _.maps.Polyline({ map: r }), a = u.addListener("mouseup", () => {
    n(0, i = u.getPath().getArray().map((c) => c.toJSON()));
  }), f = u.addListener("click", (c) => {
    l("click", c);
  });
  return w(() => {
    u.setMap(null), f.remove(), a.remove();
  }), e.$$set = (c) => {
    "path" in c && n(0, i = c.path), "options" in c && n(1, s = c.options);
  }, e.$$.update = () => {
    e.$$.dirty & /*path, options*/
    3 && (i && u.setPath(i), s && u.setOptions(s));
  }, [i, s];
}
class Wt extends L {
  constructor(t) {
    super(), k(this, t, Nt, null, b, { path: 0, options: 1 });
  }
}
function Gt(e, t, n) {
  let { options: i = null } = t, { bounds: s = null } = t;
  const { getMap: o } = y("map"), r = o(), l = R(), u = new _.maps.Rectangle({ map: r }), a = u.addListener("bounds_changed", () => {
    n(0, s = u.getBounds().toJSON());
  }), f = u.addListener("click", (c) => {
    l("click", c);
  });
  return w(() => {
    u.setMap(null), f.remove(), a.remove();
  }), e.$$set = (c) => {
    "options" in c && n(1, i = c.options), "bounds" in c && n(0, s = c.bounds);
  }, e.$$.update = () => {
    e.$$.dirty & /*bounds, options*/
    3 && (s && u.setBounds(s), i && u.setOptions(i));
  }, [s, i];
}
class Zt extends L {
  constructor(t) {
    super(), k(this, t, Gt, null, b, { options: 1, bounds: 0 });
  }
}
function xt(e) {
  let t, n, i, s;
  const o = (
    /*#slots*/
    e[4].default
  ), r = q(
    o,
    e,
    /*$$scope*/
    e[3],
    null
  );
  return {
    c() {
      t = j("template"), n = j("div"), i = j("div"), r && r.c(), C(n, "class", "s-google-info-window__container svelte-51y2q4");
    },
    m(l, u) {
      ct(l, t, u), U(t.content, n), U(n, i), r && r.m(i, null), e[5](i), s = !0;
    },
    p(l, [u]) {
      r && r.p && (!s || u & /*$$scope*/
      8) && Q(
        r,
        o,
        l,
        /*$$scope*/
        l[3],
        s ? H(
          o,
          /*$$scope*/
          l[3],
          u,
          null
        ) : V(
          /*$$scope*/
          l[3]
        ),
        null
      );
    },
    i(l) {
      s || (I(r, l), s = !0);
    },
    o(l) {
      G(r, l), s = !1;
    },
    d(l) {
      l && X(t), r && r.d(l), e[5](null);
    }
  };
}
function Dt(e, t, n) {
  let { $$slots: i = {}, $$scope: s } = t, { show: o = !1 } = t, { options: r = null } = t;
  const { getMap: l } = y("map"), u = y("marker"), a = l(), f = (u == null ? void 0 : u.getMarker()) ?? null;
  let c = null;
  const d = new _.maps.InfoWindow();
  st(() => {
    d.setContent(c);
  });
  let h = null;
  f && (h = f.addListener("click", () => n(1, o = !o)));
  const g = d.addListener("closeclick", () => n(1, o = !1));
  function S(m) {
    m ? d.open({ map: a, anchor: f }) : d.close();
  }
  w(() => {
    d.close(), g.remove(), h == null || h.remove();
  });
  function z(m) {
    J[m ? "unshift" : "push"](() => {
      c = m, n(0, c);
    });
  }
  return e.$$set = (m) => {
    "show" in m && n(1, o = m.show), "options" in m && n(2, r = m.options), "$$scope" in m && n(3, s = m.$$scope);
  }, e.$$.update = () => {
    e.$$.dirty & /*options*/
    4 && r && d.setOptions(r), e.$$.dirty & /*show*/
    2 && S(o);
  }, [c, o, r, s, i, z];
}
class qt extends L {
  constructor(t) {
    super(), k(this, t, Dt, xt, b, { show: 1, options: 2 });
  }
}
export {
  Bt as SGoogleCircle,
  Kt as SGoogleHeatmap,
  qt as SGoogleInfoWindow,
  zt as SGoogleMap,
  Ft as SGoogleMarker,
  Tt as SGooglePolygon,
  Wt as SGooglePolyline,
  Zt as SGoogleRectangle,
  Jt as gmapLoader
};
