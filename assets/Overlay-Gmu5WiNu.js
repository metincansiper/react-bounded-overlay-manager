var ie=Object.defineProperty;var ae=(t,e,n)=>e in t?ie(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var _=(t,e,n)=>(ae(t,typeof e!="symbol"?e+"":e,n),n);import{j as g}from"./jsx-runtime-AgcCsxC8.js";import{r as a,R as ue}from"./index-XiNr8FW2.js";import{R as le}from"./index-9vG4XYWr.js";var y=(t=>(t.TOP_LEFT="top_left",t.BOTTOM_CENTER="bottom_center",t.TOP_RIGHT="top_right",t.CENTER="center",t.BOTTOM_LEFT="bottom_left",t.TOP_CENTER="top_center",t.BOTTOM_RIGHT="bottom_right",t.MID_LEFT="mid_left",t.MID_RIGHT="mid_right",t))(y||{});const ce=({handleFullscreenChange:t})=>{a.useEffect(()=>{const e=["fullscreenchange","webkitfullscreenchange","mozfullscreenchange","MSFullscreenChange"];return e.forEach(n=>{document.addEventListener(n,t)}),()=>{e.forEach(n=>{document.removeEventListener(n,t)})}},[t])};var H={exports:{}},C=typeof Reflect=="object"?Reflect:null,U=C&&typeof C.apply=="function"?C.apply:function(e,n,r){return Function.prototype.apply.call(e,n,r)},S;C&&typeof C.ownKeys=="function"?S=C.ownKeys:Object.getOwnPropertySymbols?S=function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:S=function(e){return Object.getOwnPropertyNames(e)};function fe(t){console&&console.warn&&console.warn(t)}var $=Number.isNaN||function(e){return e!==e};function l(){l.init.call(this)}H.exports=l;H.exports.once=pe;l.EventEmitter=l;l.prototype._events=void 0;l.prototype._eventsCount=0;l.prototype._maxListeners=void 0;var W=10;function N(t){if(typeof t!="function")throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t)}Object.defineProperty(l,"defaultMaxListeners",{enumerable:!0,get:function(){return W},set:function(t){if(typeof t!="number"||t<0||$(t))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+t+".");W=t}});l.init=function(){(this._events===void 0||this._events===Object.getPrototypeOf(this)._events)&&(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0};l.prototype.setMaxListeners=function(e){if(typeof e!="number"||e<0||$(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this};function G(t){return t._maxListeners===void 0?l.defaultMaxListeners:t._maxListeners}l.prototype.getMaxListeners=function(){return G(this)};l.prototype.emit=function(e){for(var n=[],r=1;r<arguments.length;r++)n.push(arguments[r]);var o=e==="error",i=this._events;if(i!==void 0)o=o&&i.error===void 0;else if(!o)return!1;if(o){var s;if(n.length>0&&(s=n[0]),s instanceof Error)throw s;var u=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw u.context=s,u}var c=i[e];if(c===void 0)return!1;if(typeof c=="function")U(c,this,n);else for(var v=c.length,d=Z(c,v),r=0;r<v;++r)U(d[r],this,n);return!0};function K(t,e,n,r){var o,i,s;if(N(n),i=t._events,i===void 0?(i=t._events=Object.create(null),t._eventsCount=0):(i.newListener!==void 0&&(t.emit("newListener",e,n.listener?n.listener:n),i=t._events),s=i[e]),s===void 0)s=i[e]=n,++t._eventsCount;else if(typeof s=="function"?s=i[e]=r?[n,s]:[s,n]:r?s.unshift(n):s.push(n),o=G(t),o>0&&s.length>o&&!s.warned){s.warned=!0;var u=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(e)+" listeners added. Use emitter.setMaxListeners() to increase limit");u.name="MaxListenersExceededWarning",u.emitter=t,u.type=e,u.count=s.length,fe(u)}return t}l.prototype.addListener=function(e,n){return K(this,e,n,!1)};l.prototype.on=l.prototype.addListener;l.prototype.prependListener=function(e,n){return K(this,e,n,!0)};function de(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,arguments.length===0?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function X(t,e,n){var r={fired:!1,wrapFn:void 0,target:t,type:e,listener:n},o=de.bind(r);return o.listener=n,r.wrapFn=o,o}l.prototype.once=function(e,n){return N(n),this.on(e,X(this,e,n)),this};l.prototype.prependOnceListener=function(e,n){return N(n),this.prependListener(e,X(this,e,n)),this};l.prototype.removeListener=function(e,n){var r,o,i,s,u;if(N(n),o=this._events,o===void 0)return this;if(r=o[e],r===void 0)return this;if(r===n||r.listener===n)--this._eventsCount===0?this._events=Object.create(null):(delete o[e],o.removeListener&&this.emit("removeListener",e,r.listener||n));else if(typeof r!="function"){for(i=-1,s=r.length-1;s>=0;s--)if(r[s]===n||r[s].listener===n){u=r[s].listener,i=s;break}if(i<0)return this;i===0?r.shift():ve(r,i),r.length===1&&(o[e]=r[0]),o.removeListener!==void 0&&this.emit("removeListener",e,u||n)}return this};l.prototype.off=l.prototype.removeListener;l.prototype.removeAllListeners=function(e){var n,r,o;if(r=this._events,r===void 0)return this;if(r.removeListener===void 0)return arguments.length===0?(this._events=Object.create(null),this._eventsCount=0):r[e]!==void 0&&(--this._eventsCount===0?this._events=Object.create(null):delete r[e]),this;if(arguments.length===0){var i=Object.keys(r),s;for(o=0;o<i.length;++o)s=i[o],s!=="removeListener"&&this.removeAllListeners(s);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if(n=r[e],typeof n=="function")this.removeListener(e,n);else if(n!==void 0)for(o=n.length-1;o>=0;o--)this.removeListener(e,n[o]);return this};function J(t,e,n){var r=t._events;if(r===void 0)return[];var o=r[e];return o===void 0?[]:typeof o=="function"?n?[o.listener||o]:[o]:n?me(o):Z(o,o.length)}l.prototype.listeners=function(e){return J(this,e,!0)};l.prototype.rawListeners=function(e){return J(this,e,!1)};l.listenerCount=function(t,e){return typeof t.listenerCount=="function"?t.listenerCount(e):Q.call(t,e)};l.prototype.listenerCount=Q;function Q(t){var e=this._events;if(e!==void 0){var n=e[t];if(typeof n=="function")return 1;if(n!==void 0)return n.length}return 0}l.prototype.eventNames=function(){return this._eventsCount>0?S(this._events):[]};function Z(t,e){for(var n=new Array(e),r=0;r<e;++r)n[r]=t[r];return n}function ve(t,e){for(;e+1<t.length;e++)t[e]=t[e+1];t.pop()}function me(t){for(var e=new Array(t.length),n=0;n<e.length;++n)e[n]=t[n].listener||t[n];return e}function pe(t,e){return new Promise(function(n,r){function o(s){t.removeListener(e,i),r(s)}function i(){typeof t.removeListener=="function"&&t.removeListener("error",o),n([].slice.call(arguments))}ee(t,e,i,{once:!0}),e!=="error"&&ye(t,o,{once:!0})})}function ye(t,e,n){typeof t.on=="function"&&ee(t,"error",e,n)}function ee(t,e,n,r){if(typeof t.on=="function")r.once?t.once(e,n):t.on(e,n);else if(typeof t.addEventListener=="function")t.addEventListener(e,function o(i){r.once&&t.removeEventListener(e,o),n(i)});else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof t)}var he=H.exports;const te=a.createContext(void 0),w=()=>{const t=a.useContext(te);if(t===void 0)throw new Error("useOverlayManagerContext must be used within a OverlayManagerContextProvider");return t},V=({children:t,boundingComponentRef:e})=>{const[n]=a.useState(new he.EventEmitter);a.useEffect(()=>()=>{n.removeAllListeners()},[n]);const r={overlayManagerEventEmitter:n,boundingComponentRef:e};return g.jsx(te.Provider,{value:r,children:t})};try{V.displayName="OverlayManagerContextProvider",V.__docgenInfo={description:"",displayName:"OverlayManagerContextProvider",props:{boundingComponentRef:{defaultValue:null,description:"",name:"boundingComponentRef",required:!0,type:{name:"RefObject<HTMLElement>"}}}}}catch{}function ne(t,e,n){var r=this,o=a.useRef(null),i=a.useRef(0),s=a.useRef(null),u=a.useRef([]),c=a.useRef(),v=a.useRef(),d=a.useRef(t),f=a.useRef(!0);d.current=t;var E=typeof window<"u",L=!e&&e!==0&&E;if(typeof t!="function")throw new TypeError("Expected a function");e=+e||0;var B=!!(n=n||{}).leading,T=!("trailing"in n)||!!n.trailing,O="maxWait"in n,b="debounceOnServer"in n&&!!n.debounceOnServer,h=O?Math.max(+n.maxWait||0,e):null;a.useEffect(function(){return f.current=!0,function(){f.current=!1}},[]);var oe=a.useMemo(function(){var I=function(m){var p=u.current,x=c.current;return u.current=c.current=null,i.current=m,v.current=d.current.apply(x,p)},M=function(m,p){L&&cancelAnimationFrame(s.current),s.current=L?requestAnimationFrame(m):setTimeout(m,p)},D=function(m){if(!f.current)return!1;var p=m-o.current;return!o.current||p>=e||p<0||O&&m-i.current>=h},P=function(m){return s.current=null,T&&u.current?I(m):(u.current=c.current=null,v.current)},A=function m(){var p=Date.now();if(D(p))return P(p);if(f.current){var x=e-(p-o.current),se=O?Math.min(x,h-(p-i.current)):x;M(m,se)}},R=function(){if(E||b){var m=Date.now(),p=D(m);if(u.current=[].slice.call(arguments),c.current=r,o.current=m,p){if(!s.current&&f.current)return i.current=o.current,M(A,e),B?I(o.current):v.current;if(O)return M(A,e),I(o.current)}return s.current||M(A,e),v.current}};return R.cancel=function(){s.current&&(L?cancelAnimationFrame(s.current):clearTimeout(s.current)),i.current=0,u.current=o.current=c.current=s.current=null},R.isPending=function(){return!!s.current},R.flush=function(){return s.current?P(Date.now()):v.current},R},[B,O,e,h,T,L,E,b]);return oe}function Oe(t,{handleResize:e}){const n=ne(e,1);a.useEffect(()=>{if(!t.current)return;const r=new ResizeObserver(o=>{for(const i of o)n(i)});return r.observe(t.current),()=>{r.disconnect()}},[t,n])}const _e=t=>{if(!t.current)throw new Error("The ref is not attached to any element");const{top:e,left:n,width:r,height:o}=t.current.getBoundingClientRect(),i=window.pageYOffset||document.documentElement.scrollTop,s=window.pageXOffset||document.documentElement.scrollLeft;return{top:e+i,left:n+s,width:r,height:o}},ge=(t,e)=>{if(t.current&&e.current){const{top:n,left:r,width:o,height:i}=_e(t);e.current.style.top=`${n}px`,e.current.style.left=`${r}px`,e.current.style.width=`${o}px`,e.current.style.height=`${i}px`}},Ee="_overlaysContainer_wi19r_1",Le="_overlaysContainerContent_wi19r_6",re={overlaysContainer:Ee,overlaysContainerContent:Le},Ce=re.overlaysContainer,Te=re.overlaysContainerContent,j=({children:t,show:e,unmountContentWhenHidden:n},r)=>{const o=e?"block":"none",s=n&&!e?null:g.jsx("div",{role:"overlays-container-content",className:Te,style:{display:o},children:t});return g.jsx("div",{role:"overlays-container",className:Ce,ref:r,children:s})},we=ue.forwardRef(j);try{j.displayName="OverlaysContainer",j.__docgenInfo={description:"",displayName:"OverlaysContainer",props:{show:{defaultValue:null,description:"",name:"show",required:!0,type:{name:"boolean"}},unmountContentWhenHidden:{defaultValue:null,description:"",name:"unmountContentWhenHidden",required:!0,type:{name:"boolean"}}}}}catch{}const be=({timedEventManager:t,requestStartOnMouseMove:e=!0,requestStopOnMouseMove:n=!0})=>{const{overlayManagerEventEmitter:r,boundingComponentRef:o}=w();a.useEffect(()=>{if(t===null)return;const i=()=>{e&&t.requestStart()},s=()=>{n&&t.requestStop()},u=v=>{var d;if(n){const f=v.relatedTarget;if(f&&((d=o.current)!=null&&d.contains(f)||o.current===f))return;t.requestStop()}},c=()=>{e&&t.requestStart()};return r.on("mousemoveOnBoundingComponent",i),r.on("mouseleaveOnBoundingComponent",s),r.on("mouseleaveOnOverlay",u),r.on("mousemoveOnOverlay",c),()=>{r.off("mousemoveOnBoundingComponent",i),r.off("mouseleaveOnBoundingComponent",s),r.off("mouseleaveOnOverlay",u),r.off("mousemoveOnOverlay",c)}},[t,e,n])},Me=()=>{const{overlayManagerEventEmitter:t,boundingComponentRef:e}=w(),n=()=>{t.emit("mousemoveOnBoundingComponent")},r=o=>{var s;(s=o.relatedTarget)!=null&&s.closest(".overlay")||t.emit("mouseleaveOnBoundingComponent")};a.useEffect(()=>{var o,i;return(o=e.current)==null||o.addEventListener("mousemove",n),(i=e.current)==null||i.addEventListener("mouseleave",r),()=>{var s,u;(s=e.current)==null||s.removeEventListener("mousemove",n),(u=e.current)==null||u.removeEventListener("mouseleave",r)}},[e])},q=-1;class Re{constructor({onStart:e,onStop:n,timeoutDuration:r}){_(this,"onStart");_(this,"onStop");_(this,"timeoutDuration");_(this,"timeoutId",null);this.onStart=e,this.onStop=n,this.timeoutDuration=r}requestStart(){this.timeoutId?(clearTimeout(this.timeoutId),this.timeoutId=null):this.onStart(),this.timeoutDuration===q?this.timeoutId=q:this.timeoutId=setTimeout(()=>{this.requestStop()},this.timeoutDuration)}requestStop(){this.timeoutId&&(this.timeoutId!==q&&clearTimeout(this.timeoutId),this.timeoutId=null,this.onStop())}}function xe({onStart:t,onStop:e,timeoutDuration:n,returnNull:r=!1}){const o=a.useMemo(()=>r?null:new Re({onStart:t,onStop:e,timeoutDuration:n}),[t,e,n,r]);return a.useEffect(()=>()=>{o==null||o.requestStop()},[o]),o}class Se{constructor({timedEventManager:e,updateOverlaysContainerBoundingBox:n}){_(this,"timedEventManager");_(this,"_updateOverlaysContainerBoundingBox");this.timedEventManager=e,this._updateOverlaysContainerBoundingBox=n}renderOverlays(){var e;(e=this.timedEventManager)==null||e.requestStart()}clearOverlays(){var e;(e=this.timedEventManager)==null||e.requestStop()}updateOverlaysContainerBoundingBox(){this._updateOverlaysContainerBoundingBox()}}const Ne=({timedEventManager:t,onApiUpdated:e,updateOverlaysContainerBoundingBox:n})=>{a.useEffect(()=>{e&&e(new Se({timedEventManager:t,updateOverlaysContainerBoundingBox:n}))},[t,e,n])},Be=({handleResize:t})=>{const e=ne(t,1);a.useEffect(()=>(window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}),[e])},Ie=2e3,Ae=!1,qe=!1,Ve=!0,je=!0,Fe=!1,F=({children:t,overlaysShowTimeout:e=Ie,persistentlyShowOverlays:n=Ae,skipAllSystemEvents:r=qe,hideOverlaysOnMouseLeave:o=Ve,showOverlaysOnMouseMove:i=je,unmountContentWhenHidden:s=Fe,onApiUpdated:u})=>{const{boundingComponentRef:c}=w(),[v,d]=a.useState(n),f=a.useRef(null);a.useEffect(()=>{d(n)},[n]);const E=a.useCallback(()=>d(!0),[]),L=a.useCallback(()=>d(!1),[]),T=xe({onStart:E,onStop:L,timeoutDuration:e,returnNull:n}),O=i&&!r,b=o&&!r,h=a.useCallback(()=>{window.requestAnimationFrame(()=>{ge(c,f)})},[c,f]);return Me(),Ne({timedEventManager:T,onApiUpdated:u,updateOverlaysContainerBoundingBox:h}),be({timedEventManager:T,requestStartOnMouseMove:O,requestStopOnMouseMove:b}),Be({handleResize:h}),Oe(c,{handleResize:h}),a.useLayoutEffect(()=>{h()},[h]),g.jsx(we,{ref:f,show:v,unmountContentWhenHidden:s,children:t})};try{F.displayName="BoundedOverlayManagerContent",F.__docgenInfo={description:"",displayName:"BoundedOverlayManagerContent",props:{overlaysShowTimeout:{defaultValue:{value:"2000"},description:"",name:"overlaysShowTimeout",required:!1,type:{name:"number"}},persistentlyShowOverlays:{defaultValue:{value:"false"},description:"",name:"persistentlyShowOverlays",required:!1,type:{name:"boolean"}},hideOverlaysOnMouseLeave:{defaultValue:{value:"true"},description:"",name:"hideOverlaysOnMouseLeave",required:!1,type:{name:"boolean"}},showOverlaysOnMouseMove:{defaultValue:{value:"true"},description:"",name:"showOverlaysOnMouseMove",required:!1,type:{name:"boolean"}},skipAllSystemEvents:{defaultValue:{value:"false"},description:"",name:"skipAllSystemEvents",required:!1,type:{name:"boolean"}},unmountContentWhenHidden:{defaultValue:{value:"false"},description:"",name:"unmountContentWhenHidden",required:!1,type:{name:"boolean"}},onApiUpdated:{defaultValue:null,description:"",name:"onApiUpdated",required:!1,type:{name:"((api: BoundedOverlayManagerApi) => void)"}}}}}catch{}const k=()=>document.fullscreenElement||document.body,z=({boundingComponentRef:t,...e})=>{const[n,r]=a.useState(k),o=a.useCallback(()=>{r(k())},[r]);ce({handleFullscreenChange:o});const i=g.jsx(V,{boundingComponentRef:t,children:g.jsx(F,{...e})});return le.createPortal(i,n)};try{z.displayName="BoundedOverlayManager",z.__docgenInfo={description:"",displayName:"BoundedOverlayManager",props:{overlaysShowTimeout:{defaultValue:null,description:"",name:"overlaysShowTimeout",required:!1,type:{name:"number"}},persistentlyShowOverlays:{defaultValue:null,description:"",name:"persistentlyShowOverlays",required:!1,type:{name:"boolean"}},hideOverlaysOnMouseLeave:{defaultValue:null,description:"",name:"hideOverlaysOnMouseLeave",required:!1,type:{name:"boolean"}},showOverlaysOnMouseMove:{defaultValue:null,description:"",name:"showOverlaysOnMouseMove",required:!1,type:{name:"boolean"}},skipAllSystemEvents:{defaultValue:null,description:"",name:"skipAllSystemEvents",required:!1,type:{name:"boolean"}},unmountContentWhenHidden:{defaultValue:null,description:"",name:"unmountContentWhenHidden",required:!1,type:{name:"boolean"}},onApiUpdated:{defaultValue:null,description:"",name:"onApiUpdated",required:!1,type:{name:"((api: BoundedOverlayManagerApi) => void)"}},boundingComponentRef:{defaultValue:null,description:"",name:"boundingComponentRef",required:!0,type:{name:"RefObject<HTMLElement>"}}}}}catch{}const He=({overlayRef:t})=>{const{overlayManagerEventEmitter:e}=w();a.useEffect(()=>{const n=t.current;if(!n)return;const r=i=>{e.emit("mouseleaveOnOverlay",i)},o=()=>{e.emit("mousemoveOnOverlay")};return n.addEventListener("mouseleave",r),n.addEventListener("mousemove",o),()=>{n.removeEventListener("mouseleave",r),n.removeEventListener("mousemove",o)}},[t])},De="_overlay_ractj_1",Pe={overlay:De},Ue=Pe.overlay,We={top:0,bottom:0,left:0,right:0,topInPercent:0,leftInPercent:0},ke=(t,e)=>{if(!t.current)return{};const{position:n,offset:r}=e,{top:o,bottom:i,left:s,right:u,topInPercent:c,leftInPercent:v}={...We,...r},d=`${50+v}%`,f=`${50+c}%`;return{[y.BOTTOM_CENTER]:{bottom:i,left:d,transform:"translateX(-50%)"},[y.TOP_LEFT]:{top:o,left:s},[y.TOP_RIGHT]:{top:o,right:u},[y.CENTER]:{top:f,left:d,transform:"translate(-50%, -50%)"},[y.BOTTOM_LEFT]:{bottom:i,left:s},[y.BOTTOM_RIGHT]:{bottom:i,right:u},[y.TOP_CENTER]:{top:o,left:d,transform:"translateX(-50%)"},[y.MID_LEFT]:{top:f,left:s,transform:"translateY(-50%)"},[y.MID_RIGHT]:{top:f,right:u,transform:"translateY(-50%)"}}[n]||{}},Y=({offset:t,position:e,children:n})=>{const r=a.useRef(null),{boundingComponentRef:o}=w(),i=a.useCallback(()=>ke(o,{position:e,offset:t}),[o,e,t]),[s,u]=a.useState(i);return He({overlayRef:r}),a.useEffect(()=>{u(i())},[i]),g.jsx("div",{ref:r,className:Ue,role:"overlay",style:s,children:n})};try{Y.displayName="Overlay",Y.__docgenInfo={description:"",displayName:"Overlay",props:{position:{defaultValue:null,description:"",name:"position",required:!0,type:{name:"enum",value:[{value:'"top_left"'},{value:'"bottom_center"'},{value:'"top_right"'},{value:'"center"'},{value:'"bottom_left"'},{value:'"top_center"'},{value:'"bottom_right"'},{value:'"mid_left"'},{value:'"mid_right"'}]}},offset:{defaultValue:null,description:"",name:"offset",required:!1,type:{name:"TopLeftOffsetProps | BottomCenterOffsetProps | TopRightOffsetProps | CenterOffsetProps | ... 5 more ..."}}}}}catch{}export{z as B,Ae as D,Y as O,y as P,Ie as a,Ve as b,je as c,qe as d,Fe as e};