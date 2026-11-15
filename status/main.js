(()=>{var u="openchamber.sdk",_=1;var We=`
:root {
  /* Quiet at rest like the app's own thumbs; hover gives a clear grab target. */
  --oc-scrollbar-thumb: color-mix(in srgb, var(--oc-muted, currentColor) 18%, transparent);
  --oc-scrollbar-thumb-hover: color-mix(in srgb, var(--oc-muted, currentColor) 36%, transparent);
  scrollbar-gutter: stable;
}
* {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
:hover, [data-oc-scrolling] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [data-oc-scrolling] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [data-oc-scrolling]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [data-oc-scrolling] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function jt(e){let r=e.documentElement;if(r.hasAttribute("data-oc-scrollbar-activity"))return;r.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(E)=>{let a=E.target===e?r:E.target;if(!(a instanceof Element))return;if(!a.hasAttribute("data-oc-scrolling"))a.setAttribute("data-oc-scrolling","");let T=n.get(a);if(T!==void 0)clearTimeout(T);n.set(a,setTimeout(()=>{n.delete(a),a.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var er=`(${jt.toString()})(document);`;var Ye=128,Je=65536;var be=128;var ge=65536;var Jt=/^[a-z][a-z0-9-]{0,39}$/;var zt=(e)=>Object(e)===e&&!Array.isArray(e),Ze=(e,r)=>Object.keys(e).every((n)=>r.includes(n)),Wt=(e)=>String(e)===e&&e.length>=1&&e.length<=60,Yt=(e)=>String(e)===e&&e.length>=1&&e.length<=80,Zt=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let r=new Set;for(let n of e){if(!zt(n)||!Jt.test(n.id)||!Wt(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(r.has(n.id))return!1;if(r.add(n.id),n.kind==="button"){if(!Ze(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!Ze(n,["kind","id","label","value","options","disabled"]))return!1;if(!Yt(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let E=new Set;for(let a of n.options){if(!zt(a)||!Ze(a,["value","label"])||!Yt(a.value)||!Wt(a.label)||E.has(a.value))return!1;E.add(a.value)}if(!E.has(n.value))return!1}return!0};var Qt=["{id}","{segment}","{segments+}"];var Gr=new Set(Qt);var qt=["turn-finished","turn-failed","permission-asked","question-asked"];var Hr=new Set(qt);var ke=20000000,Ie=256;var Qe=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,eo=(e,r)=>{if(e.path!==r.path||e.readOnly!==r.readOnly)return!1;if(e.encoding==="text"||r.encoding==="text")return e.encoding==="text"&&r.encoding==="text"&&e.content===r.content;if(e.bytes.byteLength!==r.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==r.bytes[n])return!1;return!0};var to=/^[A-Za-z0-9_-]{1,80}$/;var oo=["left","right","top","bottom"];var ro=(e,r=0,n={remaining:16000})=>{if(--n.remaining<0||r>=32)return!1;if(e===null)return!0;let E=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let a of E)if(!ro(a,r+1,n))return!1;return!0},qe=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((r)=>/^(0|[1-9]\d*)$/.test(r)&&Number(r)<e.length)&&e.every(qe);if(Object(e)===e){let r=Object.getPrototypeOf(e);return(r===null||r===Object.prototype)&&Object.values(e).every(qe)}return String(e)===e||Number.isFinite(e)},et=(e)=>{try{if(String(e.id)!==e.id||!to.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!oo.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!ro(e.data)||!qe(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var so=["file","directory","other","missing"],ot=(e)=>Boolean(e&&"sessionId"in e),rt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var io=/^[0-9a-f]{7,64}$/i,nt=(e)=>io.test(e),ye=500,Ue=32000,ao=16000,co=128,lo=200,po=2000,uo=16000,_o=80,Eo=200,So=16000;var To=2000;var st=20000,Ce=1024,ve=2000000;var Ne=64000,Me=8000,it=4000;var at=960000;var fo=999,mo=1e4,Se=500,Oo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Ao=["stopped","starting","ready","failed"],or=new Set(Oo),ho=(e)=>or.has(e),Ro=(e)=>e&&ho(e)?e:"HOST_REJECTED",re=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(re);if(Object(e)===e)return Object.values(e).every(re);return!1},xo=(e)=>re(e)&&JSON.stringify(e).length<=So,no=(e)=>e?.trim().slice(0,Eo)??"",ne=(e)=>{let r=e.id.trim().slice(0,co),n=e.title.trim().slice(0,lo),E=e.url.trim().slice(0,po),a=e.text?.trim().slice(0,uo),T=e.author?.trim().slice(0,_o),R=e.kind==="pull"?"pull":"issue",S={providerId:e.providerId.trim(),id:r,title:n||r,url:E,kind:R};if(a)S.text=a;if(T)S.author=T;if(R==="pull"){let b=no(e.branches?.head),w=no(e.branches?.base);if(b&&w)S.branches={head:b,base:w}}if(xo(e.data))S.data=e.data;return S},ct=(e)=>{let r=ne(e);if(e.projectId)r.projectId=e.projectId;if(e.navigation)r.navigation=e.navigation;if(e.worktree)r.worktree=e.worktree;return r},lt=(e)=>{let r={text:e.text.trim().slice(0,ao)};if(e.send)r.send=!0;return r},dt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(fo,Math.max(0,Math.round(e)))},pt=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(mo,Math.max(0,Math.ceil(e)))};var se=(e)=>e.length>0&&e.length<=Ce&&!e.includes("\x00")&&!e.includes("\\");var Le=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>To)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},rr=new Set(Ao),ut=(e)=>Boolean(e&&"status"in e&&rr.has(String(e.status))&&!("body"in e)),we=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),_t=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Et=(e)=>Boolean(e&&"written"in e&&e.written===!0),St=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),nr=new Set(so),Tt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&nr.has(String(e.kind))&&Number.isFinite(e.size)),ft=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),sr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),ir=(e)=>Object(e)===e?e:null,tt=(e)=>String(e)===e&&e.length>0,ar=(e)=>{if(!tt(e.id))return null;if(e.ok===!0){let r={channel:u,v:_,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)r.payload=e.payload;return r}if(e.ok===!1&&tt(e.error))return{channel:u,v:_,type:"result",id:e.id,ok:!1,error:e.error,code:Ro(tt(e.code)?e.code:void 0)};return null},mt=(e)=>{let r=ir(e);if(!r||r.channel!==u||r.v!==_)return null;if(r.type==="result")return ar(r);if(!sr.has(String(r.type))||Object(r.payload)!==r.payload)return null;return r};var bo=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),cr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class c extends Error{code;constructor(e,r){super(r);this.name="HostRequestError",this.code=e}}var go=()=>Promise.reject(new c("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Pe=()=>Promise.reject(new c("BAD_PATH",`File path must be 1 to ${Ce} characters without NUL or backslash.`)),Ge=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new c("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},p=(e)=>(e.value+=1,`oc-${e.value}`),Ot=(e={})=>{let r=e.target??("window"in globalThis?window:null);if(!r)throw new c("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((t)=>t===r.parent),E=e.requestTimeoutMs??st,a=new Set,T=new Set,R=new Set,S=new Set,b=new Set,w=new Set,H=new Set,z=new Set,y=new Set,U=new Set,de=[],W=null,Y=null,Oe=new Set,Ae=new Set,pe=null,ue=null,Be=!1,ee=new Map,te=new Map,oe=new Map,X=!1,d={value:0},l=null,V=null,_e=!1,Ee=!1,Lt=null,wt=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},P=(t)=>{r.parent.postMessage(t,"*")},Pt=()=>{if(X||r.parent===r||U.size===0||l?.features?.lateGenerateResults!==!0)return;P({channel:u,v:_,type:"generate-late-listen"})},x=(t,o)=>{for(let s of t)try{s(o)}catch(i){console.error(i)}},Gt=(t)=>{if(!(t instanceof MessageEvent))return;if(!n(t.source))return;let o=mt(t.data);if(!o)return;if(o.type==="workspace"){let i=te.get(o.payload.subscriptionId);if(i)x([i],o.payload.snapshot);return}if(o.type==="shells"){let i=oe.get(o.payload.subscriptionId);if(i)x([i],o.payload.snapshot);return}if(o.type==="ready"){if(l=o.payload,V=wt(o.payload.session),x(a,o.payload),x(T,o.payload.directory),x(R,o.payload.session),V)x(S,V);x(b,o.payload.connection),x(w,o.payload.settings),x(H,o.payload.item),Pt();return}if(o.type==="generate-late"){if(U.size===0)de.push(o.payload);else x(U,o.payload);return}if(o.type==="directory"){if(l)l={...l,directory:o.payload.directory};x(T,o.payload.directory);return}if(o.type==="session"){if(l)l={...l,session:o.payload.session};if(!o.payload.session)V=null;else if(V?.sessionId!==o.payload.session.id)V=wt(o.payload.session);x(R,o.payload.session);return}if(o.type==="session-lifecycle"){V=o.payload,x(S,o.payload);return}if(o.type==="connection"){if(l)l={...l,connection:o.payload.connection};x(b,o.payload.connection);return}if(o.type==="settings"){if(l)l={...l,settings:o.payload.settings};x(w,o.payload.settings);return}if(o.type==="item"){if(l)l={...l,item:o.payload.item};x(H,o.payload.item);return}if(o.type==="status-control-event"){x(z,o.payload);return}if(o.type==="popover-closed"){x(y,o.payload);return}if(o.type==="action"){let i=(f)=>{if(!X)P({channel:u,v:_,type:"action-result",id:o.id,payload:f})},m=Y;if(!m){i({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>m(o.payload)).then(()=>i({ok:!0}),(f)=>{let I=(f instanceof Error?f.message:String(f)).trim();i({ok:!1,error:(I||"Action failed.").slice(0,Se)})});return}if(o.type==="file-open"){let i=o.payload;if(ue&&eo(ue,i))return;ue=i,x(Oe,o.payload);return}if(o.type==="file-saved"){x(Ae,o.payload.version);return}if(o.type==="file-snapshot"){let i=(I)=>{if(!X)P({channel:u,v:_,type:"file-snapshot-result",id:o.id,payload:I})},m=(I)=>i({error:(I.trim()||"Could not read the edited file.").slice(0,Se)}),f=pe;if(!f){m("This extension does not edit files.");return}Promise.resolve().then(()=>f(o.payload.purpose)).then((I)=>{if(Qe(I)>ke){m(`The file is over ${ke} ${"bytes"in I?"bytes":"characters"}.`);return}if(I.version.length>Ie){m(`The snapshot version is over ${Ie} characters.`);return}i({snapshot:"bytes"in I?{bytes:I.bytes,version:I.version}:{content:I.content,version:I.version}})},(I)=>m(I instanceof Error?I.message:String(I)));return}if(o.type==="resolve"){let i=(f)=>{P({channel:u,v:_,type:"resolve-result",id:o.id,payload:f})},m=W;if(!m){i({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>m(o.payload)).then((f)=>i({item:f?ne(f):null}),(f)=>{let I=(f instanceof Error?f.message:String(f)).trim();i({error:(I||"Command failed.").slice(0,Se)})});return}let s=ee.get(o.id);if(!s)return;if(clearTimeout(s.timer),ee.delete(o.id),o.ok){s.resolve(o.payload);return}s.reject(new c(o.code,o.error))};r.addEventListener("message",Gt),P({channel:u,v:_,type:"hello"});let C=(t,o=E)=>{if(X||r.parent===r)return Promise.reject(new c("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((s,i)=>{let m=setTimeout(()=>{ee.delete(t.id),i(new c("HOST_TIMEOUT","Host did not answer in time."))},o);ee.set(t.id,{resolve:s,reject:i,timer:m}),P(t)})},g=(t)=>C(t).then(()=>{return}),k={channel:u,v:_},Ke=(t)=>{if(!X&&r.parent!==r)P(t)},Dt=()=>Ke({...k,type:"file-save"}),Ht=(t)=>{if(!bo(t)||!cr(t))return;t.preventDefault(),Dt()},Xt=(t)=>{if(!bo(t)||t.key!=="Escape"||l?.surface!=="popover"||!l.popover)return;t.preventDefault(),Bt(l.popover.id,"escape").catch(()=>{return})},he=()=>{let t=l?.surface==="popover"?l.popover:void 0;if(!t)return;let o=_e||Ee;if(Lt===o)return;Lt=o,Kt(t.id,o).catch(()=>{return})},Re=()=>{if(l?.surface!=="popover"||_e)return;_e=!0,he()},$t=(t)=>{if(l?.surface!=="popover"||t.relatedTarget!==null||!_e)return;_e=!1,he()},Ft=()=>{if(l?.surface!=="popover"||Ee)return;Ee=!0,he()},Vt=()=>{if(l?.surface!=="popover"||!Ee)return;Ee=!1,he()},D=(t,o=1024)=>{if(!t.trim()||t.length>o)throw new c("HOST_REJECTED",`Identity must contain 1 to ${o} characters.`)},je=async(t)=>{if(t.kind!=="projects")D(t.projectId);let o=await C({...k,type:"workspace-read",id:p(d),payload:t});if(!o||!("kind"in o)||!("state"in o)||o.kind!==t.kind)throw new c("HOST_REJECTED","Host did not return workspace data.");return o},ze=async(t,o)=>{if(t.kind!=="projects")D(t.projectId);let s=p(d);te.set(s,o);try{await g({...k,type:"workspace-subscribe",id:p(d),payload:{subscriptionId:s,query:t}})}catch(i){if(te.delete(s),!X)P({...k,type:"workspace-unsubscribe",id:p(d),payload:{subscriptionId:s}});throw i}return()=>{if(!te.delete(s)||X)return;P({...k,type:"workspace-unsubscribe",id:p(d),payload:{subscriptionId:s}})}},qo=async(t,o)=>{if(t.kind==="session")D(t.sessionId);if(t.kind==="project")D(t.projectId);let s=p(d);oe.set(s,o);try{await g({...k,type:"shells-subscribe",id:p(d),payload:{subscriptionId:s,scope:t}})}catch(i){if(oe.delete(s),!X)P({...k,type:"shells-unsubscribe",id:p(d),payload:{subscriptionId:s}});throw i}return()=>{if(!oe.delete(s)||X)return;P({...k,type:"shells-unsubscribe",id:p(d),payload:{subscriptionId:s}})}},xe=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>Ye))throw new c("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!re(t.value))throw new c("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>Je)throw new c("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&l?.features?.deviceStorage!==!0)throw new c("UNSUPPORTED","This host does not support device storage.");let o=await C({...k,type:"storage",id:p(d),payload:t});if(!o||!("storage"in o)||o.op!==t.op)throw new c("HOST_REJECTED","Host did not return storage data.");return o},Bt=(t,o)=>l?.features?.popovers!==!0&&!(l?.surface==="popover"&&l.popover?.id===t)?Promise.reject(new c("UNSUPPORTED","This host does not support popovers.")):g({...k,type:"popover-close",id:p(d),payload:o?{id:t,reason:o}:{id:t}}),Kt=(t,o)=>l?.features?.popovers!==!0&&!(l?.surface==="popover"&&l.popover?.id===t)?Promise.reject(new c("UNSUPPORTED","This host does not support popovers.")):g({...k,type:"popover-anchor",id:p(d),payload:{id:t,active:o}});return r.addEventListener("keydown",Xt,!0),r.addEventListener("pointerover",Re),r.addEventListener("pointermove",Re),r.addEventListener("pointerout",$t),r.addEventListener("focus",Ft),r.addEventListener("blur",Vt),{onAction:(t)=>(Y=t,()=>{if(Y===t)Y=null}),listProjects:async()=>{let t=await je({kind:"projects"});if(t.kind!=="projects")throw new c("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let o=await je({kind:"worktrees",projectId:t});if(o.kind!=="worktrees")throw new c("HOST_REJECTED","Expected worktrees.");return o},listSessions:async(t)=>{let o=await je({kind:"sessions",projectId:t});if(o.kind!=="sessions")throw new c("HOST_REJECTED","Expected sessions.");return o},onProjects:(t)=>ze({kind:"projects"},(o)=>{if(o.kind==="projects")t(o)}),onWorktrees:(t,o)=>ze({kind:"worktrees",projectId:t},(s)=>{if(s.kind==="worktrees")o(s)}),onSessions:(t,o)=>ze({kind:"sessions",projectId:t},(s)=>{if(s.kind==="sessions")o(s)}),onRunningShells:(t,o)=>qo(t,o),readShellOutput:async(t,o)=>{D(t,be);let s=o?.cursor;if(s!==void 0&&(!Number.isInteger(s)||s<0))throw new c("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let i=o?.tailBytes;if(i!==void 0&&(!Number.isInteger(i)||i<1||i>ge))throw new c("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${ge}.`);let f=await C({...k,type:"shell-output",id:p(d),payload:{shellId:t,cursor:s,tailBytes:i}});if(!f||typeof f.output!=="string"||!Number.isFinite(f.cursor))throw new c("HOST_REJECTED","Host did not return shell output.");return f},stopShell:async(t)=>{if(D(t,be),(await C({...k,type:"shell-stop",id:p(d),payload:{shellId:t}}))?.stopped!==!0)throw new c("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{D(t),await g({...k,type:"open-session",id:p(d),payload:{sessionId:t}})},storage:{get:async(t,o)=>{let s=Ge(o),i={op:"get",key:t};if(s)i.scope=s;let m=await xe(i);return m.op==="get"&&m.found?m.value:void 0},set:async(t,o,s)=>{let i=Ge(s),m={op:"set",key:t,value:o};if(i)m.scope=i;await xe(m)},delete:async(t,o)=>{let s=Ge(o),i={op:"delete",key:t};if(s)i.scope=s;await xe(i)},keys:async(t)=>{let o=Ge(t),s={op:"keys"};if(o)s.scope=o;let i=await xe(s);if(i.op!=="keys")throw new c("HOST_REJECTED","Expected storage keys.");return i.keys}},onReady:(t)=>{if(a.add(t),l)t(l);return()=>{a.delete(t)}},onDirectory:(t)=>{if(T.add(t),l)t(l.directory);return()=>{T.delete(t)}},onSession:(t)=>{if(R.add(t),l)t(l.session);return()=>{R.delete(t)}},onSessionLifecycle:(t)=>{if(S.add(t),V)t(V);return()=>{S.delete(t)}},onConnection:(t)=>{if(b.add(t),l)t(l.connection);return()=>{b.delete(t)}},onSettings:(t)=>{if(w.add(t),l)t(l.settings);return()=>{w.delete(t)}},onItem:(t)=>{if(H.add(t),l)t(l.item);return()=>{H.delete(t)}},onStatusControl:(t)=>(z.add(t),()=>{z.delete(t)}),onPopoverClosed:(t)=>(y.add(t),()=>{y.delete(t)}),setStatusControls:(t)=>{if(l?.features?.statusControls!==!0)return Promise.reject(new c("UNSUPPORTED","This host does not support status controls."));if(!Zt(t))return Promise.reject(new c("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return g({...k,type:"status-controls",id:p(d),payload:{controls:t}})},openPopover:(t)=>{if(l?.features?.popovers!==!0)return Promise.reject(new c("UNSUPPORTED","This host does not support popovers."));if(!et(t))return Promise.reject(new c("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return g({...k,type:"popover-open",id:p(d),payload:t})},closePopover:Bt,setPopoverAnchorActive:Kt,onResolve:(t)=>(W=t,()=>{if(W===t)W=null}),toast:(t)=>{let o=t.message.trim();if(!o||o.length>ye)return Promise.reject(new c("HOST_REJECTED",`Toast message must contain 1 to ${ye} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Ue))return Promise.reject(new c("HOST_REJECTED",`Toast copy text must contain 1 to ${Ue} characters.`));return g({channel:u,v:_,type:"toast",id:p(d),payload:{...t,message:o}})},openUrl:(t)=>g({channel:u,v:_,type:"open-url",id:p(d),payload:{url:t}}),openCommit:(t)=>nt(t)?g({channel:u,v:_,type:"open-commit",id:p(d),payload:{sha:t}}):Promise.reject(new c("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>g({channel:u,v:_,type:"open-surface",id:p(d),payload:{surfaceId:t}}),writeClipboard:(t)=>g({channel:u,v:_,type:"clipboard-write",id:p(d),payload:{text:t}}),compose:(t)=>g({channel:u,v:_,type:"compose",id:p(d),payload:t}),attach:(t)=>g({channel:u,v:_,type:"attach",id:p(d),payload:ne(t)}),startSession:async(t)=>{if(t.projectId!==void 0)D(t.projectId);let o=t.worktree;if(o&&o!==!0)if(o.kind==="existing")D(o.directory);else{if(o.name!==void 0)D(o.name,200);if(o.baseBranch!==void 0)D(o.baseBranch,200)}let s=await C({channel:u,v:_,type:"start-session",id:p(d),payload:ct(t)},e.requestTimeoutMs??180000);if(!ot(s))throw new c("HOST_REJECTED","Host did not return a session.");return s},prompt:(t)=>C({channel:u,v:_,type:"prompt",id:p(d),payload:lt(t)}).then((o)=>{if(!rt(o))throw new c("HOST_REJECTED","Host did not return a prompt result.");return o}),sessionLink:(t)=>g({channel:u,v:_,type:"session-link",id:p(d),payload:ne(t)}),close:()=>g({channel:u,v:_,type:"close",id:p(d)}),oauthStart:()=>g({channel:u,v:_,type:"oauth-start",id:p(d)}),oauthDisconnect:()=>g({channel:u,v:_,type:"oauth-disconnect",id:p(d)}),request:(t)=>(Le(t.path)?C({channel:u,v:_,type:"request",id:p(d),payload:t}):go()).then((o)=>{if(!we(o))throw new c("HOST_REJECTED","Host request result was empty.");return o}),serviceRequest:(t)=>(Le(t.path)?C({channel:u,v:_,type:"service-request",id:p(d),payload:t}):go()).then((o)=>{if(!we(o))throw new c("HOST_REJECTED","Host service request result was empty.");return o}),serviceStatus:()=>C({channel:u,v:_,type:"service-status",id:p(d)}).then((t)=>{if(!ut(t))throw new c("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(se(t)?C({channel:u,v:_,type:"file-read",id:p(d),payload:{path:t}}):Pe()).then((o)=>{if(!_t(o))throw new c("HOST_REJECTED","Host did not return file content.");return o}),writeFile:(t,o)=>{if(!se(t))return Pe();if(o.length>ve)return Promise.reject(new c("FILE_TOO_LARGE",`Content is over ${ve} characters.`));return C({channel:u,v:_,type:"file-write",id:p(d),payload:{path:t,content:o}}).then((s)=>{if(!Et(s))throw new c("HOST_REJECTED","Host did not confirm the write.");return s})},listDir:(t)=>(se(t)?C({channel:u,v:_,type:"file-list",id:p(d),payload:{path:t}}):Pe()).then((o)=>{if(!St(o))throw new c("HOST_REJECTED","Host did not return directory entries.");return o}),stat:(t)=>(se(t)?C({channel:u,v:_,type:"file-stat",id:p(d),payload:{path:t}}):Pe()).then((o)=>{if(!Tt(o))throw new c("HOST_REJECTED","Host did not return file status.");return o}),generate:(t)=>{let o=t.prompt.trim(),s=t.system?.trim();if(o.length===0||o.length>Ne)return Promise.reject(new c("HOST_REJECTED",`Prompt must be 1 to ${Ne} characters.`));if(s!==void 0&&(s.length===0||s.length>Me))return Promise.reject(new c("HOST_REJECTED",`System prompt must be 1 to ${Me} characters.`));let i=t.maxOutputTokens===void 0?void 0:Math.min(it,Math.max(1,Math.floor(t.maxOutputTokens)));if(i!==void 0&&!Number.isFinite(i))return Promise.reject(new c("HOST_REJECTED","maxOutputTokens must be a number."));let m={prompt:o};if(s!==void 0)m.system=s;if(i!==void 0)m.maxOutputTokens=i;return C({channel:u,v:_,type:"generate",id:p(d),payload:m},e.requestTimeoutMs??at).then((f)=>{if(!ft(f))throw new c("HOST_REJECTED","Host did not return generated text.");return f})},onLateGenerateResult:(t)=>{U.add(t);for(let o of de.splice(0))x([t],o);return Pt(),()=>{U.delete(t)}},setBadge:(t)=>g({channel:u,v:_,type:"badge",id:p(d),payload:{count:dt(t)}}),setHeight:(t)=>g({channel:u,v:_,type:"resize",id:p(d),payload:{height:pt(t)}}),onFileOpen:(t)=>{if(Oe.add(t),!Be)Be=!0,r.addEventListener("keydown",Ht,!0);if(ue)t(ue);return()=>{Oe.delete(t)}},onFileSnapshot:(t)=>(pe=t,()=>{if(pe===t)pe=null}),onFileSaved:(t)=>(Ae.add(t),()=>{Ae.delete(t)}),reportFileChange:(t)=>Ke({...k,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:Dt,reportFileUnsupported:()=>Ke({...k,type:"file-unsupported"}),dispose:()=>{for(let t of te.keys())P({...k,type:"workspace-unsubscribe",id:p(d),payload:{subscriptionId:t}});te.clear();for(let t of oe.keys())P({...k,type:"shells-unsubscribe",id:p(d),payload:{subscriptionId:t}});if(oe.clear(),X=!0,W=null,Y=null,pe=null,Oe.clear(),Ae.clear(),Be)r.removeEventListener("keydown",Ht,!0);r.removeEventListener("message",Gt),r.removeEventListener("keydown",Xt,!0),r.removeEventListener("pointerover",Re),r.removeEventListener("pointermove",Re),r.removeEventListener("pointerout",$t),r.removeEventListener("focus",Ft),r.removeEventListener("blur",Vt);for(let t of ee.values())clearTimeout(t.timer),t.reject(new c("HOST_UNAVAILABLE","Host client was disposed."));ee.clear(),a.clear(),T.clear(),R.clear(),S.clear(),b.clear(),w.clear(),H.clear(),z.clear(),y.clear(),U.clear(),de.length=0}}};var ko=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var qr=new Set(ko);var Io=["none","agent","user"];var tn=new Set(Io);var lr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],dr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],yo=(e,r)=>{r.style.colorScheme=e.mode;for(let[n,E]of lr)r.style.setProperty(n,e.tokens[E]);for(let[n,E,a]of dr){let T=e.tokens[a]??"";r.style.setProperty(n,T),r.style.setProperty(E,T)}r.style.setProperty("font-family",e.tokens.font),r.style.setProperty("font-size","0.875rem"),r.style.setProperty("line-height","1.45"),r.style.setProperty("color",e.tokens.foreground)},At=(e,r)=>{if(yo(e.theme,r),r.dataset)r.dataset.ocSurface=e.surface,r.dataset.ocTheme=e.theme.mode};var pr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},O=(e,r)=>`var(--${e}, var(--oc-${pr[e]}, ${r}))`,K=O("surface-background","transparent"),He=O("surface-elevated","transparent"),ie=O("surface-elevated-foreground","inherit"),G=O("surface-foreground","inherit"),A=O("surface-muted-foreground","gray"),ur=O("surface-muted","transparent"),J=O("interactive-border","currentColor"),N=O("interactive-hover","transparent"),Z=O("interactive-active","transparent"),ht=O("interactive-selection","transparent"),Rt=O("interactive-selection-foreground","inherit"),B=O("primary","currentColor"),xt=O("primary-text","inherit"),bt=O("error-text","inherit"),_r=O("font-sans","inherit"),gt=O("font-mono","monospace"),No=O("radius","9px"),kt=`calc(${No} - 2px)`,Uo=`calc(${No} - 4px)`,h=(e,r,n="transparent")=>`color-mix(in srgb, ${e} ${r}%, ${n})`,Co=`background-image: linear-gradient(${N}, ${N});`,It=(e,r="0.5px")=>`box-shadow: inset 0 0 0 ${r} ${e}, var(--oc-sdk-field-lift);`,yt="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",vo="box-shadow: var(--oc-sdk-lit);",Ut=`inset 0 0.5px 0 0 ${h(G,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,Er=`
:root {
  --oc-sdk-edge: ${h(G,16)};
  --oc-sdk-field-bg: ${He};
  --oc-sdk-raised-bg: ${K};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${h(G,14)};
  --oc-sdk-field-bg: ${h(K,50,He)};
  --oc-sdk-raised-bg: ${He};
  --oc-sdk-field-lift: ${Ut};
  --oc-sdk-raised-lift: ${Ut};
  --oc-sdk-lit: ${Ut};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,De=(e)=>{let r=O(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${O(`${e}-text`,"inherit")}; }`},Sr=`
.oc-sdk { box-sizing: border-box; font-size: 0.875rem; line-height: 1.45; }
.oc-sdk *, .oc-sdk *::before, .oc-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.oc-sdk) :where(button, input, textarea), :where(button.oc-sdk, input.oc-sdk, textarea.oc-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.oc-sdk) :where(button), :where(button.oc-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.oc-sdk button:disabled, button.oc-sdk:disabled, .oc-sdk[aria-disabled="true"], .oc-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }

.oc-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 32px; padding: 0 12px; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; }
.oc-sdk-btn[data-size="sm"] { gap: 6px; height: 28px; padding: 0 10px; font-size: 0.8125rem; }
.oc-sdk-btn[data-size="xs"] { gap: 4px; height: 24px; padding: 0 8px; font-size: 0.75rem; }
.oc-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.oc-sdk-btn > .oc-sdk-spinner-ring { width: 14px; height: 14px; }

.oc-sdk-field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-field-note { font-size: 0.75rem; }
.oc-sdk-input { display: block; width: 100%; min-width: 0; height: 32px; padding: 0 10px; border: 0; font-size: 0.875rem; line-height: 1.45; appearance: none; }
textarea.oc-sdk-input { height: auto; padding: 8px 10px; resize: vertical; }

.oc-sdk-search { position: relative; min-width: 0; }
.oc-sdk-search .oc-sdk-input { padding-left: 34px; padding-right: 34px; }
.oc-sdk-search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); pointer-events: none; }
.oc-sdk-search-clear { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: 24px; height: 24px; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-clear { display: inline-flex; }

.oc-sdk-select { position: relative; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-trigger { display: inline-flex; align-items: center; gap: 6px; align-self: flex-start; width: auto; max-width: 100%; min-width: 0; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; text-align: left; }
.oc-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-trigger-chevron { flex: 0 0 auto; }
.oc-sdk-popup { position: fixed; z-index: 50; display: flex; flex-direction: column; gap: 2px; min-width: 160px; max-width: calc(100vw - 16px); max-height: min(320px, calc(100vh - 16px)); overflow: auto; padding: 4px; border: 1px solid transparent; }
.oc-sdk-popup-search { flex: 0 0 auto; padding: 2px 2px 4px; }
.oc-sdk-popup-search .oc-sdk-input { height: 28px; font-size: 0.8125rem; }
.oc-sdk-option { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; font-size: 0.8125rem; text-align: left; }
.oc-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; }
.oc-sdk-option-check { flex: 0 0 auto; display: inline-flex; width: 14px; visibility: hidden; }
.oc-sdk-option[aria-selected="true"] > .oc-sdk-option-check { visibility: visible; }
.oc-sdk-popup-empty { padding: 8px; font-size: 0.8125rem; }

.oc-sdk-check { display: inline-flex; align-items: flex-start; gap: 8px; width: 100%; text-align: left; }
.oc-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; margin-top: 3px; border: 1px solid transparent; }
.oc-sdk-check-box > svg { display: none; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box > svg { display: block; }
.oc-sdk-check-thumb { flex: 0 0 auto; position: relative; width: 36px; height: 20px; }
.oc-sdk-check-thumb::after { content: ""; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; }
.oc-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.oc-sdk-check-label { font-size: 0.875rem; }
.oc-sdk-check-desc { font-size: 0.75rem; }

.oc-sdk-tabs { display: inline-flex; gap: 2px; padding: 2px; max-width: 100%; overflow: auto; }
.oc-sdk-tab { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; font-weight: 500; white-space: nowrap; }
.oc-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; }

.oc-sdk-badge { display: inline-flex; align-items: center; padding: 1px 6px; font-size: 11px; font-weight: 500; line-height: 16px; white-space: nowrap; }

.oc-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.oc-sdk-row { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; text-align: left; }
.oc-sdk-row-lead { flex: 0 0 auto; width: 64px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.oc-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-list-empty { padding: 16px 8px; text-align: center; font-size: 0.8125rem; }

.oc-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 40px 16px; text-align: center; }
.oc-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.oc-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; }
.oc-sdk-empty-action { margin-top: 12px; }

@keyframes oc-sdk-spin { to { transform: rotate(360deg); } }
.oc-sdk-spinner { display: inline-flex; align-items: center; gap: 8px; font-size: 0.8125rem; }
.oc-sdk-spinner-ring { width: 16px; height: 16px; border: 2px solid transparent; animation: oc-sdk-spin .8s linear infinite; }
.oc-sdk-spinner[data-size="sm"] .oc-sdk-spinner-ring { width: 12px; height: 12px; }

.oc-sdk-banner { display: flex; align-items: flex-start; gap: 12px; padding: 8px 12px; border: 1px solid transparent; }
.oc-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.oc-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-banner-body { font-size: 0.8125rem; }
.oc-sdk-banner-action { flex: 0 0 auto; }

.oc-sdk-separator { display: flex; align-items: center; gap: 8px; width: 100%; margin: 8px 0; font-size: 0.75rem; }
.oc-sdk-separator::before, .oc-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; }
.oc-sdk-separator[data-labeled="false"]::after { display: none; }
.oc-sdk-popup > .oc-sdk-separator { margin: 4px 0; }

.oc-sdk-progress { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-progress-track { height: 6px; overflow: hidden; }
.oc-sdk-progress-fill { height: 100%; transform-origin: left; transition: transform 200ms ease-out; }
.oc-sdk-progress-value { display: inline-flex; align-items: center; gap: 2px; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { font-weight: 600; }

.oc-sdk-menu { position: relative; display: inline-flex; }

.oc-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.oc-sdk-text img { display: block; max-width: 100%; margin: 8px 0; }
`,Mo=`${Er}
.oc-sdk { color: ${G}; font-family: ${_r}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${Co} }
.oc-sdk-mono { font-family: ${gt}; }
.oc-sdk-muted { color: ${A}; }
${De("success")}${De("warning")}${De("error")}${De("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${B}; --oc-sdk-tone-text: ${xt}; }

.oc-sdk-btn { border-radius: ${kt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Uo}; }
.oc-sdk-btn[data-variant="default"] { color: ${xt}; background: ${h(B,10,K)}; border-color: ${h(B,12)}; ${vo} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${h(B,16,K)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${h(B,22,K)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${ur}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${N}, ${N}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${Z}, ${Z}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${ie}; ${yt} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${N}, ${N}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${Z}, ${Z}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${N}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${Z}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${O("status-error","red")}; color: ${bt}; background: ${h("var(--oc-sdk-tone)",7,K)}; border-color: ${h("var(--oc-sdk-tone)",12)}; ${vo} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${h("var(--oc-sdk-tone)",9,K)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${h("var(--oc-sdk-tone)",11,K)}; box-shadow: none; }

.oc-sdk-field-note { color: ${A}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${bt}; }
.oc-sdk-input { border-radius: ${kt}; background: var(--oc-sdk-field-bg); color: ${ie}; ${It("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${A}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${N}, ${N}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${It(h(G,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${It(O("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${gt}; }

.oc-sdk-search-icon { color: ${A}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${B}; }
.oc-sdk-search-clear { border-radius: ${Uo}; color: ${A}; }
.oc-sdk-search-clear:hover { background: ${N}; color: ${G}; }

.oc-sdk-trigger { border-radius: ${kt}; background: var(--oc-sdk-raised-bg); color: ${ie}; ${yt} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${N}, ${N}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${Z}, ${Z}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${A}; }
.oc-sdk-trigger-chevron { color: ${A}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${ie}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${He}; background-clip: padding-box; color: ${ie}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${N}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${ht}; color: ${Rt}; }
.oc-sdk-option-check { color: ${G}; }
.oc-sdk-option[data-destructive="true"] { color: ${bt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${h(O("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${A}; }
.oc-sdk-popup-empty { color: ${A}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${J}; border-radius: 4px; color: ${G}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${h(G,60,J)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${J}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${K}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${B}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Co} }
.oc-sdk-check-desc { color: ${A}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${h(G,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${A}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${G}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Rt}; background: ${ht}; border-color: ${J}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${ie}; background: var(--oc-sdk-raised-bg); ${yt} }
.oc-sdk-tab-count { color: ${A}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${h(G,6)}; color: ${A}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${h("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${N}; }
.oc-sdk-row[aria-selected="true"] { background: ${ht}; color: ${Rt}; }
.oc-sdk-row-lead { font-family: ${gt}; color: ${A}; }
.oc-sdk-row-sub { color: ${A}; }
.oc-sdk-row-meta { color: ${A}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${A}; }

.oc-sdk-empty-body { color: ${A}; }

.oc-sdk-spinner { color: ${A}; }
.oc-sdk-spinner-ring { border-color: ${J}; border-top-color: ${B}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${h("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${A}; }

.oc-sdk-separator { color: ${A}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${h(J,40)}; }

.oc-sdk-progress-label { color: ${A}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${h(G,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${B}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${O("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${O("success-text","inherit")}; }

.oc-sdk-text a { color: ${xt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${h(J,60)}; }
`,v=`
${We}
${Sr}
${Mo}`;var Q={util:"#4d9fff",mem:"#e8c33a",temp:"#b07fe8",power:"#3ddc84",cpu:"#ff8c42",npu:"#ec60a0",systemRam:"#89929c"};function Lo(e,r,n,E,a){let T=e.length,R=r.length===T?r:e.map((y,U)=>n-(T-1-U)*1000),S=a.width-2*a.pad,b=[],w=null;for(let y=0;y<T;y++){let U=e[y];if(U===null)continue;let de=(n-R[y]+E)/1000,W=a.width-a.pad-de/a.windowSec*S,Y=Math.min(Math.max(U,0),a.max);b.push({x:W,y:a.height-a.pad-Y/a.max*(a.height-2*a.pad)}),w=U}let H=b.findIndex((y)=>y.x>=0),z=H<0?Math.max(0,b.length-1):Math.max(0,H-1);if(b.splice(0,z),b.length&&w!==null){let y=a.width-a.pad,U=b[b.length-1];if(U.x<y)b.push({x:y,y:U.y})}return b}var vt=(e)=>e.map((r)=>`${r.x.toFixed(1)},${r.y.toFixed(1)}`).join(" "),wo=(e,r)=>`${e[0].x.toFixed(1)},${r} ${vt(e)} ${e[e.length-1].x.toFixed(1)},${r}`;var Po=21;var Go=1000;var Ar=["util","mem","temp","power","cpu","npu"],Do="seriesVisibilityV1",hr={util:!0,mem:!0,temp:!0,power:!0,cpu:!0,npu:!0},Nt=(e)=>{let r={...hr};if(!e||typeof e!=="object"||Array.isArray(e))return r;for(let n of Ar){let E=e[n];if(typeof E==="boolean")r[n]=E}return r};var Ho="sourceConfigV1";var Rr=[{id:"evo-x2",label:"evo-x2.home.lan",host:"evo-x2.home.lan"},{id:"proxmox",label:"proxmox.home.lan",host:"proxmox.home.lan"}],xr=/^(?=.{1,253}$)(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)(?:\.(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?))*\.?$/,br=/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,63}$/;function Xo(e){let r=e.trim().replace(/\.$/,"").toLowerCase();if(!xr.test(r))throw Error("Enter a hostname or IPv4 address only (no http://, port, or path).");return r}function gr(e){if(!e||typeof e!=="object"||Array.isArray(e))return null;let r=e;if(typeof r.id!=="string"||!br.test(r.id))return null;if(typeof r.label!=="string"||r.label.trim().length<1||r.label.length>80)return null;if(typeof r.host!=="string")return null;try{return{id:r.id,label:r.label.trim(),host:Xo(r.host)}}catch{return null}}function $o(e){if(!e||typeof e!=="object"||Array.isArray(e))return{selectedSourceId:"local",remoteSources:Rr.map((R)=>({...R}))};let r=e,n=[],E=new Set,a=new Set;if(Array.isArray(r.remoteSources))for(let R of r.remoteSources.slice(0,50)){let S=gr(R);if(!S||E.has(S.id)||a.has(S.host))continue;n.push(S),E.add(S.id),a.add(S.host)}return{selectedSourceId:typeof r.selectedSourceId==="string"&&(r.selectedSourceId==="local"||E.has(r.selectedSourceId))?r.selectedSourceId:"local",remoteSources:n}}function Fo(e){if(e.selectedSourceId==="local")return{mode:"local"};let r=e.remoteSources.find(({id:n})=>n===e.selectedSourceId);if(!r)return{mode:"local"};return{mode:"remote",label:r.label,host:Xo(r.host)}}var q=Ot(),Ko=document.querySelector("#root");if(!Ko)throw Error("Missing #root");var jo=document.createElement("style");jo.textContent=`
*{box-sizing:border-box}
[data-oc-theme="dark"]{color-scheme:dark}
[data-oc-theme="light"]{color-scheme:light}
html,body{margin:0;background:transparent;color:var(--oc-fg);font:11px/1.35 var(--oc-font)}
#root{display:flex;flex-direction:column;gap:5px;padding:4px 8px}
.summary{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--oc-muted);font-variant-numeric:tabular-nums}
svg{display:block;width:100%;height:48px;overflow:hidden}
`;document.head.append(jo);var ce=document.createElement("div");ce.className="summary";ce.textContent="Waiting for nvstats-service…";var F=document.createElementNS("http://www.w3.org/2000/svg","svg");F.setAttribute("viewBox","0 0 300 48");F.setAttribute("preserveAspectRatio","none");F.setAttribute("role","img");F.setAttribute("aria-label","Recent GPU, GTT, temperature, power and CPU activity");Ko.append(ce,F);var kr=[["util",Q.util],["mem",Q.mem],["temp",Q.temp],["power",Q.power],["cpu",Q.cpu],["npu",Q.npu]];function Ir(e){F.replaceChildren();let r=performance.now()-Wo;for(let[n,E]of kr){let a=n;if(!Jo[a])continue;let T=Lo(e[a],e.times??[],zo,r,{width:300,height:48,pad:2,max:100,windowSec:Po-1});if(T.length<2)continue;let R=document.createElementNS("http://www.w3.org/2000/svg","polygon");R.setAttribute("points",wo(T,48)),R.setAttribute("fill",E),R.setAttribute("opacity","0.08"),F.append(R);let S=document.createElementNS("http://www.w3.org/2000/svg","polyline");S.setAttribute("points",vt(T)),S.setAttribute("fill","none"),S.setAttribute("stroke",E),S.setAttribute("stroke-width","1.5"),S.setAttribute("stroke-linecap","round"),S.setAttribute("stroke-linejoin","round"),F.append(S)}}var fe=null,zo=0,Wo=performance.now(),le=0,Vo=0,Yo=(e)=>{if(le=requestAnimationFrame(Yo),e-Vo<33||!fe)return;Vo=e,Ir(fe)},Mt=(e)=>e===null?"—":`${Math.round(e)}%`,Bo=async()=>{try{let e=await q.serviceRequest({method:"GET",path:"/stats"});if(e.status!==200)throw Error("service unavailable");let r=JSON.parse(e.body);if(!r.sourceAvailable){ce.textContent=`${r.sourceLabel||"nvstats-service"} unavailable${r.sourceError?` · ${r.sourceError}`:""}`,fe=null,F.replaceChildren();return}let{gpu:n,sys:E,npu:a}=r.sample,T=n.mem_used===null?"—":(n.mem_used/1024).toFixed(1),R=n.mem_total===null?"—":(n.mem_total/1024).toFixed(1),S=(E.ram_used/1073741824).toFixed(1),b=(E.ram_total/1073741824).toFixed(1),w=n.temp===null?"—":`${Math.round(n.temp)}°C`,H=n.power_w===null?"—":`${Math.round(n.power_w)}W`,z=r.sourceLabel&&r.sourceLabel!=="Local D-Bus"?`${r.sourceLabel} · `:"";ce.textContent=`${z}GPU ${Mt(n.util)} · GTT ${T}/${R} GiB · ${w} · ${H} · CPU ${Mt(E.cpu)}${a?.present?` · NPU ${a.readable?Mt(a.util):"N/A"}`:""} · RAM ${S}/${b} GiB`,fe=r.history,zo=r.timestamp,Wo=performance.now()}catch{ce.textContent="nvstats-service unavailable",fe=null,F.replaceChildren()}},me,Jo=Nt(void 0),Zo=()=>{if(me)return;if(!le)le=requestAnimationFrame(Yo);Bo(),me=setInterval(()=>void Bo(),Go)},Qo=()=>{if(le)cancelAnimationFrame(le);if(le=0,me)clearInterval(me);me=void 0};q.onReady((e)=>{At(e,document.documentElement),(async()=>{try{Jo=Nt(await q.storage.get(Do))}catch(r){console.warn("Could not load onvtop graph visibility",r)}try{let r=$o(await q.storage.get(Ho));if((await q.serviceRequest({method:"POST",path:"/source",body:JSON.stringify(Fo(r))})).status!==200)throw Error("Could not apply telemetry source")}catch(r){console.warn("Could not load onvtop source configuration",r)}q.setHeight(68),Zo()})()});document.addEventListener("visibilitychange",()=>document.visibilityState==="visible"?Zo():Qo());window.addEventListener("pagehide",()=>{Qo(),q.dispose()});})();
