(()=>{var _="openchamber.sdk",S=1;var it=`
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
`;function To(e){let o=e.documentElement;if(o.hasAttribute("data-oc-scrollbar-activity"))return;o.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(s)=>{let i=s.target===e?o:s.target;if(!(i instanceof Element))return;if(!i.hasAttribute("data-oc-scrolling"))i.setAttribute("data-oc-scrolling","");let p=n.get(i);if(p!==void 0)clearTimeout(p);n.set(i,setTimeout(()=>{n.delete(i),i.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var Tr=`(${To.toString()})(document);`;var at=128,ct=65536;var ve=128;var Ne=65536;var ho=/^[a-z][a-z0-9-]{0,39}$/;var fo=(e)=>Object(e)===e&&!Array.isArray(e),lt=(e,o)=>Object.keys(e).every((n)=>o.includes(n)),mo=(e)=>String(e)===e&&e.length>=1&&e.length<=60,Oo=(e)=>String(e)===e&&e.length>=1&&e.length<=80,Ao=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let o=new Set;for(let n of e){if(!fo(n)||!ho.test(n.id)||!mo(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(o.has(n.id))return!1;if(o.add(n.id),n.kind==="button"){if(!lt(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!lt(n,["kind","id","label","value","options","disabled"]))return!1;if(!Oo(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let s=new Set;for(let i of n.options){if(!fo(i)||!lt(i,["value","label"])||!Oo(i.value)||!mo(i.label)||s.has(i.value))return!1;s.add(i.value)}if(!s.has(n.value))return!1}return!0};var xo=["{id}","{segment}","{segments+}"];var cn=new Set(xo);var go=["turn-finished","turn-failed","permission-asked","question-asked"];var dn=new Set(go);var Me=20000000,Le=256;var dt=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,Ro=(e,o)=>{if(e.path!==o.path||e.readOnly!==o.readOnly)return!1;if(e.encoding==="text"||o.encoding==="text")return e.encoding==="text"&&o.encoding==="text"&&e.content===o.content;if(e.bytes.byteLength!==o.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==o.bytes[n])return!1;return!0};var bo=/^[A-Za-z0-9_-]{1,80}$/;var yo=["left","right","top","bottom"];var ko=(e,o=0,n={remaining:16000})=>{if(--n.remaining<0||o>=32)return!1;if(e===null)return!0;let s=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let i of s)if(!ko(i,o+1,n))return!1;return!0},pt=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((o)=>/^(0|[1-9]\d*)$/.test(o)&&Number(o)<e.length)&&e.every(pt);if(Object(e)===e){let o=Object.getPrototypeOf(e);return(o===null||o===Object.prototype)&&Object.values(e).every(pt)}return String(e)===e||Number.isFinite(e)},ut=(e)=>{try{if(String(e.id)!==e.id||!bo.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!yo.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!ko(e.data)||!pt(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var Co=["file","directory","other","missing"],_t=(e)=>Boolean(e&&"sessionId"in e),St=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var Uo=/^[0-9a-f]{7,64}$/i,Tt=(e)=>Uo.test(e),we=500,Pe=32000,vo=16000,No=128,Mo=200,Lo=2000,wo=16000,Po=80,Go=200,Do=16000;var $o=2000;var ft=20000,Ge=1024,De=2000000;var $e=64000,He=8000,mt=4000;var Ot=960000;var Ho=999,Xo=1e4,Ae=500,Fo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Vo=["stopped","starting","ready","failed"],mr=new Set(Fo),Bo=(e)=>mr.has(e),Ko=(e)=>e&&Bo(e)?e:"HOST_REJECTED",pe=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(pe);if(Object(e)===e)return Object.values(e).every(pe);return!1},zo=(e)=>pe(e)&&JSON.stringify(e).length<=Do,Io=(e)=>e?.trim().slice(0,Go)??"",ue=(e)=>{let o=e.id.trim().slice(0,No),n=e.title.trim().slice(0,Mo),s=e.url.trim().slice(0,Lo),i=e.text?.trim().slice(0,wo),p=e.author?.trim().slice(0,Po),T=e.kind==="pull"?"pull":"issue",b={providerId:e.providerId.trim(),id:o,title:n||o,url:s,kind:T};if(i)b.text=i;if(p)b.author=p;if(T==="pull"){let U=Io(e.branches?.head),O=Io(e.branches?.base);if(U&&O)b.branches={head:U,base:O}}if(zo(e.data))b.data=e.data;return b},ht=(e)=>{let o=ue(e);if(e.projectId)o.projectId=e.projectId;if(e.navigation)o.navigation=e.navigation;if(e.worktree)o.worktree=e.worktree;return o},At=(e)=>{let o={text:e.text.trim().slice(0,vo)};if(e.send)o.send=!0;return o},xt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Ho,Math.max(0,Math.round(e)))},gt=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Xo,Math.max(0,Math.ceil(e)))};var Ee=(e)=>e.length>0&&e.length<=Ge&&!e.includes("\x00")&&!e.includes("\\");var Xe=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>$o)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},Or=new Set(Vo),Rt=(e)=>Boolean(e&&"status"in e&&Or.has(String(e.status))&&!("body"in e)),Fe=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),bt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),yt=(e)=>Boolean(e&&"written"in e&&e.written===!0),kt=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),hr=new Set(Co),It=(e)=>Boolean(e&&"kind"in e&&"size"in e&&hr.has(String(e.kind))&&Number.isFinite(e.size)),Ct=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Ar=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),xr=(e)=>Object(e)===e?e:null,Et=(e)=>String(e)===e&&e.length>0,gr=(e)=>{if(!Et(e.id))return null;if(e.ok===!0){let o={channel:_,v:S,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)o.payload=e.payload;return o}if(e.ok===!1&&Et(e.error))return{channel:_,v:S,type:"result",id:e.id,ok:!1,error:e.error,code:Ko(Et(e.code)?e.code:void 0)};return null},Ut=(e)=>{let o=xr(e);if(!o||o.channel!==_||o.v!==S)return null;if(o.type==="result")return gr(o);if(!Ar.has(String(o.type))||Object(o.payload)!==o.payload)return null;return o};var jo=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Rr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class l extends Error{code;constructor(e,o){super(o);this.name="HostRequestError",this.code=e}}var Wo=()=>Promise.reject(new l("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Ve=()=>Promise.reject(new l("BAD_PATH",`File path must be 1 to ${Ge} characters without NUL or backslash.`)),Be=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new l("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},E=(e)=>(e.value+=1,`oc-${e.value}`),vt=(e={})=>{let o=e.target??("window"in globalThis?window:null);if(!o)throw new l("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((t)=>t===o.parent),s=e.requestTimeoutMs??ft,i=new Set,p=new Set,T=new Set,b=new Set,U=new Set,O=new Set,f=new Set,B=new Set,ae=new Set,M=new Set,fe=[],J=null,F=null,G=new Set,Q=new Set,Z=null,q=null,me=!1,ce=new Map,le=new Map,de=new Map,V=!1,u={value:0},d=null,K=null,Oe=!1,he=!1,ro=null,no=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},D=(t)=>{o.parent.postMessage(t,"*")},so=()=>{if(V||o.parent===o||M.size===0||d?.features?.lateGenerateResults!==!0)return;D({channel:_,v:S,type:"generate-late-listen"})},y=(t,r)=>{for(let a of t)try{a(r)}catch(c){console.error(c)}},io=(t)=>{if(!(t instanceof MessageEvent))return;if(!n(t.source))return;let r=Ut(t.data);if(!r)return;if(r.type==="workspace"){let c=le.get(r.payload.subscriptionId);if(c)y([c],r.payload.snapshot);return}if(r.type==="shells"){let c=de.get(r.payload.subscriptionId);if(c)y([c],r.payload.snapshot);return}if(r.type==="ready"){if(d=r.payload,K=no(r.payload.session),y(i,r.payload),y(p,r.payload.directory),y(T,r.payload.session),K)y(b,K);y(U,r.payload.connection),y(O,r.payload.settings),y(f,r.payload.item),so();return}if(r.type==="generate-late"){if(M.size===0)fe.push(r.payload);else y(M,r.payload);return}if(r.type==="directory"){if(d)d={...d,directory:r.payload.directory};y(p,r.payload.directory);return}if(r.type==="session"){if(d)d={...d,session:r.payload.session};if(!r.payload.session)K=null;else if(K?.sessionId!==r.payload.session.id)K=no(r.payload.session);y(T,r.payload.session);return}if(r.type==="session-lifecycle"){K=r.payload,y(b,r.payload);return}if(r.type==="connection"){if(d)d={...d,connection:r.payload.connection};y(U,r.payload.connection);return}if(r.type==="settings"){if(d)d={...d,settings:r.payload.settings};y(O,r.payload.settings);return}if(r.type==="item"){if(d)d={...d,item:r.payload.item};y(f,r.payload.item);return}if(r.type==="status-control-event"){y(B,r.payload);return}if(r.type==="popover-closed"){y(ae,r.payload);return}if(r.type==="action"){let c=(m)=>{if(!V)D({channel:_,v:S,type:"action-result",id:r.id,payload:m})},h=F;if(!h){c({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>h(r.payload)).then(()=>c({ok:!0}),(m)=>{let C=(m instanceof Error?m.message:String(m)).trim();c({ok:!1,error:(C||"Action failed.").slice(0,Ae)})});return}if(r.type==="file-open"){let c=r.payload;if(q&&Ro(q,c))return;q=c,y(G,r.payload);return}if(r.type==="file-saved"){y(Q,r.payload.version);return}if(r.type==="file-snapshot"){let c=(C)=>{if(!V)D({channel:_,v:S,type:"file-snapshot-result",id:r.id,payload:C})},h=(C)=>c({error:(C.trim()||"Could not read the edited file.").slice(0,Ae)}),m=Z;if(!m){h("This extension does not edit files.");return}Promise.resolve().then(()=>m(r.payload.purpose)).then((C)=>{if(dt(C)>Me){h(`The file is over ${Me} ${"bytes"in C?"bytes":"characters"}.`);return}if(C.version.length>Le){h(`The snapshot version is over ${Le} characters.`);return}c({snapshot:"bytes"in C?{bytes:C.bytes,version:C.version}:{content:C.content,version:C.version}})},(C)=>h(C instanceof Error?C.message:String(C)));return}if(r.type==="resolve"){let c=(m)=>{D({channel:_,v:S,type:"resolve-result",id:r.id,payload:m})},h=J;if(!h){c({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>h(r.payload)).then((m)=>c({item:m?ue(m):null}),(m)=>{let C=(m instanceof Error?m.message:String(m)).trim();c({error:(C||"Command failed.").slice(0,Ae)})});return}let a=ce.get(r.id);if(!a)return;if(clearTimeout(a.timer),ce.delete(r.id),r.ok){a.resolve(r.payload);return}a.reject(new l(r.code,r.error))};o.addEventListener("message",io),D({channel:_,v:S,type:"hello"});let v=(t,r=s)=>{if(V||o.parent===o)return Promise.reject(new l("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((a,c)=>{let h=setTimeout(()=>{ce.delete(t.id),c(new l("HOST_TIMEOUT","Host did not answer in time."))},r);ce.set(t.id,{resolve:a,reject:c,timer:h}),D(t)})},k=(t)=>v(t).then(()=>{return}),I={channel:_,v:S},rt=(t)=>{if(!V&&o.parent!==o)D(t)},ao=()=>rt({...I,type:"file-save"}),co=(t)=>{if(!jo(t)||!Rr(t))return;t.preventDefault(),ao()},lo=(t)=>{if(!jo(t)||t.key!=="Escape"||d?.surface!=="popover"||!d.popover)return;t.preventDefault(),_o(d.popover.id,"escape").catch(()=>{return})},Ie=()=>{let t=d?.surface==="popover"?d.popover:void 0;if(!t)return;let r=Oe||he;if(ro===r)return;ro=r,So(t.id,r).catch(()=>{return})},Ce=()=>{if(d?.surface!=="popover"||Oe)return;Oe=!0,Ie()},po=(t)=>{if(d?.surface!=="popover"||t.relatedTarget!==null||!Oe)return;Oe=!1,Ie()},uo=()=>{if(d?.surface!=="popover"||he)return;he=!0,Ie()},Eo=()=>{if(d?.surface!=="popover"||!he)return;he=!1,Ie()},X=(t,r=1024)=>{if(!t.trim()||t.length>r)throw new l("HOST_REJECTED",`Identity must contain 1 to ${r} characters.`)},nt=async(t)=>{if(t.kind!=="projects")X(t.projectId);let r=await v({...I,type:"workspace-read",id:E(u),payload:t});if(!r||!("kind"in r)||!("state"in r)||r.kind!==t.kind)throw new l("HOST_REJECTED","Host did not return workspace data.");return r},st=async(t,r)=>{if(t.kind!=="projects")X(t.projectId);let a=E(u);le.set(a,r);try{await k({...I,type:"workspace-subscribe",id:E(u),payload:{subscriptionId:a,query:t}})}catch(c){if(le.delete(a),!V)D({...I,type:"workspace-unsubscribe",id:E(u),payload:{subscriptionId:a}});throw c}return()=>{if(!le.delete(a)||V)return;D({...I,type:"workspace-unsubscribe",id:E(u),payload:{subscriptionId:a}})}},Sr=async(t,r)=>{if(t.kind==="session")X(t.sessionId);if(t.kind==="project")X(t.projectId);let a=E(u);de.set(a,r);try{await k({...I,type:"shells-subscribe",id:E(u),payload:{subscriptionId:a,scope:t}})}catch(c){if(de.delete(a),!V)D({...I,type:"shells-unsubscribe",id:E(u),payload:{subscriptionId:a}});throw c}return()=>{if(!de.delete(a)||V)return;D({...I,type:"shells-unsubscribe",id:E(u),payload:{subscriptionId:a}})}},Ue=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>at))throw new l("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!pe(t.value))throw new l("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>ct)throw new l("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&d?.features?.deviceStorage!==!0)throw new l("UNSUPPORTED","This host does not support device storage.");let r=await v({...I,type:"storage",id:E(u),payload:t});if(!r||!("storage"in r)||r.op!==t.op)throw new l("HOST_REJECTED","Host did not return storage data.");return r},_o=(t,r)=>d?.features?.popovers!==!0&&!(d?.surface==="popover"&&d.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):k({...I,type:"popover-close",id:E(u),payload:r?{id:t,reason:r}:{id:t}}),So=(t,r)=>d?.features?.popovers!==!0&&!(d?.surface==="popover"&&d.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):k({...I,type:"popover-anchor",id:E(u),payload:{id:t,active:r}});return o.addEventListener("keydown",lo,!0),o.addEventListener("pointerover",Ce),o.addEventListener("pointermove",Ce),o.addEventListener("pointerout",po),o.addEventListener("focus",uo),o.addEventListener("blur",Eo),{onAction:(t)=>(F=t,()=>{if(F===t)F=null}),listProjects:async()=>{let t=await nt({kind:"projects"});if(t.kind!=="projects")throw new l("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let r=await nt({kind:"worktrees",projectId:t});if(r.kind!=="worktrees")throw new l("HOST_REJECTED","Expected worktrees.");return r},listSessions:async(t)=>{let r=await nt({kind:"sessions",projectId:t});if(r.kind!=="sessions")throw new l("HOST_REJECTED","Expected sessions.");return r},onProjects:(t)=>st({kind:"projects"},(r)=>{if(r.kind==="projects")t(r)}),onWorktrees:(t,r)=>st({kind:"worktrees",projectId:t},(a)=>{if(a.kind==="worktrees")r(a)}),onSessions:(t,r)=>st({kind:"sessions",projectId:t},(a)=>{if(a.kind==="sessions")r(a)}),onRunningShells:(t,r)=>Sr(t,r),readShellOutput:async(t,r)=>{X(t,ve);let a=r?.cursor;if(a!==void 0&&(!Number.isInteger(a)||a<0))throw new l("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let c=r?.tailBytes;if(c!==void 0&&(!Number.isInteger(c)||c<1||c>Ne))throw new l("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Ne}.`);let m=await v({...I,type:"shell-output",id:E(u),payload:{shellId:t,cursor:a,tailBytes:c}});if(!m||typeof m.output!=="string"||!Number.isFinite(m.cursor))throw new l("HOST_REJECTED","Host did not return shell output.");return m},stopShell:async(t)=>{if(X(t,ve),(await v({...I,type:"shell-stop",id:E(u),payload:{shellId:t}}))?.stopped!==!0)throw new l("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{X(t),await k({...I,type:"open-session",id:E(u),payload:{sessionId:t}})},storage:{get:async(t,r)=>{let a=Be(r),c={op:"get",key:t};if(a)c.scope=a;let h=await Ue(c);return h.op==="get"&&h.found?h.value:void 0},set:async(t,r,a)=>{let c=Be(a),h={op:"set",key:t,value:r};if(c)h.scope=c;await Ue(h)},delete:async(t,r)=>{let a=Be(r),c={op:"delete",key:t};if(a)c.scope=a;await Ue(c)},keys:async(t)=>{let r=Be(t),a={op:"keys"};if(r)a.scope=r;let c=await Ue(a);if(c.op!=="keys")throw new l("HOST_REJECTED","Expected storage keys.");return c.keys}},onReady:(t)=>{if(i.add(t),d)t(d);return()=>{i.delete(t)}},onDirectory:(t)=>{if(p.add(t),d)t(d.directory);return()=>{p.delete(t)}},onSession:(t)=>{if(T.add(t),d)t(d.session);return()=>{T.delete(t)}},onSessionLifecycle:(t)=>{if(b.add(t),K)t(K);return()=>{b.delete(t)}},onConnection:(t)=>{if(U.add(t),d)t(d.connection);return()=>{U.delete(t)}},onSettings:(t)=>{if(O.add(t),d)t(d.settings);return()=>{O.delete(t)}},onItem:(t)=>{if(f.add(t),d)t(d.item);return()=>{f.delete(t)}},onStatusControl:(t)=>(B.add(t),()=>{B.delete(t)}),onPopoverClosed:(t)=>(ae.add(t),()=>{ae.delete(t)}),setStatusControls:(t)=>{if(d?.features?.statusControls!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not support status controls."));if(!Ao(t))return Promise.reject(new l("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return k({...I,type:"status-controls",id:E(u),payload:{controls:t}})},openPopover:(t)=>{if(d?.features?.popovers!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not support popovers."));if(!ut(t))return Promise.reject(new l("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return k({...I,type:"popover-open",id:E(u),payload:t})},closePopover:_o,setPopoverAnchorActive:So,onResolve:(t)=>(J=t,()=>{if(J===t)J=null}),toast:(t)=>{let r=t.message.trim();if(!r||r.length>we)return Promise.reject(new l("HOST_REJECTED",`Toast message must contain 1 to ${we} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Pe))return Promise.reject(new l("HOST_REJECTED",`Toast copy text must contain 1 to ${Pe} characters.`));return k({channel:_,v:S,type:"toast",id:E(u),payload:{...t,message:r}})},openUrl:(t)=>k({channel:_,v:S,type:"open-url",id:E(u),payload:{url:t}}),openCommit:(t)=>Tt(t)?k({channel:_,v:S,type:"open-commit",id:E(u),payload:{sha:t}}):Promise.reject(new l("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>k({channel:_,v:S,type:"open-surface",id:E(u),payload:{surfaceId:t}}),writeClipboard:(t)=>k({channel:_,v:S,type:"clipboard-write",id:E(u),payload:{text:t}}),compose:(t)=>k({channel:_,v:S,type:"compose",id:E(u),payload:t}),attach:(t)=>k({channel:_,v:S,type:"attach",id:E(u),payload:ue(t)}),startSession:async(t)=>{if(t.projectId!==void 0)X(t.projectId);let r=t.worktree;if(r&&r!==!0)if(r.kind==="existing")X(r.directory);else{if(r.name!==void 0)X(r.name,200);if(r.baseBranch!==void 0)X(r.baseBranch,200)}let a=await v({channel:_,v:S,type:"start-session",id:E(u),payload:ht(t)},e.requestTimeoutMs??180000);if(!_t(a))throw new l("HOST_REJECTED","Host did not return a session.");return a},prompt:(t)=>v({channel:_,v:S,type:"prompt",id:E(u),payload:At(t)}).then((r)=>{if(!St(r))throw new l("HOST_REJECTED","Host did not return a prompt result.");return r}),sessionLink:(t)=>k({channel:_,v:S,type:"session-link",id:E(u),payload:ue(t)}),close:()=>k({channel:_,v:S,type:"close",id:E(u)}),oauthStart:()=>k({channel:_,v:S,type:"oauth-start",id:E(u)}),oauthDisconnect:()=>k({channel:_,v:S,type:"oauth-disconnect",id:E(u)}),request:(t)=>(Xe(t.path)?v({channel:_,v:S,type:"request",id:E(u),payload:t}):Wo()).then((r)=>{if(!Fe(r))throw new l("HOST_REJECTED","Host request result was empty.");return r}),serviceRequest:(t)=>(Xe(t.path)?v({channel:_,v:S,type:"service-request",id:E(u),payload:t}):Wo()).then((r)=>{if(!Fe(r))throw new l("HOST_REJECTED","Host service request result was empty.");return r}),serviceStatus:()=>v({channel:_,v:S,type:"service-status",id:E(u)}).then((t)=>{if(!Rt(t))throw new l("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(Ee(t)?v({channel:_,v:S,type:"file-read",id:E(u),payload:{path:t}}):Ve()).then((r)=>{if(!bt(r))throw new l("HOST_REJECTED","Host did not return file content.");return r}),writeFile:(t,r)=>{if(!Ee(t))return Ve();if(r.length>De)return Promise.reject(new l("FILE_TOO_LARGE",`Content is over ${De} characters.`));return v({channel:_,v:S,type:"file-write",id:E(u),payload:{path:t,content:r}}).then((a)=>{if(!yt(a))throw new l("HOST_REJECTED","Host did not confirm the write.");return a})},listDir:(t)=>(Ee(t)?v({channel:_,v:S,type:"file-list",id:E(u),payload:{path:t}}):Ve()).then((r)=>{if(!kt(r))throw new l("HOST_REJECTED","Host did not return directory entries.");return r}),stat:(t)=>(Ee(t)?v({channel:_,v:S,type:"file-stat",id:E(u),payload:{path:t}}):Ve()).then((r)=>{if(!It(r))throw new l("HOST_REJECTED","Host did not return file status.");return r}),generate:(t)=>{let r=t.prompt.trim(),a=t.system?.trim();if(r.length===0||r.length>$e)return Promise.reject(new l("HOST_REJECTED",`Prompt must be 1 to ${$e} characters.`));if(a!==void 0&&(a.length===0||a.length>He))return Promise.reject(new l("HOST_REJECTED",`System prompt must be 1 to ${He} characters.`));let c=t.maxOutputTokens===void 0?void 0:Math.min(mt,Math.max(1,Math.floor(t.maxOutputTokens)));if(c!==void 0&&!Number.isFinite(c))return Promise.reject(new l("HOST_REJECTED","maxOutputTokens must be a number."));let h={prompt:r};if(a!==void 0)h.system=a;if(c!==void 0)h.maxOutputTokens=c;return v({channel:_,v:S,type:"generate",id:E(u),payload:h},e.requestTimeoutMs??Ot).then((m)=>{if(!Ct(m))throw new l("HOST_REJECTED","Host did not return generated text.");return m})},onLateGenerateResult:(t)=>{M.add(t);for(let r of fe.splice(0))y([t],r);return so(),()=>{M.delete(t)}},setBadge:(t)=>k({channel:_,v:S,type:"badge",id:E(u),payload:{count:xt(t)}}),setHeight:(t)=>k({channel:_,v:S,type:"resize",id:E(u),payload:{height:gt(t)}}),onFileOpen:(t)=>{if(G.add(t),!me)me=!0,o.addEventListener("keydown",co,!0);if(q)t(q);return()=>{G.delete(t)}},onFileSnapshot:(t)=>(Z=t,()=>{if(Z===t)Z=null}),onFileSaved:(t)=>(Q.add(t),()=>{Q.delete(t)}),reportFileChange:(t)=>rt({...I,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:ao,reportFileUnsupported:()=>rt({...I,type:"file-unsupported"}),dispose:()=>{for(let t of le.keys())D({...I,type:"workspace-unsubscribe",id:E(u),payload:{subscriptionId:t}});le.clear();for(let t of de.keys())D({...I,type:"shells-unsubscribe",id:E(u),payload:{subscriptionId:t}});if(de.clear(),V=!0,J=null,F=null,Z=null,G.clear(),Q.clear(),me)o.removeEventListener("keydown",co,!0);o.removeEventListener("message",io),o.removeEventListener("keydown",lo,!0),o.removeEventListener("pointerover",Ce),o.removeEventListener("pointermove",Ce),o.removeEventListener("pointerout",po),o.removeEventListener("focus",uo),o.removeEventListener("blur",Eo);for(let t of ce.values())clearTimeout(t.timer),t.reject(new l("HOST_UNAVAILABLE","Host client was disposed."));ce.clear(),i.clear(),p.clear(),T.clear(),b.clear(),U.clear(),O.clear(),f.clear(),B.clear(),ae.clear(),M.clear(),fe.length=0}}};var Yo=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var Rn=new Set(Yo);var Jo=["none","agent","user"];var yn=new Set(Jo);var br=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],yr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Qo=(e,o)=>{o.style.colorScheme=e.mode;for(let[n,s]of br)o.style.setProperty(n,e.tokens[s]);for(let[n,s,i]of yr){let p=e.tokens[i]??"";o.style.setProperty(n,p),o.style.setProperty(s,p)}o.style.setProperty("font-family",e.tokens.font),o.style.setProperty("font-size","0.875rem"),o.style.setProperty("line-height","1.45"),o.style.setProperty("color",e.tokens.foreground)},Nt=(e,o)=>{if(Qo(e.theme,o),o.dataset)o.dataset.ocSurface=e.surface,o.dataset.ocTheme=e.theme.mode};var kr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},A=(e,o)=>`var(--${e}, var(--oc-${kr[e]}, ${o}))`,j=A("surface-background","transparent"),ze=A("surface-elevated","transparent"),_e=A("surface-elevated-foreground","inherit"),H=A("surface-foreground","inherit"),g=A("surface-muted-foreground","gray"),Ir=A("surface-muted","transparent"),ee=A("interactive-border","currentColor"),L=A("interactive-hover","transparent"),te=A("interactive-active","transparent"),Mt=A("interactive-selection","transparent"),Lt=A("interactive-selection-foreground","inherit"),z=A("primary","currentColor"),wt=A("primary-text","inherit"),Pt=A("error-text","inherit"),Cr=A("font-sans","inherit"),Gt=A("font-mono","monospace"),tr=A("radius","9px"),Dt=`calc(${tr} - 2px)`,Zo=`calc(${tr} - 4px)`,R=(e,o,n="transparent")=>`color-mix(in srgb, ${e} ${o}%, ${n})`,qo=`background-image: linear-gradient(${L}, ${L});`,$t=(e,o="0.5px")=>`box-shadow: inset 0 0 0 ${o} ${e}, var(--oc-sdk-field-lift);`,Ht="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",er="box-shadow: var(--oc-sdk-lit);",Xt=`inset 0 0.5px 0 0 ${R(H,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,Ur=`
:root {
  --oc-sdk-edge: ${R(H,16)};
  --oc-sdk-field-bg: ${ze};
  --oc-sdk-raised-bg: ${j};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${R(H,14)};
  --oc-sdk-field-bg: ${R(j,50,ze)};
  --oc-sdk-raised-bg: ${ze};
  --oc-sdk-field-lift: ${Xt};
  --oc-sdk-raised-lift: ${Xt};
  --oc-sdk-lit: ${Xt};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Ke=(e)=>{let o=A(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${o}; --oc-sdk-tone-text: ${A(`${e}-text`,"inherit")}; }`},vr=`
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
`,or=`${Ur}
.oc-sdk { color: ${H}; font-family: ${Cr}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${qo} }
.oc-sdk-mono { font-family: ${Gt}; }
.oc-sdk-muted { color: ${g}; }
${Ke("success")}${Ke("warning")}${Ke("error")}${Ke("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${z}; --oc-sdk-tone-text: ${wt}; }

.oc-sdk-btn { border-radius: ${Dt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Zo}; }
.oc-sdk-btn[data-variant="default"] { color: ${wt}; background: ${R(z,10,j)}; border-color: ${R(z,12)}; ${er} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${R(z,16,j)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${R(z,22,j)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Ir}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${L}, ${L}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${te}, ${te}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${_e}; ${Ht} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${L}, ${L}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${te}, ${te}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${L}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${te}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${A("status-error","red")}; color: ${Pt}; background: ${R("var(--oc-sdk-tone)",7,j)}; border-color: ${R("var(--oc-sdk-tone)",12)}; ${er} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${R("var(--oc-sdk-tone)",9,j)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${R("var(--oc-sdk-tone)",11,j)}; box-shadow: none; }

.oc-sdk-field-note { color: ${g}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Pt}; }
.oc-sdk-input { border-radius: ${Dt}; background: var(--oc-sdk-field-bg); color: ${_e}; ${$t("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${g}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${L}, ${L}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${$t(R(H,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${$t(A("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${Gt}; }

.oc-sdk-search-icon { color: ${g}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${z}; }
.oc-sdk-search-clear { border-radius: ${Zo}; color: ${g}; }
.oc-sdk-search-clear:hover { background: ${L}; color: ${H}; }

.oc-sdk-trigger { border-radius: ${Dt}; background: var(--oc-sdk-raised-bg); color: ${_e}; ${Ht} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${L}, ${L}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${te}, ${te}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${g}; }
.oc-sdk-trigger-chevron { color: ${g}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${_e}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${ze}; background-clip: padding-box; color: ${_e}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${L}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Mt}; color: ${Lt}; }
.oc-sdk-option-check { color: ${H}; }
.oc-sdk-option[data-destructive="true"] { color: ${Pt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${R(A("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${g}; }
.oc-sdk-popup-empty { color: ${g}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${ee}; border-radius: 4px; color: ${H}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${R(H,60,ee)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${ee}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${j}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${z}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${qo} }
.oc-sdk-check-desc { color: ${g}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${R(H,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${g}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${H}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Lt}; background: ${Mt}; border-color: ${ee}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${_e}; background: var(--oc-sdk-raised-bg); ${Ht} }
.oc-sdk-tab-count { color: ${g}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${R(H,6)}; color: ${g}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${R("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${L}; }
.oc-sdk-row[aria-selected="true"] { background: ${Mt}; color: ${Lt}; }
.oc-sdk-row-lead { font-family: ${Gt}; color: ${g}; }
.oc-sdk-row-sub { color: ${g}; }
.oc-sdk-row-meta { color: ${g}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${g}; }

.oc-sdk-empty-body { color: ${g}; }

.oc-sdk-spinner { color: ${g}; }
.oc-sdk-spinner-ring { border-color: ${ee}; border-top-color: ${z}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${R("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${g}; }

.oc-sdk-separator { color: ${g}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${R(ee,40)}; }

.oc-sdk-progress-label { color: ${g}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${R(H,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${z}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${A("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${A("success-text","inherit")}; }

.oc-sdk-text a { color: ${wt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${R(ee,60)}; }
`,N=`
${it}
${vr}
${or}`;var x={util:"#4d9fff",mem:"#e8c33a",temp:"#b07fe8",power:"#3ddc84",cpu:"#ff8c42",systemRam:"#89929c"};var Pr={llama:"llama.cpp",ollama:"Ollama",vllm:"vLLM",sglang:"SGLang",tgi:"Hugging Face TGI"};function rr(e){return Pr[e]}function nr(e){let o=[],n=["llama","ollama","vllm","sglang","tgi"];for(let s of n)for(let i of e[s]??[]){if(s==="ollama"||!i.model)continue;let p=i.alias||i.model;o.push({key:`process:${s}:${i.pid}`,engine:s,title:p,process:i})}for(let s of e.ollama_models??[]){if(!s.name)continue;o.push({key:`ollama-model:${s.name}`,engine:"ollama",title:s.name,ollamaModel:s})}return o.sort((s,i)=>s.key.localeCompare(i.key))}var Gr=/(?:api[-_]?key|token|password|secret|credential|auth)/i;function sr(e=[]){let o=[];for(let n=1;n<e.length;n++){let s=e[n];if(!/^-{1,2}(?!\d)/.test(s))continue;let i=s.indexOf("="),p=(i<0?s:s.slice(0,i)).replace(/^-+/,""),T=i<0?"":s.slice(i+1);if(i<0&&n+1<e.length&&!/^-{1,2}(?!\d)/.test(e[n+1]))T=e[++n];if(Gr.test(p)&&T)T="[redacted]";o.push({key:p,value:T})}return o.sort((n,s)=>n.key.localeCompare(s.key))}var Vt=21;var Bt=["util","mem","temp","power","cpu"],Kt="seriesVisibilityV1",Dr={util:!0,mem:!0,temp:!0,power:!0,cpu:!0},zt=(e)=>{let o={...Dr};if(!e||typeof e!=="object"||Array.isArray(e))return o;for(let n of Bt){let s=e[n];if(typeof s==="boolean")o[n]=s}return o};var Re=vt(),tt=document.querySelector("#root");if(!tt)throw Error("Missing #root");var $r=`
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
.llm-section[hidden] { display: none; }
.llm-list { display: flex; flex-direction: column; gap: 8px; }
.llm-card {
  --engine-color: var(--oc-primary);
  min-width: 0;
  padding: 9px;
  background: color-mix(in srgb, var(--oc-fg) 4%, transparent);
  border: 1px solid color-mix(in srgb, var(--engine-color) 65%, transparent);
  border-radius: 6px;
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--engine-color) 7%, transparent);
}
.llm-title { color: var(--engine-color); font-weight: 650; overflow-wrap: anywhere; }
.llm-stats, .llm-meta { color: var(--oc-muted); font-size: 11px; overflow-wrap: anywhere; }
.llm-flags { display: flex; flex-wrap: wrap; gap: 3px 8px; margin-top: 5px; }
.llm-flag { max-width: 100%; overflow-wrap: anywhere; font: 10px/1.35 var(--oc-mono, monospace); }
.llm-flag-key { color: var(--oc-muted); }
.llm-flag-value { color: var(--oc-fg); }
.llm-empty { color: var(--oc-muted); font-size: 11px; }
`,lr=document.createElement("style");lr.textContent=$r;document.head.append(lr);var ir=(e)=>{if(e===0)return"0 B";let o=["B","KB","MB","GB","TB"],n=Math.floor(Math.log(e)/Math.log(1024));return`${(e/Math.pow(1024,n)).toFixed(1)} ${o[n]}`},Qe=(e)=>{if(e===null)return"–";return`${e.toFixed(0)}%`},Hr=(e)=>{if(e===null)return"–";return`${e.toFixed(0)}°`},Xr=(e)=>{if(e===null)return"–";return`${e.toFixed(0)} W`},Te={util:"GPU Util",mem:"GTT",temp:"Temp",power:"Power",cpu:"CPU"},Fr={util:100,mem:100,temp:100,power:100,cpu:100};function Yt(e,o){let n=document.getElementById("chart-svg");if(!n)return;while(n.firstChild)n.removeChild(n.firstChild);let s=300,i=100,p=2,T=(O,f)=>{if(f<=1)return s/2;return p+(Vt-f+O)/(Vt-1)*(s-2*p)},b=(O,f)=>{let B=Math.min(Math.max(O,0),f);return i-p-B/f*(i-2*p)},U=document.createElementNS("http://www.w3.org/2000/svg","g");for(let O of[0.25,0.5,0.75]){let f=document.createElementNS("http://www.w3.org/2000/svg","line");f.setAttribute("x1","0"),f.setAttribute("x2",String(s)),f.setAttribute("y1",String(i*O)),f.setAttribute("y2",String(i*O)),f.setAttribute("stroke","var(--oc-border)"),f.setAttribute("stroke-width","0.5"),f.setAttribute("opacity","0.3"),U.appendChild(f)}n.appendChild(U);for(let O of Bt){if(!o[O])continue;let f=e[O],B=x[O],ae=Fr[O],M=[];if(f.forEach((Q,Z)=>{if(Q===null)return;let q=T(Z,f.length),me=b(Q,ae);M.push(`${q.toFixed(1)},${me.toFixed(1)}`)}),M.length<2)continue;let fe=M[0].split(",")[0],J=M[M.length-1].split(",")[0],F=document.createElementNS("http://www.w3.org/2000/svg","polygon");F.setAttribute("points",`${fe},${i} ${M.join(" ")} ${J},${i}`),F.setAttribute("fill",B),F.setAttribute("opacity","0.08"),n.appendChild(F);let G=document.createElementNS("http://www.w3.org/2000/svg","polyline");G.setAttribute("points",M.join(" ")),G.setAttribute("fill","none"),G.setAttribute("stroke",B),G.setAttribute("stroke-width","1.5"),G.setAttribute("stroke-linejoin","round"),G.setAttribute("stroke-linecap","round"),G.setAttribute("opacity","0.95"),n.appendChild(G)}}var qe=null,Jt=!1,jt=0,Y=zt(void 0),be=document.createElement("div");be.className="status-dot";var ye=document.createElement("span");ye.textContent="Connecting…";var Qt=document.createElement("div");Qt.className="status";Qt.append(be,ye);var oe=document.createElement("button");oe.type="button";oe.dataset.series="util";oe.className="stat";oe.innerHTML=`
  <span class="stat-label">GPU Util</span>
  <span class="stat-value">–</span>
`;var ke=document.createElement("div");ke.className="stat";ke.innerHTML=`
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
`;var Zt=document.createElement("div");Zt.className="stats-row";Zt.append(oe,ie,re,ne,se,ke);var Vr=[[oe,x.util],[ke,x.systemRam],[re,x.temp],[ne,x.power],[se,x.cpu],[ie,x.mem]];for(let[e,o]of Vr)e.style.setProperty("--series-color",o);var qt=document.createElement("div");qt.className="mem-detail";var dr=document.createElement("span"),pr=document.createElement("span");qt.append(dr,pr);var eo=document.createElement("div");eo.className="section";eo.innerHTML=`
  <h2>Activity</h2>
  <div class="chart-container">
    <svg id="chart-svg" class="chart" viewBox="0 0 300 100" preserveAspectRatio="none"></svg>
    <div class="legend">
      <button class="legend-item" type="button" data-series="util" style="--series-color:${x.util}" aria-pressed="true"><span class="legend-dot" style="background:${x.util}"></span>${Te.util}</button>
      <button class="legend-item" type="button" data-series="mem" style="--series-color:${x.mem}" aria-pressed="true"><span class="legend-dot" style="background:${x.mem}"></span>${Te.mem}</button>
      <button class="legend-item" type="button" data-series="temp" style="--series-color:${x.temp}" aria-pressed="true"><span class="legend-dot" style="background:${x.temp}"></span>${Te.temp}</button>
      <button class="legend-item" type="button" data-series="power" style="--series-color:${x.power}" aria-pressed="true"><span class="legend-dot" style="background:${x.power}"></span>${Te.power}</button>
      <button class="legend-item" type="button" data-series="cpu" style="--series-color:${x.cpu}" aria-pressed="true"><span class="legend-dot" style="background:${x.cpu}"></span>${Te.cpu}</button>
    </div>
  </div>
`;var ot=document.createElement("section");ot.className="section llm-section";var ur=document.createElement("h2");ur.textContent="LLM processes";var et=document.createElement("div");et.className="llm-list";ot.append(ur,et);tt.append(Qt,Zt,qt,eo,ot);var Ze=new Map,Br={llama:x.util,ollama:x.mem,vllm:x.temp,sglang:x.power,tgi:x.cpu},ar=(e)=>e===null||e===void 0?"N/A":`${e.toFixed(0)}%`,cr=(e)=>e===null||e===void 0?"N/A":`${(e/1024).toFixed(0)} MiB`;function Kr(){let e=document.createElement("article");e.className="llm-card";let o=document.createElement("div");o.className="llm-title";let n=document.createElement("div");n.className="llm-stats";let s=document.createElement("div");s.className="llm-meta";let i=document.createElement("div");return i.className="llm-flags",e.append(o,n,s,i),{element:e,title:o,stats:n,meta:s,flags:i,flagsSignature:""}}function zr(e){let o=e.process;if(!o){let n=e.ollamaModel;if(!n)return"";return[n.parameter_size&&`parameters: ${n.parameter_size}`,n.quantization&&`quant: ${n.quantization}`].filter(Boolean).join("   ·   ")}return[o.user&&`user: ${o.user}`,o.ngl&&`ngl: ${o.ngl}`,o.ctx&&`ctx: ${o.ctx}`,o.parallel&&`parallel: ${o.parallel}`,o.threads&&`threads: ${o.threads}`,o.port&&`port: ${o.port}`,`pid: ${o.pid}`].filter(Boolean).join("   ·   ")}function jr(e,o){if(e.element.style.setProperty("--engine-color",Br[o.engine]),e.title.textContent=`${rr(o.engine)}  [${o.title}]`,o.process){let p=o.process;e.stats.textContent=`GPU (proc): ${ar(p.gpu_pct)}   GPU MEM (proc): ${cr(p.vram_kb)}   CPU: ${ar(p.cpu_pct)}   RSS: ${cr(p.rss_kb)}`}else if(o.ollamaModel){let p=o.ollamaModel,T=p.size?ir(p.size):"N/A",b=p.size_vram?ir(p.size_vram):"N/A";e.stats.textContent=`Model size: ${T}   GPU memory: ${b}`}e.meta.textContent=zr(o);let n=o.process?.argv??[],s=sr(n),i=JSON.stringify(s);if(i!==e.flagsSignature){e.flags.replaceChildren();for(let p of s){let T=document.createElement("span");T.className="llm-flag";let b=document.createElement("span");b.className="llm-flag-key",b.textContent=`${p.key}: `;let U=document.createElement("span");U.className="llm-flag-value",U.textContent=p.value||"on",T.append(b,U),e.flags.append(T)}e.flagsSignature=i}}function Wr(e){let o=nr(e);ot.hidden=o.length===0;let n=new Set(o.map(({key:s})=>s));for(let[s,i]of Ze){if(n.has(s))continue;i.element.remove(),Ze.delete(s)}o.forEach((s,i)=>{let p=Ze.get(s.key);if(!p)p=Kr(),Ze.set(s.key,p);jr(p,s);let T=et.children.item(i);if(T!==p.element)et.insertBefore(p.element,T)})}function to(){for(let e of Array.from(tt.querySelectorAll("[data-series]"))){let o=e.dataset.series,n=Y[o];e.setAttribute("aria-pressed",String(n)),e.classList.toggle("series-off",!n),e.title=`${n?"Hide":"Show"} ${Te[o]} graph line`}}function Yr(e){if(Y={...Y,[e]:!Y[e]},to(),qe)Yt(qe.history,Y);Re.storage.set(Kt,Y).catch((o)=>{console.warn("Could not save onvtop graph visibility",o)})}for(let e of Array.from(tt.querySelectorAll("[data-series]")))e.addEventListener("click",()=>Yr(e.dataset.series));to();function Jr(e){let{gpu:o,sys:n}=e.sample;if(Wr(e.sample.llm),!e.sourceAvailable){be.className="status-dot error",ye.textContent="nvstats-service unavailable",Yt(e.history,Y),Jt=!0;return}oe.querySelector(".stat-value").textContent=Qe(o.util),re.querySelector(".stat-value").textContent=Hr(o.temp),ne.querySelector(".stat-value").textContent=Xr(o.power_w),se.querySelector(".stat-value").textContent=Qe(n.cpu);let s=o.mem_used??0,i=o.mem_total??0,p=o.mem_used!==null&&i>0?s/i*100:null;ie.querySelector(".stat-value").textContent=Qe(p);let T=o.mem_used===null?"—":(s/1024).toFixed(1),b=o.mem_total===null?"—":(i/1024).toFixed(1);dr.textContent=`GTT ${T} / ${b} GiB`;let{ram_used:U,ram_total:O}=n,f=O>0?U/O*100:null;ke.querySelector(".stat-value").textContent=Qe(f),pr.textContent=`System RAM ${(U/1073741824).toFixed(1)} / ${(O/1073741824).toFixed(1)} GiB`,Yt(e.history,Y),be.className="status-dot ok",ye.textContent="Live",Jt=!1}function Qr(){be.className="status-dot error",ye.textContent="No data from nvstats-service",Jt=!0}async function oo(){try{let e=await Re.serviceRequest({method:"GET",path:"/stats"}),o=JSON.parse(e.body);if(e.status===200)qe=o,Jr(qe),jt=0;else throw Error("bad response")}catch{if(jt++,jt>3)Qr()}}var ge=null,Wt=!1;function Er(){if(ge)return;ge=setInterval(()=>{if(!Wt)Wt=!0,oo().finally(()=>{Wt=!1})},2000)}function _r(){if(ge)clearInterval(ge),ge=null}document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")Er(),oo();else _r()});window.addEventListener("pagehide",()=>{_r(),Re.dispose()});Re.onReady(async(e)=>{Nt(e,document.documentElement);try{Y=zt(await Re.storage.get(Kt)),to()}catch(o){console.warn("Could not load onvtop graph visibility",o)}Er(),oo()});})();
