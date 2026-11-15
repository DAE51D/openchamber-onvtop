(()=>{function er(e,t,n,s,i){let a=e.length,u=t.length===a?t:e.map((h,g)=>n-(a-1-g)*1000),f=i.width-2*i.pad,T=[],O=null;for(let h=0;h<a;h++){let g=e[h];if(g===null)continue;let Ce=(n-u[h]+s)/1000,ae=i.width-i.pad-Ce/i.windowSec*f,ce=Math.min(Math.max(g,0),i.max);T.push({x:ae,y:i.height-i.pad-ce/i.max*(i.height-2*i.pad)}),O=g}let b=T.findIndex((h)=>h.x>=0),K=b<0?Math.max(0,T.length-1):Math.max(0,b-1);if(T.splice(0,K),T.length&&O!==null){let h=i.width-i.pad,g=T[T.length-1];if(g.x<h)T.push({x:h,y:g.y})}return T}var Mt=(e)=>e.map((t)=>`${t.x.toFixed(1)},${t.y.toFixed(1)}`).join(" "),tr=(e,t)=>`${e[0].x.toFixed(1)},${t} ${Mt(e)} ${e[e.length-1].x.toFixed(1)},${t}`;var m="openchamber.sdk",S=1;var Lt=`
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
`;function or(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(s)=>{let i=s.target===e?t:s.target;if(!(i instanceof Element))return;if(!i.hasAttribute("data-oc-scrolling"))i.setAttribute("data-oc-scrolling","");let a=n.get(i);if(a!==void 0)clearTimeout(a);n.set(i,setTimeout(()=>{n.delete(i),i.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var pn=`(${or.toString()})(document);`;var Pt=128,Gt=65536;var Ze=128;var qe=65536;var ir=/^[a-z][a-z0-9-]{0,39}$/;var rr=(e)=>Object(e)===e&&!Array.isArray(e),Dt=(e,t)=>Object.keys(e).every((n)=>t.includes(n)),nr=(e)=>String(e)===e&&e.length>=1&&e.length<=60,sr=(e)=>String(e)===e&&e.length>=1&&e.length<=80,ar=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let n of e){if(!rr(n)||!ir.test(n.id)||!nr(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(t.has(n.id))return!1;if(t.add(n.id),n.kind==="button"){if(!Dt(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!Dt(n,["kind","id","label","value","options","disabled"]))return!1;if(!sr(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let s=new Set;for(let i of n.options){if(!rr(i)||!Dt(i,["value","label"])||!sr(i.value)||!nr(i.label)||s.has(i.value))return!1;s.add(i.value)}if(!s.has(n.value))return!1}return!0};var cr=["{id}","{segment}","{segments+}"];var ls=new Set(cr);var lr=["turn-finished","turn-failed","permission-asked","question-asked"];var ps=new Set(lr);var Qe=20000000,et=256;var $t=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,dr=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==t.bytes[n])return!1;return!0};var pr=/^[A-Za-z0-9_-]{1,80}$/;var ur=["left","right","top","bottom"];var Er=(e,t=0,n={remaining:16000})=>{if(--n.remaining<0||t>=32)return!1;if(e===null)return!0;let s=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let i of s)if(!Er(i,t+1,n))return!1;return!0},Ht=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((t)=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(Ht);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(Ht)}return String(e)===e||Number.isFinite(e)},Ft=(e)=>{try{if(String(e.id)!==e.id||!pr.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!ur.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Er(e.data)||!Ht(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var mr=["file","directory","other","missing"],Vt=(e)=>Boolean(e&&"sessionId"in e),Bt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var Sr=/^[0-9a-f]{7,64}$/i,Kt=(e)=>Sr.test(e),tt=500,ot=32000,fr=16000,Tr=128,hr=200,gr=2000,xr=16000,br=80,Ar=200,Or=16000;var Rr=2000;var zt=20000,rt=1024,nt=2000000;var st=64000,it=8000,jt=4000;var Wt=960000;var yr=999,kr=1e4,Le=500,vr=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Ir=["stopped","starting","ready","failed"],En=new Set(vr),Cr=(e)=>En.has(e),Ur=(e)=>e&&Cr(e)?e:"HOST_REJECTED",be=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(be);if(Object(e)===e)return Object.values(e).every(be);return!1},Nr=(e)=>be(e)&&JSON.stringify(e).length<=Or,_r=(e)=>e?.trim().slice(0,Ar)??"",Ae=(e)=>{let t=e.id.trim().slice(0,Tr),n=e.title.trim().slice(0,hr),s=e.url.trim().slice(0,gr),i=e.text?.trim().slice(0,xr),a=e.author?.trim().slice(0,br),u=e.kind==="pull"?"pull":"issue",f={providerId:e.providerId.trim(),id:t,title:n||t,url:s,kind:u};if(i)f.text=i;if(a)f.author=a;if(u==="pull"){let T=_r(e.branches?.head),O=_r(e.branches?.base);if(T&&O)f.branches={head:T,base:O}}if(Nr(e.data))f.data=e.data;return f},Yt=(e)=>{let t=Ae(e);if(e.projectId)t.projectId=e.projectId;if(e.navigation)t.navigation=e.navigation;if(e.worktree)t.worktree=e.worktree;return t},Jt=(e)=>{let t={text:e.text.trim().slice(0,fr)};if(e.send)t.send=!0;return t},Zt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(yr,Math.max(0,Math.round(e)))},qt=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(kr,Math.max(0,Math.ceil(e)))};var Oe=(e)=>e.length>0&&e.length<=rt&&!e.includes("\x00")&&!e.includes("\\");var at=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Rr)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},_n=new Set(Ir),Qt=(e)=>Boolean(e&&"status"in e&&_n.has(String(e.status))&&!("body"in e)),ct=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),eo=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),to=(e)=>Boolean(e&&"written"in e&&e.written===!0),oo=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),mn=new Set(mr),ro=(e)=>Boolean(e&&"kind"in e&&"size"in e&&mn.has(String(e.kind))&&Number.isFinite(e.size)),no=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Sn=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),fn=(e)=>Object(e)===e?e:null,Xt=(e)=>String(e)===e&&e.length>0,Tn=(e)=>{if(!Xt(e.id))return null;if(e.ok===!0){let t={channel:m,v:S,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)t.payload=e.payload;return t}if(e.ok===!1&&Xt(e.error))return{channel:m,v:S,type:"result",id:e.id,ok:!1,error:e.error,code:Ur(Xt(e.code)?e.code:void 0)};return null},so=(e)=>{let t=fn(e);if(!t||t.channel!==m||t.v!==S)return null;if(t.type==="result")return Tn(t);if(!Sn.has(String(t.type))||Object(t.payload)!==t.payload)return null;return t};var wr=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),hn=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class d extends Error{code;constructor(e,t){super(t);this.name="HostRequestError",this.code=e}}var Mr=()=>Promise.reject(new d("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),lt=()=>Promise.reject(new d("BAD_PATH",`File path must be 1 to ${rt} characters without NUL or backslash.`)),dt=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new d("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},_=(e)=>(e.value+=1,`oc-${e.value}`),io=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new d("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((o)=>o===t.parent),s=e.requestTimeoutMs??zt,i=new Set,a=new Set,u=new Set,f=new Set,T=new Set,O=new Set,b=new Set,K=new Set,h=new Set,g=new Set,Ce=[],ae=null,ce=null,ze=new Set,je=new Set,Ue=null,Ne=null,Ct=!1,he=new Map,ge=new Map,xe=new Map,Y=!1,E={value:0},p=null,Z=null,we=!1,Me=!1,Xo=null,Vo=(o)=>{if(!o)return null;return{sessionId:o.id,phase:o.busy?"started":"completed"}},X=(o)=>{t.parent.postMessage(o,"*")},Bo=()=>{if(Y||t.parent===t||g.size===0||p?.features?.lateGenerateResults!==!0)return;X({channel:m,v:S,type:"generate-late-listen"})},I=(o,r)=>{for(let c of o)try{c(r)}catch(l){console.error(l)}},Ko=(o)=>{if(!(o instanceof MessageEvent))return;if(!n(o.source))return;let r=so(o.data);if(!r)return;if(r.type==="workspace"){let l=ge.get(r.payload.subscriptionId);if(l)I([l],r.payload.snapshot);return}if(r.type==="shells"){let l=xe.get(r.payload.subscriptionId);if(l)I([l],r.payload.snapshot);return}if(r.type==="ready"){if(p=r.payload,Z=Vo(r.payload.session),I(i,r.payload),I(a,r.payload.directory),I(u,r.payload.session),Z)I(f,Z);I(T,r.payload.connection),I(O,r.payload.settings),I(b,r.payload.item),Bo();return}if(r.type==="generate-late"){if(g.size===0)Ce.push(r.payload);else I(g,r.payload);return}if(r.type==="directory"){if(p)p={...p,directory:r.payload.directory};I(a,r.payload.directory);return}if(r.type==="session"){if(p)p={...p,session:r.payload.session};if(!r.payload.session)Z=null;else if(Z?.sessionId!==r.payload.session.id)Z=Vo(r.payload.session);I(u,r.payload.session);return}if(r.type==="session-lifecycle"){Z=r.payload,I(f,r.payload);return}if(r.type==="connection"){if(p)p={...p,connection:r.payload.connection};I(T,r.payload.connection);return}if(r.type==="settings"){if(p)p={...p,settings:r.payload.settings};I(O,r.payload.settings);return}if(r.type==="item"){if(p)p={...p,item:r.payload.item};I(b,r.payload.item);return}if(r.type==="status-control-event"){I(K,r.payload);return}if(r.type==="popover-closed"){I(h,r.payload);return}if(r.type==="action"){let l=(A)=>{if(!Y)X({channel:m,v:S,type:"action-result",id:r.id,payload:A})},R=ce;if(!R){l({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>R(r.payload)).then(()=>l({ok:!0}),(A)=>{let N=(A instanceof Error?A.message:String(A)).trim();l({ok:!1,error:(N||"Action failed.").slice(0,Le)})});return}if(r.type==="file-open"){let l=r.payload;if(Ne&&dr(Ne,l))return;Ne=l,I(ze,r.payload);return}if(r.type==="file-saved"){I(je,r.payload.version);return}if(r.type==="file-snapshot"){let l=(N)=>{if(!Y)X({channel:m,v:S,type:"file-snapshot-result",id:r.id,payload:N})},R=(N)=>l({error:(N.trim()||"Could not read the edited file.").slice(0,Le)}),A=Ue;if(!A){R("This extension does not edit files.");return}Promise.resolve().then(()=>A(r.payload.purpose)).then((N)=>{if($t(N)>Qe){R(`The file is over ${Qe} ${"bytes"in N?"bytes":"characters"}.`);return}if(N.version.length>et){R(`The snapshot version is over ${et} characters.`);return}l({snapshot:"bytes"in N?{bytes:N.bytes,version:N.version}:{content:N.content,version:N.version}})},(N)=>R(N instanceof Error?N.message:String(N)));return}if(r.type==="resolve"){let l=(A)=>{X({channel:m,v:S,type:"resolve-result",id:r.id,payload:A})},R=ae;if(!R){l({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>R(r.payload)).then((A)=>l({item:A?Ae(A):null}),(A)=>{let N=(A instanceof Error?A.message:String(A)).trim();l({error:(N||"Command failed.").slice(0,Le)})});return}let c=he.get(r.id);if(!c)return;if(clearTimeout(c.timer),he.delete(r.id),r.ok){c.resolve(r.payload);return}c.reject(new d(r.code,r.error))};t.addEventListener("message",Ko),X({channel:m,v:S,type:"hello"});let L=(o,r=s)=>{if(Y||t.parent===t)return Promise.reject(new d("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((c,l)=>{let R=setTimeout(()=>{he.delete(o.id),l(new d("HOST_TIMEOUT","Host did not answer in time."))},r);he.set(o.id,{resolve:c,reject:l,timer:R}),X(o)})},C=(o)=>L(o).then(()=>{return}),U={channel:m,v:S},Ut=(o)=>{if(!Y&&t.parent!==t)X(o)},zo=()=>Ut({...U,type:"file-save"}),jo=(o)=>{if(!wr(o)||!hn(o))return;o.preventDefault(),zo()},Wo=(o)=>{if(!wr(o)||o.key!=="Escape"||p?.surface!=="popover"||!p.popover)return;o.preventDefault(),qo(p.popover.id,"escape").catch(()=>{return})},We=()=>{let o=p?.surface==="popover"?p.popover:void 0;if(!o)return;let r=we||Me;if(Xo===r)return;Xo=r,Qo(o.id,r).catch(()=>{return})},Ye=()=>{if(p?.surface!=="popover"||we)return;we=!0,We()},Yo=(o)=>{if(p?.surface!=="popover"||o.relatedTarget!==null||!we)return;we=!1,We()},Jo=()=>{if(p?.surface!=="popover"||Me)return;Me=!0,We()},Zo=()=>{if(p?.surface!=="popover"||!Me)return;Me=!1,We()},j=(o,r=1024)=>{if(!o.trim()||o.length>r)throw new d("HOST_REJECTED",`Identity must contain 1 to ${r} characters.`)},Nt=async(o)=>{if(o.kind!=="projects")j(o.projectId);let r=await L({...U,type:"workspace-read",id:_(E),payload:o});if(!r||!("kind"in r)||!("state"in r)||r.kind!==o.kind)throw new d("HOST_REJECTED","Host did not return workspace data.");return r},wt=async(o,r)=>{if(o.kind!=="projects")j(o.projectId);let c=_(E);ge.set(c,r);try{await C({...U,type:"workspace-subscribe",id:_(E),payload:{subscriptionId:c,query:o}})}catch(l){if(ge.delete(c),!Y)X({...U,type:"workspace-unsubscribe",id:_(E),payload:{subscriptionId:c}});throw l}return()=>{if(!ge.delete(c)||Y)return;X({...U,type:"workspace-unsubscribe",id:_(E),payload:{subscriptionId:c}})}},dn=async(o,r)=>{if(o.kind==="session")j(o.sessionId);if(o.kind==="project")j(o.projectId);let c=_(E);xe.set(c,r);try{await C({...U,type:"shells-subscribe",id:_(E),payload:{subscriptionId:c,scope:o}})}catch(l){if(xe.delete(c),!Y)X({...U,type:"shells-unsubscribe",id:_(E),payload:{subscriptionId:c}});throw l}return()=>{if(!xe.delete(c)||Y)return;X({...U,type:"shells-unsubscribe",id:_(E),payload:{subscriptionId:c}})}},Je=async(o)=>{if("key"in o&&(o.key.length===0||o.key.length>Pt))throw new d("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(o.op==="set"&&!be(o.value))throw new d("HOST_REJECTED","Storage values must be JSON.");if(o.op==="set"&&new TextEncoder().encode(JSON.stringify(o.value)).length>Gt)throw new d("HOST_REJECTED","Storage value exceeds 64 KiB.");if(o.scope==="device"&&p?.features?.deviceStorage!==!0)throw new d("UNSUPPORTED","This host does not support device storage.");let r=await L({...U,type:"storage",id:_(E),payload:o});if(!r||!("storage"in r)||r.op!==o.op)throw new d("HOST_REJECTED","Host did not return storage data.");return r},qo=(o,r)=>p?.features?.popovers!==!0&&!(p?.surface==="popover"&&p.popover?.id===o)?Promise.reject(new d("UNSUPPORTED","This host does not support popovers.")):C({...U,type:"popover-close",id:_(E),payload:r?{id:o,reason:r}:{id:o}}),Qo=(o,r)=>p?.features?.popovers!==!0&&!(p?.surface==="popover"&&p.popover?.id===o)?Promise.reject(new d("UNSUPPORTED","This host does not support popovers.")):C({...U,type:"popover-anchor",id:_(E),payload:{id:o,active:r}});return t.addEventListener("keydown",Wo,!0),t.addEventListener("pointerover",Ye),t.addEventListener("pointermove",Ye),t.addEventListener("pointerout",Yo),t.addEventListener("focus",Jo),t.addEventListener("blur",Zo),{onAction:(o)=>(ce=o,()=>{if(ce===o)ce=null}),listProjects:async()=>{let o=await Nt({kind:"projects"});if(o.kind!=="projects")throw new d("HOST_REJECTED","Expected projects.");return o},listWorktrees:async(o)=>{let r=await Nt({kind:"worktrees",projectId:o});if(r.kind!=="worktrees")throw new d("HOST_REJECTED","Expected worktrees.");return r},listSessions:async(o)=>{let r=await Nt({kind:"sessions",projectId:o});if(r.kind!=="sessions")throw new d("HOST_REJECTED","Expected sessions.");return r},onProjects:(o)=>wt({kind:"projects"},(r)=>{if(r.kind==="projects")o(r)}),onWorktrees:(o,r)=>wt({kind:"worktrees",projectId:o},(c)=>{if(c.kind==="worktrees")r(c)}),onSessions:(o,r)=>wt({kind:"sessions",projectId:o},(c)=>{if(c.kind==="sessions")r(c)}),onRunningShells:(o,r)=>dn(o,r),readShellOutput:async(o,r)=>{j(o,Ze);let c=r?.cursor;if(c!==void 0&&(!Number.isInteger(c)||c<0))throw new d("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let l=r?.tailBytes;if(l!==void 0&&(!Number.isInteger(l)||l<1||l>qe))throw new d("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${qe}.`);let A=await L({...U,type:"shell-output",id:_(E),payload:{shellId:o,cursor:c,tailBytes:l}});if(!A||typeof A.output!=="string"||!Number.isFinite(A.cursor))throw new d("HOST_REJECTED","Host did not return shell output.");return A},stopShell:async(o)=>{if(j(o,Ze),(await L({...U,type:"shell-stop",id:_(E),payload:{shellId:o}}))?.stopped!==!0)throw new d("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(o)=>{j(o),await C({...U,type:"open-session",id:_(E),payload:{sessionId:o}})},storage:{get:async(o,r)=>{let c=dt(r),l={op:"get",key:o};if(c)l.scope=c;let R=await Je(l);return R.op==="get"&&R.found?R.value:void 0},set:async(o,r,c)=>{let l=dt(c),R={op:"set",key:o,value:r};if(l)R.scope=l;await Je(R)},delete:async(o,r)=>{let c=dt(r),l={op:"delete",key:o};if(c)l.scope=c;await Je(l)},keys:async(o)=>{let r=dt(o),c={op:"keys"};if(r)c.scope=r;let l=await Je(c);if(l.op!=="keys")throw new d("HOST_REJECTED","Expected storage keys.");return l.keys}},onReady:(o)=>{if(i.add(o),p)o(p);return()=>{i.delete(o)}},onDirectory:(o)=>{if(a.add(o),p)o(p.directory);return()=>{a.delete(o)}},onSession:(o)=>{if(u.add(o),p)o(p.session);return()=>{u.delete(o)}},onSessionLifecycle:(o)=>{if(f.add(o),Z)o(Z);return()=>{f.delete(o)}},onConnection:(o)=>{if(T.add(o),p)o(p.connection);return()=>{T.delete(o)}},onSettings:(o)=>{if(O.add(o),p)o(p.settings);return()=>{O.delete(o)}},onItem:(o)=>{if(b.add(o),p)o(p.item);return()=>{b.delete(o)}},onStatusControl:(o)=>(K.add(o),()=>{K.delete(o)}),onPopoverClosed:(o)=>(h.add(o),()=>{h.delete(o)}),setStatusControls:(o)=>{if(p?.features?.statusControls!==!0)return Promise.reject(new d("UNSUPPORTED","This host does not support status controls."));if(!ar(o))return Promise.reject(new d("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return C({...U,type:"status-controls",id:_(E),payload:{controls:o}})},openPopover:(o)=>{if(p?.features?.popovers!==!0)return Promise.reject(new d("UNSUPPORTED","This host does not support popovers."));if(!Ft(o))return Promise.reject(new d("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return C({...U,type:"popover-open",id:_(E),payload:o})},closePopover:qo,setPopoverAnchorActive:Qo,onResolve:(o)=>(ae=o,()=>{if(ae===o)ae=null}),toast:(o)=>{let r=o.message.trim();if(!r||r.length>tt)return Promise.reject(new d("HOST_REJECTED",`Toast message must contain 1 to ${tt} characters.`));if(o.copy&&o.copy!==!0&&(!o.copy.text.length||o.copy.text.length>ot))return Promise.reject(new d("HOST_REJECTED",`Toast copy text must contain 1 to ${ot} characters.`));return C({channel:m,v:S,type:"toast",id:_(E),payload:{...o,message:r}})},openUrl:(o)=>C({channel:m,v:S,type:"open-url",id:_(E),payload:{url:o}}),openCommit:(o)=>Kt(o)?C({channel:m,v:S,type:"open-commit",id:_(E),payload:{sha:o}}):Promise.reject(new d("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(o)=>C({channel:m,v:S,type:"open-surface",id:_(E),payload:{surfaceId:o}}),writeClipboard:(o)=>C({channel:m,v:S,type:"clipboard-write",id:_(E),payload:{text:o}}),compose:(o)=>C({channel:m,v:S,type:"compose",id:_(E),payload:o}),attach:(o)=>C({channel:m,v:S,type:"attach",id:_(E),payload:Ae(o)}),startSession:async(o)=>{if(o.projectId!==void 0)j(o.projectId);let r=o.worktree;if(r&&r!==!0)if(r.kind==="existing")j(r.directory);else{if(r.name!==void 0)j(r.name,200);if(r.baseBranch!==void 0)j(r.baseBranch,200)}let c=await L({channel:m,v:S,type:"start-session",id:_(E),payload:Yt(o)},e.requestTimeoutMs??180000);if(!Vt(c))throw new d("HOST_REJECTED","Host did not return a session.");return c},prompt:(o)=>L({channel:m,v:S,type:"prompt",id:_(E),payload:Jt(o)}).then((r)=>{if(!Bt(r))throw new d("HOST_REJECTED","Host did not return a prompt result.");return r}),sessionLink:(o)=>C({channel:m,v:S,type:"session-link",id:_(E),payload:Ae(o)}),close:()=>C({channel:m,v:S,type:"close",id:_(E)}),oauthStart:()=>C({channel:m,v:S,type:"oauth-start",id:_(E)}),oauthDisconnect:()=>C({channel:m,v:S,type:"oauth-disconnect",id:_(E)}),request:(o)=>(at(o.path)?L({channel:m,v:S,type:"request",id:_(E),payload:o}):Mr()).then((r)=>{if(!ct(r))throw new d("HOST_REJECTED","Host request result was empty.");return r}),serviceRequest:(o)=>(at(o.path)?L({channel:m,v:S,type:"service-request",id:_(E),payload:o}):Mr()).then((r)=>{if(!ct(r))throw new d("HOST_REJECTED","Host service request result was empty.");return r}),serviceStatus:()=>L({channel:m,v:S,type:"service-status",id:_(E)}).then((o)=>{if(!Qt(o))throw new d("HOST_REJECTED","Host did not return service status.");return o}),readFile:(o)=>(Oe(o)?L({channel:m,v:S,type:"file-read",id:_(E),payload:{path:o}}):lt()).then((r)=>{if(!eo(r))throw new d("HOST_REJECTED","Host did not return file content.");return r}),writeFile:(o,r)=>{if(!Oe(o))return lt();if(r.length>nt)return Promise.reject(new d("FILE_TOO_LARGE",`Content is over ${nt} characters.`));return L({channel:m,v:S,type:"file-write",id:_(E),payload:{path:o,content:r}}).then((c)=>{if(!to(c))throw new d("HOST_REJECTED","Host did not confirm the write.");return c})},listDir:(o)=>(Oe(o)?L({channel:m,v:S,type:"file-list",id:_(E),payload:{path:o}}):lt()).then((r)=>{if(!oo(r))throw new d("HOST_REJECTED","Host did not return directory entries.");return r}),stat:(o)=>(Oe(o)?L({channel:m,v:S,type:"file-stat",id:_(E),payload:{path:o}}):lt()).then((r)=>{if(!ro(r))throw new d("HOST_REJECTED","Host did not return file status.");return r}),generate:(o)=>{let r=o.prompt.trim(),c=o.system?.trim();if(r.length===0||r.length>st)return Promise.reject(new d("HOST_REJECTED",`Prompt must be 1 to ${st} characters.`));if(c!==void 0&&(c.length===0||c.length>it))return Promise.reject(new d("HOST_REJECTED",`System prompt must be 1 to ${it} characters.`));let l=o.maxOutputTokens===void 0?void 0:Math.min(jt,Math.max(1,Math.floor(o.maxOutputTokens)));if(l!==void 0&&!Number.isFinite(l))return Promise.reject(new d("HOST_REJECTED","maxOutputTokens must be a number."));let R={prompt:r};if(c!==void 0)R.system=c;if(l!==void 0)R.maxOutputTokens=l;return L({channel:m,v:S,type:"generate",id:_(E),payload:R},e.requestTimeoutMs??Wt).then((A)=>{if(!no(A))throw new d("HOST_REJECTED","Host did not return generated text.");return A})},onLateGenerateResult:(o)=>{g.add(o);for(let r of Ce.splice(0))I([o],r);return Bo(),()=>{g.delete(o)}},setBadge:(o)=>C({channel:m,v:S,type:"badge",id:_(E),payload:{count:Zt(o)}}),setHeight:(o)=>C({channel:m,v:S,type:"resize",id:_(E),payload:{height:qt(o)}}),onFileOpen:(o)=>{if(ze.add(o),!Ct)Ct=!0,t.addEventListener("keydown",jo,!0);if(Ne)o(Ne);return()=>{ze.delete(o)}},onFileSnapshot:(o)=>(Ue=o,()=>{if(Ue===o)Ue=null}),onFileSaved:(o)=>(je.add(o),()=>{je.delete(o)}),reportFileChange:(o)=>Ut({...U,type:"file-change",payload:{dirty:o.dirty,edited:o.edited}}),requestFileSave:zo,reportFileUnsupported:()=>Ut({...U,type:"file-unsupported"}),dispose:()=>{for(let o of ge.keys())X({...U,type:"workspace-unsubscribe",id:_(E),payload:{subscriptionId:o}});ge.clear();for(let o of xe.keys())X({...U,type:"shells-unsubscribe",id:_(E),payload:{subscriptionId:o}});if(xe.clear(),Y=!0,ae=null,ce=null,Ue=null,ze.clear(),je.clear(),Ct)t.removeEventListener("keydown",jo,!0);t.removeEventListener("message",Ko),t.removeEventListener("keydown",Wo,!0),t.removeEventListener("pointerover",Ye),t.removeEventListener("pointermove",Ye),t.removeEventListener("pointerout",Yo),t.removeEventListener("focus",Jo),t.removeEventListener("blur",Zo);for(let o of he.values())clearTimeout(o.timer),o.reject(new d("HOST_UNAVAILABLE","Host client was disposed."));he.clear(),i.clear(),a.clear(),u.clear(),f.clear(),T.clear(),O.clear(),b.clear(),K.clear(),h.clear(),g.clear(),Ce.length=0}}};var Lr=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var Rs=new Set(Lr);var Pr=["none","agent","user"];var ks=new Set(Pr);var gn=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],xn=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Gr=(e,t)=>{t.style.colorScheme=e.mode;for(let[n,s]of gn)t.style.setProperty(n,e.tokens[s]);for(let[n,s,i]of xn){let a=e.tokens[i]??"";t.style.setProperty(n,a),t.style.setProperty(s,a)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},ao=(e,t)=>{if(Gr(e.theme,t),t.dataset)t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode};var bn={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},y=(e,t)=>`var(--${e}, var(--oc-${bn[e]}, ${t}))`,Q=y("surface-background","transparent"),ut=y("surface-elevated","transparent"),Re=y("surface-elevated-foreground","inherit"),V=y("surface-foreground","inherit"),k=y("surface-muted-foreground","gray"),An=y("surface-muted","transparent"),le=y("interactive-border","currentColor"),G=y("interactive-hover","transparent"),de=y("interactive-active","transparent"),co=y("interactive-selection","transparent"),lo=y("interactive-selection-foreground","inherit"),q=y("primary","currentColor"),po=y("primary-text","inherit"),uo=y("error-text","inherit"),On=y("font-sans","inherit"),Eo=y("font-mono","monospace"),Fr=y("radius","9px"),_o=`calc(${Fr} - 2px)`,Dr=`calc(${Fr} - 4px)`,v=(e,t,n="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${n})`,$r=`background-image: linear-gradient(${G}, ${G});`,mo=(e,t="0.5px")=>`box-shadow: inset 0 0 0 ${t} ${e}, var(--oc-sdk-field-lift);`,So="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",Hr="box-shadow: var(--oc-sdk-lit);",fo=`inset 0 0.5px 0 0 ${v(V,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,Rn=`
:root {
  --oc-sdk-edge: ${v(V,16)};
  --oc-sdk-field-bg: ${ut};
  --oc-sdk-raised-bg: ${Q};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${v(V,14)};
  --oc-sdk-field-bg: ${v(Q,50,ut)};
  --oc-sdk-raised-bg: ${ut};
  --oc-sdk-field-lift: ${fo};
  --oc-sdk-raised-lift: ${fo};
  --oc-sdk-lit: ${fo};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,pt=(e)=>{let t=y(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${y(`${e}-text`,"inherit")}; }`},yn=`
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
`,Xr=`${Rn}
.oc-sdk { color: ${V}; font-family: ${On}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${$r} }
.oc-sdk-mono { font-family: ${Eo}; }
.oc-sdk-muted { color: ${k}; }
${pt("success")}${pt("warning")}${pt("error")}${pt("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${q}; --oc-sdk-tone-text: ${po}; }

.oc-sdk-btn { border-radius: ${_o}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Dr}; }
.oc-sdk-btn[data-variant="default"] { color: ${po}; background: ${v(q,10,Q)}; border-color: ${v(q,12)}; ${Hr} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${v(q,16,Q)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${v(q,22,Q)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${An}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${G}, ${G}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${de}, ${de}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${Re}; ${So} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${G}, ${G}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${de}, ${de}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${G}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${de}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${y("status-error","red")}; color: ${uo}; background: ${v("var(--oc-sdk-tone)",7,Q)}; border-color: ${v("var(--oc-sdk-tone)",12)}; ${Hr} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${v("var(--oc-sdk-tone)",9,Q)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${v("var(--oc-sdk-tone)",11,Q)}; box-shadow: none; }

.oc-sdk-field-note { color: ${k}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${uo}; }
.oc-sdk-input { border-radius: ${_o}; background: var(--oc-sdk-field-bg); color: ${Re}; ${mo("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${k}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${G}, ${G}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${mo(v(V,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${mo(y("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${Eo}; }

.oc-sdk-search-icon { color: ${k}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${q}; }
.oc-sdk-search-clear { border-radius: ${Dr}; color: ${k}; }
.oc-sdk-search-clear:hover { background: ${G}; color: ${V}; }

.oc-sdk-trigger { border-radius: ${_o}; background: var(--oc-sdk-raised-bg); color: ${Re}; ${So} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${G}, ${G}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${de}, ${de}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${k}; }
.oc-sdk-trigger-chevron { color: ${k}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${Re}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${ut}; background-clip: padding-box; color: ${Re}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${G}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${co}; color: ${lo}; }
.oc-sdk-option-check { color: ${V}; }
.oc-sdk-option[data-destructive="true"] { color: ${uo}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${v(y("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${k}; }
.oc-sdk-popup-empty { color: ${k}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${le}; border-radius: 4px; color: ${V}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${v(V,60,le)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${le}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${Q}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${q}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${$r} }
.oc-sdk-check-desc { color: ${k}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${v(V,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${k}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${V}; }
.oc-sdk-tab[aria-selected="true"] { color: ${lo}; background: ${co}; border-color: ${le}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${Re}; background: var(--oc-sdk-raised-bg); ${So} }
.oc-sdk-tab-count { color: ${k}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${v(V,6)}; color: ${k}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${v("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${G}; }
.oc-sdk-row[aria-selected="true"] { background: ${co}; color: ${lo}; }
.oc-sdk-row-lead { font-family: ${Eo}; color: ${k}; }
.oc-sdk-row-sub { color: ${k}; }
.oc-sdk-row-meta { color: ${k}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${k}; }

.oc-sdk-empty-body { color: ${k}; }

.oc-sdk-spinner { color: ${k}; }
.oc-sdk-spinner-ring { border-color: ${le}; border-top-color: ${q}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${v("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${k}; }

.oc-sdk-separator { color: ${k}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${v(le,40)}; }

.oc-sdk-progress-label { color: ${k}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${v(V,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${q}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${y("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${y("success-text","inherit")}; }

.oc-sdk-text a { color: ${po}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${v(le,60)}; }
`,P=`
${Lt}
${yn}
${Xr}`;var x={util:"#4d9fff",mem:"#e8c33a",temp:"#b07fe8",power:"#3ddc84",cpu:"#ff8c42",npu:"#ec60a0",systemRam:"#89929c"};var Un={llama:"llama.cpp",ollama:"Ollama",vllm:"vLLM",sglang:"SGLang",tgi:"Hugging Face TGI",flm:"FastFlowLM"};function Vr(e){return Un[e]}function Br(e){let t=[],n=["llama","ollama","vllm","sglang","tgi","flm"];for(let s of n)for(let i of e[s]??[]){if(s==="ollama"||!i.model)continue;let a=i.alias||i.model;t.push({key:`process:${s}:${i.pid}`,engine:s,title:a,process:i})}for(let s of e.ollama_models??[]){if(!s.name)continue;t.push({key:`ollama-model:${s.name}`,engine:"ollama",title:s.name,ollamaModel:s})}return t.sort((s,i)=>s.key.localeCompare(i.key))}var Nn=/(?:api[-_]?key|token|password|secret|credential|auth)/i;function Kr(e=[]){let t=[];for(let n=1;n<e.length;n++){let s=e[n];if(!/^-{1,2}(?!\d)/.test(s))continue;let i=s.indexOf("="),a=(i<0?s:s.slice(0,i)).replace(/^-+/,""),u=i<0?"":s.slice(i+1);if(i<0&&n+1<e.length&&!/^-{1,2}(?!\d)/.test(e[n+1]))u=e[++n];if(Nn.test(a)&&u)u="[redacted]";t.push({key:a,value:u})}return t.sort((n,s)=>n.key.localeCompare(s.key))}var zr=21;var ho=["util","mem","temp","power","cpu","npu"],go="seriesVisibilityV1",wn={util:!0,mem:!0,temp:!0,power:!0,cpu:!0,npu:!0},xo=(e)=>{let t={...wn};if(!e||typeof e!=="object"||Array.isArray(e))return t;for(let n of ho){let s=e[n];if(typeof s==="boolean")t[n]=s}return t};var bo="sourceConfigV1",ft="local",Mn=[{id:"evo-x2",label:"evo-x2.home.lan",host:"evo-x2.home.lan"},{id:"proxmox",label:"proxmox.home.lan",host:"proxmox.home.lan"}],Ln=/^(?=.{1,253}$)(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)(?:\.(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?))*\.?$/,Pn=/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,63}$/;function Tt(e){let t=e.trim().replace(/\.$/,"").toLowerCase();if(!Ln.test(t))throw Error("Enter a hostname or IPv4 address only (no http://, port, or path).");return t}function Gn(e){if(!e||typeof e!=="object"||Array.isArray(e))return null;let t=e;if(typeof t.id!=="string"||!Pn.test(t.id))return null;if(typeof t.label!=="string"||t.label.trim().length<1||t.label.length>80)return null;if(typeof t.host!=="string")return null;try{return{id:t.id,label:t.label.trim(),host:Tt(t.host)}}catch{return null}}function Ao(e){if(!e||typeof e!=="object"||Array.isArray(e))return{selectedSourceId:"local",remoteSources:Mn.map((u)=>({...u}))};let t=e,n=[],s=new Set,i=new Set;if(Array.isArray(t.remoteSources))for(let u of t.remoteSources.slice(0,50)){let f=Gn(u);if(!f||s.has(f.id)||i.has(f.host))continue;n.push(f),s.add(f.id),i.add(f.host)}return{selectedSourceId:typeof t.selectedSourceId==="string"&&(t.selectedSourceId==="local"||s.has(t.selectedSourceId))?t.selectedSourceId:"local",remoteSources:n}}function jr(e){if(e.selectedSourceId==="local")return{mode:"local"};let t=e.remoteSources.find(({id:n})=>n===e.selectedSourceId);if(!t)return{mode:"local"};return{mode:"remote",label:t.label,host:Tt(t.host)}}var ne=io(),Xe=document.querySelector("#root");if(!Xe)throw Error("Missing #root");var Dn=`
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
`,Qr=document.createElement("style");Qr.textContent=Dn;document.head.append(Qr);var Wr=(e)=>{if(e===0)return"0 B";let t=["B","KB","MB","GB","TB"],n=Math.floor(Math.log(e)/Math.log(1024));return`${(e/Math.pow(1024,n)).toFixed(1)} ${t[n]}`},Ge=(e)=>{if(e===null)return"–";return`${e.toFixed(0)}%`},$n=(e)=>{if(e===null)return"–";return`${e.toFixed(0)}°`},Hn=(e)=>{if(e===null)return"–";return`${e.toFixed(0)} W`},pe={util:"GPU Util",mem:"GTT",temp:"Temp",power:"Power",cpu:"CPU",npu:"NPU"},Fn={util:100,mem:100,temp:100,power:100,cpu:100,npu:100};function De(e,t){let n=document.getElementById("chart-svg");if(!n)return;while(n.firstChild)n.removeChild(n.firstChild);let s=300,i=100,a=2,u=document.createElementNS("http://www.w3.org/2000/svg","g");for(let O of[0.25,0.5,0.75]){let b=document.createElementNS("http://www.w3.org/2000/svg","line");b.setAttribute("x1","0"),b.setAttribute("x2",String(s)),b.setAttribute("y1",String(i*O)),b.setAttribute("y2",String(i*O)),b.setAttribute("stroke","var(--oc-border)"),b.setAttribute("stroke-width","0.5"),b.setAttribute("opacity","0.3"),u.appendChild(b)}n.appendChild(u);let f=performance.now()-en,T=Ee?.timestamp??Date.now();for(let O of ho){if(!t[O])continue;let b=x[O],K=er(e[O],e.times??[],T,f,{width:s,height:i,pad:a,max:Fn[O],windowSec:zr-1});if(K.length<2)continue;let h=document.createElementNS("http://www.w3.org/2000/svg","polygon");h.setAttribute("points",tr(K,i)),h.setAttribute("fill",b),h.setAttribute("opacity","0.08"),n.appendChild(h);let g=document.createElementNS("http://www.w3.org/2000/svg","polyline");g.setAttribute("points",Mt(K)),g.setAttribute("fill","none"),g.setAttribute("stroke",b),g.setAttribute("stroke-width","1.5"),g.setAttribute("stroke-linejoin","round"),g.setAttribute("stroke-linecap","round"),g.setAttribute("opacity","0.95"),n.appendChild(g)}}var Ee=null,en=performance.now(),gt=!1,Oo=0,W=xo(void 0),se=document.createElement("div");se.className="status-dot";var B=document.createElement("span");B.textContent="Connecting…";var vo=document.createElement("div");vo.className="status";vo.append(se,B);var _e=document.createElement("button");_e.type="button";_e.dataset.series="util";_e.className="stat";_e.innerHTML=`
  <span class="stat-label">GPU Util</span>
  <span class="stat-value">–</span>
`;var Ve=document.createElement("div");Ve.className="stat";Ve.innerHTML=`
  <span class="stat-label">System RAM</span>
  <span class="stat-value">–</span>
`;var me=document.createElement("button");me.type="button";me.dataset.series="temp";me.className="stat";me.innerHTML=`
  <span class="stat-label">Temperature</span>
  <span class="stat-value">–</span>
`;var Se=document.createElement("button");Se.type="button";Se.dataset.series="power";Se.className="stat";Se.innerHTML=`
  <span class="stat-label">Power</span>
  <span class="stat-value">–</span>
`;var fe=document.createElement("button");fe.type="button";fe.dataset.series="cpu";fe.className="stat";fe.innerHTML=`
  <span class="stat-label">CPU</span>
  <span class="stat-value">–</span>
`;var J=document.createElement("button");J.type="button";J.dataset.series="npu";J.className="stat";J.style.display="none";J.innerHTML=`
  <span class="stat-label">NPU</span>
  <span class="stat-value">–</span>
`;var xt=!1,Te=document.createElement("button");Te.type="button";Te.dataset.series="mem";Te.className="stat";Te.innerHTML=`
  <span class="stat-label">GTT Memory</span>
  <span class="stat-value">–</span>
`;var Io=document.createElement("div");Io.className="stats-row";Io.append(_e,Te,me,Se,fe,Ve,J);var Xn=[[_e,x.util],[Ve,x.systemRam],[me,x.temp],[Se,x.power],[fe,x.cpu],[Te,x.mem],[J,x.npu]];for(let[e,t]of Xn)e.style.setProperty("--series-color",t);var Co=document.createElement("div");Co.className="mem-detail";var tn=document.createElement("span"),on=document.createElement("span");Co.append(tn,on);var Uo=document.createElement("div");Uo.className="section";Uo.innerHTML=`
  <h2>Activity</h2>
  <div class="chart-container">
    <svg id="chart-svg" class="chart" viewBox="0 0 300 100" preserveAspectRatio="none"></svg>
    <div class="legend">
      <button class="legend-item" type="button" data-series="util" style="--series-color:${x.util}" aria-pressed="true"><span class="legend-dot" style="background:${x.util}"></span>${pe.util}</button>
      <button class="legend-item" type="button" data-series="mem" style="--series-color:${x.mem}" aria-pressed="true"><span class="legend-dot" style="background:${x.mem}"></span>${pe.mem}</button>
      <button class="legend-item" type="button" data-series="temp" style="--series-color:${x.temp}" aria-pressed="true"><span class="legend-dot" style="background:${x.temp}"></span>${pe.temp}</button>
      <button class="legend-item" type="button" data-series="power" style="--series-color:${x.power}" aria-pressed="true"><span class="legend-dot" style="background:${x.power}"></span>${pe.power}</button>
      <button class="legend-item" type="button" data-series="cpu" style="--series-color:${x.cpu}" aria-pressed="true"><span class="legend-dot" style="background:${x.cpu}"></span>${pe.cpu}</button>
      <button class="legend-item" type="button" data-series="npu" style="display:none;--series-color:${x.npu}" aria-pressed="true"><span class="legend-dot" style="background:${x.npu}"></span>${pe.npu}</button>
    </div>
  </div>
`;var Rt=document.createElement("section");Rt.className="section llm-section";var rn=document.createElement("h2");rn.textContent="LLM processes";var bt=document.createElement("div");bt.className="llm-list";Rt.append(rn,bt);var w=Ao(void 0),Ro=Promise.resolve(),ke="",At=!1,ko="Checking local D-Bus…",No=document.createElement("div");No.className="source-controls";var wo=document.createElement("label");wo.htmlFor="source-picker-trigger";wo.textContent="Source";var yt=document.createElement("div");yt.className="source-picker";var M=document.createElement("button");M.id="source-picker-trigger";M.type="button";M.className="source-picker-trigger";M.setAttribute("role","combobox");M.setAttribute("aria-label","Telemetry source");M.setAttribute("aria-haspopup","listbox");M.setAttribute("aria-expanded","false");M.disabled=!0;var Mo=document.createElement("span");Mo.className="source-picker-value";var kt=document.createElement("span");kt.className="source-picker-chevron";kt.setAttribute("aria-hidden","true");kt.textContent="⌄";M.append(Mo,kt);var F=document.createElement("div");F.className="source-picker-menu";F.id="source-picker-options";F.setAttribute("role","listbox");F.setAttribute("aria-label","Telemetry sources");F.hidden=!0;M.setAttribute("aria-controls",F.id);yt.append(M,F);var Be=document.createElement("button");Be.type="button";Be.textContent="Manage";Be.setAttribute("aria-label","Manage remote servers");No.append(wo,yt,Be);var te=document.createElement("dialog");te.className="source-dialog";te.setAttribute("aria-labelledby","source-dialog-title");var Lo=document.createElement("h2");Lo.id="source-dialog-title";Lo.textContent="Remote servers";var Po=document.createElement("div");Po.className="dialog-help";Po.textContent="Enter a hostname or IPv4 address. onvtop uses HTTP on port 8039 and requests the full sample.";var $e=document.createElement("div");$e.className="server-list";var oe=document.createElement("div");oe.className="dialog-error";oe.setAttribute("role","alert");var Go=document.createElement("div");Go.className="add-server";var re=document.createElement("input");re.name="name";re.placeholder="Name (optional)";re.setAttribute("aria-label","Server display name");re.maxLength=80;var z=document.createElement("input");z.name="host";z.placeholder="hostname";z.setAttribute("aria-label","Server hostname");z.setAttribute("autocomplete","off");var Ie=document.createElement("button");Ie.type="button";Ie.textContent="Add";var ie=document.createElement("button");ie.type="button";ie.className="cancel-edit";ie.textContent="Cancel edit";ie.hidden=!0;Go.append(re,z,Ie,ie);var Do=document.createElement("div");Do.className="dialog-actions";var vt=document.createElement("button");vt.type="button";vt.textContent="Done";Do.append(vt);te.append(Lo,Po,$e,oe,Go,Do);var ue=null;function $o(){ue=null,re.value="",z.value="",Ie.textContent="Add",ie.hidden=!0}function Yr(e,t,n=""){let s=document.createElement("button");s.type="button",s.className=`icon-button ${n}`.trim(),s.title=e,s.setAttribute("aria-label",e);let i=document.createElementNS("http://www.w3.org/2000/svg","svg");i.setAttribute("viewBox","0 0 24 24"),i.setAttribute("aria-hidden","true");for(let a of t){let u=document.createElementNS("http://www.w3.org/2000/svg","path");u.setAttribute("d",a),i.append(u)}return s.append(i),s}function Ot(){let e=[{id:ft,label:"Local D-Bus",detail:At?"This machine":ko||"Unavailable on this machine"},...w.remoteSources.map((n)=>({id:n.id,label:n.label,detail:`${n.host}:8039`}))],t=e.find(({id:n})=>n===w.selectedSourceId)??e[0];Mo.textContent=t.label,M.setAttribute("aria-label",`Telemetry source: ${t.label}`),F.replaceChildren();for(let n of e){let s=document.createElement("button");if(s.type="button",s.className="source-picker-option",s.setAttribute("role","option"),s.setAttribute("aria-selected",String(n.id===t.id)),s.disabled=n.id===ft&&!At,s.disabled)s.title=n.detail;s.dataset.sourceId=n.id;let i=document.createElement("span");i.textContent=n.label;let a=document.createElement("small");a.textContent=n.detail,s.append(i,a),s.addEventListener("click",()=>{if(Ke(!1),w.selectedSourceId!==n.id)Fe({...w,selectedSourceId:n.id})}),F.append(s)}}function Ke(e,t=!1){if(F.hidden=!e,M.setAttribute("aria-expanded",String(e)),e&&t)F.querySelector('[role="option"]')?.focus()}M.addEventListener("click",()=>{Ke(F.hidden)});M.addEventListener("keydown",(e)=>{if(e.key==="ArrowDown")e.preventDefault(),Ke(!0,!0)});F.addEventListener("keydown",(e)=>{let t=Array.from(F.querySelectorAll('[role="option"]')),n=t.indexOf(document.activeElement);if(e.key==="Escape")e.preventDefault(),Ke(!1),M.focus();else if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();let s=e.key==="ArrowDown"?1:-1;t[(n+s+t.length)%t.length]?.focus()}else if(e.key==="Home")e.preventDefault(),t[0]?.focus();else if(e.key==="End")e.preventDefault(),t.at(-1)?.focus()});document.addEventListener("click",(e)=>{if(!yt.contains(e.target))Ke(!1)});function It(){if($e.replaceChildren(),w.remoteSources.length===0){let e=document.createElement("div");e.className="dialog-help",e.textContent="No remote servers added.",$e.append(e);return}for(let e of w.remoteSources){let t=document.createElement("div");t.className="server-row";let n=document.createElement("div");n.className="server-row-info";let s=document.createElement("strong");s.textContent=e.label;let i=document.createElement("small");i.textContent=`${e.host}:8039`,n.append(s,i);let a=document.createElement("div");a.className="server-actions";let u=Yr(`Edit ${e.label}`,["M12 20h9","M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"]);u.addEventListener("click",()=>{ue=e.id,re.value=e.label,z.value=e.host,Ie.textContent="Save",ie.hidden=!1,oe.textContent="",z.focus()});let f=Yr(`Delete ${e.label}`,["M3 6h18","M8 6V4h8v2","M19 6l-1 14H6L5 6","M10 11v6","M14 11v6"],"delete-button");f.addEventListener("click",()=>{let T=w.remoteSources.filter(({id:b})=>b!==e.id),O=w.selectedSourceId===e.id?ft:w.selectedSourceId;if(ue===e.id)$o();Fe({...w,selectedSourceId:O,remoteSources:T}),oe.textContent="",It()}),a.append(u,f),t.append(n,a),$e.append(t)}}function Fe(e){return w=e,ke="",Ot(),It(),se.className="status-dot",B.textContent="Connecting…",B.title="",Ro=Ro.then(async()=>{await ne.storage.set(bo,w);let t=await ne.serviceRequest({method:"POST",path:"/source",body:JSON.stringify(jr(w))});if(t.status!==200){let n="";try{let s=JSON.parse(t.body);if(typeof s.error==="string")n=`: ${s.error}`}catch{}if(t.status===404)throw Error("Onvtop service is outdated. Restart OpenChamber.");throw Error(`Source request failed (HTTP ${t.status}${n}).`)}}).catch((t)=>{console.warn("Could not save onvtop source configuration",t);let n=t instanceof Error?t.message:"Could not change source";ke=n,B.textContent=n,B.title=n,se.className="status-dot error"}),Ro}Be.addEventListener("click",()=>{oe.textContent="",It(),te.showModal(),z.focus()});vt.addEventListener("click",()=>te.close());te.addEventListener("click",(e)=>{if(e.target===te)te.close()});function nn(){oe.textContent="";try{if(!ue&&w.remoteSources.length>=50)throw Error("You can add up to 50 remote servers.");let e=Tt(z.value);if(w.remoteSources.some((n)=>n.host===e&&n.id!==ue))throw Error("That host is already in the list.");let t=re.value.trim()||e;if(t.length>80)throw Error("The server name must be 80 characters or fewer.");if(ue){let n=w.remoteSources.map((s)=>s.id===ue?{...s,label:t,host:e}:s);Fe({...w,remoteSources:n})}else{let n=`remote-${Date.now()}-${Math.floor(Math.random()*1e4)}`,s={id:n,label:t,host:e};Fe({selectedSourceId:n,remoteSources:[...w.remoteSources,s]})}$o(),It(),z.focus()}catch(e){oe.textContent=e instanceof Error?e.message:"Invalid server address."}}Ie.addEventListener("click",nn);for(let e of[re,z])e.addEventListener("keydown",(t)=>{if(t.key==="Enter")t.preventDefault(),nn()});ie.addEventListener("click",()=>{$o(),oe.textContent=""});Xe.append(vo,Io,Co,Uo,No,Rt,te);var ht=new Map,Vn={llama:x.util,ollama:x.mem,vllm:x.temp,sglang:x.power,tgi:x.cpu,flm:x.npu},Jr=(e)=>e===null||e===void 0?"N/A":`${e.toFixed(0)}%`,Zr=(e)=>e===null||e===void 0?"N/A":`${(e/1024).toFixed(0)} MiB`;function Bn(){let e=document.createElement("article");e.className="llm-card";let t=document.createElement("div");t.className="llm-title";let n=document.createElement("div");n.className="llm-stats";let s=document.createElement("div");s.className="llm-meta";let i=document.createElement("div");return i.className="llm-flags",e.append(t,n,s,i),{element:e,title:t,stats:n,meta:s,flags:i,flagsSignature:""}}var sn=(e)=>e.engine==="flm"||(e.process?.type??[]).includes("npu");function Kn(e){let t=e.process;if(!t){let n=e.ollamaModel;if(!n)return"";return[n.parameter_size&&`parameters: ${n.parameter_size}`,n.quantization&&`quant: ${n.quantization}`].filter(Boolean).join("   ·   ")}return[t.user&&`user: ${t.user}`,xt&&`device: ${sn(e)?"NPU":"GPU"}`,t.ngl&&`ngl: ${t.ngl}`,t.ctx&&`ctx: ${t.ctx}`,t.parallel&&`parallel: ${t.parallel}`,t.threads&&`threads: ${t.threads}`,t.port&&`port: ${t.port}`,`pid: ${t.pid}`].filter(Boolean).join("   ·   ")}function zn(e,t){if(e.element.style.setProperty("--engine-color",Vn[t.engine]),e.title.textContent=`${Vr(t.engine)}  [${t.title}]`,t.process){let a=t.process,u=xt&&sn(t)?"NPU":"GPU";e.stats.textContent=`${u} (proc): ${Jr(a.gpu_pct)}   ${u} MEM (proc): ${Zr(a.vram_kb)}   CPU: ${Jr(a.cpu_pct)}   RSS: ${Zr(a.rss_kb)}`}else if(t.ollamaModel){let a=t.ollamaModel,u=a.size?Wr(a.size):"N/A",f=a.size_vram?Wr(a.size_vram):"N/A";e.stats.textContent=`Model size: ${u}   GPU memory: ${f}`}e.meta.textContent=Kn(t);let n=t.process?.argv??[],s=Kr(n),i=JSON.stringify(s);if(i!==e.flagsSignature){e.flags.replaceChildren();for(let a of s){let u=document.createElement("span");u.className="llm-flag";let f=document.createElement("span");f.className="llm-flag-key",f.textContent=`${a.key}: `;let T=document.createElement("span");T.className="llm-flag-value",T.textContent=a.value||"on",u.append(f,T),e.flags.append(u)}e.flagsSignature=i}}function jn(e){let t=Br(e);Rt.hidden=t.length===0;let n=new Set(t.map(({key:s})=>s));for(let[s,i]of ht){if(n.has(s))continue;i.element.remove(),ht.delete(s)}t.forEach((s,i)=>{let a=ht.get(s.key);if(!a)a=Bn(),ht.set(s.key,a);zn(a,s);let u=bt.children.item(i);if(u!==a.element)bt.insertBefore(a.element,u)})}function Ho(){for(let e of Array.from(Xe.querySelectorAll("[data-series]"))){let t=e.dataset.series,n=W[t];e.setAttribute("aria-pressed",String(n)),e.classList.toggle("series-off",!n),e.title=`${n?"Hide":"Show"} ${pe[t]} graph line`}}function Wn(e){if(W={...W,[e]:!W[e]},Ho(),Ee)De(Ee.history,W);ne.storage.set(go,W).catch((t)=>{console.warn("Could not save onvtop graph visibility",t)})}for(let e of Array.from(Xe.querySelectorAll("[data-series]")))e.addEventListener("click",()=>Wn(e.dataset.series));Ho();function Yn(e){let{gpu:t,sys:n,npu:s}=e.sample;xt=!!s?.present;for(let h of[J,...Array.from(Xe.querySelectorAll('.legend-item[data-series="npu"]'))])h.style.display=xt?"":"none";if(jn(e.sample.llm),typeof e.localSourceAvailable==="boolean"){let h=e.localSourceAvailable,g=e.localSourceReason||"Unavailable on this machine";if(h!==At||!h&&g!==ko)At=h,ko=h?"":g,Ot()}if(ke){se.className="status-dot error",B.textContent=ke,B.title=ke,De(e.history,W),gt=!0;return}if(!e.sourceAvailable){se.className="status-dot error",B.textContent=`${e.sourceLabel||"nvstats-service"} unavailable`,B.title=e.sourceError||"No sample received from this source",De(e.history,W),gt=!0;return}_e.querySelector(".stat-value").textContent=Ge(t.util),me.querySelector(".stat-value").textContent=$n(t.temp),Se.querySelector(".stat-value").textContent=Hn(t.power_w),fe.querySelector(".stat-value").textContent=Ge(n.cpu),J.querySelector(".stat-value").textContent=s?.readable?Ge(s.util):"N/A",J.title=s?.readable?"":s?.reason??"NPU not readable";let i=t.mem_used??0,a=t.mem_total??0,u=t.mem_used!==null&&a>0?i/a*100:null;Te.querySelector(".stat-value").textContent=Ge(u);let f=t.mem_used===null?"—":(i/1024).toFixed(1),T=t.mem_total===null?"—":(a/1024).toFixed(1);tn.textContent=`GTT ${f} / ${T} GiB`;let{ram_used:O,ram_total:b}=n,K=b>0?O/b*100:null;Ve.querySelector(".stat-value").textContent=Ge(K),on.textContent=`System RAM ${(O/1073741824).toFixed(1)} / ${(b/1073741824).toFixed(1)} GiB`,De(e.history,W),se.className="status-dot ok",B.textContent=`Live · ${e.sourceLabel||"nvstats-service"}`,B.title="",gt=!1}function Jn(){se.className="status-dot error",B.textContent="No data from nvstats-service",gt=!0}async function Fo(){try{let e=await ne.serviceRequest({method:"GET",path:"/stats"}),t=JSON.parse(e.body);if(e.status===200)Ee=t,en=performance.now(),Yn(Ee),Oo=0;else throw Error("bad response")}catch{if(Oo++,Oo>3)Jn()}}var ve=0,qr=0;function an(e){if(ve=requestAnimationFrame(an),e-qr<33)return;if(qr=e,Ee?.sourceAvailable&&!ke)De(Ee.history,W)}function Zn(){if(!ve)ve=requestAnimationFrame(an)}function qn(){if(ve)cancelAnimationFrame(ve);ve=0}var He=null,yo=!1;function cn(){if(He)return;He=setInterval(()=>{if(!yo)yo=!0,Fo().finally(()=>{yo=!1})},1000),Zn()}function ln(){if(qn(),He)clearInterval(He),He=null}document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")cn(),Fo();else ln()});window.addEventListener("pagehide",()=>{ln(),ne.dispose()});ne.onReady(async(e)=>{ao(e,document.documentElement);try{W=xo(await ne.storage.get(go)),Ho()}catch(t){console.warn("Could not load onvtop graph visibility",t)}try{w=Ao(await ne.storage.get(bo)),Ot(),M.disabled=!1,await Fe(w)}catch(t){console.warn("Could not load onvtop source configuration",t),Ot(),M.disabled=!1}cn(),Fo()});})();
