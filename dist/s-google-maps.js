import { S as k, i as w, s as b, e as E, a as H, b as C, c as K, d as P, t as M, f as A, g as Q, h as B, j as T, k as v, o as q, l as L, m as N, u as D, n as U, p as J, q as V, r as W, v as _ } from "./svelte.js";
var X = function s(t, e) {
  if (t === e)
    return !0;
  if (t && e && typeof t == "object" && typeof e == "object") {
    if (t.constructor !== e.constructor)
      return !1;
    var n, i, o;
    if (Array.isArray(t)) {
      if (n = t.length, n != e.length)
        return !1;
      for (i = n; i-- !== 0; )
        if (!s(t[i], e[i]))
          return !1;
      return !0;
    }
    if (t.constructor === RegExp)
      return t.source === e.source && t.flags === e.flags;
    if (t.valueOf !== Object.prototype.valueOf)
      return t.valueOf() === e.valueOf();
    if (t.toString !== Object.prototype.toString)
      return t.toString() === e.toString();
    if (o = Object.keys(t), n = o.length, n !== Object.keys(e).length)
      return !1;
    for (i = n; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(e, o[i]))
        return !1;
    for (i = n; i-- !== 0; ) {
      var l = o[i];
      if (!s(t[l], e[l]))
        return !1;
    }
    return !0;
  }
  return t !== t && e !== e;
};
const z = "__googleMapsScriptId";
var O;
(function(s) {
  s[s.INITIALIZED = 0] = "INITIALIZED", s[s.LOADING = 1] = "LOADING", s[s.SUCCESS = 2] = "SUCCESS", s[s.FAILURE = 3] = "FAILURE";
})(O || (O = {}));
class I {
  /**
   * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set
   * using this library, instead the defaults are set by the Google Maps
   * JavaScript API server.
   *
   * ```
   * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});
   * ```
   */
  constructor({ apiKey: t, authReferrerPolicy: e, channel: n, client: i, id: o = z, language: l, libraries: r = [], mapIds: a, nonce: f, region: u, retries: c = 3, url: g = "https://maps.googleapis.com/maps/api/js", version: h }) {
    if (this.CALLBACK = "__googleMapsCallback", this.callbacks = [], this.done = !1, this.loading = !1, this.errors = [], this.apiKey = t, this.authReferrerPolicy = e, this.channel = n, this.client = i, this.id = o || z, this.language = l, this.libraries = r, this.mapIds = a, this.nonce = f, this.region = u, this.retries = c, this.url = g, this.version = h, I.instance) {
      if (!X(this.options, I.instance.options))
        throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(I.instance.options)}`);
      return I.instance;
    }
    I.instance = this;
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
    return this.errors.length ? O.FAILURE : this.done ? O.SUCCESS : this.loading ? O.LOADING : O.INITIALIZED;
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
    return new Promise((t, e) => {
      this.loadCallback((n) => {
        n ? e(n.error) : t(window.google);
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
    const t = this.createUrl(), e = document.createElement("script");
    e.id = this.id, e.type = "text/javascript", e.src = t, e.onerror = this.loadErrorCallback.bind(this), e.defer = !0, e.async = !0, this.nonce && (e.nonce = this.nonce), document.head.appendChild(e);
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
      const e = this.errors.length * Math.pow(2, this.errors.length);
      console.log(`Failed to load Google Maps script, retrying in ${e} ms.`), setTimeout(() => {
        this.deleteScript(), this.setScript();
      }, e);
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
let y = null;
async function Y(s, t = []) {
  if (y)
    return;
  y = await new I({
    apiKey: s,
    libraries: t
  }).load();
}
const ut = {
  load: Y,
  gmapApi: y
};
function F(s) {
  let t;
  const e = (
    /*#slots*/
    s[12].default
  ), n = N(
    e,
    s,
    /*$$scope*/
    s[11],
    null
  );
  return {
    c() {
      n && n.c();
    },
    m(i, o) {
      n && n.m(i, o), t = !0;
    },
    p(i, o) {
      n && n.p && (!t || o & /*$$scope*/
      2048) && D(
        n,
        e,
        i,
        /*$$scope*/
        i[11],
        t ? J(
          e,
          /*$$scope*/
          i[11],
          o,
          null
        ) : U(
          /*$$scope*/
          i[11]
        ),
        null
      );
    },
    i(i) {
      t || (M(n, i), t = !0);
    },
    o(i) {
      A(n, i), t = !1;
    },
    d(i) {
      n && n.d(i);
    }
  };
}
function x(s) {
  let t, e, n, i, o = (
    /*mounted*/
    s[0] && F(s)
  );
  return {
    c() {
      t = E("div"), e = E("div"), n = H(), o && o.c(), C(
        e,
        "style",
        /*containerStyle*/
        s[2]
      ), C(e, "class", "s-google-map__container svelte-hsj0b5"), C(
        t,
        "style",
        /*wrapperStyle*/
        s[3]
      ), C(t, "class", "s-google-map__wrapper");
    },
    m(l, r) {
      K(l, t, r), P(t, e), s[13](e), P(t, n), o && o.m(t, null), i = !0;
    },
    p(l, [r]) {
      (!i || r & /*containerStyle*/
      4) && C(
        e,
        "style",
        /*containerStyle*/
        l[2]
      ), /*mounted*/
      l[0] ? o ? (o.p(l, r), r & /*mounted*/
      1 && M(o, 1)) : (o = F(l), o.c(), M(o, 1), o.m(t, null)) : o && (V(), A(o, 1, 1, () => {
        o = null;
      }), Q()), (!i || r & /*wrapperStyle*/
      8) && C(
        t,
        "style",
        /*wrapperStyle*/
        l[3]
      );
    },
    i(l) {
      i || (M(o), i = !0);
    },
    o(l) {
      A(o), i = !1;
    },
    d(l) {
      l && B(t), s[13](null), o && o.d();
    }
  };
}
function $(s, t, e) {
  let n, i, { $$slots: o = {}, $$scope: l } = t, { width: r } = t, { height: a } = t, { borderRadius: f = "0" } = t, { zoom: u = null } = t, { options: c } = t, { center: g = null } = t;
  T("map", { getMap: () => p });
  let h = !1, p = null, S = null;
  const R = v();
  let m = null, G = null, j = null;
  q(() => {
    !S || !y || (e(10, p = new y.maps.Map(S)), m = p.addListener("click", (d) => {
      R("click", d);
    }), G = p.addListener("dragend", () => {
      e(5, g = p.getCenter().toJSON());
    }), j = p.addListener("zoom_changed", () => {
      e(4, u = p.getZoom());
    }), e(0, h = !0));
  }), L(() => {
    e(10, p = null), m && m.remove(), G && G.remove(), j && j.remove();
  });
  function Z(d) {
    W[d ? "unshift" : "push"](() => {
      S = d, e(1, S);
    });
  }
  return s.$$set = (d) => {
    "width" in d && e(6, r = d.width), "height" in d && e(7, a = d.height), "borderRadius" in d && e(8, f = d.borderRadius), "zoom" in d && e(4, u = d.zoom), "options" in d && e(9, c = d.options), "center" in d && e(5, g = d.center), "$$scope" in d && e(11, l = d.$$scope);
  }, s.$$.update = () => {
    s.$$.dirty & /*width, height*/
    192 && e(3, n = `width: ${r}; height: ${a}`), s.$$.dirty & /*width, height, borderRadius*/
    448 && e(2, i = `width: ${r}; height: ${a}; border-radius: ${f}`), s.$$.dirty & /*map, options, zoom, center*/
    1584 && (p && p.setOptions(c), p && u && p.setZoom(u), p && g && p.setCenter(g));
  }, [
    h,
    S,
    i,
    n,
    u,
    g,
    r,
    a,
    f,
    c,
    p,
    l,
    o,
    Z
  ];
}
class ht extends k {
  constructor(t) {
    super(), w(this, t, $, x, b, {
      width: 6,
      height: 7,
      borderRadius: 8,
      zoom: 4,
      options: 9,
      center: 5
    });
  }
}
function tt(s, t, e) {
  let { radius: n = null } = t, { center: i = null } = t, { options: o = null } = t;
  const { getMap: l } = _("map"), r = l(), a = v(), f = new y.maps.Circle({ map: r }), u = f.addListener("radius_changed", () => {
    e(0, n = f.getRadius());
  }), c = f.addListener("center_changed", () => {
    e(1, i = f.getCenter().toJSON());
  }), g = f.addListener("click", (h) => {
    a("click", h);
  });
  return L(() => {
    f.setMap(null), g.remove(), c.remove(), u.remove();
  }), s.$$set = (h) => {
    "radius" in h && e(0, n = h.radius), "center" in h && e(1, i = h.center), "options" in h && e(2, o = h.options);
  }, s.$$.update = () => {
    s.$$.dirty & /*radius, center, options*/
    7 && (n && f.setRadius(n), i && f.setCenter(i), o && f.setOptions(o));
  }, [n, i, o];
}
class ft extends k {
  constructor(t) {
    super(), w(this, t, tt, null, b, { radius: 0, center: 1, options: 2 });
  }
}
function et(s) {
  let t;
  const e = (
    /*#slots*/
    s[3].default
  ), n = N(
    e,
    s,
    /*$$scope*/
    s[2],
    null
  );
  return {
    c() {
      n && n.c();
    },
    m(i, o) {
      n && n.m(i, o), t = !0;
    },
    p(i, [o]) {
      n && n.p && (!t || o & /*$$scope*/
      4) && D(
        n,
        e,
        i,
        /*$$scope*/
        i[2],
        t ? J(
          e,
          /*$$scope*/
          i[2],
          o,
          null
        ) : U(
          /*$$scope*/
          i[2]
        ),
        null
      );
    },
    i(i) {
      t || (M(n, i), t = !0);
    },
    o(i) {
      A(n, i), t = !1;
    },
    d(i) {
      n && n.d(i);
    }
  };
}
function it(s, t, e) {
  let { $$slots: n = {}, $$scope: i } = t, { options: o = null } = t, { position: l = null } = t;
  const { getMap: r } = _("map");
  T("marker", { getMarker: () => u });
  const a = r(), f = v(), u = new y.maps.Marker({ map: a }), c = u.addListener("mouseup", () => {
    e(0, l = u.getPosition().toJSON());
  }), g = u.addListener("click", (h) => {
    f("click", h);
  });
  return L(() => {
    u.setMap(null), g.remove(), c.remove();
  }), s.$$set = (h) => {
    "options" in h && e(1, o = h.options), "position" in h && e(0, l = h.position), "$$scope" in h && e(2, i = h.$$scope);
  }, s.$$.update = () => {
    s.$$.dirty & /*options, position*/
    3 && (o && u.setOptions(o), l && u.setPosition(l));
  }, [l, o, i, n];
}
class dt extends k {
  constructor(t) {
    super(), w(this, t, it, et, b, { options: 1, position: 0 });
  }
}
function nt(s, t, e) {
  let { options: n = null } = t;
  const { getMap: i } = _("map"), o = i(), l = new y.maps.visualization.HeatmapLayer({ map: o });
  return L(() => {
    l.setMap(null);
  }), s.$$set = (r) => {
    "options" in r && e(0, n = r.options);
  }, s.$$.update = () => {
    s.$$.dirty & /*options*/
    1 && n && l.setOptions(n);
  }, [n];
}
class gt extends k {
  constructor(t) {
    super(), w(this, t, nt, null, b, { options: 0 });
  }
}
function st(s, t, e) {
  let { path: n = null } = t, { options: i = null } = t;
  const { getMap: o } = _("map"), l = o(), r = v(), a = new y.maps.Polygon({ map: l }), f = a.addListener("mouseup", () => {
    e(0, n = a.getPath().getArray().map((c) => c.toJSON()));
  }), u = a.addListener("click", (c) => {
    r("click", c);
  });
  return L(() => {
    a.setMap(null), u.remove(), f.remove();
  }), s.$$set = (c) => {
    "path" in c && e(0, n = c.path), "options" in c && e(1, i = c.options);
  }, s.$$.update = () => {
    s.$$.dirty & /*path, options*/
    3 && (n && a.setPath(n), i && a.setOptions(i));
  }, [n, i];
}
class pt extends k {
  constructor(t) {
    super(), w(this, t, st, null, b, { path: 0, options: 1 });
  }
}
function ot(s, t, e) {
  let { path: n = null } = t, { options: i = null } = t;
  const { getMap: o } = _("map"), l = o(), r = v(), a = new y.maps.Polyline({ map: l }), f = a.addListener("mouseup", () => {
    e(0, n = a.getPath().getArray().map((c) => c.toJSON()));
  }), u = a.addListener("click", (c) => {
    r("click", c);
  });
  return L(() => {
    a.setMap(null), u.remove(), f.remove();
  }), s.$$set = (c) => {
    "path" in c && e(0, n = c.path), "options" in c && e(1, i = c.options);
  }, s.$$.update = () => {
    s.$$.dirty & /*path, options*/
    3 && (n && a.setPath(n), i && a.setOptions(i));
  }, [n, i];
}
class mt extends k {
  constructor(t) {
    super(), w(this, t, ot, null, b, { path: 0, options: 1 });
  }
}
function lt(s, t, e) {
  let { options: n = null } = t, { bounds: i = null } = t;
  const { getMap: o } = _("map"), l = o(), r = v(), a = new y.maps.Rectangle({ map: l }), f = a.addListener("bounds_changed", () => {
    e(0, i = a.getBounds().toJSON());
  }), u = a.addListener("click", (c) => {
    r("click", c);
  });
  return L(() => {
    a.setMap(null), u.remove(), f.remove();
  }), s.$$set = (c) => {
    "options" in c && e(1, n = c.options), "bounds" in c && e(0, i = c.bounds);
  }, s.$$.update = () => {
    s.$$.dirty & /*bounds, options*/
    3 && (i && a.setBounds(i), n && a.setOptions(n));
  }, [i, n];
}
class yt extends k {
  constructor(t) {
    super(), w(this, t, lt, null, b, { options: 1, bounds: 0 });
  }
}
function rt(s) {
  let t, e, n, i;
  const o = (
    /*#slots*/
    s[4].default
  ), l = N(
    o,
    s,
    /*$$scope*/
    s[3],
    null
  );
  return {
    c() {
      t = E("template"), e = E("div"), n = E("div"), l && l.c(), C(e, "class", "s-google-info-window__container svelte-51y2q4");
    },
    m(r, a) {
      K(r, t, a), P(t.content, e), P(e, n), l && l.m(n, null), s[5](n), i = !0;
    },
    p(r, [a]) {
      l && l.p && (!i || a & /*$$scope*/
      8) && D(
        l,
        o,
        r,
        /*$$scope*/
        r[3],
        i ? J(
          o,
          /*$$scope*/
          r[3],
          a,
          null
        ) : U(
          /*$$scope*/
          r[3]
        ),
        null
      );
    },
    i(r) {
      i || (M(l, r), i = !0);
    },
    o(r) {
      A(l, r), i = !1;
    },
    d(r) {
      r && B(t), l && l.d(r), s[5](null);
    }
  };
}
function at(s, t, e) {
  let { $$slots: n = {}, $$scope: i } = t, { show: o = !1 } = t, { options: l = null } = t;
  const { getMap: r } = _("map"), a = _("marker"), f = r(), u = (a == null ? void 0 : a.getMarker()) ?? null;
  let c = null;
  const g = new y.maps.InfoWindow();
  q(() => {
    g.setContent(c);
  });
  let h = null;
  u && (h = u.addListener("click", () => e(1, o = !o)));
  const p = g.addListener("closeclick", () => e(1, o = !1));
  function S(m) {
    m ? g.open({ map: f, anchor: u }) : g.close();
  }
  L(() => {
    g.close(), p.remove(), h == null || h.remove();
  });
  function R(m) {
    W[m ? "unshift" : "push"](() => {
      c = m, e(0, c);
    });
  }
  return s.$$set = (m) => {
    "show" in m && e(1, o = m.show), "options" in m && e(2, l = m.options), "$$scope" in m && e(3, i = m.$$scope);
  }, s.$$.update = () => {
    s.$$.dirty & /*options*/
    4 && l && g.setOptions(l), s.$$.dirty & /*show*/
    2 && S(o);
  }, [c, o, l, i, n, R];
}
class _t extends k {
  constructor(t) {
    super(), w(this, t, at, rt, b, { show: 1, options: 2 });
  }
}
export {
  ft as SGoogleCircle,
  gt as SGoogleHeatmap,
  _t as SGoogleInfoWindow,
  ht as SGoogleMap,
  dt as SGoogleMarker,
  pt as SGooglePolygon,
  mt as SGooglePolyline,
  yt as SGoogleRectangle,
  ut as gmapLoader
};
