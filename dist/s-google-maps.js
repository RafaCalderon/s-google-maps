var ht = function e(t, n) {
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
const tt = "__googleMapsScriptId";
var A;
(function(e) {
  e[e.INITIALIZED = 0] = "INITIALIZED", e[e.LOADING = 1] = "LOADING", e[e.SUCCESS = 2] = "SUCCESS", e[e.FAILURE = 3] = "FAILURE";
})(A || (A = {}));
class S {
  /**
   * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set
   * using this library, instead the defaults are set by the Google Maps
   * JavaScript API server.
   *
   * ```
   * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});
   * ```
   */
  constructor({ apiKey: t, authReferrerPolicy: n, channel: i, client: s, id: o = tt, language: r, libraries: l = [], mapIds: u, nonce: a, region: f, retries: c = 3, url: d = "https://maps.googleapis.com/maps/api/js", version: h }) {
    if (this.CALLBACK = "__googleMapsCallback", this.callbacks = [], this.done = !1, this.loading = !1, this.errors = [], this.apiKey = t, this.authReferrerPolicy = n, this.channel = i, this.client = s, this.id = o || tt, this.language = r, this.libraries = l, this.mapIds = u, this.nonce = a, this.region = f, this.retries = c, this.url = d, this.version = h, S.instance) {
      if (!ht(this.options, S.instance.options))
        throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(S.instance.options)}`);
      return S.instance;
    }
    S.instance = this;
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
async function dt(e, t = []) {
  if (_)
    return;
  _ = await new S({
    apiKey: e,
    libraries: t
  }).load();
}
const Ft = {
  load: dt,
  gmapApi: _
};
function Z() {
}
function gt(e, t) {
  for (const n in t)
    e[n] = t[n];
  return e;
}
function st(e) {
  return e();
}
function et() {
  return /* @__PURE__ */ Object.create(null);
}
function D(e) {
  e.forEach(st);
}
function ot(e) {
  return typeof e == "function";
}
function w(e, t) {
  return e != e ? t == t : e !== t || e && typeof e == "object" || typeof e == "function";
}
function pt(e) {
  return Object.keys(e).length === 0;
}
function Q(e, t, n, i) {
  if (e) {
    const s = rt(e, t, n, i);
    return e[0](s);
  }
}
function rt(e, t, n, i) {
  return e[1] && i ? gt(n.ctx.slice(), e[1](i(t))) : n.ctx;
}
function V(e, t, n, i) {
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
function X(e, t, n, i, s, o) {
  if (s) {
    const r = rt(t, n, i, o);
    e.p(r, s);
  }
}
function Y(e) {
  if (e.ctx.length > 32) {
    const t = [], n = e.ctx.length / 32;
    for (let i = 0; i < n; i++)
      t[i] = -1;
    return t;
  }
  return -1;
}
function F(e, t) {
  e.appendChild(t);
}
function lt(e, t, n) {
  e.insertBefore(t, n || null);
}
function $(e) {
  e.parentNode && e.parentNode.removeChild(e);
}
function j(e) {
  return document.createElement(e);
}
function mt(e) {
  return document.createTextNode(e);
}
function _t() {
  return mt(" ");
}
function L(e, t, n) {
  n == null ? e.removeAttribute(t) : e.getAttribute(t) !== n && e.setAttribute(t, n);
}
function yt(e) {
  return Array.from(e.childNodes);
}
function wt(e, t, { bubbles: n = !1, cancelable: i = !1 } = {}) {
  const s = document.createEvent("CustomEvent");
  return s.initCustomEvent(e, n, i, t), s;
}
let G;
function N(e) {
  G = e;
}
function U() {
  if (!G)
    throw new Error("Function called outside component initialization");
  return G;
}
function ct(e) {
  U().$$.on_mount.push(e);
}
function b(e) {
  U().$$.on_destroy.push(e);
}
function R() {
  const e = U();
  return (t, n, { cancelable: i = !1 } = {}) => {
    const s = e.$$.callbacks[t];
    if (s) {
      const o = wt(t, n, { cancelable: i });
      return s.slice().forEach((r) => {
        r.call(e, o);
      }), !o.defaultPrevented;
    }
    return !0;
  };
}
function ut(e, t) {
  return U().$$.context.set(e, t), t;
}
function y(e) {
  return U().$$.context.get(e);
}
const M = [], J = [];
let P = [];
const nt = [], bt = /* @__PURE__ */ Promise.resolve();
let q = !1;
function kt() {
  q || (q = !0, bt.then(at));
}
function H(e) {
  P.push(e);
}
const W = /* @__PURE__ */ new Set();
let I = 0;
function at() {
  if (I !== 0)
    return;
  const e = G;
  do {
    try {
      for (; I < M.length; ) {
        const t = M[I];
        I++, N(t), Ct(t.$$);
      }
    } catch (t) {
      throw M.length = 0, I = 0, t;
    }
    for (N(null), M.length = 0, I = 0; J.length; )
      J.pop()();
    for (let t = 0; t < P.length; t += 1) {
      const n = P[t];
      W.has(n) || (W.add(n), n());
    }
    P.length = 0;
  } while (M.length);
  for (; nt.length; )
    nt.pop()();
  q = !1, W.clear(), N(e);
}
function Ct(e) {
  if (e.fragment !== null) {
    e.update(), D(e.before_update);
    const t = e.dirty;
    e.dirty = [-1], e.fragment && e.fragment.p(e.ctx, t), e.after_update.forEach(H);
  }
}
function Et(e) {
  const t = [], n = [];
  P.forEach((i) => e.indexOf(i) === -1 ? t.push(i) : n.push(i)), n.forEach((i) => i()), P = t;
}
const z = /* @__PURE__ */ new Set();
let v;
function Lt() {
  v = {
    r: 0,
    c: [],
    p: v
    // parent group
  };
}
function St() {
  v.r || D(v.c), v = v.p;
}
function O(e, t) {
  e && e.i && (z.delete(e), e.i(t));
}
function x(e, t, n, i) {
  if (e && e.o) {
    if (z.has(e))
      return;
    z.add(e), v.c.push(() => {
      z.delete(e), i && (n && e.d(1), i());
    }), e.o(t);
  } else
    i && i();
}
function vt(e, t, n, i) {
  const { fragment: s, after_update: o } = e.$$;
  s && s.m(t, n), i || H(() => {
    const r = e.$$.on_mount.map(st).filter(ot);
    e.$$.on_destroy ? e.$$.on_destroy.push(...r) : D(r), e.$$.on_mount = [];
  }), o.forEach(H);
}
function Ot(e, t) {
  const n = e.$$;
  n.fragment !== null && (Et(n.after_update), D(n.on_destroy), n.fragment && n.fragment.d(t), n.on_destroy = n.fragment = null, n.ctx = []);
}
function It(e, t) {
  e.$$.dirty[0] === -1 && (M.push(e), kt(), e.$$.dirty.fill(0)), e.$$.dirty[t / 31 | 0] |= 1 << t % 31;
}
function k(e, t, n, i, s, o, r, l = [-1]) {
  const u = G;
  N(e);
  const a = e.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: o,
    update: Z,
    not_equal: s,
    bound: et(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(t.context || (u ? u.$$.context : [])),
    // everything else
    callbacks: et(),
    dirty: l,
    skip_bound: !1,
    root: t.target || u.$$.root
  };
  r && r(a.root);
  let f = !1;
  if (a.ctx = n ? n(e, t.props || {}, (c, d, ...h) => {
    const g = h.length ? h[0] : d;
    return a.ctx && s(a.ctx[c], a.ctx[c] = g) && (!a.skip_bound && a.bound[c] && a.bound[c](g), f && It(e, c)), d;
  }) : [], a.update(), f = !0, D(a.before_update), a.fragment = i ? i(a.ctx) : !1, t.target) {
    if (t.hydrate) {
      const c = yt(t.target);
      a.fragment && a.fragment.l(c), c.forEach($);
    } else
      a.fragment && a.fragment.c();
    t.intro && O(e.$$.fragment), vt(e, t.target, t.anchor, t.customElement), at();
  }
  N(u);
}
class C {
  $destroy() {
    Ot(this, 1), this.$destroy = Z;
  }
  $on(t, n) {
    if (!ot(n))
      return Z;
    const i = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
    return i.push(n), () => {
      const s = i.indexOf(n);
      s !== -1 && i.splice(s, 1);
    };
  }
  $set(t) {
    this.$$set && !pt(t) && (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1);
  }
}
function it(e) {
  let t;
  const n = (
    /*#slots*/
    e[12].default
  ), i = Q(
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
      2048) && X(
        i,
        n,
        s,
        /*$$scope*/
        s[11],
        t ? V(
          n,
          /*$$scope*/
          s[11],
          o,
          null
        ) : Y(
          /*$$scope*/
          s[11]
        ),
        null
      );
    },
    i(s) {
      t || (O(i, s), t = !0);
    },
    o(s) {
      x(i, s), t = !1;
    },
    d(s) {
      i && i.d(s);
    }
  };
}
function Mt(e) {
  let t, n, i, s, o = (
    /*mounted*/
    e[0] && it(e)
  );
  return {
    c() {
      t = j("div"), n = j("div"), i = _t(), o && o.c(), L(
        n,
        "style",
        /*containerStyle*/
        e[2]
      ), L(n, "class", "s-google-map__container svelte-hsj0b5"), L(
        t,
        "style",
        /*wrapperStyle*/
        e[3]
      ), L(t, "class", "s-google-map__wrapper");
    },
    m(r, l) {
      lt(r, t, l), F(t, n), e[13](n), F(t, i), o && o.m(t, null), s = !0;
    },
    p(r, [l]) {
      (!s || l & /*containerStyle*/
      4) && L(
        n,
        "style",
        /*containerStyle*/
        r[2]
      ), /*mounted*/
      r[0] ? o ? (o.p(r, l), l & /*mounted*/
      1 && O(o, 1)) : (o = it(r), o.c(), O(o, 1), o.m(t, null)) : o && (Lt(), x(o, 1, 1, () => {
        o = null;
      }), St()), (!s || l & /*wrapperStyle*/
      8) && L(
        t,
        "style",
        /*wrapperStyle*/
        r[3]
      );
    },
    i(r) {
      s || (O(o), s = !0);
    },
    o(r) {
      x(o), s = !1;
    },
    d(r) {
      r && $(t), e[13](null), o && o.d();
    }
  };
}
function At(e, t, n) {
  let i, s, { $$slots: o = {}, $$scope: r } = t, { width: l } = t, { height: u } = t, { borderRadius: a = "0" } = t, { zoom: f = null } = t, { options: c } = t, { center: d = null } = t;
  ut("map", { getMap: () => g });
  let h = !1, g = null, E = null;
  const B = R();
  let m = null, K = null, T = null;
  ct(() => {
    !E || !_ || (n(10, g = new _.maps.Map(E)), m = g.addListener("click", (p) => {
      B("click", p);
    }), K = g.addListener("dragend", () => {
      n(5, d = g.getCenter().toJSON());
    }), T = g.addListener("zoom_changed", () => {
      n(4, f = g.getZoom());
    }), n(0, h = !0));
  }), b(() => {
    n(10, g = null), m && m.remove(), K && K.remove(), T && T.remove();
  });
  function ft(p) {
    J[p ? "unshift" : "push"](() => {
      E = p, n(1, E);
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
    E,
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
    ft
  ];
}
class Jt extends C {
  constructor(t) {
    super(), k(this, t, At, Mt, w, {
      width: 6,
      height: 7,
      borderRadius: 8,
      zoom: 4,
      options: 9,
      center: 5
    });
  }
}
function Pt(e, t, n) {
  let { radius: i = null } = t, { center: s = null } = t, { options: o = null } = t;
  const { getMap: r } = y("map"), l = r(), u = R(), a = new _.maps.Circle({ map: l }), f = a.addListener("radius_changed", () => {
    n(0, i = a.getRadius());
  }), c = a.addListener("center_changed", () => {
    n(1, s = a.getCenter().toJSON());
  }), d = a.addListener("click", (h) => {
    u("click", h);
  });
  return b(() => {
    a.setMap(null), d.remove(), c.remove(), f.remove();
  }), e.$$set = (h) => {
    "radius" in h && n(0, i = h.radius), "center" in h && n(1, s = h.center), "options" in h && n(2, o = h.options);
  }, e.$$.update = () => {
    e.$$.dirty & /*radius, center, options*/
    7 && (i && a.setRadius(i), s && a.setCenter(s), o && a.setOptions(o));
  }, [i, s, o];
}
class Bt extends C {
  constructor(t) {
    super(), k(this, t, Pt, null, w, { radius: 0, center: 1, options: 2 });
  }
}
function Rt(e) {
  let t;
  const n = (
    /*#slots*/
    e[3].default
  ), i = Q(
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
      4) && X(
        i,
        n,
        s,
        /*$$scope*/
        s[2],
        t ? V(
          n,
          /*$$scope*/
          s[2],
          o,
          null
        ) : Y(
          /*$$scope*/
          s[2]
        ),
        null
      );
    },
    i(s) {
      t || (O(i, s), t = !0);
    },
    o(s) {
      x(i, s), t = !1;
    },
    d(s) {
      i && i.d(s);
    }
  };
}
function jt(e, t, n) {
  let { $$slots: i = {}, $$scope: s } = t, { options: o = null } = t, { position: r = null } = t;
  const { getMap: l } = y("map");
  ut("marker", { getMarker: () => f });
  const u = l(), a = R(), f = new _.maps.Marker({ map: u }), c = f.addListener("mouseup", () => {
    n(0, r = f.getPosition().toJSON());
  }), d = f.addListener("click", (h) => {
    a("click", h);
  });
  return b(() => {
    f.setMap(null), d.remove(), c.remove();
  }), e.$$set = (h) => {
    "options" in h && n(1, o = h.options), "position" in h && n(0, r = h.position), "$$scope" in h && n(2, s = h.$$scope);
  }, e.$$.update = () => {
    e.$$.dirty & /*options, position*/
    3 && (o && f.setOptions(o), r && f.setPosition(r));
  }, [r, o, s, i];
}
class Kt extends C {
  constructor(t) {
    super(), k(this, t, jt, Rt, w, { options: 1, position: 0 });
  }
}
function Nt(e, t, n) {
  let { options: i = null } = t;
  const { getMap: s } = y("map"), o = s(), r = new _.maps.visualization.HeatmapLayer({ map: o });
  return b(() => {
    r.setMap(null);
  }), e.$$set = (l) => {
    "options" in l && n(0, i = l.options);
  }, e.$$.update = () => {
    e.$$.dirty & /*options*/
    1 && i && r.setOptions(i);
  }, [i];
}
class Tt extends C {
  constructor(t) {
    super(), k(this, t, Nt, null, w, { options: 0 });
  }
}
function Gt(e, t, n) {
  let { path: i = null } = t, { options: s = null } = t;
  const { getMap: o } = y("map"), r = o(), l = R(), u = new _.maps.Polygon({ map: r }), a = u.addListener("mouseup", () => {
    n(0, i = u.getPath().getArray().map((c) => c.toJSON()));
  }), f = u.addListener("click", (c) => {
    l("click", c);
  });
  return b(() => {
    u.setMap(null), f.remove(), a.remove();
  }), e.$$set = (c) => {
    "path" in c && n(0, i = c.path), "options" in c && n(1, s = c.options);
  }, e.$$.update = () => {
    e.$$.dirty & /*path, options*/
    3 && (i && u.setPath(i), s && u.setOptions(s));
  }, [i, s];
}
class Wt extends C {
  constructor(t) {
    super(), k(this, t, Gt, null, w, { path: 0, options: 1 });
  }
}
function xt(e, t, n) {
  let { path: i = null } = t, { options: s = null } = t;
  const { getMap: o } = y("map"), r = o(), l = R(), u = new _.maps.Polyline({ map: r }), a = u.addListener("mouseup", () => {
    n(0, i = u.getPath().getArray().map((c) => c.toJSON()));
  }), f = u.addListener("click", (c) => {
    l("click", c);
  });
  return b(() => {
    u.setMap(null), f.remove(), a.remove();
  }), e.$$set = (c) => {
    "path" in c && n(0, i = c.path), "options" in c && n(1, s = c.options);
  }, e.$$.update = () => {
    e.$$.dirty & /*path, options*/
    3 && (i && u.setPath(i), s && u.setOptions(s));
  }, [i, s];
}
class Zt extends C {
  constructor(t) {
    super(), k(this, t, xt, null, w, { path: 0, options: 1 });
  }
}
function Dt(e, t, n) {
  let { options: i = null } = t, { bounds: s = null } = t;
  const { getMap: o } = y("map"), r = o(), l = R(), u = new _.maps.Rectangle({ map: r }), a = u.addListener("bounds_changed", () => {
    n(0, s = u.getBounds().toJSON());
  }), f = u.addListener("click", (c) => {
    l("click", c);
  });
  return b(() => {
    u.setMap(null), f.remove(), a.remove();
  }), e.$$set = (c) => {
    "options" in c && n(1, i = c.options), "bounds" in c && n(0, s = c.bounds);
  }, e.$$.update = () => {
    e.$$.dirty & /*bounds, options*/
    3 && (s && u.setBounds(s), i && u.setOptions(i));
  }, [s, i];
}
class qt extends C {
  constructor(t) {
    super(), k(this, t, Dt, null, w, { options: 1, bounds: 0 });
  }
}
function Ut(e) {
  let t, n, i, s;
  const o = (
    /*#slots*/
    e[4].default
  ), r = Q(
    o,
    e,
    /*$$scope*/
    e[3],
    null
  );
  return {
    c() {
      t = j("template"), n = j("div"), i = j("div"), r && r.c(), L(n, "class", "s-google-info-window__container svelte-51y2q4");
    },
    m(l, u) {
      lt(l, t, u), F(t.content, n), F(n, i), r && r.m(i, null), e[5](i), s = !0;
    },
    p(l, [u]) {
      r && r.p && (!s || u & /*$$scope*/
      8) && X(
        r,
        o,
        l,
        /*$$scope*/
        l[3],
        s ? V(
          o,
          /*$$scope*/
          l[3],
          u,
          null
        ) : Y(
          /*$$scope*/
          l[3]
        ),
        null
      );
    },
    i(l) {
      s || (O(r, l), s = !0);
    },
    o(l) {
      x(r, l), s = !1;
    },
    d(l) {
      l && $(t), r && r.d(l), e[5](null);
    }
  };
}
function zt(e, t, n) {
  let { $$slots: i = {}, $$scope: s } = t, { show: o = !1 } = t, { options: r = null } = t;
  const { getMap: l } = y("map"), u = y("marker"), a = l(), f = (u == null ? void 0 : u.getMarker()) ?? null;
  let c = null;
  const d = new _.maps.InfoWindow();
  ct(() => {
    d.setContent(c);
  });
  let h = null;
  f && (h = f.addListener("click", () => n(1, o = !o)));
  const g = d.addListener("closeclick", () => n(1, o = !1));
  function E(m) {
    m ? d.open({ map: a, anchor: f }) : d.close();
  }
  b(() => {
    d.close(), g.remove(), h == null || h.remove();
  });
  function B(m) {
    J[m ? "unshift" : "push"](() => {
      c = m, n(0, c);
    });
  }
  return e.$$set = (m) => {
    "show" in m && n(1, o = m.show), "options" in m && n(2, r = m.options), "$$scope" in m && n(3, s = m.$$scope);
  }, e.$$.update = () => {
    e.$$.dirty & /*options*/
    4 && r && d.setOptions(r), e.$$.dirty & /*show*/
    2 && E(o);
  }, [c, o, r, s, i, B];
}
class Ht extends C {
  constructor(t) {
    super(), k(this, t, zt, Ut, w, { show: 1, options: 2 });
  }
}
export {
  Bt as SGoogleCircle,
  Tt as SGoogleHeatmap,
  Ht as SGoogleInfoWindow,
  Jt as SGoogleMap,
  Kt as SGoogleMarker,
  Wt as SGooglePolygon,
  Zt as SGooglePolyline,
  qt as SGoogleRectangle,
  Ft as gmapLoader
};
