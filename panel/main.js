(()=>{var u="openchamber.sdk",E=1;var rt=`
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
`;function Eo(e){let r=e.documentElement;if(r.hasAttribute("data-oc-scrollbar-activity"))return;r.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(_)=>{let p=_.target===e?r:_.target;if(!(p instanceof Element))return;if(!p.hasAttribute("data-oc-scrolling"))p.setAttribute("data-oc-scrolling","");let x=n.get(p);if(x!==void 0)clearTimeout(x);n.set(p,setTimeout(()=>{n.delete(p),p.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var ir=`(${Eo.toString()})(document);`;var nt=128,st=65536;var ve=128;var Ne=65536;var fo=/^[a-z][a-z0-9-]{0,39}$/;var _o=(e)=>Object(e)===e&&!Array.isArray(e),it=(e,r)=>Object.keys(e).every((n)=>r.includes(n)),So=(e)=>String(e)===e&&e.length>=1&&e.length<=60,To=(e)=>String(e)===e&&e.length>=1&&e.length<=80,mo=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let r=new Set;for(let n of e){if(!_o(n)||!fo.test(n.id)||!So(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(r.has(n.id))return!1;if(r.add(n.id),n.kind==="button"){if(!it(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!it(n,["kind","id","label","value","options","disabled"]))return!1;if(!To(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let _=new Set;for(let p of n.options){if(!_o(p)||!it(p,["value","label"])||!To(p.value)||!So(p.label)||_.has(p.value))return!1;_.add(p.value)}if(!_.has(n.value))return!1}return!0};var Oo=["{id}","{segment}","{segments+}"];var Br=new Set(Oo);var ho=["turn-finished","turn-failed","permission-asked","question-asked"];var jr=new Set(ho);var Me=20000000,we=256;var at=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,Ao=(e,r)=>{if(e.path!==r.path||e.readOnly!==r.readOnly)return!1;if(e.encoding==="text"||r.encoding==="text")return e.encoding==="text"&&r.encoding==="text"&&e.content===r.content;if(e.bytes.byteLength!==r.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==r.bytes[n])return!1;return!0};var xo=/^[A-Za-z0-9_-]{1,80}$/;var Ro=["left","right","top","bottom"];var bo=(e,r=0,n={remaining:16000})=>{if(--n.remaining<0||r>=32)return!1;if(e===null)return!0;let _=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let p of _)if(!bo(p,r+1,n))return!1;return!0},ct=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((r)=>/^(0|[1-9]\d*)$/.test(r)&&Number(r)<e.length)&&e.every(ct);if(Object(e)===e){let r=Object.getPrototypeOf(e);return(r===null||r===Object.prototype)&&Object.values(e).every(ct)}return String(e)===e||Number.isFinite(e)},lt=(e)=>{try{if(String(e.id)!==e.id||!xo.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Ro.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!bo(e.data)||!ct(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var ko=["file","directory","other","missing"],pt=(e)=>Boolean(e&&"sessionId"in e),ut=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var yo=/^[0-9a-f]{7,64}$/i,Et=(e)=>yo.test(e),Le=500,Pe=32000,Io=16000,Uo=128,Co=200,vo=2000,No=16000,Mo=80,wo=200,Lo=16000;var Po=2000;var _t=20000,Ge=1024,De=2000000;var He=64000,Xe=8000,St=4000;var Tt=960000;var Go=999,Do=1e4,Ae=500,Ho=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Xo=["stopped","starting","ready","failed"],cr=new Set(Ho),$o=(e)=>cr.has(e),Fo=(e)=>e&&$o(e)?e:"HOST_REJECTED",pe=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(pe);if(Object(e)===e)return Object.values(e).every(pe);return!1},Vo=(e)=>pe(e)&&JSON.stringify(e).length<=Lo,go=(e)=>e?.trim().slice(0,wo)??"",ue=(e)=>{let r=e.id.trim().slice(0,Uo),n=e.title.trim().slice(0,Co),_=e.url.trim().slice(0,vo),p=e.text?.trim().slice(0,No),x=e.author?.trim().slice(0,Mo),H=e.kind==="pull"?"pull":"issue",I={providerId:e.providerId.trim(),id:r,title:n||r,url:_,kind:H};if(p)I.text=p;if(x)I.author=x;if(H==="pull"){let v=go(e.branches?.head),f=go(e.branches?.base);if(v&&f)I.branches={head:v,base:f}}if(Vo(e.data))I.data=e.data;return I},ft=(e)=>{let r=ue(e);if(e.projectId)r.projectId=e.projectId;if(e.navigation)r.navigation=e.navigation;if(e.worktree)r.worktree=e.worktree;return r},mt=(e)=>{let r={text:e.text.trim().slice(0,Io)};if(e.send)r.send=!0;return r},Ot=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Go,Math.max(0,Math.round(e)))},ht=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Do,Math.max(0,Math.ceil(e)))};var Ee=(e)=>e.length>0&&e.length<=Ge&&!e.includes("\x00")&&!e.includes("\\");var $e=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Po)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},lr=new Set(Xo),At=(e)=>Boolean(e&&"status"in e&&lr.has(String(e.status))&&!("body"in e)),Fe=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),xt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Rt=(e)=>Boolean(e&&"written"in e&&e.written===!0),bt=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),dr=new Set(ko),gt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&dr.has(String(e.kind))&&Number.isFinite(e.size)),kt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),pr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),ur=(e)=>Object(e)===e?e:null,dt=(e)=>String(e)===e&&e.length>0,Er=(e)=>{if(!dt(e.id))return null;if(e.ok===!0){let r={channel:u,v:E,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)r.payload=e.payload;return r}if(e.ok===!1&&dt(e.error))return{channel:u,v:E,type:"result",id:e.id,ok:!1,error:e.error,code:Fo(dt(e.code)?e.code:void 0)};return null},yt=(e)=>{let r=ur(e);if(!r||r.channel!==u||r.v!==E)return null;if(r.type==="result")return Er(r);if(!pr.has(String(r.type))||Object(r.payload)!==r.payload)return null;return r};var Bo=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),_r=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class a extends Error{code;constructor(e,r){super(r);this.name="HostRequestError",this.code=e}}var Ko=()=>Promise.reject(new a("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Ve=()=>Promise.reject(new a("BAD_PATH",`File path must be 1 to ${Ge} characters without NUL or backslash.`)),Be=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new a("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},d=(e)=>(e.value+=1,`oc-${e.value}`),It=(e={})=>{let r=e.target??("window"in globalThis?window:null);if(!r)throw new a("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((t)=>t===r.parent),_=e.requestTimeoutMs??_t,p=new Set,x=new Set,H=new Set,I=new Set,v=new Set,f=new Set,S=new Set,B=new Set,ae=new Set,N=new Set,fe=[],J=null,F=null,P=new Set,Q=new Set,Z=null,q=null,me=!1,ce=new Map,le=new Map,de=new Map,V=!1,l={value:0},c=null,K=null,Oe=!1,he=!1,eo=null,to=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},G=(t)=>{r.parent.postMessage(t,"*")},oo=()=>{if(V||r.parent===r||N.size===0||c?.features?.lateGenerateResults!==!0)return;G({channel:u,v:E,type:"generate-late-listen"})},R=(t,o)=>{for(let s of t)try{s(o)}catch(i){console.error(i)}},ro=(t)=>{if(!(t instanceof MessageEvent))return;if(!n(t.source))return;let o=yt(t.data);if(!o)return;if(o.type==="workspace"){let i=le.get(o.payload.subscriptionId);if(i)R([i],o.payload.snapshot);return}if(o.type==="shells"){let i=de.get(o.payload.subscriptionId);if(i)R([i],o.payload.snapshot);return}if(o.type==="ready"){if(c=o.payload,K=to(o.payload.session),R(p,o.payload),R(x,o.payload.directory),R(H,o.payload.session),K)R(I,K);R(v,o.payload.connection),R(f,o.payload.settings),R(S,o.payload.item),oo();return}if(o.type==="generate-late"){if(N.size===0)fe.push(o.payload);else R(N,o.payload);return}if(o.type==="directory"){if(c)c={...c,directory:o.payload.directory};R(x,o.payload.directory);return}if(o.type==="session"){if(c)c={...c,session:o.payload.session};if(!o.payload.session)K=null;else if(K?.sessionId!==o.payload.session.id)K=to(o.payload.session);R(H,o.payload.session);return}if(o.type==="session-lifecycle"){K=o.payload,R(I,o.payload);return}if(o.type==="connection"){if(c)c={...c,connection:o.payload.connection};R(v,o.payload.connection);return}if(o.type==="settings"){if(c)c={...c,settings:o.payload.settings};R(f,o.payload.settings);return}if(o.type==="item"){if(c)c={...c,item:o.payload.item};R(S,o.payload.item);return}if(o.type==="status-control-event"){R(B,o.payload);return}if(o.type==="popover-closed"){R(ae,o.payload);return}if(o.type==="action"){let i=(T)=>{if(!V)G({channel:u,v:E,type:"action-result",id:o.id,payload:T})},m=F;if(!m){i({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>m(o.payload)).then(()=>i({ok:!0}),(T)=>{let k=(T instanceof Error?T.message:String(T)).trim();i({ok:!1,error:(k||"Action failed.").slice(0,Ae)})});return}if(o.type==="file-open"){let i=o.payload;if(q&&Ao(q,i))return;q=i,R(P,o.payload);return}if(o.type==="file-saved"){R(Q,o.payload.version);return}if(o.type==="file-snapshot"){let i=(k)=>{if(!V)G({channel:u,v:E,type:"file-snapshot-result",id:o.id,payload:k})},m=(k)=>i({error:(k.trim()||"Could not read the edited file.").slice(0,Ae)}),T=Z;if(!T){m("This extension does not edit files.");return}Promise.resolve().then(()=>T(o.payload.purpose)).then((k)=>{if(at(k)>Me){m(`The file is over ${Me} ${"bytes"in k?"bytes":"characters"}.`);return}if(k.version.length>we){m(`The snapshot version is over ${we} characters.`);return}i({snapshot:"bytes"in k?{bytes:k.bytes,version:k.version}:{content:k.content,version:k.version}})},(k)=>m(k instanceof Error?k.message:String(k)));return}if(o.type==="resolve"){let i=(T)=>{G({channel:u,v:E,type:"resolve-result",id:o.id,payload:T})},m=J;if(!m){i({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>m(o.payload)).then((T)=>i({item:T?ue(T):null}),(T)=>{let k=(T instanceof Error?T.message:String(T)).trim();i({error:(k||"Command failed.").slice(0,Ae)})});return}let s=ce.get(o.id);if(!s)return;if(clearTimeout(s.timer),ce.delete(o.id),o.ok){s.resolve(o.payload);return}s.reject(new a(o.code,o.error))};r.addEventListener("message",ro),G({channel:u,v:E,type:"hello"});let U=(t,o=_)=>{if(V||r.parent===r)return Promise.reject(new a("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((s,i)=>{let m=setTimeout(()=>{ce.delete(t.id),i(new a("HOST_TIMEOUT","Host did not answer in time."))},o);ce.set(t.id,{resolve:s,reject:i,timer:m}),G(t)})},b=(t)=>U(t).then(()=>{return}),g={channel:u,v:E},et=(t)=>{if(!V&&r.parent!==r)G(t)},no=()=>et({...g,type:"file-save"}),so=(t)=>{if(!Bo(t)||!_r(t))return;t.preventDefault(),no()},io=(t)=>{if(!Bo(t)||t.key!=="Escape"||c?.surface!=="popover"||!c.popover)return;t.preventDefault(),po(c.popover.id,"escape").catch(()=>{return})},Ie=()=>{let t=c?.surface==="popover"?c.popover:void 0;if(!t)return;let o=Oe||he;if(eo===o)return;eo=o,uo(t.id,o).catch(()=>{return})},Ue=()=>{if(c?.surface!=="popover"||Oe)return;Oe=!0,Ie()},ao=(t)=>{if(c?.surface!=="popover"||t.relatedTarget!==null||!Oe)return;Oe=!1,Ie()},co=()=>{if(c?.surface!=="popover"||he)return;he=!0,Ie()},lo=()=>{if(c?.surface!=="popover"||!he)return;he=!1,Ie()},X=(t,o=1024)=>{if(!t.trim()||t.length>o)throw new a("HOST_REJECTED",`Identity must contain 1 to ${o} characters.`)},tt=async(t)=>{if(t.kind!=="projects")X(t.projectId);let o=await U({...g,type:"workspace-read",id:d(l),payload:t});if(!o||!("kind"in o)||!("state"in o)||o.kind!==t.kind)throw new a("HOST_REJECTED","Host did not return workspace data.");return o},ot=async(t,o)=>{if(t.kind!=="projects")X(t.projectId);let s=d(l);le.set(s,o);try{await b({...g,type:"workspace-subscribe",id:d(l),payload:{subscriptionId:s,query:t}})}catch(i){if(le.delete(s),!V)G({...g,type:"workspace-unsubscribe",id:d(l),payload:{subscriptionId:s}});throw i}return()=>{if(!le.delete(s)||V)return;G({...g,type:"workspace-unsubscribe",id:d(l),payload:{subscriptionId:s}})}},sr=async(t,o)=>{if(t.kind==="session")X(t.sessionId);if(t.kind==="project")X(t.projectId);let s=d(l);de.set(s,o);try{await b({...g,type:"shells-subscribe",id:d(l),payload:{subscriptionId:s,scope:t}})}catch(i){if(de.delete(s),!V)G({...g,type:"shells-unsubscribe",id:d(l),payload:{subscriptionId:s}});throw i}return()=>{if(!de.delete(s)||V)return;G({...g,type:"shells-unsubscribe",id:d(l),payload:{subscriptionId:s}})}},Ce=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>nt))throw new a("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!pe(t.value))throw new a("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>st)throw new a("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&c?.features?.deviceStorage!==!0)throw new a("UNSUPPORTED","This host does not support device storage.");let o=await U({...g,type:"storage",id:d(l),payload:t});if(!o||!("storage"in o)||o.op!==t.op)throw new a("HOST_REJECTED","Host did not return storage data.");return o},po=(t,o)=>c?.features?.popovers!==!0&&!(c?.surface==="popover"&&c.popover?.id===t)?Promise.reject(new a("UNSUPPORTED","This host does not support popovers.")):b({...g,type:"popover-close",id:d(l),payload:o?{id:t,reason:o}:{id:t}}),uo=(t,o)=>c?.features?.popovers!==!0&&!(c?.surface==="popover"&&c.popover?.id===t)?Promise.reject(new a("UNSUPPORTED","This host does not support popovers.")):b({...g,type:"popover-anchor",id:d(l),payload:{id:t,active:o}});return r.addEventListener("keydown",io,!0),r.addEventListener("pointerover",Ue),r.addEventListener("pointermove",Ue),r.addEventListener("pointerout",ao),r.addEventListener("focus",co),r.addEventListener("blur",lo),{onAction:(t)=>(F=t,()=>{if(F===t)F=null}),listProjects:async()=>{let t=await tt({kind:"projects"});if(t.kind!=="projects")throw new a("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let o=await tt({kind:"worktrees",projectId:t});if(o.kind!=="worktrees")throw new a("HOST_REJECTED","Expected worktrees.");return o},listSessions:async(t)=>{let o=await tt({kind:"sessions",projectId:t});if(o.kind!=="sessions")throw new a("HOST_REJECTED","Expected sessions.");return o},onProjects:(t)=>ot({kind:"projects"},(o)=>{if(o.kind==="projects")t(o)}),onWorktrees:(t,o)=>ot({kind:"worktrees",projectId:t},(s)=>{if(s.kind==="worktrees")o(s)}),onSessions:(t,o)=>ot({kind:"sessions",projectId:t},(s)=>{if(s.kind==="sessions")o(s)}),onRunningShells:(t,o)=>sr(t,o),readShellOutput:async(t,o)=>{X(t,ve);let s=o?.cursor;if(s!==void 0&&(!Number.isInteger(s)||s<0))throw new a("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let i=o?.tailBytes;if(i!==void 0&&(!Number.isInteger(i)||i<1||i>Ne))throw new a("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Ne}.`);let T=await U({...g,type:"shell-output",id:d(l),payload:{shellId:t,cursor:s,tailBytes:i}});if(!T||typeof T.output!=="string"||!Number.isFinite(T.cursor))throw new a("HOST_REJECTED","Host did not return shell output.");return T},stopShell:async(t)=>{if(X(t,ve),(await U({...g,type:"shell-stop",id:d(l),payload:{shellId:t}}))?.stopped!==!0)throw new a("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{X(t),await b({...g,type:"open-session",id:d(l),payload:{sessionId:t}})},storage:{get:async(t,o)=>{let s=Be(o),i={op:"get",key:t};if(s)i.scope=s;let m=await Ce(i);return m.op==="get"&&m.found?m.value:void 0},set:async(t,o,s)=>{let i=Be(s),m={op:"set",key:t,value:o};if(i)m.scope=i;await Ce(m)},delete:async(t,o)=>{let s=Be(o),i={op:"delete",key:t};if(s)i.scope=s;await Ce(i)},keys:async(t)=>{let o=Be(t),s={op:"keys"};if(o)s.scope=o;let i=await Ce(s);if(i.op!=="keys")throw new a("HOST_REJECTED","Expected storage keys.");return i.keys}},onReady:(t)=>{if(p.add(t),c)t(c);return()=>{p.delete(t)}},onDirectory:(t)=>{if(x.add(t),c)t(c.directory);return()=>{x.delete(t)}},onSession:(t)=>{if(H.add(t),c)t(c.session);return()=>{H.delete(t)}},onSessionLifecycle:(t)=>{if(I.add(t),K)t(K);return()=>{I.delete(t)}},onConnection:(t)=>{if(v.add(t),c)t(c.connection);return()=>{v.delete(t)}},onSettings:(t)=>{if(f.add(t),c)t(c.settings);return()=>{f.delete(t)}},onItem:(t)=>{if(S.add(t),c)t(c.item);return()=>{S.delete(t)}},onStatusControl:(t)=>(B.add(t),()=>{B.delete(t)}),onPopoverClosed:(t)=>(ae.add(t),()=>{ae.delete(t)}),setStatusControls:(t)=>{if(c?.features?.statusControls!==!0)return Promise.reject(new a("UNSUPPORTED","This host does not support status controls."));if(!mo(t))return Promise.reject(new a("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return b({...g,type:"status-controls",id:d(l),payload:{controls:t}})},openPopover:(t)=>{if(c?.features?.popovers!==!0)return Promise.reject(new a("UNSUPPORTED","This host does not support popovers."));if(!lt(t))return Promise.reject(new a("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return b({...g,type:"popover-open",id:d(l),payload:t})},closePopover:po,setPopoverAnchorActive:uo,onResolve:(t)=>(J=t,()=>{if(J===t)J=null}),toast:(t)=>{let o=t.message.trim();if(!o||o.length>Le)return Promise.reject(new a("HOST_REJECTED",`Toast message must contain 1 to ${Le} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Pe))return Promise.reject(new a("HOST_REJECTED",`Toast copy text must contain 1 to ${Pe} characters.`));return b({channel:u,v:E,type:"toast",id:d(l),payload:{...t,message:o}})},openUrl:(t)=>b({channel:u,v:E,type:"open-url",id:d(l),payload:{url:t}}),openCommit:(t)=>Et(t)?b({channel:u,v:E,type:"open-commit",id:d(l),payload:{sha:t}}):Promise.reject(new a("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>b({channel:u,v:E,type:"open-surface",id:d(l),payload:{surfaceId:t}}),writeClipboard:(t)=>b({channel:u,v:E,type:"clipboard-write",id:d(l),payload:{text:t}}),compose:(t)=>b({channel:u,v:E,type:"compose",id:d(l),payload:t}),attach:(t)=>b({channel:u,v:E,type:"attach",id:d(l),payload:ue(t)}),startSession:async(t)=>{if(t.projectId!==void 0)X(t.projectId);let o=t.worktree;if(o&&o!==!0)if(o.kind==="existing")X(o.directory);else{if(o.name!==void 0)X(o.name,200);if(o.baseBranch!==void 0)X(o.baseBranch,200)}let s=await U({channel:u,v:E,type:"start-session",id:d(l),payload:ft(t)},e.requestTimeoutMs??180000);if(!pt(s))throw new a("HOST_REJECTED","Host did not return a session.");return s},prompt:(t)=>U({channel:u,v:E,type:"prompt",id:d(l),payload:mt(t)}).then((o)=>{if(!ut(o))throw new a("HOST_REJECTED","Host did not return a prompt result.");return o}),sessionLink:(t)=>b({channel:u,v:E,type:"session-link",id:d(l),payload:ue(t)}),close:()=>b({channel:u,v:E,type:"close",id:d(l)}),oauthStart:()=>b({channel:u,v:E,type:"oauth-start",id:d(l)}),oauthDisconnect:()=>b({channel:u,v:E,type:"oauth-disconnect",id:d(l)}),request:(t)=>($e(t.path)?U({channel:u,v:E,type:"request",id:d(l),payload:t}):Ko()).then((o)=>{if(!Fe(o))throw new a("HOST_REJECTED","Host request result was empty.");return o}),serviceRequest:(t)=>($e(t.path)?U({channel:u,v:E,type:"service-request",id:d(l),payload:t}):Ko()).then((o)=>{if(!Fe(o))throw new a("HOST_REJECTED","Host service request result was empty.");return o}),serviceStatus:()=>U({channel:u,v:E,type:"service-status",id:d(l)}).then((t)=>{if(!At(t))throw new a("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(Ee(t)?U({channel:u,v:E,type:"file-read",id:d(l),payload:{path:t}}):Ve()).then((o)=>{if(!xt(o))throw new a("HOST_REJECTED","Host did not return file content.");return o}),writeFile:(t,o)=>{if(!Ee(t))return Ve();if(o.length>De)return Promise.reject(new a("FILE_TOO_LARGE",`Content is over ${De} characters.`));return U({channel:u,v:E,type:"file-write",id:d(l),payload:{path:t,content:o}}).then((s)=>{if(!Rt(s))throw new a("HOST_REJECTED","Host did not confirm the write.");return s})},listDir:(t)=>(Ee(t)?U({channel:u,v:E,type:"file-list",id:d(l),payload:{path:t}}):Ve()).then((o)=>{if(!bt(o))throw new a("HOST_REJECTED","Host did not return directory entries.");return o}),stat:(t)=>(Ee(t)?U({channel:u,v:E,type:"file-stat",id:d(l),payload:{path:t}}):Ve()).then((o)=>{if(!gt(o))throw new a("HOST_REJECTED","Host did not return file status.");return o}),generate:(t)=>{let o=t.prompt.trim(),s=t.system?.trim();if(o.length===0||o.length>He)return Promise.reject(new a("HOST_REJECTED",`Prompt must be 1 to ${He} characters.`));if(s!==void 0&&(s.length===0||s.length>Xe))return Promise.reject(new a("HOST_REJECTED",`System prompt must be 1 to ${Xe} characters.`));let i=t.maxOutputTokens===void 0?void 0:Math.min(St,Math.max(1,Math.floor(t.maxOutputTokens)));if(i!==void 0&&!Number.isFinite(i))return Promise.reject(new a("HOST_REJECTED","maxOutputTokens must be a number."));let m={prompt:o};if(s!==void 0)m.system=s;if(i!==void 0)m.maxOutputTokens=i;return U({channel:u,v:E,type:"generate",id:d(l),payload:m},e.requestTimeoutMs??Tt).then((T)=>{if(!kt(T))throw new a("HOST_REJECTED","Host did not return generated text.");return T})},onLateGenerateResult:(t)=>{N.add(t);for(let o of fe.splice(0))R([t],o);return oo(),()=>{N.delete(t)}},setBadge:(t)=>b({channel:u,v:E,type:"badge",id:d(l),payload:{count:Ot(t)}}),setHeight:(t)=>b({channel:u,v:E,type:"resize",id:d(l),payload:{height:ht(t)}}),onFileOpen:(t)=>{if(P.add(t),!me)me=!0,r.addEventListener("keydown",so,!0);if(q)t(q);return()=>{P.delete(t)}},onFileSnapshot:(t)=>(Z=t,()=>{if(Z===t)Z=null}),onFileSaved:(t)=>(Q.add(t),()=>{Q.delete(t)}),reportFileChange:(t)=>et({...g,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:no,reportFileUnsupported:()=>et({...g,type:"file-unsupported"}),dispose:()=>{for(let t of le.keys())G({...g,type:"workspace-unsubscribe",id:d(l),payload:{subscriptionId:t}});le.clear();for(let t of de.keys())G({...g,type:"shells-unsubscribe",id:d(l),payload:{subscriptionId:t}});if(de.clear(),V=!0,J=null,F=null,Z=null,P.clear(),Q.clear(),me)r.removeEventListener("keydown",so,!0);r.removeEventListener("message",ro),r.removeEventListener("keydown",io,!0),r.removeEventListener("pointerover",Ue),r.removeEventListener("pointermove",Ue),r.removeEventListener("pointerout",ao),r.removeEventListener("focus",co),r.removeEventListener("blur",lo);for(let t of ce.values())clearTimeout(t.timer),t.reject(new a("HOST_UNAVAILABLE","Host client was disposed."));ce.clear(),p.clear(),x.clear(),H.clear(),I.clear(),v.clear(),f.clear(),S.clear(),B.clear(),ae.clear(),N.clear(),fe.length=0}}};var jo=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var an=new Set(jo);var zo=["none","agent","user"];var ln=new Set(zo);var Sr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Tr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Wo=(e,r)=>{r.style.colorScheme=e.mode;for(let[n,_]of Sr)r.style.setProperty(n,e.tokens[_]);for(let[n,_,p]of Tr){let x=e.tokens[p]??"";r.style.setProperty(n,x),r.style.setProperty(_,x)}r.style.setProperty("font-family",e.tokens.font),r.style.setProperty("font-size","0.875rem"),r.style.setProperty("line-height","1.45"),r.style.setProperty("color",e.tokens.foreground)},Ut=(e,r)=>{if(Wo(e.theme,r),r.dataset)r.dataset.ocSurface=e.surface,r.dataset.ocTheme=e.theme.mode};var fr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},O=(e,r)=>`var(--${e}, var(--oc-${fr[e]}, ${r}))`,z=O("surface-background","transparent"),je=O("surface-elevated","transparent"),_e=O("surface-elevated-foreground","inherit"),D=O("surface-foreground","inherit"),h=O("surface-muted-foreground","gray"),mr=O("surface-muted","transparent"),ee=O("interactive-border","currentColor"),M=O("interactive-hover","transparent"),te=O("interactive-active","transparent"),Ct=O("interactive-selection","transparent"),vt=O("interactive-selection-foreground","inherit"),j=O("primary","currentColor"),Nt=O("primary-text","inherit"),Mt=O("error-text","inherit"),Or=O("font-sans","inherit"),wt=O("font-mono","monospace"),Zo=O("radius","9px"),Lt=`calc(${Zo} - 2px)`,Yo=`calc(${Zo} - 4px)`,A=(e,r,n="transparent")=>`color-mix(in srgb, ${e} ${r}%, ${n})`,Jo=`background-image: linear-gradient(${M}, ${M});`,Pt=(e,r="0.5px")=>`box-shadow: inset 0 0 0 ${r} ${e}, var(--oc-sdk-field-lift);`,Gt="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",Qo="box-shadow: var(--oc-sdk-lit);",Dt=`inset 0 0.5px 0 0 ${A(D,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,hr=`
:root {
  --oc-sdk-edge: ${A(D,16)};
  --oc-sdk-field-bg: ${je};
  --oc-sdk-raised-bg: ${z};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${A(D,14)};
  --oc-sdk-field-bg: ${A(z,50,je)};
  --oc-sdk-raised-bg: ${je};
  --oc-sdk-field-lift: ${Dt};
  --oc-sdk-raised-lift: ${Dt};
  --oc-sdk-lit: ${Dt};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Ke=(e)=>{let r=O(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${O(`${e}-text`,"inherit")}; }`},Ar=`
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
`,qo=`${hr}
.oc-sdk { color: ${D}; font-family: ${Or}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${Jo} }
.oc-sdk-mono { font-family: ${wt}; }
.oc-sdk-muted { color: ${h}; }
${Ke("success")}${Ke("warning")}${Ke("error")}${Ke("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${j}; --oc-sdk-tone-text: ${Nt}; }

.oc-sdk-btn { border-radius: ${Lt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Yo}; }
.oc-sdk-btn[data-variant="default"] { color: ${Nt}; background: ${A(j,10,z)}; border-color: ${A(j,12)}; ${Qo} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${A(j,16,z)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${A(j,22,z)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${mr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${M}, ${M}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${te}, ${te}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${_e}; ${Gt} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${M}, ${M}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${te}, ${te}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${M}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${te}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${O("status-error","red")}; color: ${Mt}; background: ${A("var(--oc-sdk-tone)",7,z)}; border-color: ${A("var(--oc-sdk-tone)",12)}; ${Qo} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${A("var(--oc-sdk-tone)",9,z)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${A("var(--oc-sdk-tone)",11,z)}; box-shadow: none; }

.oc-sdk-field-note { color: ${h}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Mt}; }
.oc-sdk-input { border-radius: ${Lt}; background: var(--oc-sdk-field-bg); color: ${_e}; ${Pt("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${h}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${M}, ${M}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${Pt(A(D,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${Pt(O("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${wt}; }

.oc-sdk-search-icon { color: ${h}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${j}; }
.oc-sdk-search-clear { border-radius: ${Yo}; color: ${h}; }
.oc-sdk-search-clear:hover { background: ${M}; color: ${D}; }

.oc-sdk-trigger { border-radius: ${Lt}; background: var(--oc-sdk-raised-bg); color: ${_e}; ${Gt} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${M}, ${M}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${te}, ${te}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${h}; }
.oc-sdk-trigger-chevron { color: ${h}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${_e}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${je}; background-clip: padding-box; color: ${_e}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${M}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Ct}; color: ${vt}; }
.oc-sdk-option-check { color: ${D}; }
.oc-sdk-option[data-destructive="true"] { color: ${Mt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${A(O("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${h}; }
.oc-sdk-popup-empty { color: ${h}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${ee}; border-radius: 4px; color: ${D}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${A(D,60,ee)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${ee}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${z}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${j}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Jo} }
.oc-sdk-check-desc { color: ${h}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${A(D,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${h}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${D}; }
.oc-sdk-tab[aria-selected="true"] { color: ${vt}; background: ${Ct}; border-color: ${ee}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${_e}; background: var(--oc-sdk-raised-bg); ${Gt} }
.oc-sdk-tab-count { color: ${h}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${A(D,6)}; color: ${h}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${A("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${M}; }
.oc-sdk-row[aria-selected="true"] { background: ${Ct}; color: ${vt}; }
.oc-sdk-row-lead { font-family: ${wt}; color: ${h}; }
.oc-sdk-row-sub { color: ${h}; }
.oc-sdk-row-meta { color: ${h}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${h}; }

.oc-sdk-empty-body { color: ${h}; }

.oc-sdk-spinner { color: ${h}; }
.oc-sdk-spinner-ring { border-color: ${ee}; border-top-color: ${j}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${A("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${h}; }

.oc-sdk-separator { color: ${h}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${A(ee,40)}; }

.oc-sdk-progress-label { color: ${h}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${A(D,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${j}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${O("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${O("success-text","inherit")}; }

.oc-sdk-text a { color: ${Nt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${A(ee,60)}; }
`,C=`
${rt}
${Ar}
${qo}`;var y={util:"#4d9fff",mem:"#e8c33a",temp:"#b07fe8",power:"#3ddc84",cpu:"#ff8c42",systemRam:"#89929c"};var Xt=21;var $t=["util","mem","temp","power","cpu"],Ft="seriesVisibilityV1",kr={util:!0,mem:!0,temp:!0,power:!0,cpu:!0},Vt=(e)=>{let r={...kr};if(!e||typeof e!=="object"||Array.isArray(e))return r;for(let n of $t){let _=e[n];if(typeof _==="boolean")r[n]=_}return r};var be=It(),qe=document.querySelector("#root");if(!qe)throw Error("Missing #root");var yr=`
html, body {
  margin: 0;
  padding: 0;
  background: var(--oc-bg);
  color: var(--oc-fg);
  font: 12px/1.4 var(--oc-font);
  min-height: 100%;
}
#root {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px;
  min-height: 100%;
}
.section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
h2 {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--oc-fg);
}
.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px;
  background: color-mix(in srgb, var(--oc-fg) 4%, transparent);
  border: 1px solid color-mix(in srgb, var(--series-color) 70%, transparent);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--series-color) 8%, transparent);
  border-radius: 8px;
}
.stat[aria-pressed] {
  appearance: none;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.stat[aria-pressed="false"] { opacity: .48; border-style: dashed; }
.stat[aria-pressed="true"]:hover { background: color-mix(in srgb, var(--series-color) 9%, transparent); }
.stat:focus-visible, .legend-item:focus-visible { outline: 2px solid var(--series-color, var(--oc-primary)); outline-offset: 2px; }
.stat-label {
  font-size: 11px;
  color: var(--oc-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.stat-value {
  font-size: 20px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.stat-unit {
  font-size: 11px;
  color: var(--oc-muted);
  font-weight: 400;
}
.mem-detail {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 4px 12px;
  font-size: 11px;
  color: var(--oc-muted);
  padding: 0 4px;
}
.chart-container {
  background: color-mix(in srgb, var(--oc-fg) 4%, transparent);
  border-radius: 8px;
  padding: 10px;
  position: relative;
}
.chart {
  width: 100%;
  height: 100px;
  display: block;
}
.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 11px;
  color: var(--oc-muted);
  padding-top: 6px;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
  appearance: none;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  padding: 2px 0;
  cursor: pointer;
}
.legend-item[aria-pressed="false"] { opacity: .38; text-decoration: line-through; }
.legend-item[aria-pressed="true"]:hover { color: var(--oc-fg); }
.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 2px;
}
.status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--oc-muted);
}
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #6b7280;
}
.status-dot.ok {
  background: #22c55e;
}
.status-dot.error {
  background: #ef4444;
}
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: var(--oc-muted);
}
.error-banner {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  padding: 10px;
  color: #ef4444;
  font-size: 12px;
}
`,er=document.createElement("style");er.textContent=yr;document.head.append(er);var Qe=(e)=>{if(e===null)return"–";return`${e.toFixed(0)}%`},Ir=(e)=>{if(e===null)return"–";return`${e.toFixed(0)}°`},Ur=(e)=>{if(e===null)return"–";return`${e.toFixed(0)} W`},Te={util:"GPU Util",mem:"GTT",temp:"Temp",power:"Power",cpu:"CPU"},Cr={util:100,mem:100,temp:100,power:100,cpu:100};function jt(e,r){let n=document.getElementById("chart-svg");if(!n)return;while(n.firstChild)n.removeChild(n.firstChild);let _=300,p=100,x=2,H=(f,S)=>{if(S<=1)return _/2;return x+(Xt-S+f)/(Xt-1)*(_-2*x)},I=(f,S)=>{let B=Math.min(Math.max(f,0),S);return p-x-B/S*(p-2*x)},v=document.createElementNS("http://www.w3.org/2000/svg","g");for(let f of[0.25,0.5,0.75]){let S=document.createElementNS("http://www.w3.org/2000/svg","line");S.setAttribute("x1","0"),S.setAttribute("x2",String(_)),S.setAttribute("y1",String(p*f)),S.setAttribute("y2",String(p*f)),S.setAttribute("stroke","var(--oc-border)"),S.setAttribute("stroke-width","0.5"),S.setAttribute("opacity","0.3"),v.appendChild(S)}n.appendChild(v);for(let f of $t){if(!r[f])continue;let S=e[f],B=y[f],ae=Cr[f],N=[];if(S.forEach((Q,Z)=>{if(Q===null)return;let q=H(Z,S.length),me=I(Q,ae);N.push(`${q.toFixed(1)},${me.toFixed(1)}`)}),N.length<2)continue;let fe=N[0].split(",")[0],J=N[N.length-1].split(",")[0],F=document.createElementNS("http://www.w3.org/2000/svg","polygon");F.setAttribute("points",`${fe},${p} ${N.join(" ")} ${J},${p}`),F.setAttribute("fill",B),F.setAttribute("opacity","0.08"),n.appendChild(F);let P=document.createElementNS("http://www.w3.org/2000/svg","polyline");P.setAttribute("points",N.join(" ")),P.setAttribute("fill","none"),P.setAttribute("stroke",B),P.setAttribute("stroke-width","1.5"),P.setAttribute("stroke-linejoin","round"),P.setAttribute("stroke-linecap","round"),P.setAttribute("opacity","0.95"),n.appendChild(P)}}var Ze=null,zt=!1,Bt=0,Y=Vt(void 0),ge=document.createElement("div");ge.className="status-dot";var ke=document.createElement("span");ke.textContent="Connecting…";var Wt=document.createElement("div");Wt.className="status";Wt.append(ge,ke);var oe=document.createElement("button");oe.type="button";oe.dataset.series="util";oe.className="stat";oe.innerHTML=`
  <span class="stat-label">GPU Util</span>
  <span class="stat-value">–</span>
`;var ye=document.createElement("div");ye.className="stat";ye.innerHTML=`
  <span class="stat-label">System RAM</span>
  <span class="stat-value">–</span>
`;var re=document.createElement("button");re.type="button";re.dataset.series="temp";re.className="stat";re.innerHTML=`
  <span class="stat-label">Temperature</span>
  <span class="stat-value">–</span>
`;var ne=document.createElement("button");ne.type="button";ne.dataset.series="power";ne.className="stat";ne.innerHTML=`
  <span class="stat-label">Power</span>
  <span class="stat-value">–</span>
`;var se=document.createElement("button");se.type="button";se.dataset.series="cpu";se.className="stat";se.innerHTML=`
  <span class="stat-label">CPU</span>
  <span class="stat-value">–</span>
`;var ie=document.createElement("button");ie.type="button";ie.dataset.series="mem";ie.className="stat";ie.innerHTML=`
  <span class="stat-label">GTT Memory</span>
  <span class="stat-value">–</span>
`;var Yt=document.createElement("div");Yt.className="stats-row";Yt.append(oe,ie,re,ne,se,ye);var vr=[[oe,y.util],[ye,y.systemRam],[re,y.temp],[ne,y.power],[se,y.cpu],[ie,y.mem]];for(let[e,r]of vr)e.style.setProperty("--series-color",r);var Jt=document.createElement("div");Jt.className="mem-detail";var tr=document.createElement("span"),or=document.createElement("span");Jt.append(tr,or);var Qt=document.createElement("div");Qt.className="section";Qt.innerHTML=`
  <h2>Activity</h2>
  <div class="chart-container">
    <svg id="chart-svg" class="chart" viewBox="0 0 300 100" preserveAspectRatio="none"></svg>
    <div class="legend">
      <button class="legend-item" type="button" data-series="util" style="--series-color:${y.util}" aria-pressed="true"><span class="legend-dot" style="background:${y.util}"></span>${Te.util}</button>
      <button class="legend-item" type="button" data-series="mem" style="--series-color:${y.mem}" aria-pressed="true"><span class="legend-dot" style="background:${y.mem}"></span>${Te.mem}</button>
      <button class="legend-item" type="button" data-series="temp" style="--series-color:${y.temp}" aria-pressed="true"><span class="legend-dot" style="background:${y.temp}"></span>${Te.temp}</button>
      <button class="legend-item" type="button" data-series="power" style="--series-color:${y.power}" aria-pressed="true"><span class="legend-dot" style="background:${y.power}"></span>${Te.power}</button>
      <button class="legend-item" type="button" data-series="cpu" style="--series-color:${y.cpu}" aria-pressed="true"><span class="legend-dot" style="background:${y.cpu}"></span>${Te.cpu}</button>
    </div>
  </div>
`;qe.append(Wt,Yt,Jt,Qt);function Zt(){for(let e of Array.from(qe.querySelectorAll("[data-series]"))){let r=e.dataset.series,n=Y[r];e.setAttribute("aria-pressed",String(n)),e.classList.toggle("series-off",!n),e.title=`${n?"Hide":"Show"} ${Te[r]} graph line`}}function Nr(e){if(Y={...Y,[e]:!Y[e]},Zt(),Ze)jt(Ze.history,Y);be.storage.set(Ft,Y).catch((r)=>{console.warn("Could not save onvtop graph visibility",r)})}for(let e of Array.from(qe.querySelectorAll("[data-series]")))e.addEventListener("click",()=>Nr(e.dataset.series));Zt();function Mr(e){let{gpu:r,sys:n}=e.sample;if(!e.sourceAvailable){ge.className="status-dot error",ke.textContent="knvtop-service unavailable",jt(e.history,Y),zt=!0;return}oe.querySelector(".stat-value").textContent=Qe(r.util),re.querySelector(".stat-value").textContent=Ir(r.temp),ne.querySelector(".stat-value").textContent=Ur(r.power_w),se.querySelector(".stat-value").textContent=Qe(n.cpu);let _=r.mem_used??0,p=r.mem_total??0,x=r.mem_used!==null&&p>0?_/p*100:null;ie.querySelector(".stat-value").textContent=Qe(x);let H=r.mem_used===null?"—":(_/1024).toFixed(1),I=r.mem_total===null?"—":(p/1024).toFixed(1);tr.textContent=`GTT ${H} / ${I} GiB`;let{ram_used:v,ram_total:f}=n,S=f>0?v/f*100:null;ye.querySelector(".stat-value").textContent=Qe(S),or.textContent=`System RAM ${(v/1073741824).toFixed(1)} / ${(f/1073741824).toFixed(1)} GiB`,jt(e.history,Y),ge.className="status-dot ok",ke.textContent="Live",zt=!1}function wr(){ge.className="status-dot error",ke.textContent="No data from knvtop",zt=!0}async function qt(){try{let e=await be.serviceRequest({method:"GET",path:"/stats"}),r=JSON.parse(e.body);if(e.status===200)Ze=r,Mr(Ze),Bt=0;else throw Error("bad response")}catch{if(Bt++,Bt>3)wr()}}var Re=null,Kt=!1;function rr(){if(Re)return;Re=setInterval(()=>{if(!Kt)Kt=!0,qt().finally(()=>{Kt=!1})},2000)}function nr(){if(Re)clearInterval(Re),Re=null}document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")rr(),qt();else nr()});window.addEventListener("pagehide",()=>{nr(),be.dispose()});be.onReady(async(e)=>{Ut(e,document.documentElement);try{Y=Vt(await be.storage.get(Ft)),Zt()}catch(r){console.warn("Could not load onvtop graph visibility",r)}rr(),qt()});})();
