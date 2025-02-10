import{r as u,a8 as Z,a as ee,g as te,s as ne,_ as I,u as re,b as q,j as K,aQ as se,c as oe,d as ie,X as ue,aR as le,aj as A,o as ae}from"./index-C4Ybm1RD.js";let N=0;function ce(e){const[t,n]=u.useState(e),l=e||t;return u.useEffect(()=>{t==null&&(N+=1,n(`mui-${N}`))},[t]),l}const V=Z.useId;function Ce(e){if(V!==void 0){const t=V();return e??t}return ce(e)}function ve({controlled:e,default:t,name:n,state:l="value"}){const{current:o}=u.useRef(e!==void 0),[g,f]=u.useState(t),i=o?e:g,y=u.useCallback(h=>{o||f(h)},[]);return[i,y]}var r={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var T=Symbol.for("react.element"),U=Symbol.for("react.portal"),M=Symbol.for("react.fragment"),L=Symbol.for("react.strict_mode"),$=Symbol.for("react.profiler"),R=Symbol.for("react.provider"),E=Symbol.for("react.context"),fe=Symbol.for("react.server_context"),F=Symbol.for("react.forward_ref"),k=Symbol.for("react.suspense"),P=Symbol.for("react.suspense_list"),D=Symbol.for("react.memo"),j=Symbol.for("react.lazy"),de=Symbol.for("react.offscreen"),B;B=Symbol.for("react.module.reference");function m(e){if(typeof e=="object"&&e!==null){var t=e.$$typeof;switch(t){case T:switch(e=e.type,e){case M:case $:case L:case k:case P:return e;default:switch(e=e&&e.$$typeof,e){case fe:case E:case F:case j:case D:case R:return e;default:return t}}case U:return t}}}r.ContextConsumer=E;r.ContextProvider=R;r.Element=T;r.ForwardRef=F;r.Fragment=M;r.Lazy=j;r.Memo=D;r.Portal=U;r.Profiler=$;r.StrictMode=L;r.Suspense=k;r.SuspenseList=P;r.isAsyncMode=function(){return!1};r.isConcurrentMode=function(){return!1};r.isContextConsumer=function(e){return m(e)===E};r.isContextProvider=function(e){return m(e)===R};r.isElement=function(e){return typeof e=="object"&&e!==null&&e.$$typeof===T};r.isForwardRef=function(e){return m(e)===F};r.isFragment=function(e){return m(e)===M};r.isLazy=function(e){return m(e)===j};r.isMemo=function(e){return m(e)===D};r.isPortal=function(e){return m(e)===U};r.isProfiler=function(e){return m(e)===$};r.isStrictMode=function(e){return m(e)===L};r.isSuspense=function(e){return m(e)===k};r.isSuspenseList=function(e){return m(e)===P};r.isValidElementType=function(e){return typeof e=="string"||typeof e=="function"||e===M||e===$||e===L||e===k||e===P||e===de||typeof e=="object"&&e!==null&&(e.$$typeof===j||e.$$typeof===D||e.$$typeof===R||e.$$typeof===E||e.$$typeof===F||e.$$typeof===B||e.getModuleId!==void 0)};r.typeOf=m;function we({props:e,states:t,muiFormControl:n}){return t.reduce((l,o)=>(l[o]=e[o],n&&typeof e[o]>"u"&&(l[o]=n[o]),l),{})}const pe=u.createContext(void 0);function Ie(){return u.useContext(pe)}function me(e){return ee("MuiList",e)}te("MuiList",["root","padding","dense","subheader"]);const ye=["children","className","component","dense","disablePadding","subheader"],be=e=>{const{classes:t,disablePadding:n,dense:l,subheader:o}=e;return ie({root:["root",!n&&"padding",l&&"dense",o&&"subheader"]},me,t)},ge=ne("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>I({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),he=u.forwardRef(function(t,n){const l=re({props:t,name:"MuiList"}),{children:o,className:g,component:f="ul",dense:i=!1,disablePadding:y=!1,subheader:h}=l,C=q(l,ye),v=u.useMemo(()=>({dense:i}),[i]),w=I({},l,{component:f,dense:i,disablePadding:y}),b=be(w);return K.jsx(se.Provider,{value:v,children:K.jsxs(ge,I({as:f,className:oe(b.root,g),ref:n,ownerState:w},C,{children:[h,o]}))})}),Se=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function _(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function W(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function G(e,t){if(t===void 0)return!0;let n=e.innerText;return n===void 0&&(n=e.textContent),n=n.trim().toLowerCase(),n.length===0?!1:t.repeating?n[0]===t.keys[0]:n.indexOf(t.keys.join(""))===0}function x(e,t,n,l,o,g){let f=!1,i=o(e,t,t?n:!1);for(;i;){if(i===e.firstChild){if(f)return!1;f=!0}const y=l?!1:i.disabled||i.getAttribute("aria-disabled")==="true";if(!i.hasAttribute("tabindex")||!G(i,g)||y)i=o(e,i,n);else return i.focus(),!0}return!1}const Me=u.forwardRef(function(t,n){const{actions:l,autoFocus:o=!1,autoFocusItem:g=!1,children:f,className:i,disabledItemsFocusable:y=!1,disableListWrap:h=!1,onKeyDown:C,variant:v="selectedMenu"}=t,w=q(t,Se),b=u.useRef(null),O=u.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});ue(()=>{o&&b.current.focus()},[o]),u.useImperativeHandle(l,()=>({adjustStyleForScrollbar:(s,{direction:a})=>{const p=!b.current.style.width;if(s.clientHeight<b.current.clientHeight&&p){const S=`${le(A(s))}px`;b.current.style[a==="rtl"?"paddingLeft":"paddingRight"]=S,b.current.style.width=`calc(100% + ${S})`}return b.current}}),[]);const Q=s=>{const a=b.current,p=s.key,S=A(a).activeElement;if(p==="ArrowDown")s.preventDefault(),x(a,S,h,y,_);else if(p==="ArrowUp")s.preventDefault(),x(a,S,h,y,W);else if(p==="Home")s.preventDefault(),x(a,null,h,y,_);else if(p==="End")s.preventDefault(),x(a,null,h,y,W);else if(p.length===1){const c=O.current,H=p.toLowerCase(),z=performance.now();c.keys.length>0&&(z-c.lastTime>500?(c.keys=[],c.repeating=!0,c.previousKeyMatched=!0):c.repeating&&H!==c.keys[0]&&(c.repeating=!1)),c.lastTime=z,c.keys.push(H);const Y=S&&!c.repeating&&G(S,c);c.previousKeyMatched&&(Y||x(a,S,!1,y,_,c))?s.preventDefault():c.previousKeyMatched=!1}C&&C(s)},X=ae(b,n);let d=-1;u.Children.forEach(f,(s,a)=>{if(!u.isValidElement(s)){d===a&&(d+=1,d>=f.length&&(d=-1));return}s.props.disabled||(v==="selectedMenu"&&s.props.selected||d===-1)&&(d=a),d===a&&(s.props.disabled||s.props.muiSkipListHighlight||s.type.muiSkipListHighlight)&&(d+=1,d>=f.length&&(d=-1))});const J=u.Children.map(f,(s,a)=>{if(a===d){const p={};return g&&(p.autoFocus=!0),s.props.tabIndex===void 0&&v==="selectedMenu"&&(p.tabIndex=0),u.cloneElement(s,p)}return s});return K.jsx(he,I({role:"menu",ref:X,className:i,onKeyDown:Q,tabIndex:o?0:-1},w,{children:J}))});export{pe as F,he as L,Me as M,ve as a,Ie as b,we as f,Ce as u};
