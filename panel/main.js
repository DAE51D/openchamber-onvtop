(()=>{var m="openchamber.sdk",S=1;var Ut=`
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
`;function Zo(e){let o=e.documentElement;if(o.hasAttribute("data-oc-scrollbar-activity"))return;o.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(s)=>{let i=s.target===e?o:s.target;if(!(i instanceof Element))return;if(!i.hasAttribute("data-oc-scrolling"))i.setAttribute("data-oc-scrolling","");let a=n.get(i);if(a!==void 0)clearTimeout(a);n.set(i,setTimeout(()=>{n.delete(i),i.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var en=`(${Zo.toString()})(document);`;var Nt=128,wt=65536;var ze=128;var je=65536;var tr=/^[a-z][a-z0-9-]{0,39}$/;var Qo=(e)=>Object(e)===e&&!Array.isArray(e),Mt=(e,o)=>Object.keys(e).every((n)=>o.includes(n)),qo=(e)=>String(e)===e&&e.length>=1&&e.length<=60,er=(e)=>String(e)===e&&e.length>=1&&e.length<=80,or=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let o=new Set;for(let n of e){if(!Qo(n)||!tr.test(n.id)||!qo(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(o.has(n.id))return!1;if(o.add(n.id),n.kind==="button"){if(!Mt(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!Mt(n,["kind","id","label","value","options","disabled"]))return!1;if(!er(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let s=new Set;for(let i of n.options){if(!Qo(i)||!Mt(i,["value","label"])||!er(i.value)||!qo(i.label)||s.has(i.value))return!1;s.add(i.value)}if(!s.has(n.value))return!1}return!0};var rr=["{id}","{segment}","{segments+}"];var Jn=new Set(rr);var nr=["turn-finished","turn-failed","permission-asked","question-asked"];var Qn=new Set(nr);var We=20000000,Ye=256;var Lt=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,sr=(e,o)=>{if(e.path!==o.path||e.readOnly!==o.readOnly)return!1;if(e.encoding==="text"||o.encoding==="text")return e.encoding==="text"&&o.encoding==="text"&&e.content===o.content;if(e.bytes.byteLength!==o.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==o.bytes[n])return!1;return!0};var ir=/^[A-Za-z0-9_-]{1,80}$/;var ar=["left","right","top","bottom"];var cr=(e,o=0,n={remaining:16000})=>{if(--n.remaining<0||o>=32)return!1;if(e===null)return!0;let s=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let i of s)if(!cr(i,o+1,n))return!1;return!0},Pt=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((o)=>/^(0|[1-9]\d*)$/.test(o)&&Number(o)<e.length)&&e.every(Pt);if(Object(e)===e){let o=Object.getPrototypeOf(e);return(o===null||o===Object.prototype)&&Object.values(e).every(Pt)}return String(e)===e||Number.isFinite(e)},Gt=(e)=>{try{if(String(e.id)!==e.id||!ir.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!ar.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!cr(e.data)||!Pt(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var dr=["file","directory","other","missing"],$t=(e)=>Boolean(e&&"sessionId"in e),Ht=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var pr=/^[0-9a-f]{7,64}$/i,Ft=(e)=>pr.test(e),Je=500,Ze=32000,ur=16000,Er=128,_r=200,mr=2000,Sr=16000,fr=80,Tr=200,hr=16000;var gr=2000;var Xt=20000,Qe=1024,qe=2000000;var et=64000,tt=8000,Vt=4000;var Bt=960000;var xr=999,br=1e4,Me=500,Or=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Ar=["stopped","starting","ready","failed"],on=new Set(Or),Rr=(e)=>on.has(e),yr=(e)=>e&&Rr(e)?e:"HOST_REJECTED",Oe=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(Oe);if(Object(e)===e)return Object.values(e).every(Oe);return!1},kr=(e)=>Oe(e)&&JSON.stringify(e).length<=hr,lr=(e)=>e?.trim().slice(0,Tr)??"",Ae=(e)=>{let o=e.id.trim().slice(0,Er),n=e.title.trim().slice(0,_r),s=e.url.trim().slice(0,mr),i=e.text?.trim().slice(0,Sr),a=e.author?.trim().slice(0,fr),_=e.kind==="pull"?"pull":"issue",f={providerId:e.providerId.trim(),id:o,title:n||o,url:s,kind:_};if(i)f.text=i;if(a)f.author=a;if(_==="pull"){let k=lr(e.branches?.head),h=lr(e.branches?.base);if(k&&h)f.branches={head:k,base:h}}if(kr(e.data))f.data=e.data;return f},Kt=(e)=>{let o=Ae(e);if(e.projectId)o.projectId=e.projectId;if(e.navigation)o.navigation=e.navigation;if(e.worktree)o.worktree=e.worktree;return o},zt=(e)=>{let o={text:e.text.trim().slice(0,ur)};if(e.send)o.send=!0;return o},jt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(xr,Math.max(0,Math.round(e)))},Wt=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(br,Math.max(0,Math.ceil(e)))};var Re=(e)=>e.length>0&&e.length<=Qe&&!e.includes("\x00")&&!e.includes("\\");var ot=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>gr)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},rn=new Set(Ar),Yt=(e)=>Boolean(e&&"status"in e&&rn.has(String(e.status))&&!("body"in e)),rt=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Jt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Zt=(e)=>Boolean(e&&"written"in e&&e.written===!0),Qt=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),nn=new Set(dr),qt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&nn.has(String(e.kind))&&Number.isFinite(e.size)),eo=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),sn=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),an=(e)=>Object(e)===e?e:null,Dt=(e)=>String(e)===e&&e.length>0,cn=(e)=>{if(!Dt(e.id))return null;if(e.ok===!0){let o={channel:m,v:S,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)o.payload=e.payload;return o}if(e.ok===!1&&Dt(e.error))return{channel:m,v:S,type:"result",id:e.id,ok:!1,error:e.error,code:yr(Dt(e.code)?e.code:void 0)};return null},to=(e)=>{let o=an(e);if(!o||o.channel!==m||o.v!==S)return null;if(o.type==="result")return cn(o);if(!sn.has(String(o.type))||Object(o.payload)!==o.payload)return null;return o};var vr=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),ln=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class d extends Error{code;constructor(e,o){super(o);this.name="HostRequestError",this.code=e}}var Ir=()=>Promise.reject(new d("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),nt=()=>Promise.reject(new d("BAD_PATH",`File path must be 1 to ${Qe} characters without NUL or backslash.`)),st=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new d("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},E=(e)=>(e.value+=1,`oc-${e.value}`),oo=(e={})=>{let o=e.target??("window"in globalThis?window:null);if(!o)throw new d("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((t)=>t===o.parent),s=e.requestTimeoutMs??Xt,i=new Set,a=new Set,_=new Set,f=new Set,k=new Set,h=new Set,T=new Set,L=new Set,Z=new Set,P=new Set,Ce=[],ce=null,W=null,X=new Set,le=new Set,de=null,pe=null,Ue=!1,ge=new Map,xe=new Map,be=new Map,Y=!1,u={value:0},p=null,Q=null,Ne=!1,we=!1,$o=null,Ho=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},V=(t)=>{o.parent.postMessage(t,"*")},Fo=()=>{if(Y||o.parent===o||P.size===0||p?.features?.lateGenerateResults!==!0)return;V({channel:m,v:S,type:"generate-late-listen"})},y=(t,r)=>{for(let c of t)try{c(r)}catch(l){console.error(l)}},Xo=(t)=>{if(!(t instanceof MessageEvent))return;if(!n(t.source))return;let r=to(t.data);if(!r)return;if(r.type==="workspace"){let l=xe.get(r.payload.subscriptionId);if(l)y([l],r.payload.snapshot);return}if(r.type==="shells"){let l=be.get(r.payload.subscriptionId);if(l)y([l],r.payload.snapshot);return}if(r.type==="ready"){if(p=r.payload,Q=Ho(r.payload.session),y(i,r.payload),y(a,r.payload.directory),y(_,r.payload.session),Q)y(f,Q);y(k,r.payload.connection),y(h,r.payload.settings),y(T,r.payload.item),Fo();return}if(r.type==="generate-late"){if(P.size===0)Ce.push(r.payload);else y(P,r.payload);return}if(r.type==="directory"){if(p)p={...p,directory:r.payload.directory};y(a,r.payload.directory);return}if(r.type==="session"){if(p)p={...p,session:r.payload.session};if(!r.payload.session)Q=null;else if(Q?.sessionId!==r.payload.session.id)Q=Ho(r.payload.session);y(_,r.payload.session);return}if(r.type==="session-lifecycle"){Q=r.payload,y(f,r.payload);return}if(r.type==="connection"){if(p)p={...p,connection:r.payload.connection};y(k,r.payload.connection);return}if(r.type==="settings"){if(p)p={...p,settings:r.payload.settings};y(h,r.payload.settings);return}if(r.type==="item"){if(p)p={...p,item:r.payload.item};y(T,r.payload.item);return}if(r.type==="status-control-event"){y(L,r.payload);return}if(r.type==="popover-closed"){y(Z,r.payload);return}if(r.type==="action"){let l=(g)=>{if(!Y)V({channel:m,v:S,type:"action-result",id:r.id,payload:g})},x=W;if(!x){l({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>x(r.payload)).then(()=>l({ok:!0}),(g)=>{let C=(g instanceof Error?g.message:String(g)).trim();l({ok:!1,error:(C||"Action failed.").slice(0,Me)})});return}if(r.type==="file-open"){let l=r.payload;if(pe&&sr(pe,l))return;pe=l,y(X,r.payload);return}if(r.type==="file-saved"){y(le,r.payload.version);return}if(r.type==="file-snapshot"){let l=(C)=>{if(!Y)V({channel:m,v:S,type:"file-snapshot-result",id:r.id,payload:C})},x=(C)=>l({error:(C.trim()||"Could not read the edited file.").slice(0,Me)}),g=de;if(!g){x("This extension does not edit files.");return}Promise.resolve().then(()=>g(r.payload.purpose)).then((C)=>{if(Lt(C)>We){x(`The file is over ${We} ${"bytes"in C?"bytes":"characters"}.`);return}if(C.version.length>Ye){x(`The snapshot version is over ${Ye} characters.`);return}l({snapshot:"bytes"in C?{bytes:C.bytes,version:C.version}:{content:C.content,version:C.version}})},(C)=>x(C instanceof Error?C.message:String(C)));return}if(r.type==="resolve"){let l=(g)=>{V({channel:m,v:S,type:"resolve-result",id:r.id,payload:g})},x=ce;if(!x){l({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>x(r.payload)).then((g)=>l({item:g?Ae(g):null}),(g)=>{let C=(g instanceof Error?g.message:String(g)).trim();l({error:(C||"Command failed.").slice(0,Me)})});return}let c=ge.get(r.id);if(!c)return;if(clearTimeout(c.timer),ge.delete(r.id),r.ok){c.resolve(r.payload);return}c.reject(new d(r.code,r.error))};o.addEventListener("message",Xo),V({channel:m,v:S,type:"hello"});let w=(t,r=s)=>{if(Y||o.parent===o)return Promise.reject(new d("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((c,l)=>{let x=setTimeout(()=>{ge.delete(t.id),l(new d("HOST_TIMEOUT","Host did not answer in time."))},r);ge.set(t.id,{resolve:c,reject:l,timer:x}),V(t)})},v=(t)=>w(t).then(()=>{return}),I={channel:m,v:S},vt=(t)=>{if(!Y&&o.parent!==o)V(t)},Vo=()=>vt({...I,type:"file-save"}),Bo=(t)=>{if(!vr(t)||!ln(t))return;t.preventDefault(),Vo()},Ko=(t)=>{if(!vr(t)||t.key!=="Escape"||p?.surface!=="popover"||!p.popover)return;t.preventDefault(),Yo(p.popover.id,"escape").catch(()=>{return})},Ve=()=>{let t=p?.surface==="popover"?p.popover:void 0;if(!t)return;let r=Ne||we;if($o===r)return;$o=r,Jo(t.id,r).catch(()=>{return})},Be=()=>{if(p?.surface!=="popover"||Ne)return;Ne=!0,Ve()},zo=(t)=>{if(p?.surface!=="popover"||t.relatedTarget!==null||!Ne)return;Ne=!1,Ve()},jo=()=>{if(p?.surface!=="popover"||we)return;we=!0,Ve()},Wo=()=>{if(p?.surface!=="popover"||!we)return;we=!1,Ve()},j=(t,r=1024)=>{if(!t.trim()||t.length>r)throw new d("HOST_REJECTED",`Identity must contain 1 to ${r} characters.`)},It=async(t)=>{if(t.kind!=="projects")j(t.projectId);let r=await w({...I,type:"workspace-read",id:E(u),payload:t});if(!r||!("kind"in r)||!("state"in r)||r.kind!==t.kind)throw new d("HOST_REJECTED","Host did not return workspace data.");return r},Ct=async(t,r)=>{if(t.kind!=="projects")j(t.projectId);let c=E(u);xe.set(c,r);try{await v({...I,type:"workspace-subscribe",id:E(u),payload:{subscriptionId:c,query:t}})}catch(l){if(xe.delete(c),!Y)V({...I,type:"workspace-unsubscribe",id:E(u),payload:{subscriptionId:c}});throw l}return()=>{if(!xe.delete(c)||Y)return;V({...I,type:"workspace-unsubscribe",id:E(u),payload:{subscriptionId:c}})}},qr=async(t,r)=>{if(t.kind==="session")j(t.sessionId);if(t.kind==="project")j(t.projectId);let c=E(u);be.set(c,r);try{await v({...I,type:"shells-subscribe",id:E(u),payload:{subscriptionId:c,scope:t}})}catch(l){if(be.delete(c),!Y)V({...I,type:"shells-unsubscribe",id:E(u),payload:{subscriptionId:c}});throw l}return()=>{if(!be.delete(c)||Y)return;V({...I,type:"shells-unsubscribe",id:E(u),payload:{subscriptionId:c}})}},Ke=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>Nt))throw new d("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!Oe(t.value))throw new d("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>wt)throw new d("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&p?.features?.deviceStorage!==!0)throw new d("UNSUPPORTED","This host does not support device storage.");let r=await w({...I,type:"storage",id:E(u),payload:t});if(!r||!("storage"in r)||r.op!==t.op)throw new d("HOST_REJECTED","Host did not return storage data.");return r},Yo=(t,r)=>p?.features?.popovers!==!0&&!(p?.surface==="popover"&&p.popover?.id===t)?Promise.reject(new d("UNSUPPORTED","This host does not support popovers.")):v({...I,type:"popover-close",id:E(u),payload:r?{id:t,reason:r}:{id:t}}),Jo=(t,r)=>p?.features?.popovers!==!0&&!(p?.surface==="popover"&&p.popover?.id===t)?Promise.reject(new d("UNSUPPORTED","This host does not support popovers.")):v({...I,type:"popover-anchor",id:E(u),payload:{id:t,active:r}});return o.addEventListener("keydown",Ko,!0),o.addEventListener("pointerover",Be),o.addEventListener("pointermove",Be),o.addEventListener("pointerout",zo),o.addEventListener("focus",jo),o.addEventListener("blur",Wo),{onAction:(t)=>(W=t,()=>{if(W===t)W=null}),listProjects:async()=>{let t=await It({kind:"projects"});if(t.kind!=="projects")throw new d("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let r=await It({kind:"worktrees",projectId:t});if(r.kind!=="worktrees")throw new d("HOST_REJECTED","Expected worktrees.");return r},listSessions:async(t)=>{let r=await It({kind:"sessions",projectId:t});if(r.kind!=="sessions")throw new d("HOST_REJECTED","Expected sessions.");return r},onProjects:(t)=>Ct({kind:"projects"},(r)=>{if(r.kind==="projects")t(r)}),onWorktrees:(t,r)=>Ct({kind:"worktrees",projectId:t},(c)=>{if(c.kind==="worktrees")r(c)}),onSessions:(t,r)=>Ct({kind:"sessions",projectId:t},(c)=>{if(c.kind==="sessions")r(c)}),onRunningShells:(t,r)=>qr(t,r),readShellOutput:async(t,r)=>{j(t,ze);let c=r?.cursor;if(c!==void 0&&(!Number.isInteger(c)||c<0))throw new d("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let l=r?.tailBytes;if(l!==void 0&&(!Number.isInteger(l)||l<1||l>je))throw new d("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${je}.`);let g=await w({...I,type:"shell-output",id:E(u),payload:{shellId:t,cursor:c,tailBytes:l}});if(!g||typeof g.output!=="string"||!Number.isFinite(g.cursor))throw new d("HOST_REJECTED","Host did not return shell output.");return g},stopShell:async(t)=>{if(j(t,ze),(await w({...I,type:"shell-stop",id:E(u),payload:{shellId:t}}))?.stopped!==!0)throw new d("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{j(t),await v({...I,type:"open-session",id:E(u),payload:{sessionId:t}})},storage:{get:async(t,r)=>{let c=st(r),l={op:"get",key:t};if(c)l.scope=c;let x=await Ke(l);return x.op==="get"&&x.found?x.value:void 0},set:async(t,r,c)=>{let l=st(c),x={op:"set",key:t,value:r};if(l)x.scope=l;await Ke(x)},delete:async(t,r)=>{let c=st(r),l={op:"delete",key:t};if(c)l.scope=c;await Ke(l)},keys:async(t)=>{let r=st(t),c={op:"keys"};if(r)c.scope=r;let l=await Ke(c);if(l.op!=="keys")throw new d("HOST_REJECTED","Expected storage keys.");return l.keys}},onReady:(t)=>{if(i.add(t),p)t(p);return()=>{i.delete(t)}},onDirectory:(t)=>{if(a.add(t),p)t(p.directory);return()=>{a.delete(t)}},onSession:(t)=>{if(_.add(t),p)t(p.session);return()=>{_.delete(t)}},onSessionLifecycle:(t)=>{if(f.add(t),Q)t(Q);return()=>{f.delete(t)}},onConnection:(t)=>{if(k.add(t),p)t(p.connection);return()=>{k.delete(t)}},onSettings:(t)=>{if(h.add(t),p)t(p.settings);return()=>{h.delete(t)}},onItem:(t)=>{if(T.add(t),p)t(p.item);return()=>{T.delete(t)}},onStatusControl:(t)=>(L.add(t),()=>{L.delete(t)}),onPopoverClosed:(t)=>(Z.add(t),()=>{Z.delete(t)}),setStatusControls:(t)=>{if(p?.features?.statusControls!==!0)return Promise.reject(new d("UNSUPPORTED","This host does not support status controls."));if(!or(t))return Promise.reject(new d("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return v({...I,type:"status-controls",id:E(u),payload:{controls:t}})},openPopover:(t)=>{if(p?.features?.popovers!==!0)return Promise.reject(new d("UNSUPPORTED","This host does not support popovers."));if(!Gt(t))return Promise.reject(new d("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return v({...I,type:"popover-open",id:E(u),payload:t})},closePopover:Yo,setPopoverAnchorActive:Jo,onResolve:(t)=>(ce=t,()=>{if(ce===t)ce=null}),toast:(t)=>{let r=t.message.trim();if(!r||r.length>Je)return Promise.reject(new d("HOST_REJECTED",`Toast message must contain 1 to ${Je} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Ze))return Promise.reject(new d("HOST_REJECTED",`Toast copy text must contain 1 to ${Ze} characters.`));return v({channel:m,v:S,type:"toast",id:E(u),payload:{...t,message:r}})},openUrl:(t)=>v({channel:m,v:S,type:"open-url",id:E(u),payload:{url:t}}),openCommit:(t)=>Ft(t)?v({channel:m,v:S,type:"open-commit",id:E(u),payload:{sha:t}}):Promise.reject(new d("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>v({channel:m,v:S,type:"open-surface",id:E(u),payload:{surfaceId:t}}),writeClipboard:(t)=>v({channel:m,v:S,type:"clipboard-write",id:E(u),payload:{text:t}}),compose:(t)=>v({channel:m,v:S,type:"compose",id:E(u),payload:t}),attach:(t)=>v({channel:m,v:S,type:"attach",id:E(u),payload:Ae(t)}),startSession:async(t)=>{if(t.projectId!==void 0)j(t.projectId);let r=t.worktree;if(r&&r!==!0)if(r.kind==="existing")j(r.directory);else{if(r.name!==void 0)j(r.name,200);if(r.baseBranch!==void 0)j(r.baseBranch,200)}let c=await w({channel:m,v:S,type:"start-session",id:E(u),payload:Kt(t)},e.requestTimeoutMs??180000);if(!$t(c))throw new d("HOST_REJECTED","Host did not return a session.");return c},prompt:(t)=>w({channel:m,v:S,type:"prompt",id:E(u),payload:zt(t)}).then((r)=>{if(!Ht(r))throw new d("HOST_REJECTED","Host did not return a prompt result.");return r}),sessionLink:(t)=>v({channel:m,v:S,type:"session-link",id:E(u),payload:Ae(t)}),close:()=>v({channel:m,v:S,type:"close",id:E(u)}),oauthStart:()=>v({channel:m,v:S,type:"oauth-start",id:E(u)}),oauthDisconnect:()=>v({channel:m,v:S,type:"oauth-disconnect",id:E(u)}),request:(t)=>(ot(t.path)?w({channel:m,v:S,type:"request",id:E(u),payload:t}):Ir()).then((r)=>{if(!rt(r))throw new d("HOST_REJECTED","Host request result was empty.");return r}),serviceRequest:(t)=>(ot(t.path)?w({channel:m,v:S,type:"service-request",id:E(u),payload:t}):Ir()).then((r)=>{if(!rt(r))throw new d("HOST_REJECTED","Host service request result was empty.");return r}),serviceStatus:()=>w({channel:m,v:S,type:"service-status",id:E(u)}).then((t)=>{if(!Yt(t))throw new d("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(Re(t)?w({channel:m,v:S,type:"file-read",id:E(u),payload:{path:t}}):nt()).then((r)=>{if(!Jt(r))throw new d("HOST_REJECTED","Host did not return file content.");return r}),writeFile:(t,r)=>{if(!Re(t))return nt();if(r.length>qe)return Promise.reject(new d("FILE_TOO_LARGE",`Content is over ${qe} characters.`));return w({channel:m,v:S,type:"file-write",id:E(u),payload:{path:t,content:r}}).then((c)=>{if(!Zt(c))throw new d("HOST_REJECTED","Host did not confirm the write.");return c})},listDir:(t)=>(Re(t)?w({channel:m,v:S,type:"file-list",id:E(u),payload:{path:t}}):nt()).then((r)=>{if(!Qt(r))throw new d("HOST_REJECTED","Host did not return directory entries.");return r}),stat:(t)=>(Re(t)?w({channel:m,v:S,type:"file-stat",id:E(u),payload:{path:t}}):nt()).then((r)=>{if(!qt(r))throw new d("HOST_REJECTED","Host did not return file status.");return r}),generate:(t)=>{let r=t.prompt.trim(),c=t.system?.trim();if(r.length===0||r.length>et)return Promise.reject(new d("HOST_REJECTED",`Prompt must be 1 to ${et} characters.`));if(c!==void 0&&(c.length===0||c.length>tt))return Promise.reject(new d("HOST_REJECTED",`System prompt must be 1 to ${tt} characters.`));let l=t.maxOutputTokens===void 0?void 0:Math.min(Vt,Math.max(1,Math.floor(t.maxOutputTokens)));if(l!==void 0&&!Number.isFinite(l))return Promise.reject(new d("HOST_REJECTED","maxOutputTokens must be a number."));let x={prompt:r};if(c!==void 0)x.system=c;if(l!==void 0)x.maxOutputTokens=l;return w({channel:m,v:S,type:"generate",id:E(u),payload:x},e.requestTimeoutMs??Bt).then((g)=>{if(!eo(g))throw new d("HOST_REJECTED","Host did not return generated text.");return g})},onLateGenerateResult:(t)=>{P.add(t);for(let r of Ce.splice(0))y([t],r);return Fo(),()=>{P.delete(t)}},setBadge:(t)=>v({channel:m,v:S,type:"badge",id:E(u),payload:{count:jt(t)}}),setHeight:(t)=>v({channel:m,v:S,type:"resize",id:E(u),payload:{height:Wt(t)}}),onFileOpen:(t)=>{if(X.add(t),!Ue)Ue=!0,o.addEventListener("keydown",Bo,!0);if(pe)t(pe);return()=>{X.delete(t)}},onFileSnapshot:(t)=>(de=t,()=>{if(de===t)de=null}),onFileSaved:(t)=>(le.add(t),()=>{le.delete(t)}),reportFileChange:(t)=>vt({...I,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:Vo,reportFileUnsupported:()=>vt({...I,type:"file-unsupported"}),dispose:()=>{for(let t of xe.keys())V({...I,type:"workspace-unsubscribe",id:E(u),payload:{subscriptionId:t}});xe.clear();for(let t of be.keys())V({...I,type:"shells-unsubscribe",id:E(u),payload:{subscriptionId:t}});if(be.clear(),Y=!0,ce=null,W=null,de=null,X.clear(),le.clear(),Ue)o.removeEventListener("keydown",Bo,!0);o.removeEventListener("message",Xo),o.removeEventListener("keydown",Ko,!0),o.removeEventListener("pointerover",Be),o.removeEventListener("pointermove",Be),o.removeEventListener("pointerout",zo),o.removeEventListener("focus",jo),o.removeEventListener("blur",Wo);for(let t of ge.values())clearTimeout(t.timer),t.reject(new d("HOST_UNAVAILABLE","Host client was disposed."));ge.clear(),i.clear(),a.clear(),_.clear(),f.clear(),k.clear(),h.clear(),T.clear(),L.clear(),Z.clear(),P.clear(),Ce.length=0}}};var Cr=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var us=new Set(Cr);var Ur=["none","agent","user"];var _s=new Set(Ur);var dn=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],pn=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Nr=(e,o)=>{o.style.colorScheme=e.mode;for(let[n,s]of dn)o.style.setProperty(n,e.tokens[s]);for(let[n,s,i]of pn){let a=e.tokens[i]??"";o.style.setProperty(n,a),o.style.setProperty(s,a)}o.style.setProperty("font-family",e.tokens.font),o.style.setProperty("font-size","0.875rem"),o.style.setProperty("line-height","1.45"),o.style.setProperty("color",e.tokens.foreground)},ro=(e,o)=>{if(Nr(e.theme,o),o.dataset)o.dataset.ocSurface=e.surface,o.dataset.ocTheme=e.theme.mode};var un={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},b=(e,o)=>`var(--${e}, var(--oc-${un[e]}, ${o}))`,ee=b("surface-background","transparent"),at=b("surface-elevated","transparent"),ye=b("surface-elevated-foreground","inherit"),B=b("surface-foreground","inherit"),A=b("surface-muted-foreground","gray"),En=b("surface-muted","transparent"),ue=b("interactive-border","currentColor"),G=b("interactive-hover","transparent"),Ee=b("interactive-active","transparent"),no=b("interactive-selection","transparent"),so=b("interactive-selection-foreground","inherit"),q=b("primary","currentColor"),io=b("primary-text","inherit"),ao=b("error-text","inherit"),_n=b("font-sans","inherit"),co=b("font-mono","monospace"),Pr=b("radius","9px"),lo=`calc(${Pr} - 2px)`,wr=`calc(${Pr} - 4px)`,R=(e,o,n="transparent")=>`color-mix(in srgb, ${e} ${o}%, ${n})`,Mr=`background-image: linear-gradient(${G}, ${G});`,po=(e,o="0.5px")=>`box-shadow: inset 0 0 0 ${o} ${e}, var(--oc-sdk-field-lift);`,uo="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",Lr="box-shadow: var(--oc-sdk-lit);",Eo=`inset 0 0.5px 0 0 ${R(B,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,mn=`
:root {
  --oc-sdk-edge: ${R(B,16)};
  --oc-sdk-field-bg: ${at};
  --oc-sdk-raised-bg: ${ee};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${R(B,14)};
  --oc-sdk-field-bg: ${R(ee,50,at)};
  --oc-sdk-raised-bg: ${at};
  --oc-sdk-field-lift: ${Eo};
  --oc-sdk-raised-lift: ${Eo};
  --oc-sdk-lit: ${Eo};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,it=(e)=>{let o=b(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${o}; --oc-sdk-tone-text: ${b(`${e}-text`,"inherit")}; }`},Sn=`
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
`,Gr=`${mn}
.oc-sdk { color: ${B}; font-family: ${_n}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${Mr} }
.oc-sdk-mono { font-family: ${co}; }
.oc-sdk-muted { color: ${A}; }
${it("success")}${it("warning")}${it("error")}${it("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${q}; --oc-sdk-tone-text: ${io}; }

.oc-sdk-btn { border-radius: ${lo}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${wr}; }
.oc-sdk-btn[data-variant="default"] { color: ${io}; background: ${R(q,10,ee)}; border-color: ${R(q,12)}; ${Lr} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${R(q,16,ee)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${R(q,22,ee)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${En}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${G}, ${G}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${Ee}, ${Ee}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${ye}; ${uo} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${G}, ${G}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${Ee}, ${Ee}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${G}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${Ee}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${b("status-error","red")}; color: ${ao}; background: ${R("var(--oc-sdk-tone)",7,ee)}; border-color: ${R("var(--oc-sdk-tone)",12)}; ${Lr} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${R("var(--oc-sdk-tone)",9,ee)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${R("var(--oc-sdk-tone)",11,ee)}; box-shadow: none; }

.oc-sdk-field-note { color: ${A}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${ao}; }
.oc-sdk-input { border-radius: ${lo}; background: var(--oc-sdk-field-bg); color: ${ye}; ${po("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${A}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${G}, ${G}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${po(R(B,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${po(b("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${co}; }

.oc-sdk-search-icon { color: ${A}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${q}; }
.oc-sdk-search-clear { border-radius: ${wr}; color: ${A}; }
.oc-sdk-search-clear:hover { background: ${G}; color: ${B}; }

.oc-sdk-trigger { border-radius: ${lo}; background: var(--oc-sdk-raised-bg); color: ${ye}; ${uo} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${G}, ${G}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${Ee}, ${Ee}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${A}; }
.oc-sdk-trigger-chevron { color: ${A}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${ye}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${at}; background-clip: padding-box; color: ${ye}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${G}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${no}; color: ${so}; }
.oc-sdk-option-check { color: ${B}; }
.oc-sdk-option[data-destructive="true"] { color: ${ao}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${R(b("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${A}; }
.oc-sdk-popup-empty { color: ${A}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${ue}; border-radius: 4px; color: ${B}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${R(B,60,ue)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${ue}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${ee}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${q}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Mr} }
.oc-sdk-check-desc { color: ${A}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${R(B,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${A}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${B}; }
.oc-sdk-tab[aria-selected="true"] { color: ${so}; background: ${no}; border-color: ${ue}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${ye}; background: var(--oc-sdk-raised-bg); ${uo} }
.oc-sdk-tab-count { color: ${A}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${R(B,6)}; color: ${A}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${R("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${G}; }
.oc-sdk-row[aria-selected="true"] { background: ${no}; color: ${so}; }
.oc-sdk-row-lead { font-family: ${co}; color: ${A}; }
.oc-sdk-row-sub { color: ${A}; }
.oc-sdk-row-meta { color: ${A}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${A}; }

.oc-sdk-empty-body { color: ${A}; }

.oc-sdk-spinner { color: ${A}; }
.oc-sdk-spinner-ring { border-color: ${ue}; border-top-color: ${q}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${R("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${A}; }

.oc-sdk-separator { color: ${A}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${R(ue,40)}; }

.oc-sdk-progress-label { color: ${A}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${R(B,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${q}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${b("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${b("success-text","inherit")}; }

.oc-sdk-text a { color: ${io}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${R(ue,60)}; }
`,M=`
${Ut}
${Sn}
${Gr}`;var O={util:"#4d9fff",mem:"#e8c33a",temp:"#b07fe8",power:"#3ddc84",cpu:"#ff8c42",systemRam:"#89929c"};var xn={llama:"llama.cpp",ollama:"Ollama",vllm:"vLLM",sglang:"SGLang",tgi:"Hugging Face TGI"};function Dr(e){return xn[e]}function $r(e){let o=[],n=["llama","ollama","vllm","sglang","tgi"];for(let s of n)for(let i of e[s]??[]){if(s==="ollama"||!i.model)continue;let a=i.alias||i.model;o.push({key:`process:${s}:${i.pid}`,engine:s,title:a,process:i})}for(let s of e.ollama_models??[]){if(!s.name)continue;o.push({key:`ollama-model:${s.name}`,engine:"ollama",title:s.name,ollamaModel:s})}return o.sort((s,i)=>s.key.localeCompare(i.key))}var bn=/(?:api[-_]?key|token|password|secret|credential|auth)/i;function Hr(e=[]){let o=[];for(let n=1;n<e.length;n++){let s=e[n];if(!/^-{1,2}(?!\d)/.test(s))continue;let i=s.indexOf("="),a=(i<0?s:s.slice(0,i)).replace(/^-+/,""),_=i<0?"":s.slice(i+1);if(i<0&&n+1<e.length&&!/^-{1,2}(?!\d)/.test(e[n+1]))_=e[++n];if(bn.test(a)&&_)_="[redacted]";o.push({key:a,value:_})}return o.sort((n,s)=>n.key.localeCompare(s.key))}var mo=21;var So=["util","mem","temp","power","cpu"],fo="seriesVisibilityV1",On={util:!0,mem:!0,temp:!0,power:!0,cpu:!0},To=(e)=>{let o={...On};if(!e||typeof e!=="object"||Array.isArray(e))return o;for(let n of So){let s=e[n];if(typeof s==="boolean")o[n]=s}return o};var ho="sourceConfigV1",ut="local",An=[{id:"evo-x2",label:"evo-x2.home.lan",host:"evo-x2.home.lan"},{id:"proxmox",label:"proxmox.home.lan",host:"proxmox.home.lan"}],Rn=/^(?=.{1,253}$)(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)(?:\.(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?))*\.?$/,yn=/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,63}$/;function Et(e){let o=e.trim().replace(/\.$/,"").toLowerCase();if(!Rn.test(o))throw Error("Enter a hostname or IPv4 address only (no http://, port, or path).");return o}function kn(e){if(!e||typeof e!=="object"||Array.isArray(e))return null;let o=e;if(typeof o.id!=="string"||!yn.test(o.id))return null;if(typeof o.label!=="string"||o.label.trim().length<1||o.label.length>80)return null;if(typeof o.host!=="string")return null;try{return{id:o.id,label:o.label.trim(),host:Et(o.host)}}catch{return null}}function go(e){if(!e||typeof e!=="object"||Array.isArray(e))return{selectedSourceId:"local",remoteSources:An.map((_)=>({..._}))};let o=e,n=[],s=new Set,i=new Set;if(Array.isArray(o.remoteSources))for(let _ of o.remoteSources.slice(0,50)){let f=kn(_);if(!f||s.has(f.id)||i.has(f.host))continue;n.push(f),s.add(f.id),i.add(f.host)}return{selectedSourceId:typeof o.selectedSourceId==="string"&&(o.selectedSourceId==="local"||s.has(o.selectedSourceId))?o.selectedSourceId:"local",remoteSources:n}}function Fr(e){if(e.selectedSourceId==="local")return{mode:"local"};let o=e.remoteSources.find(({id:n})=>n===e.selectedSourceId);if(!o)return{mode:"local"};return{mode:"remote",label:o.label,host:Et(o.host)}}var se=oo(),bt=document.querySelector("#root");if(!bt)throw Error("Missing #root");var vn=`
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
.source-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}
.source-controls label { color: var(--oc-muted); white-space: nowrap; }
.source-controls button, .source-dialog input, .source-dialog button {
  color: var(--oc-fg);
  font: inherit;
}
.source-dialog input {
  min-width: 0;
  padding: 6px 8px;
  color: var(--oc-fg);
  background: color-mix(in srgb, var(--oc-fg) 5%, transparent);
  border: 1px solid var(--oc-border);
  border-radius: 6px;
}
.source-controls button, .source-dialog button {
  padding: 6px 9px;
  color: var(--oc-fg);
  background: color-mix(in srgb, var(--oc-fg) 5%, transparent);
  border: 1px solid var(--oc-border);
  border-radius: 6px;
  cursor: pointer;
}
.source-controls button:hover, .source-dialog button:hover { background: color-mix(in srgb, var(--oc-fg) 10%, transparent); }
.source-controls button:focus-visible,
.source-dialog input:focus-visible, .source-dialog button:focus-visible { outline: 2px solid var(--oc-primary); outline-offset: 2px; }
.source-picker { position: relative; flex: 1; min-width: 0; }
.source-picker-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  min-width: 0;
  text-align: left;
}
.source-picker-trigger[aria-expanded="true"] { border-color: var(--oc-primary); }
.source-picker-value { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.source-picker-chevron { flex: none; color: var(--oc-muted); transition: transform .15s ease; }
.source-picker-trigger[aria-expanded="true"] .source-picker-chevron { transform: rotate(180deg); }
.source-picker-menu {
  position: absolute;
  z-index: 20;
  top: calc(100% + 5px);
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 240px;
  overflow: auto;
  padding: 4px;
  background: var(--oc-bg);
  border: 1px solid var(--oc-border);
  border-radius: 8px;
  box-shadow: 0 10px 28px rgba(0,0,0,.4);
}
.source-picker-menu[hidden] { display: none; }
.source-picker-option {
  display: block;
  width: 100%;
  padding: 7px 9px !important;
  border: 0 !important;
  border-radius: 5px !important;
  background: transparent !important;
  color: var(--oc-fg) !important;
  text-align: left;
}
.source-picker-option:hover, .source-picker-option:focus-visible { background: color-mix(in srgb, var(--oc-fg) 9%, transparent) !important; }
.source-picker-option[aria-selected="true"] { background: color-mix(in srgb, var(--oc-primary) 20%, transparent) !important; }
.source-picker-option small { display: block; margin-top: 1px; color: var(--oc-muted); font-size: 10px; }
.source-picker-option:disabled { opacity: .46; cursor: not-allowed; }
.source-picker-option:disabled:hover { background: transparent !important; }
.source-dialog {
  width: min(440px, calc(100vw - 32px));
  max-width: calc(100vw - 32px);
  padding: 16px;
  color: var(--oc-fg);
  background: var(--oc-bg);
  border: 1px solid var(--oc-border);
  border-radius: 10px;
  box-shadow: 0 16px 48px rgba(0,0,0,.35);
}
.source-dialog *, .source-controls * { box-sizing: border-box; }
.source-dialog::backdrop { background: rgba(0,0,0,.55); }
.source-dialog h2 { margin: 0 0 4px; }
.source-dialog .dialog-help, .source-dialog .dialog-error { color: var(--oc-muted); font-size: 11px; }
.source-dialog .dialog-error { min-height: 1.4em; color: #ef4444; }
.server-list { display: flex; flex-direction: column; gap: 6px; margin: 12px 0; }
.server-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 7px; background: color-mix(in srgb, var(--oc-fg) 4%, transparent); border-radius: 6px; }
.server-row-info { display: flex; flex-direction: column; min-width: 0; gap: 1px; }
.server-row-info strong, .server-row-info small { overflow-wrap: anywhere; }
.server-row-info small { color: var(--oc-muted); font-size: 10px; }
.server-actions { display: flex; flex: none; gap: 4px; }
.server-actions .icon-button { display: grid; place-items: center; width: 32px; height: 32px; padding: 0; }
.icon-button svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.server-actions .delete-button { color: var(--oc-muted); }
.server-actions .delete-button:hover { color: #ef4444; }
.add-server { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 7px; margin-top: 10px; }
.add-server input { width: 100%; min-width: 0; }
.add-server input[name="name"] { grid-column: 1 / -1; }
.add-server input[name="host"] { grid-column: 1; }
.add-server button[type="button"]:not(.cancel-edit) { grid-column: 2; }
.add-server .cancel-edit { grid-column: 1 / -1; justify-self: end; }
.add-server .cancel-edit[hidden] { display: none; }
.dialog-actions { display: flex; justify-content: flex-end; margin-top: 12px; }
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
.status span { min-width: 0; overflow-wrap: anywhere; }
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
`,zr=document.createElement("style");zr.textContent=vn;document.head.append(zr);var Xr=(e)=>{if(e===0)return"0 B";let o=["B","KB","MB","GB","TB"],n=Math.floor(Math.log(e)/Math.log(1024));return`${(e/Math.pow(1024,n)).toFixed(1)} ${o[n]}`},_t=(e)=>{if(e===null)return"–";return`${e.toFixed(0)}%`},In=(e)=>{if(e===null)return"–";return`${e.toFixed(0)}°`},Cn=(e)=>{if(e===null)return"–";return`${e.toFixed(0)} W`},ve={util:"GPU Util",mem:"GTT",temp:"Temp",power:"Power",cpu:"CPU"},Un={util:100,mem:100,temp:100,power:100,cpu:100};function St(e,o){let n=document.getElementById("chart-svg");if(!n)return;while(n.firstChild)n.removeChild(n.firstChild);let s=300,i=100,a=2,_=(h,T)=>{if(T<=1)return s/2;return a+(mo-T+h)/(mo-1)*(s-2*a)},f=(h,T)=>{let L=Math.min(Math.max(h,0),T);return i-a-L/T*(i-2*a)},k=document.createElementNS("http://www.w3.org/2000/svg","g");for(let h of[0.25,0.5,0.75]){let T=document.createElementNS("http://www.w3.org/2000/svg","line");T.setAttribute("x1","0"),T.setAttribute("x2",String(s)),T.setAttribute("y1",String(i*h)),T.setAttribute("y2",String(i*h)),T.setAttribute("stroke","var(--oc-border)"),T.setAttribute("stroke-width","0.5"),T.setAttribute("opacity","0.3"),k.appendChild(T)}n.appendChild(k);for(let h of So){if(!o[h])continue;let T=e[h],L=O[h],Z=Un[h],P=[];if(T.forEach((le,de)=>{if(le===null)return;let pe=_(de,T.length),Ue=f(le,Z);P.push(`${pe.toFixed(1)},${Ue.toFixed(1)}`)}),P.length<2)continue;let Ce=P[0].split(",")[0],ce=P[P.length-1].split(",")[0],W=document.createElementNS("http://www.w3.org/2000/svg","polygon");W.setAttribute("points",`${Ce},${i} ${P.join(" ")} ${ce},${i}`),W.setAttribute("fill",L),W.setAttribute("opacity","0.08"),n.appendChild(W);let X=document.createElementNS("http://www.w3.org/2000/svg","polyline");X.setAttribute("points",P.join(" ")),X.setAttribute("fill","none"),X.setAttribute("stroke",L),X.setAttribute("stroke-width","1.5"),X.setAttribute("stroke-linejoin","round"),X.setAttribute("stroke-linecap","round"),X.setAttribute("opacity","0.95"),n.appendChild(X)}}var Tt=null,ft=!1,xo=0,J=To(void 0),ie=document.createElement("div");ie.className="status-dot";var K=document.createElement("span");K.textContent="Connecting…";var Ro=document.createElement("div");Ro.className="status";Ro.append(ie,K);var me=document.createElement("button");me.type="button";me.dataset.series="util";me.className="stat";me.innerHTML=`
  <span class="stat-label">GPU Util</span>
  <span class="stat-value">–</span>
`;var He=document.createElement("div");He.className="stat";He.innerHTML=`
  <span class="stat-label">System RAM</span>
  <span class="stat-value">–</span>
`;var Se=document.createElement("button");Se.type="button";Se.dataset.series="temp";Se.className="stat";Se.innerHTML=`
  <span class="stat-label">Temperature</span>
  <span class="stat-value">–</span>
`;var fe=document.createElement("button");fe.type="button";fe.dataset.series="power";fe.className="stat";fe.innerHTML=`
  <span class="stat-label">Power</span>
  <span class="stat-value">–</span>
`;var Te=document.createElement("button");Te.type="button";Te.dataset.series="cpu";Te.className="stat";Te.innerHTML=`
  <span class="stat-label">CPU</span>
  <span class="stat-value">–</span>
`;var he=document.createElement("button");he.type="button";he.dataset.series="mem";he.className="stat";he.innerHTML=`
  <span class="stat-label">GTT Memory</span>
  <span class="stat-value">–</span>
`;var yo=document.createElement("div");yo.className="stats-row";yo.append(me,he,Se,fe,Te,He);var Nn=[[me,O.util],[He,O.systemRam],[Se,O.temp],[fe,O.power],[Te,O.cpu],[he,O.mem]];for(let[e,o]of Nn)e.style.setProperty("--series-color",o);var ko=document.createElement("div");ko.className="mem-detail";var jr=document.createElement("span"),Wr=document.createElement("span");ko.append(jr,Wr);var vo=document.createElement("div");vo.className="section";vo.innerHTML=`
  <h2>Activity</h2>
  <div class="chart-container">
    <svg id="chart-svg" class="chart" viewBox="0 0 300 100" preserveAspectRatio="none"></svg>
    <div class="legend">
      <button class="legend-item" type="button" data-series="util" style="--series-color:${O.util}" aria-pressed="true"><span class="legend-dot" style="background:${O.util}"></span>${ve.util}</button>
      <button class="legend-item" type="button" data-series="mem" style="--series-color:${O.mem}" aria-pressed="true"><span class="legend-dot" style="background:${O.mem}"></span>${ve.mem}</button>
      <button class="legend-item" type="button" data-series="temp" style="--series-color:${O.temp}" aria-pressed="true"><span class="legend-dot" style="background:${O.temp}"></span>${ve.temp}</button>
      <button class="legend-item" type="button" data-series="power" style="--series-color:${O.power}" aria-pressed="true"><span class="legend-dot" style="background:${O.power}"></span>${ve.power}</button>
      <button class="legend-item" type="button" data-series="cpu" style="--series-color:${O.cpu}" aria-pressed="true"><span class="legend-dot" style="background:${O.cpu}"></span>${ve.cpu}</button>
    </div>
  </div>
`;var Ot=document.createElement("section");Ot.className="section llm-section";var Yr=document.createElement("h2");Yr.textContent="LLM processes";var ht=document.createElement("div");ht.className="llm-list";Ot.append(Yr,ht);var U=go(void 0),bo=Promise.resolve(),Pe="",gt=!1,Ao="Checking local D-Bus…",Io=document.createElement("div");Io.className="source-controls";var Co=document.createElement("label");Co.htmlFor="source-picker-trigger";Co.textContent="Source";var At=document.createElement("div");At.className="source-picker";var N=document.createElement("button");N.id="source-picker-trigger";N.type="button";N.className="source-picker-trigger";N.setAttribute("role","combobox");N.setAttribute("aria-label","Telemetry source");N.setAttribute("aria-haspopup","listbox");N.setAttribute("aria-expanded","false");N.disabled=!0;var Uo=document.createElement("span");Uo.className="source-picker-value";var Rt=document.createElement("span");Rt.className="source-picker-chevron";Rt.setAttribute("aria-hidden","true");Rt.textContent="⌄";N.append(Uo,Rt);var F=document.createElement("div");F.className="source-picker-menu";F.id="source-picker-options";F.setAttribute("role","listbox");F.setAttribute("aria-label","Telemetry sources");F.hidden=!0;N.setAttribute("aria-controls",F.id);At.append(N,F);var Fe=document.createElement("button");Fe.type="button";Fe.textContent="Manage";Fe.setAttribute("aria-label","Manage remote servers");Io.append(Co,At,Fe);var oe=document.createElement("dialog");oe.className="source-dialog";oe.setAttribute("aria-labelledby","source-dialog-title");var No=document.createElement("h2");No.id="source-dialog-title";No.textContent="Remote servers";var wo=document.createElement("div");wo.className="dialog-help";wo.textContent="Enter a hostname or IPv4 address. onvtop uses HTTP on port 8039 and requests the full sample.";var Ge=document.createElement("div");Ge.className="server-list";var re=document.createElement("div");re.className="dialog-error";re.setAttribute("role","alert");var Mo=document.createElement("div");Mo.className="add-server";var ne=document.createElement("input");ne.name="name";ne.placeholder="Name (optional)";ne.setAttribute("aria-label","Server display name");ne.maxLength=80;var z=document.createElement("input");z.name="host";z.placeholder="hostname";z.setAttribute("aria-label","Server hostname");z.setAttribute("autocomplete","off");var Ie=document.createElement("button");Ie.type="button";Ie.textContent="Add";var ae=document.createElement("button");ae.type="button";ae.className="cancel-edit";ae.textContent="Cancel edit";ae.hidden=!0;Mo.append(ne,z,Ie,ae);var Lo=document.createElement("div");Lo.className="dialog-actions";var yt=document.createElement("button");yt.type="button";yt.textContent="Done";Lo.append(yt);oe.append(No,wo,Ge,re,Mo,Lo);var _e=null;function Po(){_e=null,ne.value="",z.value="",Ie.textContent="Add",ae.hidden=!0}function Vr(e,o,n=""){let s=document.createElement("button");s.type="button",s.className=`icon-button ${n}`.trim(),s.title=e,s.setAttribute("aria-label",e);let i=document.createElementNS("http://www.w3.org/2000/svg","svg");i.setAttribute("viewBox","0 0 24 24"),i.setAttribute("aria-hidden","true");for(let a of o){let _=document.createElementNS("http://www.w3.org/2000/svg","path");_.setAttribute("d",a),i.append(_)}return s.append(i),s}function xt(){let e=[{id:ut,label:"Local D-Bus",detail:gt?"This machine":Ao||"Unavailable on this machine"},...U.remoteSources.map((n)=>({id:n.id,label:n.label,detail:`${n.host}:8039`}))],o=e.find(({id:n})=>n===U.selectedSourceId)??e[0];Uo.textContent=o.label,N.setAttribute("aria-label",`Telemetry source: ${o.label}`),F.replaceChildren();for(let n of e){let s=document.createElement("button");if(s.type="button",s.className="source-picker-option",s.setAttribute("role","option"),s.setAttribute("aria-selected",String(n.id===o.id)),s.disabled=n.id===ut&&!gt,s.disabled)s.title=n.detail;s.dataset.sourceId=n.id;let i=document.createElement("span");i.textContent=n.label;let a=document.createElement("small");a.textContent=n.detail,s.append(i,a),s.addEventListener("click",()=>{if(Xe(!1),U.selectedSourceId!==n.id)$e({...U,selectedSourceId:n.id})}),F.append(s)}}function Xe(e,o=!1){if(F.hidden=!e,N.setAttribute("aria-expanded",String(e)),e&&o)F.querySelector('[role="option"]')?.focus()}N.addEventListener("click",()=>{Xe(F.hidden)});N.addEventListener("keydown",(e)=>{if(e.key==="ArrowDown")e.preventDefault(),Xe(!0,!0)});F.addEventListener("keydown",(e)=>{let o=Array.from(F.querySelectorAll('[role="option"]')),n=o.indexOf(document.activeElement);if(e.key==="Escape")e.preventDefault(),Xe(!1),N.focus();else if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();let s=e.key==="ArrowDown"?1:-1;o[(n+s+o.length)%o.length]?.focus()}else if(e.key==="Home")e.preventDefault(),o[0]?.focus();else if(e.key==="End")e.preventDefault(),o.at(-1)?.focus()});document.addEventListener("click",(e)=>{if(!At.contains(e.target))Xe(!1)});function kt(){if(Ge.replaceChildren(),U.remoteSources.length===0){let e=document.createElement("div");e.className="dialog-help",e.textContent="No remote servers added.",Ge.append(e);return}for(let e of U.remoteSources){let o=document.createElement("div");o.className="server-row";let n=document.createElement("div");n.className="server-row-info";let s=document.createElement("strong");s.textContent=e.label;let i=document.createElement("small");i.textContent=`${e.host}:8039`,n.append(s,i);let a=document.createElement("div");a.className="server-actions";let _=Vr(`Edit ${e.label}`,["M12 20h9","M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"]);_.addEventListener("click",()=>{_e=e.id,ne.value=e.label,z.value=e.host,Ie.textContent="Save",ae.hidden=!1,re.textContent="",z.focus()});let f=Vr(`Delete ${e.label}`,["M3 6h18","M8 6V4h8v2","M19 6l-1 14H6L5 6","M10 11v6","M14 11v6"],"delete-button");f.addEventListener("click",()=>{let k=U.remoteSources.filter(({id:T})=>T!==e.id),h=U.selectedSourceId===e.id?ut:U.selectedSourceId;if(_e===e.id)Po();$e({...U,selectedSourceId:h,remoteSources:k}),re.textContent="",kt()}),a.append(_,f),o.append(n,a),Ge.append(o)}}function $e(e){return U=e,Pe="",xt(),kt(),ie.className="status-dot",K.textContent="Connecting…",K.title="",bo=bo.then(async()=>{await se.storage.set(ho,U);let o=await se.serviceRequest({method:"POST",path:"/source",body:JSON.stringify(Fr(U))});if(o.status!==200){let n="";try{let s=JSON.parse(o.body);if(typeof s.error==="string")n=`: ${s.error}`}catch{}if(o.status===404)throw Error("Onvtop service is outdated. Restart OpenChamber.");throw Error(`Source request failed (HTTP ${o.status}${n}).`)}}).catch((o)=>{console.warn("Could not save onvtop source configuration",o);let n=o instanceof Error?o.message:"Could not change source";Pe=n,K.textContent=n,K.title=n,ie.className="status-dot error"}),bo}Fe.addEventListener("click",()=>{re.textContent="",kt(),oe.showModal(),z.focus()});yt.addEventListener("click",()=>oe.close());oe.addEventListener("click",(e)=>{if(e.target===oe)oe.close()});function Jr(){re.textContent="";try{if(!_e&&U.remoteSources.length>=50)throw Error("You can add up to 50 remote servers.");let e=Et(z.value);if(U.remoteSources.some((n)=>n.host===e&&n.id!==_e))throw Error("That host is already in the list.");let o=ne.value.trim()||e;if(o.length>80)throw Error("The server name must be 80 characters or fewer.");if(_e){let n=U.remoteSources.map((s)=>s.id===_e?{...s,label:o,host:e}:s);$e({...U,remoteSources:n})}else{let n=`remote-${Date.now()}-${Math.floor(Math.random()*1e4)}`,s={id:n,label:o,host:e};$e({selectedSourceId:n,remoteSources:[...U.remoteSources,s]})}Po(),kt(),z.focus()}catch(e){re.textContent=e instanceof Error?e.message:"Invalid server address."}}Ie.addEventListener("click",Jr);for(let e of[ne,z])e.addEventListener("keydown",(o)=>{if(o.key==="Enter")o.preventDefault(),Jr()});ae.addEventListener("click",()=>{Po(),re.textContent=""});bt.append(Ro,yo,ko,vo,Io,Ot,oe);var mt=new Map,wn={llama:O.util,ollama:O.mem,vllm:O.temp,sglang:O.power,tgi:O.cpu},Br=(e)=>e===null||e===void 0?"N/A":`${e.toFixed(0)}%`,Kr=(e)=>e===null||e===void 0?"N/A":`${(e/1024).toFixed(0)} MiB`;function Mn(){let e=document.createElement("article");e.className="llm-card";let o=document.createElement("div");o.className="llm-title";let n=document.createElement("div");n.className="llm-stats";let s=document.createElement("div");s.className="llm-meta";let i=document.createElement("div");return i.className="llm-flags",e.append(o,n,s,i),{element:e,title:o,stats:n,meta:s,flags:i,flagsSignature:""}}function Ln(e){let o=e.process;if(!o){let n=e.ollamaModel;if(!n)return"";return[n.parameter_size&&`parameters: ${n.parameter_size}`,n.quantization&&`quant: ${n.quantization}`].filter(Boolean).join("   ·   ")}return[o.user&&`user: ${o.user}`,o.ngl&&`ngl: ${o.ngl}`,o.ctx&&`ctx: ${o.ctx}`,o.parallel&&`parallel: ${o.parallel}`,o.threads&&`threads: ${o.threads}`,o.port&&`port: ${o.port}`,`pid: ${o.pid}`].filter(Boolean).join("   ·   ")}function Pn(e,o){if(e.element.style.setProperty("--engine-color",wn[o.engine]),e.title.textContent=`${Dr(o.engine)}  [${o.title}]`,o.process){let a=o.process;e.stats.textContent=`GPU (proc): ${Br(a.gpu_pct)}   GPU MEM (proc): ${Kr(a.vram_kb)}   CPU: ${Br(a.cpu_pct)}   RSS: ${Kr(a.rss_kb)}`}else if(o.ollamaModel){let a=o.ollamaModel,_=a.size?Xr(a.size):"N/A",f=a.size_vram?Xr(a.size_vram):"N/A";e.stats.textContent=`Model size: ${_}   GPU memory: ${f}`}e.meta.textContent=Ln(o);let n=o.process?.argv??[],s=Hr(n),i=JSON.stringify(s);if(i!==e.flagsSignature){e.flags.replaceChildren();for(let a of s){let _=document.createElement("span");_.className="llm-flag";let f=document.createElement("span");f.className="llm-flag-key",f.textContent=`${a.key}: `;let k=document.createElement("span");k.className="llm-flag-value",k.textContent=a.value||"on",_.append(f,k),e.flags.append(_)}e.flagsSignature=i}}function Gn(e){let o=$r(e);Ot.hidden=o.length===0;let n=new Set(o.map(({key:s})=>s));for(let[s,i]of mt){if(n.has(s))continue;i.element.remove(),mt.delete(s)}o.forEach((s,i)=>{let a=mt.get(s.key);if(!a)a=Mn(),mt.set(s.key,a);Pn(a,s);let _=ht.children.item(i);if(_!==a.element)ht.insertBefore(a.element,_)})}function Go(){for(let e of Array.from(bt.querySelectorAll("[data-series]"))){let o=e.dataset.series,n=J[o];e.setAttribute("aria-pressed",String(n)),e.classList.toggle("series-off",!n),e.title=`${n?"Hide":"Show"} ${ve[o]} graph line`}}function Dn(e){if(J={...J,[e]:!J[e]},Go(),Tt)St(Tt.history,J);se.storage.set(fo,J).catch((o)=>{console.warn("Could not save onvtop graph visibility",o)})}for(let e of Array.from(bt.querySelectorAll("[data-series]")))e.addEventListener("click",()=>Dn(e.dataset.series));Go();function $n(e){let{gpu:o,sys:n}=e.sample;if(Gn(e.sample.llm),typeof e.localSourceAvailable==="boolean"){let L=e.localSourceAvailable,Z=e.localSourceReason||"Unavailable on this machine";if(L!==gt||!L&&Z!==Ao)gt=L,Ao=L?"":Z,xt()}if(Pe){ie.className="status-dot error",K.textContent=Pe,K.title=Pe,St(e.history,J),ft=!0;return}if(!e.sourceAvailable){ie.className="status-dot error",K.textContent=`${e.sourceLabel||"nvstats-service"} unavailable`,K.title=e.sourceError||"No sample received from this source",St(e.history,J),ft=!0;return}me.querySelector(".stat-value").textContent=_t(o.util),Se.querySelector(".stat-value").textContent=In(o.temp),fe.querySelector(".stat-value").textContent=Cn(o.power_w),Te.querySelector(".stat-value").textContent=_t(n.cpu);let s=o.mem_used??0,i=o.mem_total??0,a=o.mem_used!==null&&i>0?s/i*100:null;he.querySelector(".stat-value").textContent=_t(a);let _=o.mem_used===null?"—":(s/1024).toFixed(1),f=o.mem_total===null?"—":(i/1024).toFixed(1);jr.textContent=`GTT ${_} / ${f} GiB`;let{ram_used:k,ram_total:h}=n,T=h>0?k/h*100:null;He.querySelector(".stat-value").textContent=_t(T),Wr.textContent=`System RAM ${(k/1073741824).toFixed(1)} / ${(h/1073741824).toFixed(1)} GiB`,St(e.history,J),ie.className="status-dot ok",K.textContent=`Live · ${e.sourceLabel||"nvstats-service"}`,K.title="",ft=!1}function Hn(){ie.className="status-dot error",K.textContent="No data from nvstats-service",ft=!0}async function Do(){try{let e=await se.serviceRequest({method:"GET",path:"/stats"}),o=JSON.parse(e.body);if(e.status===200)Tt=o,$n(Tt),xo=0;else throw Error("bad response")}catch{if(xo++,xo>3)Hn()}}var De=null,Oo=!1;function Zr(){if(De)return;De=setInterval(()=>{if(!Oo)Oo=!0,Do().finally(()=>{Oo=!1})},2000)}function Qr(){if(De)clearInterval(De),De=null}document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")Zr(),Do();else Qr()});window.addEventListener("pagehide",()=>{Qr(),se.dispose()});se.onReady(async(e)=>{ro(e,document.documentElement);try{J=To(await se.storage.get(fo)),Go()}catch(o){console.warn("Could not load onvtop graph visibility",o)}try{U=go(await se.storage.get(ho)),xt(),N.disabled=!1,await $e(U)}catch(o){console.warn("Could not load onvtop source configuration",o),xt(),N.disabled=!1}Zr(),Do()});})();
