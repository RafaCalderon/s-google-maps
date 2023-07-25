"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const d=require("svelte");var lt=function e(t,n){if(t===n)return!0;if(t&&n&&typeof t=="object"&&typeof n=="object"){if(t.constructor!==n.constructor)return!1;var i,o,s;if(Array.isArray(t)){if(i=t.length,i!=n.length)return!1;for(o=i;o--!==0;)if(!e(t[o],n[o]))return!1;return!0}if(t.constructor===RegExp)return t.source===n.source&&t.flags===n.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===n.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===n.toString();if(s=Object.keys(t),i=s.length,i!==Object.keys(n).length)return!1;for(o=i;o--!==0;)if(!Object.prototype.hasOwnProperty.call(n,s[o]))return!1;for(o=i;o--!==0;){var r=s[o];if(!e(t[r],n[r]))return!1}return!0}return t!==t&&n!==n};const X="__googleMapsScriptId";var I;(function(e){e[e.INITIALIZED=0]="INITIALIZED",e[e.LOADING=1]="LOADING",e[e.SUCCESS=2]="SUCCESS",e[e.FAILURE=3]="FAILURE"})(I||(I={}));class L{constructor({apiKey:t,authReferrerPolicy:n,channel:i,client:o,id:s=X,language:r,libraries:l=[],mapIds:a,nonce:u,region:f,retries:c=3,url:g="https://maps.googleapis.com/maps/api/js",version:h}){if(this.CALLBACK="__googleMapsCallback",this.callbacks=[],this.done=!1,this.loading=!1,this.errors=[],this.apiKey=t,this.authReferrerPolicy=n,this.channel=i,this.client=o,this.id=s||X,this.language=r,this.libraries=l,this.mapIds=a,this.nonce=u,this.region=f,this.retries=c,this.url=g,this.version=h,L.instance){if(!lt(this.options,L.instance.options))throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(L.instance.options)}`);return L.instance}L.instance=this}get options(){return{version:this.version,apiKey:this.apiKey,channel:this.channel,client:this.client,id:this.id,libraries:this.libraries,language:this.language,region:this.region,mapIds:this.mapIds,nonce:this.nonce,url:this.url,authReferrerPolicy:this.authReferrerPolicy}}get status(){return this.errors.length?I.FAILURE:this.done?I.SUCCESS:this.loading?I.LOADING:I.INITIALIZED}get failed(){return this.done&&!this.loading&&this.errors.length>=this.retries+1}createUrl(){let t=this.url;return t+=`?callback=${this.CALLBACK}`,this.apiKey&&(t+=`&key=${this.apiKey}`),this.channel&&(t+=`&channel=${this.channel}`),this.client&&(t+=`&client=${this.client}`),this.libraries.length>0&&(t+=`&libraries=${this.libraries.join(",")}`),this.language&&(t+=`&language=${this.language}`),this.region&&(t+=`&region=${this.region}`),this.version&&(t+=`&v=${this.version}`),this.mapIds&&(t+=`&map_ids=${this.mapIds.join(",")}`),this.authReferrerPolicy&&(t+=`&auth_referrer_policy=${this.authReferrerPolicy}`),t}deleteScript(){const t=document.getElementById(this.id);t&&t.remove()}load(){return this.loadPromise()}loadPromise(){return new Promise((t,n)=>{this.loadCallback(i=>{i?n(i.error):t(window.google)})})}loadCallback(t){this.callbacks.push(t),this.execute()}setScript(){if(document.getElementById(this.id)){this.callback();return}const t=this.createUrl(),n=document.createElement("script");n.id=this.id,n.type="text/javascript",n.src=t,n.onerror=this.loadErrorCallback.bind(this),n.defer=!0,n.async=!0,this.nonce&&(n.nonce=this.nonce),document.head.appendChild(n)}reset(){this.deleteScript(),this.done=!1,this.loading=!1,this.errors=[],this.onerrorEvent=null}resetIfRetryingFailed(){this.failed&&this.reset()}loadErrorCallback(t){if(this.errors.push(t),this.errors.length<=this.retries){const n=this.errors.length*Math.pow(2,this.errors.length);console.log(`Failed to load Google Maps script, retrying in ${n} ms.`),setTimeout(()=>{this.deleteScript(),this.setScript()},n)}else this.onerrorEvent=t,this.callback()}setCallback(){window.__googleMapsCallback=this.callback.bind(this)}callback(){this.done=!0,this.loading=!1,this.callbacks.forEach(t=>{t(this.onerrorEvent)}),this.callbacks=[]}execute(){if(this.resetIfRetryingFailed(),this.done)this.callback();else{if(window.google&&window.google.maps&&window.google.maps.version){console.warn("Google Maps already loaded outside @googlemaps/js-api-loader.This may result in undesirable behavior as options and script parameters may not match."),this.callback();return}this.loading||(this.loading=!0,this.setCallback(),this.setScript())}}}let y=null;async function ct(e,t=[]){if(y)return;y=await new L({apiKey:e,libraries:t}).load()}const at={load:ct,gmapApi:y};function B(){}function ut(e,t){for(const n in t)e[n]=t[n];return e}function et(e){return e()}function Y(){return Object.create(null)}function x(e){e.forEach(et)}function nt(e){return typeof e=="function"}function w(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function ft(e){return Object.keys(e).length===0}function W(e,t,n,i){if(e){const o=it(e,t,n,i);return e[0](o)}}function it(e,t,n,i){return e[1]&&i?ut(n.ctx.slice(),e[1](i(t))):n.ctx}function Z(e,t,n,i){if(e[2]&&i){const o=e[2](i(n));if(t.dirty===void 0)return o;if(typeof o=="object"){const s=[],r=Math.max(t.dirty.length,o.length);for(let l=0;l<r;l+=1)s[l]=t.dirty[l]|o[l];return s}return t.dirty|o}return t.dirty}function q(e,t,n,i,o,s){if(o){const r=it(t,n,i,s);e.p(r,o)}}function H(e){if(e.ctx.length>32){const t=[],n=e.ctx.length/32;for(let i=0;i<n;i++)t[i]=-1;return t}return-1}function j(e,t){e.appendChild(t)}function ot(e,t,n){e.insertBefore(t,n||null)}function Q(e){e.parentNode&&e.parentNode.removeChild(e)}function A(e){return document.createElement(e)}function ht(e){return document.createTextNode(e)}function dt(){return ht(" ")}function C(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function gt(e){return Array.from(e.childNodes)}let V;function G(e){V=e}const O=[],N=[];let D=[];const $=[],pt=Promise.resolve();let F=!1;function mt(){F||(F=!0,pt.then(st))}function K(e){D.push(e)}const z=new Set;let M=0;function st(){if(M!==0)return;const e=V;do{try{for(;M<O.length;){const t=O[M];M++,G(t),_t(t.$$)}}catch(t){throw O.length=0,M=0,t}for(G(null),O.length=0,M=0;N.length;)N.pop()();for(let t=0;t<D.length;t+=1){const n=D[t];z.has(n)||(z.add(n),n())}D.length=0}while(O.length);for(;$.length;)$.pop()();F=!1,z.clear(),G(e)}function _t(e){if(e.fragment!==null){e.update(),x(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(K)}}function yt(e){const t=[],n=[];D.forEach(i=>e.indexOf(i)===-1?t.push(i):n.push(i)),n.forEach(i=>i()),D=t}const R=new Set;let E;function wt(){E={r:0,c:[],p:E}}function bt(){E.r||x(E.c),E=E.p}function v(e,t){e&&e.i&&(R.delete(e),e.i(t))}function P(e,t,n,i){if(e&&e.o){if(R.has(e))return;R.add(e),E.c.push(()=>{R.delete(e),i&&(n&&e.d(1),i())}),e.o(t)}else i&&i()}function kt(e,t,n,i){const{fragment:o,after_update:s}=e.$$;o&&o.m(t,n),i||K(()=>{const r=e.$$.on_mount.map(et).filter(nt);e.$$.on_destroy?e.$$.on_destroy.push(...r):x(r),e.$$.on_mount=[]}),s.forEach(K)}function St(e,t){const n=e.$$;n.fragment!==null&&(yt(n.after_update),x(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function Ct(e,t){e.$$.dirty[0]===-1&&(O.push(e),mt(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function b(e,t,n,i,o,s,r,l=[-1]){const a=V;G(e);const u=e.$$={fragment:null,ctx:[],props:s,update:B,not_equal:o,bound:Y(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(a?a.$$.context:[])),callbacks:Y(),dirty:l,skip_bound:!1,root:t.target||a.$$.root};r&&r(u.root);let f=!1;if(u.ctx=n?n(e,t.props||{},(c,g,...h)=>{const p=h.length?h[0]:g;return u.ctx&&o(u.ctx[c],u.ctx[c]=p)&&(!u.skip_bound&&u.bound[c]&&u.bound[c](p),f&&Ct(e,c)),g}):[],u.update(),f=!0,x(u.before_update),u.fragment=i?i(u.ctx):!1,t.target){if(t.hydrate){const c=gt(t.target);u.fragment&&u.fragment.l(c),c.forEach(Q)}else u.fragment&&u.fragment.c();t.intro&&v(e.$$.fragment),kt(e,t.target,t.anchor,t.customElement),st()}G(a)}class k{$destroy(){St(this,1),this.$destroy=B}$on(t,n){if(!nt(n))return B;const i=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return i.push(n),()=>{const o=i.indexOf(n);o!==-1&&i.splice(o,1)}}$set(t){this.$$set&&!ft(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function tt(e){let t;const n=e[12].default,i=W(n,e,e[11],null);return{c(){i&&i.c()},m(o,s){i&&i.m(o,s),t=!0},p(o,s){i&&i.p&&(!t||s&2048)&&q(i,n,o,o[11],t?Z(n,o[11],s,null):H(o[11]),null)},i(o){t||(v(i,o),t=!0)},o(o){P(i,o),t=!1},d(o){i&&i.d(o)}}}function Lt(e){let t,n,i,o,s=e[0]&&tt(e);return{c(){t=A("div"),n=A("div"),i=dt(),s&&s.c(),C(n,"style",e[2]),C(n,"class","s-google-map__container svelte-hsj0b5"),C(t,"style",e[3]),C(t,"class","s-google-map__wrapper")},m(r,l){ot(r,t,l),j(t,n),e[13](n),j(t,i),s&&s.m(t,null),o=!0},p(r,[l]){(!o||l&4)&&C(n,"style",r[2]),r[0]?s?(s.p(r,l),l&1&&v(s,1)):(s=tt(r),s.c(),v(s,1),s.m(t,null)):s&&(wt(),P(s,1,1,()=>{s=null}),bt()),(!o||l&8)&&C(t,"style",r[3])},i(r){o||(v(s),o=!0)},o(r){P(s),o=!1},d(r){r&&Q(t),e[13](null),s&&s.d()}}}function Et(e,t,n){let i,o,{$$slots:s={},$$scope:r}=t,{width:l}=t,{height:a}=t,{borderRadius:u="0"}=t,{zoom:f=null}=t,{options:c}=t,{center:g=null}=t;d.setContext("map",{getMap:()=>p});let h=!1,p=null,S=null;const U=d.createEventDispatcher();let _=null,J=null,T=null;d.onMount(()=>{!S||!y||(n(10,p=new y.maps.Map(S)),_=p.addListener("click",m=>{U("click",m)}),J=p.addListener("dragend",()=>{n(5,g=p.getCenter().toJSON())}),T=p.addListener("zoom_changed",()=>{n(4,f=p.getZoom())}),n(0,h=!0))}),d.onDestroy(()=>{n(10,p=null),_&&_.remove(),J&&J.remove(),T&&T.remove()});function rt(m){N[m?"unshift":"push"](()=>{S=m,n(1,S)})}return e.$$set=m=>{"width"in m&&n(6,l=m.width),"height"in m&&n(7,a=m.height),"borderRadius"in m&&n(8,u=m.borderRadius),"zoom"in m&&n(4,f=m.zoom),"options"in m&&n(9,c=m.options),"center"in m&&n(5,g=m.center),"$$scope"in m&&n(11,r=m.$$scope)},e.$$.update=()=>{e.$$.dirty&192&&n(3,i=`width: ${l}; height: ${a}`),e.$$.dirty&448&&n(2,o=`width: ${l}; height: ${a}; border-radius: ${u}`),e.$$.dirty&1584&&(p&&p.setOptions(c),p&&f&&p.setZoom(f),p&&g&&p.setCenter(g))},[h,S,o,i,f,g,l,a,u,c,p,r,s,rt]}class vt extends k{constructor(t){super(),b(this,t,Et,Lt,w,{width:6,height:7,borderRadius:8,zoom:4,options:9,center:5})}}function Mt(e,t,n){let{radius:i=null}=t,{center:o=null}=t,{options:s=null}=t;const{getMap:r}=d.getContext("map"),l=r(),a=d.createEventDispatcher(),u=new y.maps.Circle({map:l}),f=u.addListener("radius_changed",()=>{n(0,i=u.getRadius())}),c=u.addListener("center_changed",()=>{n(1,o=u.getCenter().toJSON())}),g=u.addListener("click",h=>{a("click",h)});return d.onDestroy(()=>{u.setMap(null),g.remove(),c.remove(),f.remove()}),e.$$set=h=>{"radius"in h&&n(0,i=h.radius),"center"in h&&n(1,o=h.center),"options"in h&&n(2,s=h.options)},e.$$.update=()=>{e.$$.dirty&7&&(i&&u.setRadius(i),o&&u.setCenter(o),s&&u.setOptions(s))},[i,o,s]}class Ot extends k{constructor(t){super(),b(this,t,Mt,null,w,{radius:0,center:1,options:2})}}function It(e){let t;const n=e[3].default,i=W(n,e,e[2],null);return{c(){i&&i.c()},m(o,s){i&&i.m(o,s),t=!0},p(o,[s]){i&&i.p&&(!t||s&4)&&q(i,n,o,o[2],t?Z(n,o[2],s,null):H(o[2]),null)},i(o){t||(v(i,o),t=!0)},o(o){P(i,o),t=!1},d(o){i&&i.d(o)}}}function Dt(e,t,n){let{$$slots:i={},$$scope:o}=t,{options:s=null}=t,{position:r=null}=t;const{getMap:l}=d.getContext("map");d.setContext("marker",{getMarker:()=>f});const a=l(),u=d.createEventDispatcher(),f=new y.maps.Marker({map:a}),c=f.addListener("mouseup",()=>{n(0,r=f.getPosition().toJSON())}),g=f.addListener("click",h=>{u("click",h)});return d.onDestroy(()=>{f.setMap(null),g.remove(),c.remove()}),e.$$set=h=>{"options"in h&&n(1,s=h.options),"position"in h&&n(0,r=h.position),"$$scope"in h&&n(2,o=h.$$scope)},e.$$.update=()=>{e.$$.dirty&3&&(s&&f.setOptions(s),r&&f.setPosition(r))},[r,s,o,i]}class At extends k{constructor(t){super(),b(this,t,Dt,It,w,{options:1,position:0})}}function Gt(e,t,n){let{options:i=null}=t;const{getMap:o}=d.getContext("map"),s=o(),r=new y.maps.visualization.HeatmapLayer({map:s});return d.onDestroy(()=>{r.setMap(null)}),e.$$set=l=>{"options"in l&&n(0,i=l.options)},e.$$.update=()=>{e.$$.dirty&1&&i&&r.setOptions(i)},[i]}class Pt extends k{constructor(t){super(),b(this,t,Gt,null,w,{options:0})}}function xt(e,t,n){let{path:i=null}=t,{options:o=null}=t;const{getMap:s}=d.getContext("map"),r=s(),l=d.createEventDispatcher(),a=new y.maps.Polygon({map:r}),u=a.addListener("mouseup",()=>{n(0,i=a.getPath().getArray().map(c=>c.toJSON()))}),f=a.addListener("click",c=>{l("click",c)});return d.onDestroy(()=>{a.setMap(null),f.remove(),u.remove()}),e.$$set=c=>{"path"in c&&n(0,i=c.path),"options"in c&&n(1,o=c.options)},e.$$.update=()=>{e.$$.dirty&3&&(i&&a.setPath(i),o&&a.setOptions(o))},[i,o]}class Rt extends k{constructor(t){super(),b(this,t,xt,null,w,{path:0,options:1})}}function jt(e,t,n){let{path:i=null}=t,{options:o=null}=t;const{getMap:s}=d.getContext("map"),r=s(),l=d.createEventDispatcher(),a=new y.maps.Polyline({map:r}),u=a.addListener("mouseup",()=>{n(0,i=a.getPath().getArray().map(c=>c.toJSON()))}),f=a.addListener("click",c=>{l("click",c)});return d.onDestroy(()=>{a.setMap(null),f.remove(),u.remove()}),e.$$set=c=>{"path"in c&&n(0,i=c.path),"options"in c&&n(1,o=c.options)},e.$$.update=()=>{e.$$.dirty&3&&(i&&a.setPath(i),o&&a.setOptions(o))},[i,o]}class Nt extends k{constructor(t){super(),b(this,t,jt,null,w,{path:0,options:1})}}function Ut(e,t,n){let{options:i=null}=t,{bounds:o=null}=t;const{getMap:s}=d.getContext("map"),r=s(),l=d.createEventDispatcher(),a=new y.maps.Rectangle({map:r}),u=a.addListener("bounds_changed",()=>{n(0,o=a.getBounds().toJSON())}),f=a.addListener("click",c=>{l("click",c)});return d.onDestroy(()=>{a.setMap(null),f.remove(),u.remove()}),e.$$set=c=>{"options"in c&&n(1,i=c.options),"bounds"in c&&n(0,o=c.bounds)},e.$$.update=()=>{e.$$.dirty&3&&(o&&a.setBounds(o),i&&a.setOptions(i))},[o,i]}class Jt extends k{constructor(t){super(),b(this,t,Ut,null,w,{options:1,bounds:0})}}function Tt(e){let t,n,i,o;const s=e[4].default,r=W(s,e,e[3],null);return{c(){t=A("template"),n=A("div"),i=A("div"),r&&r.c(),C(n,"class","s-google-info-window__container svelte-51y2q4")},m(l,a){ot(l,t,a),j(t.content,n),j(n,i),r&&r.m(i,null),e[5](i),o=!0},p(l,[a]){r&&r.p&&(!o||a&8)&&q(r,s,l,l[3],o?Z(s,l[3],a,null):H(l[3]),null)},i(l){o||(v(r,l),o=!0)},o(l){P(r,l),o=!1},d(l){l&&Q(t),r&&r.d(l),e[5](null)}}}function zt(e,t,n){let{$$slots:i={},$$scope:o}=t,{show:s=!1}=t,{options:r=null}=t;const{getMap:l}=d.getContext("map"),a=d.getContext("marker"),u=l(),f=(a==null?void 0:a.getMarker())??null;let c=null;const g=new y.maps.InfoWindow;d.onMount(()=>{g.setContent(c)});let h=null;f&&(h=f.addListener("click",()=>n(1,s=!s)));const p=g.addListener("closeclick",()=>n(1,s=!1));function S(_){_?g.open({map:u,anchor:f}):g.close()}d.onDestroy(()=>{g.close(),p.remove(),h==null||h.remove()});function U(_){N[_?"unshift":"push"](()=>{c=_,n(0,c)})}return e.$$set=_=>{"show"in _&&n(1,s=_.show),"options"in _&&n(2,r=_.options),"$$scope"in _&&n(3,o=_.$$scope)},e.$$.update=()=>{e.$$.dirty&4&&r&&g.setOptions(r),e.$$.dirty&2&&S(s)},[c,s,r,o,i,U]}class Bt extends k{constructor(t){super(),b(this,t,zt,Tt,w,{show:1,options:2})}}exports.SGoogleCircle=Ot;exports.SGoogleHeatmap=Pt;exports.SGoogleInfoWindow=Bt;exports.SGoogleMap=vt;exports.SGoogleMarker=At;exports.SGooglePolygon=Rt;exports.SGooglePolyline=Nt;exports.SGoogleRectangle=Jt;exports.gmapLoader=at;