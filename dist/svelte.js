"use strict";function b(){}function B(t,e){for(const n in e)t[n]=e[n];return t}function N(t){return t()}function D(){return Object.create(null)}function p(t){t.forEach(N)}function O(t){return typeof t=="function"}function F(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function T(t){return Object.keys(t).length===0}function G(t,e,n,r){if(t){const o=S(t,e,n,r);return t[0](o)}}function S(t,e,n,r){return t[1]&&r?B(n.ctx.slice(),t[1](r(e))):n.ctx}function H(t,e,n,r){if(t[2]&&r){const o=t[2](r(n));if(e.dirty===void 0)return o;if(typeof o=="object"){const c=[],i=Math.max(e.dirty.length,o.length);for(let f=0;f<i;f+=1)c[f]=e.dirty[f]|o[f];return c}return e.dirty|o}return e.dirty}function I(t,e,n,r,o,c){if(o){const i=S(e,n,r,c);t.p(i,o)}}function J(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let r=0;r<n;r++)e[r]=-1;return e}return-1}function K(t,e){t.appendChild(e)}function L(t,e,n){t.insertBefore(e,n||null)}function P(t){t.parentNode&&t.parentNode.removeChild(t)}function Q(t){return document.createElement(t)}function R(t){return document.createTextNode(t)}function U(){return R(" ")}function V(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function W(t){return Array.from(t.childNodes)}function X(t,e,{bubbles:n=!1,cancelable:r=!1}={}){const o=document.createEvent("CustomEvent");return o.initCustomEvent(t,n,r,e),o}let g;function h(t){g=t}function m(){if(!g)throw new Error("Function called outside component initialization");return g}function Y(t){m().$$.on_mount.push(t)}function Z(t){m().$$.on_destroy.push(t)}function tt(){const t=m();return(e,n,{cancelable:r=!1}={})=>{const o=t.$$.callbacks[e];if(o){const c=X(e,n,{cancelable:r});return o.slice().forEach(i=>{i.call(t,c)}),!c.defaultPrevented}return!0}}function et(t,e){return m().$$.context.set(t,e),e}function nt(t){return m().$$.context.get(t)}const d=[],E=[];let _=[];const M=[],rt=Promise.resolve();let v=!1;function ot(){v||(v=!0,rt.then(q))}function w(t){_.push(t)}const $=new Set;let l=0;function q(){if(l!==0)return;const t=g;do{try{for(;l<d.length;){const e=d[l];l++,h(e),ut(e.$$)}}catch(e){throw d.length=0,l=0,e}for(h(null),d.length=0,l=0;E.length;)E.pop()();for(let e=0;e<_.length;e+=1){const n=_[e];$.has(n)||($.add(n),n())}_.length=0}while(d.length);for(;M.length;)M.pop()();v=!1,$.clear(),h(t)}function ut(t){if(t.fragment!==null){t.update(),p(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(w)}}function ct(t){const e=[],n=[];_.forEach(r=>t.indexOf(r)===-1?e.push(r):n.push(r)),n.forEach(r=>r()),_=e}const x=new Set;let a;function it(){a={r:0,c:[],p:a}}function st(){a.r||p(a.c),a=a.p}function z(t,e){t&&t.i&&(x.delete(t),t.i(e))}function ft(t,e,n,r){if(t&&t.o){if(x.has(t))return;x.add(t),a.c.push(()=>{x.delete(t),r&&(n&&t.d(1),r())}),t.o(e)}else r&&r()}function at(t,e,n,r){const{fragment:o,after_update:c}=t.$$;o&&o.m(e,n),r||w(()=>{const i=t.$$.on_mount.map(N).filter(O);t.$$.on_destroy?t.$$.on_destroy.push(...i):p(i),t.$$.on_mount=[]}),c.forEach(w)}function lt(t,e){const n=t.$$;n.fragment!==null&&(ct(n.after_update),p(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function dt(t,e){t.$$.dirty[0]===-1&&(d.push(t),ot(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function _t(t,e,n,r,o,c,i,f=[-1]){const y=g;h(t);const u=t.$$={fragment:null,ctx:[],props:c,update:b,not_equal:o,bound:D(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(y?y.$$.context:[])),callbacks:D(),dirty:f,skip_bound:!1,root:e.target||y.$$.root};i&&i(u.root);let k=!1;if(u.ctx=n?n(t,e.props||{},(s,C,...j)=>{const A=j.length?j[0]:C;return u.ctx&&o(u.ctx[s],u.ctx[s]=A)&&(!u.skip_bound&&u.bound[s]&&u.bound[s](A),k&&dt(t,s)),C}):[],u.update(),k=!0,p(u.before_update),u.fragment=r?r(u.ctx):!1,e.target){if(e.hydrate){const s=W(e.target);u.fragment&&u.fragment.l(s),s.forEach(P)}else u.fragment&&u.fragment.c();e.intro&&z(t.$$.fragment),at(t,e.target,e.anchor,e.customElement),q()}h(y)}class ht{$destroy(){lt(this,1),this.$destroy=b}$on(e,n){if(!O(n))return b;const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(n),()=>{const o=r.indexOf(n);o!==-1&&r.splice(o,1)}}$set(e){this.$$set&&!T(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}exports.SvelteComponent=ht;exports.append=K;exports.attr=V;exports.binding_callbacks=E;exports.check_outros=st;exports.createEventDispatcher=tt;exports.create_slot=G;exports.detach=P;exports.element=Q;exports.getContext=nt;exports.get_all_dirty_from_scope=J;exports.get_slot_changes=H;exports.group_outros=it;exports.init=_t;exports.insert=L;exports.onDestroy=Z;exports.onMount=Y;exports.safe_not_equal=F;exports.setContext=et;exports.space=U;exports.transition_in=z;exports.transition_out=ft;exports.update_slot_base=I;