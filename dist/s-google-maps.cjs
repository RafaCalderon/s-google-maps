"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});var dt=function e(t,n){if(t===n)return!0;if(t&&n&&typeof t=="object"&&typeof n=="object"){if(t.constructor!==n.constructor)return!1;var i,o,s;if(Array.isArray(t)){if(i=t.length,i!=n.length)return!1;for(o=i;o--!==0;)if(!e(t[o],n[o]))return!1;return!0}if(t.constructor===RegExp)return t.source===n.source&&t.flags===n.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===n.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===n.toString();if(s=Object.keys(t),i=s.length,i!==Object.keys(n).length)return!1;for(o=i;o--!==0;)if(!Object.prototype.hasOwnProperty.call(n,s[o]))return!1;for(o=i;o--!==0;){var r=s[o];if(!e(t[r],n[r]))return!1}return!0}return t!==t&&n!==n};const tt="__googleMapsScriptId";var P;(function(e){e[e.INITIALIZED=0]="INITIALIZED",e[e.LOADING=1]="LOADING",e[e.SUCCESS=2]="SUCCESS",e[e.FAILURE=3]="FAILURE"})(P||(P={}));class E{constructor({apiKey:t,authReferrerPolicy:n,channel:i,client:o,id:s=tt,language:r,libraries:l=[],mapIds:u,nonce:a,region:f,retries:c=3,url:h="https://maps.googleapis.com/maps/api/js",version:d}){if(this.CALLBACK="__googleMapsCallback",this.callbacks=[],this.done=!1,this.loading=!1,this.errors=[],this.apiKey=t,this.authReferrerPolicy=n,this.channel=i,this.client=o,this.id=s||tt,this.language=r,this.libraries=l,this.mapIds=u,this.nonce=a,this.region=f,this.retries=c,this.url=h,this.version=d,E.instance){if(!dt(this.options,E.instance.options))throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(E.instance.options)}`);return E.instance}E.instance=this}get options(){return{version:this.version,apiKey:this.apiKey,channel:this.channel,client:this.client,id:this.id,libraries:this.libraries,language:this.language,region:this.region,mapIds:this.mapIds,nonce:this.nonce,url:this.url,authReferrerPolicy:this.authReferrerPolicy}}get status(){return this.errors.length?P.FAILURE:this.done?P.SUCCESS:this.loading?P.LOADING:P.INITIALIZED}get failed(){return this.done&&!this.loading&&this.errors.length>=this.retries+1}createUrl(){let t=this.url;return t+=`?callback=${this.CALLBACK}`,this.apiKey&&(t+=`&key=${this.apiKey}`),this.channel&&(t+=`&channel=${this.channel}`),this.client&&(t+=`&client=${this.client}`),this.libraries.length>0&&(t+=`&libraries=${this.libraries.join(",")}`),this.language&&(t+=`&language=${this.language}`),this.region&&(t+=`&region=${this.region}`),this.version&&(t+=`&v=${this.version}`),this.mapIds&&(t+=`&map_ids=${this.mapIds.join(",")}`),this.authReferrerPolicy&&(t+=`&auth_referrer_policy=${this.authReferrerPolicy}`),t}deleteScript(){const t=document.getElementById(this.id);t&&t.remove()}load(){return this.loadPromise()}loadPromise(){return new Promise((t,n)=>{this.loadCallback(i=>{i?n(i.error):t(window.google)})})}loadCallback(t){this.callbacks.push(t),this.execute()}setScript(){if(document.getElementById(this.id)){this.callback();return}const t=this.createUrl(),n=document.createElement("script");n.id=this.id,n.type="text/javascript",n.src=t,n.onerror=this.loadErrorCallback.bind(this),n.defer=!0,n.async=!0,this.nonce&&(n.nonce=this.nonce),document.head.appendChild(n)}reset(){this.deleteScript(),this.done=!1,this.loading=!1,this.errors=[],this.onerrorEvent=null}resetIfRetryingFailed(){this.failed&&this.reset()}loadErrorCallback(t){if(this.errors.push(t),this.errors.length<=this.retries){const n=this.errors.length*Math.pow(2,this.errors.length);console.log(`Failed to load Google Maps script, retrying in ${n} ms.`),setTimeout(()=>{this.deleteScript(),this.setScript()},n)}else this.onerrorEvent=t,this.callback()}setCallback(){window.__googleMapsCallback=this.callback.bind(this)}callback(){this.done=!0,this.loading=!1,this.callbacks.forEach(t=>{t(this.onerrorEvent)}),this.callbacks=[]}execute(){if(this.resetIfRetryingFailed(),this.done)this.callback();else{if(window.google&&window.google.maps&&window.google.maps.version){console.warn("Google Maps already loaded outside @googlemaps/js-api-loader.This may result in undesirable behavior as options and script parameters may not match."),this.callback();return}this.loading||(this.loading=!0,this.setCallback(),this.setScript())}}}let _=null;async function ht(e,t=[]){if(_)return;_=await new E({apiKey:e,libraries:t}).load()}const gt={load:ht,gmapApi:_};function Z(){}function pt(e,t){for(const n in t)e[n]=t[n];return e}function ot(e){return e()}function et(){return Object.create(null)}function D(e){e.forEach(ot)}function st(e){return typeof e=="function"}function w(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function mt(e){return Object.keys(e).length===0}function Q(e,t,n,i){if(e){const o=rt(e,t,n,i);return e[0](o)}}function rt(e,t,n,i){return e[1]&&i?pt(n.ctx.slice(),e[1](i(t))):n.ctx}function V(e,t,n,i){if(e[2]&&i){const o=e[2](i(n));if(t.dirty===void 0)return o;if(typeof o=="object"){const s=[],r=Math.max(t.dirty.length,o.length);for(let l=0;l<r;l+=1)s[l]=t.dirty[l]|o[l];return s}return t.dirty|o}return t.dirty}function X(e,t,n,i,o,s){if(o){const r=rt(t,n,i,s);e.p(r,o)}}function Y(e){if(e.ctx.length>32){const t=[],n=e.ctx.length/32;for(let i=0;i<n;i++)t[i]=-1;return t}return-1}function F(e,t){e.appendChild(t)}function lt(e,t,n){e.insertBefore(t,n||null)}function $(e){e.parentNode&&e.parentNode.removeChild(e)}function R(e){return document.createElement(e)}function _t(e){return document.createTextNode(e)}function yt(){return _t(" ")}function L(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function wt(e){return Array.from(e.childNodes)}function bt(e,t,{bubbles:n=!1,cancelable:i=!1}={}){const o=document.createEvent("CustomEvent");return o.initCustomEvent(e,n,i,t),o}let N;function j(e){N=e}function U(){if(!N)throw new Error("Function called outside component initialization");return N}function ct(e){U().$$.on_mount.push(e)}function b(e){U().$$.on_destroy.push(e)}function G(){const e=U();return(t,n,{cancelable:i=!1}={})=>{const o=e.$$.callbacks[t];if(o){const s=bt(t,n,{cancelable:i});return o.slice().forEach(r=>{r.call(e,s)}),!s.defaultPrevented}return!0}}function ut(e,t){return U().$$.context.set(e,t),t}function y(e){return U().$$.context.get(e)}const M=[],J=[];let A=[];const nt=[],kt=Promise.resolve();let q=!1;function St(){q||(q=!0,kt.then(at))}function H(e){A.push(e)}const W=new Set;let I=0;function at(){if(I!==0)return;const e=N;do{try{for(;I<M.length;){const t=M[I];I++,j(t),Ct(t.$$)}}catch(t){throw M.length=0,I=0,t}for(j(null),M.length=0,I=0;J.length;)J.pop()();for(let t=0;t<A.length;t+=1){const n=A[t];W.has(n)||(W.add(n),n())}A.length=0}while(M.length);for(;nt.length;)nt.pop()();q=!1,W.clear(),j(e)}function Ct(e){if(e.fragment!==null){e.update(),D(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(H)}}function Lt(e){const t=[],n=[];A.forEach(i=>e.indexOf(i)===-1?t.push(i):n.push(i)),n.forEach(i=>i()),A=t}const z=new Set;let v;function Et(){v={r:0,c:[],p:v}}function vt(){v.r||D(v.c),v=v.p}function O(e,t){e&&e.i&&(z.delete(e),e.i(t))}function x(e,t,n,i){if(e&&e.o){if(z.has(e))return;z.add(e),v.c.push(()=>{z.delete(e),i&&(n&&e.d(1),i())}),e.o(t)}else i&&i()}function Ot(e,t,n,i){const{fragment:o,after_update:s}=e.$$;o&&o.m(t,n),i||H(()=>{const r=e.$$.on_mount.map(ot).filter(st);e.$$.on_destroy?e.$$.on_destroy.push(...r):D(r),e.$$.on_mount=[]}),s.forEach(H)}function It(e,t){const n=e.$$;n.fragment!==null&&(Lt(n.after_update),D(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function Mt(e,t){e.$$.dirty[0]===-1&&(M.push(e),St(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function k(e,t,n,i,o,s,r,l=[-1]){const u=N;j(e);const a=e.$$={fragment:null,ctx:[],props:s,update:Z,not_equal:o,bound:et(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(u?u.$$.context:[])),callbacks:et(),dirty:l,skip_bound:!1,root:t.target||u.$$.root};r&&r(a.root);let f=!1;if(a.ctx=n?n(e,t.props||{},(c,h,...d)=>{const g=d.length?d[0]:h;return a.ctx&&o(a.ctx[c],a.ctx[c]=g)&&(!a.skip_bound&&a.bound[c]&&a.bound[c](g),f&&Mt(e,c)),h}):[],a.update(),f=!0,D(a.before_update),a.fragment=i?i(a.ctx):!1,t.target){if(t.hydrate){const c=wt(t.target);a.fragment&&a.fragment.l(c),c.forEach($)}else a.fragment&&a.fragment.c();t.intro&&O(e.$$.fragment),Ot(e,t.target,t.anchor,t.customElement),at()}j(u)}class S{$destroy(){It(this,1),this.$destroy=Z}$on(t,n){if(!st(n))return Z;const i=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return i.push(n),()=>{const o=i.indexOf(n);o!==-1&&i.splice(o,1)}}$set(t){this.$$set&&!mt(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function it(e){let t;const n=e[12].default,i=Q(n,e,e[11],null);return{c(){i&&i.c()},m(o,s){i&&i.m(o,s),t=!0},p(o,s){i&&i.p&&(!t||s&2048)&&X(i,n,o,o[11],t?V(n,o[11],s,null):Y(o[11]),null)},i(o){t||(O(i,o),t=!0)},o(o){x(i,o),t=!1},d(o){i&&i.d(o)}}}function Pt(e){let t,n,i,o,s=e[0]&&it(e);return{c(){t=R("div"),n=R("div"),i=yt(),s&&s.c(),L(n,"style",e[2]),L(n,"class","s-google-map__container svelte-hsj0b5"),L(t,"style",e[3]),L(t,"class","s-google-map__wrapper")},m(r,l){lt(r,t,l),F(t,n),e[13](n),F(t,i),s&&s.m(t,null),o=!0},p(r,[l]){(!o||l&4)&&L(n,"style",r[2]),r[0]?s?(s.p(r,l),l&1&&O(s,1)):(s=it(r),s.c(),O(s,1),s.m(t,null)):s&&(Et(),x(s,1,1,()=>{s=null}),vt()),(!o||l&8)&&L(t,"style",r[3])},i(r){o||(O(s),o=!0)},o(r){x(s),o=!1},d(r){r&&$(t),e[13](null),s&&s.d()}}}function At(e,t,n){let i,o,{$$slots:s={},$$scope:r}=t,{width:l}=t,{height:u}=t,{borderRadius:a="0"}=t,{zoom:f=null}=t,{options:c}=t,{center:h=null}=t;ut("map",{getMap:()=>g});let d=!1,g=null,C=null;const T=G();let m=null,B=null,K=null;ct(()=>{!C||!_||(n(10,g=new _.maps.Map(C)),m=g.addListener("click",p=>{T("click",p)}),B=g.addListener("dragend",()=>{n(5,h=g.getCenter().toJSON())}),K=g.addListener("zoom_changed",()=>{n(4,f=g.getZoom())}),n(0,d=!0))}),b(()=>{n(10,g=null),m&&m.remove(),B&&B.remove(),K&&K.remove()});function ft(p){J[p?"unshift":"push"](()=>{C=p,n(1,C)})}return e.$$set=p=>{"width"in p&&n(6,l=p.width),"height"in p&&n(7,u=p.height),"borderRadius"in p&&n(8,a=p.borderRadius),"zoom"in p&&n(4,f=p.zoom),"options"in p&&n(9,c=p.options),"center"in p&&n(5,h=p.center),"$$scope"in p&&n(11,r=p.$$scope)},e.$$.update=()=>{e.$$.dirty&192&&n(3,i=`width: ${l}; height: ${u}`),e.$$.dirty&448&&n(2,o=`width: ${l}; height: ${u}; border-radius: ${a}`),e.$$.dirty&1584&&(g&&g.setOptions(c),g&&f&&g.setZoom(f),g&&h&&g.setCenter(h))},[d,C,o,i,f,h,l,u,a,c,g,r,s,ft]}class Gt extends S{constructor(t){super(),k(this,t,At,Pt,w,{width:6,height:7,borderRadius:8,zoom:4,options:9,center:5})}}function Rt(e,t,n){let{radius:i=null}=t,{center:o=null}=t,{options:s=null}=t;const{getMap:r}=y("map"),l=r(),u=G(),a=new _.maps.Circle({map:l}),f=a.addListener("radius_changed",()=>{n(0,i=a.getRadius())}),c=a.addListener("center_changed",()=>{n(1,o=a.getCenter().toJSON())}),h=a.addListener("click",d=>{u("click",d)});return b(()=>{a.setMap(null),h.remove(),c.remove(),f.remove()}),e.$$set=d=>{"radius"in d&&n(0,i=d.radius),"center"in d&&n(1,o=d.center),"options"in d&&n(2,s=d.options)},e.$$.update=()=>{e.$$.dirty&7&&(i&&a.setRadius(i),o&&a.setCenter(o),s&&a.setOptions(s))},[i,o,s]}class jt extends S{constructor(t){super(),k(this,t,Rt,null,w,{radius:0,center:1,options:2})}}function Nt(e){let t;const n=e[3].default,i=Q(n,e,e[2],null);return{c(){i&&i.c()},m(o,s){i&&i.m(o,s),t=!0},p(o,[s]){i&&i.p&&(!t||s&4)&&X(i,n,o,o[2],t?V(n,o[2],s,null):Y(o[2]),null)},i(o){t||(O(i,o),t=!0)},o(o){x(i,o),t=!1},d(o){i&&i.d(o)}}}function xt(e,t,n){let{$$slots:i={},$$scope:o}=t,{options:s=null}=t,{position:r=null}=t;const{getMap:l}=y("map");ut("marker",{getMarker:()=>f});const u=l(),a=G(),f=new _.maps.Marker({map:u}),c=f.addListener("mouseup",()=>{n(0,r=f.getPosition().toJSON())}),h=f.addListener("click",d=>{a("click",d)});return b(()=>{f.setMap(null),h.remove(),c.remove()}),e.$$set=d=>{"options"in d&&n(1,s=d.options),"position"in d&&n(0,r=d.position),"$$scope"in d&&n(2,o=d.$$scope)},e.$$.update=()=>{e.$$.dirty&3&&(s&&f.setOptions(s),r&&f.setPosition(r))},[r,s,o,i]}class Dt extends S{constructor(t){super(),k(this,t,xt,Nt,w,{options:1,position:0})}}function Ut(e,t,n){let{options:i=null}=t;const{getMap:o}=y("map"),s=o(),r=new _.maps.visualization.HeatmapLayer({map:s});return b(()=>{r.setMap(null)}),e.$$set=l=>{"options"in l&&n(0,i=l.options)},e.$$.update=()=>{e.$$.dirty&1&&i&&r.setOptions(i)},[i]}class zt extends S{constructor(t){super(),k(this,t,Ut,null,w,{options:0})}}function Ft(e,t,n){let{path:i=null}=t,{options:o=null}=t;const{getMap:s}=y("map"),r=s(),l=G(),u=new _.maps.Polygon({map:r}),a=u.addListener("mouseup",()=>{n(0,i=u.getPath().getArray().map(c=>c.toJSON()))}),f=u.addListener("click",c=>{l("click",c)});return b(()=>{u.setMap(null),f.remove(),a.remove()}),e.$$set=c=>{"path"in c&&n(0,i=c.path),"options"in c&&n(1,o=c.options)},e.$$.update=()=>{e.$$.dirty&3&&(i&&u.setPath(i),o&&u.setOptions(o))},[i,o]}class Jt extends S{constructor(t){super(),k(this,t,Ft,null,w,{path:0,options:1})}}function Tt(e,t,n){let{path:i=null}=t,{options:o=null}=t;const{getMap:s}=y("map"),r=s(),l=G(),u=new _.maps.Polyline({map:r}),a=u.addListener("mouseup",()=>{n(0,i=u.getPath().getArray().map(c=>c.toJSON()))}),f=u.addListener("click",c=>{l("click",c)});return b(()=>{u.setMap(null),f.remove(),a.remove()}),e.$$set=c=>{"path"in c&&n(0,i=c.path),"options"in c&&n(1,o=c.options)},e.$$.update=()=>{e.$$.dirty&3&&(i&&u.setPath(i),o&&u.setOptions(o))},[i,o]}class Bt extends S{constructor(t){super(),k(this,t,Tt,null,w,{path:0,options:1})}}function Kt(e,t,n){let{options:i=null}=t,{bounds:o=null}=t;const{getMap:s}=y("map"),r=s(),l=G(),u=new _.maps.Rectangle({map:r}),a=u.addListener("bounds_changed",()=>{n(0,o=u.getBounds().toJSON())}),f=u.addListener("click",c=>{l("click",c)});return b(()=>{u.setMap(null),f.remove(),a.remove()}),e.$$set=c=>{"options"in c&&n(1,i=c.options),"bounds"in c&&n(0,o=c.bounds)},e.$$.update=()=>{e.$$.dirty&3&&(o&&u.setBounds(o),i&&u.setOptions(i))},[o,i]}class Wt extends S{constructor(t){super(),k(this,t,Kt,null,w,{options:1,bounds:0})}}function Zt(e){let t,n,i,o;const s=e[4].default,r=Q(s,e,e[3],null);return{c(){t=R("template"),n=R("div"),i=R("div"),r&&r.c(),L(n,"class","s-google-info-window__container svelte-51y2q4")},m(l,u){lt(l,t,u),F(t.content,n),F(n,i),r&&r.m(i,null),e[5](i),o=!0},p(l,[u]){r&&r.p&&(!o||u&8)&&X(r,s,l,l[3],o?V(s,l[3],u,null):Y(l[3]),null)},i(l){o||(O(r,l),o=!0)},o(l){x(r,l),o=!1},d(l){l&&$(t),r&&r.d(l),e[5](null)}}}function qt(e,t,n){let{$$slots:i={},$$scope:o}=t,{show:s=!1}=t,{options:r=null}=t;const{getMap:l}=y("map"),u=y("marker"),a=l(),f=(u==null?void 0:u.getMarker())??null;let c=null;const h=new _.maps.InfoWindow;ct(()=>{h.setContent(c)});let d=null;f&&(d=f.addListener("click",()=>n(1,s=!s)));const g=h.addListener("closeclick",()=>n(1,s=!1));function C(m){m?h.open({map:a,anchor:f}):h.close()}b(()=>{h.close(),g.remove(),d==null||d.remove()});function T(m){J[m?"unshift":"push"](()=>{c=m,n(0,c)})}return e.$$set=m=>{"show"in m&&n(1,s=m.show),"options"in m&&n(2,r=m.options),"$$scope"in m&&n(3,o=m.$$scope)},e.$$.update=()=>{e.$$.dirty&4&&r&&h.setOptions(r),e.$$.dirty&2&&C(s)},[c,s,r,o,i,T]}class Ht extends S{constructor(t){super(),k(this,t,qt,Zt,w,{show:1,options:2})}}exports.SGoogleCircle=jt;exports.SGoogleHeatmap=zt;exports.SGoogleInfoWindow=Ht;exports.SGoogleMap=Gt;exports.SGoogleMarker=Dt;exports.SGooglePolygon=Jt;exports.SGooglePolyline=Bt;exports.SGoogleRectangle=Wt;exports.gmapLoader=gt;
