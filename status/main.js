(()=>{var u="openchamber.sdk",_=1;var je=`
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
`;function Ft(e){let r=e.documentElement;if(r.hasAttribute("data-oc-scrollbar-activity"))return;r.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(E)=>{let p=E.target===e?r:E.target;if(!(p instanceof Element))return;if(!p.hasAttribute("data-oc-scrolling"))p.setAttribute("data-oc-scrolling","");let x=n.get(p);if(x!==void 0)clearTimeout(x);n.set(p,setTimeout(()=>{n.delete(p),p.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var Bo=`(${Ft.toString()})(document);`;var ze=128,We=65536;var he=128;var Re=65536;var jt=/^[a-z][a-z0-9-]{0,39}$/;var Vt=(e)=>Object(e)===e&&!Array.isArray(e),Ye=(e,r)=>Object.keys(e).every((n)=>r.includes(n)),Bt=(e)=>String(e)===e&&e.length>=1&&e.length<=60,Kt=(e)=>String(e)===e&&e.length>=1&&e.length<=80,zt=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let r=new Set;for(let n of e){if(!Vt(n)||!jt.test(n.id)||!Bt(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(r.has(n.id))return!1;if(r.add(n.id),n.kind==="button"){if(!Ye(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!Ye(n,["kind","id","label","value","options","disabled"]))return!1;if(!Kt(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let E=new Set;for(let p of n.options){if(!Vt(p)||!Ye(p,["value","label"])||!Kt(p.value)||!Bt(p.label)||E.has(p.value))return!1;E.add(p.value)}if(!E.has(n.value))return!1}return!0};var Wt=["{id}","{segment}","{segments+}"];var Ir=new Set(Wt);var Yt=["turn-finished","turn-failed","permission-asked","question-asked"];var Ur=new Set(Yt);var xe=20000000,be=256;var Je=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,Jt=(e,r)=>{if(e.path!==r.path||e.readOnly!==r.readOnly)return!1;if(e.encoding==="text"||r.encoding==="text")return e.encoding==="text"&&r.encoding==="text"&&e.content===r.content;if(e.bytes.byteLength!==r.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==r.bytes[n])return!1;return!0};var Zt=/^[A-Za-z0-9_-]{1,80}$/;var Qt=["left","right","top","bottom"];var qt=(e,r=0,n={remaining:16000})=>{if(--n.remaining<0||r>=32)return!1;if(e===null)return!0;let E=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let p of E)if(!qt(p,r+1,n))return!1;return!0},Ze=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((r)=>/^(0|[1-9]\d*)$/.test(r)&&Number(r)<e.length)&&e.every(Ze);if(Object(e)===e){let r=Object.getPrototypeOf(e);return(r===null||r===Object.prototype)&&Object.values(e).every(Ze)}return String(e)===e||Number.isFinite(e)},Qe=(e)=>{try{if(String(e.id)!==e.id||!Zt.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Qt.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!qt(e.data)||!Ze(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var to=["file","directory","other","missing"],et=(e)=>Boolean(e&&"sessionId"in e),tt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var oo=/^[0-9a-f]{7,64}$/i,ot=(e)=>oo.test(e),ge=500,ke=32000,ro=16000,no=128,so=200,io=2000,ao=16000,co=80,lo=200,po=16000;var uo=2000;var rt=20000,Ie=1024,ye=2000000;var Ue=64000,Ce=8000,nt=4000;var st=960000;var _o=999,Eo=1e4,pe=500,So=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],To=["stopped","starting","ready","failed"],jo=new Set(So),fo=(e)=>jo.has(e),mo=(e)=>e&&fo(e)?e:"HOST_REJECTED",Q=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(Q);if(Object(e)===e)return Object.values(e).every(Q);return!1},Oo=(e)=>Q(e)&&JSON.stringify(e).length<=po,eo=(e)=>e?.trim().slice(0,lo)??"",q=(e)=>{let r=e.id.trim().slice(0,no),n=e.title.trim().slice(0,so),E=e.url.trim().slice(0,io),p=e.text?.trim().slice(0,ao),x=e.author?.trim().slice(0,co),O=e.kind==="pull"?"pull":"issue",m={providerId:e.providerId.trim(),id:r,title:n||r,url:E,kind:O};if(p)m.text=p;if(x)m.author=x;if(O==="pull"){let L=eo(e.branches?.head),w=eo(e.branches?.base);if(L&&w)m.branches={head:L,base:w}}if(Oo(e.data))m.data=e.data;return m},it=(e)=>{let r=q(e);if(e.projectId)r.projectId=e.projectId;if(e.navigation)r.navigation=e.navigation;if(e.worktree)r.worktree=e.worktree;return r},at=(e)=>{let r={text:e.text.trim().slice(0,ro)};if(e.send)r.send=!0;return r},ct=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(_o,Math.max(0,Math.round(e)))},lt=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Eo,Math.max(0,Math.ceil(e)))};var ee=(e)=>e.length>0&&e.length<=Ie&&!e.includes("\x00")&&!e.includes("\\");var ve=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>uo)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},zo=new Set(To),dt=(e)=>Boolean(e&&"status"in e&&zo.has(String(e.status))&&!("body"in e)),Ne=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),pt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),ut=(e)=>Boolean(e&&"written"in e&&e.written===!0),_t=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),Wo=new Set(to),Et=(e)=>Boolean(e&&"kind"in e&&"size"in e&&Wo.has(String(e.kind))&&Number.isFinite(e.size)),St=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Yo=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),Jo=(e)=>Object(e)===e?e:null,qe=(e)=>String(e)===e&&e.length>0,Zo=(e)=>{if(!qe(e.id))return null;if(e.ok===!0){let r={channel:u,v:_,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)r.payload=e.payload;return r}if(e.ok===!1&&qe(e.error))return{channel:u,v:_,type:"result",id:e.id,ok:!1,error:e.error,code:mo(qe(e.code)?e.code:void 0)};return null},Tt=(e)=>{let r=Jo(e);if(!r||r.channel!==u||r.v!==_)return null;if(r.type==="result")return Zo(r);if(!Yo.has(String(r.type))||Object(r.payload)!==r.payload)return null;return r};var Ao=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Qo=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class a extends Error{code;constructor(e,r){super(r);this.name="HostRequestError",this.code=e}}var ho=()=>Promise.reject(new a("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Me=()=>Promise.reject(new a("BAD_PATH",`File path must be 1 to ${Ie} characters without NUL or backslash.`)),Le=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new a("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},d=(e)=>(e.value+=1,`oc-${e.value}`),ft=(e={})=>{let r=e.target??("window"in globalThis?window:null);if(!r)throw new a("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((t)=>t===r.parent),E=e.requestTimeoutMs??rt,p=new Set,x=new Set,O=new Set,m=new Set,L=new Set,w=new Set,D=new Set,Ee=new Set,Se=new Set,W=new Set,$e=[],se=null,ie=null,Te=new Set,fe=new Set,ae=null,ce=null,Fe=!1,Y=new Map,J=new Map,Z=new Map,G=!1,l={value:0},c=null,H=null,le=!1,de=!1,Ct=null,vt=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},N=(t)=>{r.parent.postMessage(t,"*")},Nt=()=>{if(G||r.parent===r||W.size===0||c?.features?.lateGenerateResults!==!0)return;N({channel:u,v:_,type:"generate-late-listen"})},R=(t,o)=>{for(let s of t)try{s(o)}catch(i){console.error(i)}},Mt=(t)=>{if(!(t instanceof MessageEvent))return;if(!n(t.source))return;let o=Tt(t.data);if(!o)return;if(o.type==="workspace"){let i=J.get(o.payload.subscriptionId);if(i)R([i],o.payload.snapshot);return}if(o.type==="shells"){let i=Z.get(o.payload.subscriptionId);if(i)R([i],o.payload.snapshot);return}if(o.type==="ready"){if(c=o.payload,H=vt(o.payload.session),R(p,o.payload),R(x,o.payload.directory),R(O,o.payload.session),H)R(m,H);R(L,o.payload.connection),R(w,o.payload.settings),R(D,o.payload.item),Nt();return}if(o.type==="generate-late"){if(W.size===0)$e.push(o.payload);else R(W,o.payload);return}if(o.type==="directory"){if(c)c={...c,directory:o.payload.directory};R(x,o.payload.directory);return}if(o.type==="session"){if(c)c={...c,session:o.payload.session};if(!o.payload.session)H=null;else if(H?.sessionId!==o.payload.session.id)H=vt(o.payload.session);R(O,o.payload.session);return}if(o.type==="session-lifecycle"){H=o.payload,R(m,o.payload);return}if(o.type==="connection"){if(c)c={...c,connection:o.payload.connection};R(L,o.payload.connection);return}if(o.type==="settings"){if(c)c={...c,settings:o.payload.settings};R(w,o.payload.settings);return}if(o.type==="item"){if(c)c={...c,item:o.payload.item};R(D,o.payload.item);return}if(o.type==="status-control-event"){R(Ee,o.payload);return}if(o.type==="popover-closed"){R(Se,o.payload);return}if(o.type==="action"){let i=(S)=>{if(!G)N({channel:u,v:_,type:"action-result",id:o.id,payload:S})},T=ie;if(!T){i({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>T(o.payload)).then(()=>i({ok:!0}),(S)=>{let k=(S instanceof Error?S.message:String(S)).trim();i({ok:!1,error:(k||"Action failed.").slice(0,pe)})});return}if(o.type==="file-open"){let i=o.payload;if(ce&&Jt(ce,i))return;ce=i,R(Te,o.payload);return}if(o.type==="file-saved"){R(fe,o.payload.version);return}if(o.type==="file-snapshot"){let i=(k)=>{if(!G)N({channel:u,v:_,type:"file-snapshot-result",id:o.id,payload:k})},T=(k)=>i({error:(k.trim()||"Could not read the edited file.").slice(0,pe)}),S=ae;if(!S){T("This extension does not edit files.");return}Promise.resolve().then(()=>S(o.payload.purpose)).then((k)=>{if(Je(k)>xe){T(`The file is over ${xe} ${"bytes"in k?"bytes":"characters"}.`);return}if(k.version.length>be){T(`The snapshot version is over ${be} characters.`);return}i({snapshot:"bytes"in k?{bytes:k.bytes,version:k.version}:{content:k.content,version:k.version}})},(k)=>T(k instanceof Error?k.message:String(k)));return}if(o.type==="resolve"){let i=(S)=>{N({channel:u,v:_,type:"resolve-result",id:o.id,payload:S})},T=se;if(!T){i({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>T(o.payload)).then((S)=>i({item:S?q(S):null}),(S)=>{let k=(S instanceof Error?S.message:String(S)).trim();i({error:(k||"Command failed.").slice(0,pe)})});return}let s=Y.get(o.id);if(!s)return;if(clearTimeout(s.timer),Y.delete(o.id),o.ok){s.resolve(o.payload);return}s.reject(new a(o.code,o.error))};r.addEventListener("message",Mt),N({channel:u,v:_,type:"hello"});let I=(t,o=E)=>{if(G||r.parent===r)return Promise.reject(new a("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((s,i)=>{let T=setTimeout(()=>{Y.delete(t.id),i(new a("HOST_TIMEOUT","Host did not answer in time."))},o);Y.set(t.id,{resolve:s,reject:i,timer:T}),N(t)})},b=(t)=>I(t).then(()=>{return}),g={channel:u,v:_},Ve=(t)=>{if(!G&&r.parent!==r)N(t)},Lt=()=>Ve({...g,type:"file-save"}),wt=(t)=>{if(!Ao(t)||!Qo(t))return;t.preventDefault(),Lt()},Pt=(t)=>{if(!Ao(t)||t.key!=="Escape"||c?.surface!=="popover"||!c.popover)return;t.preventDefault(),Xt(c.popover.id,"escape").catch(()=>{return})},me=()=>{let t=c?.surface==="popover"?c.popover:void 0;if(!t)return;let o=le||de;if(Ct===o)return;Ct=o,$t(t.id,o).catch(()=>{return})},Oe=()=>{if(c?.surface!=="popover"||le)return;le=!0,me()},Gt=(t)=>{if(c?.surface!=="popover"||t.relatedTarget!==null||!le)return;le=!1,me()},Dt=()=>{if(c?.surface!=="popover"||de)return;de=!0,me()},Ht=()=>{if(c?.surface!=="popover"||!de)return;de=!1,me()},P=(t,o=1024)=>{if(!t.trim()||t.length>o)throw new a("HOST_REJECTED",`Identity must contain 1 to ${o} characters.`)},Be=async(t)=>{if(t.kind!=="projects")P(t.projectId);let o=await I({...g,type:"workspace-read",id:d(l),payload:t});if(!o||!("kind"in o)||!("state"in o)||o.kind!==t.kind)throw new a("HOST_REJECTED","Host did not return workspace data.");return o},Ke=async(t,o)=>{if(t.kind!=="projects")P(t.projectId);let s=d(l);J.set(s,o);try{await b({...g,type:"workspace-subscribe",id:d(l),payload:{subscriptionId:s,query:t}})}catch(i){if(J.delete(s),!G)N({...g,type:"workspace-unsubscribe",id:d(l),payload:{subscriptionId:s}});throw i}return()=>{if(!J.delete(s)||G)return;N({...g,type:"workspace-unsubscribe",id:d(l),payload:{subscriptionId:s}})}},Vo=async(t,o)=>{if(t.kind==="session")P(t.sessionId);if(t.kind==="project")P(t.projectId);let s=d(l);Z.set(s,o);try{await b({...g,type:"shells-subscribe",id:d(l),payload:{subscriptionId:s,scope:t}})}catch(i){if(Z.delete(s),!G)N({...g,type:"shells-unsubscribe",id:d(l),payload:{subscriptionId:s}});throw i}return()=>{if(!Z.delete(s)||G)return;N({...g,type:"shells-unsubscribe",id:d(l),payload:{subscriptionId:s}})}},Ae=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>ze))throw new a("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!Q(t.value))throw new a("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>We)throw new a("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&c?.features?.deviceStorage!==!0)throw new a("UNSUPPORTED","This host does not support device storage.");let o=await I({...g,type:"storage",id:d(l),payload:t});if(!o||!("storage"in o)||o.op!==t.op)throw new a("HOST_REJECTED","Host did not return storage data.");return o},Xt=(t,o)=>c?.features?.popovers!==!0&&!(c?.surface==="popover"&&c.popover?.id===t)?Promise.reject(new a("UNSUPPORTED","This host does not support popovers.")):b({...g,type:"popover-close",id:d(l),payload:o?{id:t,reason:o}:{id:t}}),$t=(t,o)=>c?.features?.popovers!==!0&&!(c?.surface==="popover"&&c.popover?.id===t)?Promise.reject(new a("UNSUPPORTED","This host does not support popovers.")):b({...g,type:"popover-anchor",id:d(l),payload:{id:t,active:o}});return r.addEventListener("keydown",Pt,!0),r.addEventListener("pointerover",Oe),r.addEventListener("pointermove",Oe),r.addEventListener("pointerout",Gt),r.addEventListener("focus",Dt),r.addEventListener("blur",Ht),{onAction:(t)=>(ie=t,()=>{if(ie===t)ie=null}),listProjects:async()=>{let t=await Be({kind:"projects"});if(t.kind!=="projects")throw new a("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let o=await Be({kind:"worktrees",projectId:t});if(o.kind!=="worktrees")throw new a("HOST_REJECTED","Expected worktrees.");return o},listSessions:async(t)=>{let o=await Be({kind:"sessions",projectId:t});if(o.kind!=="sessions")throw new a("HOST_REJECTED","Expected sessions.");return o},onProjects:(t)=>Ke({kind:"projects"},(o)=>{if(o.kind==="projects")t(o)}),onWorktrees:(t,o)=>Ke({kind:"worktrees",projectId:t},(s)=>{if(s.kind==="worktrees")o(s)}),onSessions:(t,o)=>Ke({kind:"sessions",projectId:t},(s)=>{if(s.kind==="sessions")o(s)}),onRunningShells:(t,o)=>Vo(t,o),readShellOutput:async(t,o)=>{P(t,he);let s=o?.cursor;if(s!==void 0&&(!Number.isInteger(s)||s<0))throw new a("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let i=o?.tailBytes;if(i!==void 0&&(!Number.isInteger(i)||i<1||i>Re))throw new a("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Re}.`);let S=await I({...g,type:"shell-output",id:d(l),payload:{shellId:t,cursor:s,tailBytes:i}});if(!S||typeof S.output!=="string"||!Number.isFinite(S.cursor))throw new a("HOST_REJECTED","Host did not return shell output.");return S},stopShell:async(t)=>{if(P(t,he),(await I({...g,type:"shell-stop",id:d(l),payload:{shellId:t}}))?.stopped!==!0)throw new a("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{P(t),await b({...g,type:"open-session",id:d(l),payload:{sessionId:t}})},storage:{get:async(t,o)=>{let s=Le(o),i={op:"get",key:t};if(s)i.scope=s;let T=await Ae(i);return T.op==="get"&&T.found?T.value:void 0},set:async(t,o,s)=>{let i=Le(s),T={op:"set",key:t,value:o};if(i)T.scope=i;await Ae(T)},delete:async(t,o)=>{let s=Le(o),i={op:"delete",key:t};if(s)i.scope=s;await Ae(i)},keys:async(t)=>{let o=Le(t),s={op:"keys"};if(o)s.scope=o;let i=await Ae(s);if(i.op!=="keys")throw new a("HOST_REJECTED","Expected storage keys.");return i.keys}},onReady:(t)=>{if(p.add(t),c)t(c);return()=>{p.delete(t)}},onDirectory:(t)=>{if(x.add(t),c)t(c.directory);return()=>{x.delete(t)}},onSession:(t)=>{if(O.add(t),c)t(c.session);return()=>{O.delete(t)}},onSessionLifecycle:(t)=>{if(m.add(t),H)t(H);return()=>{m.delete(t)}},onConnection:(t)=>{if(L.add(t),c)t(c.connection);return()=>{L.delete(t)}},onSettings:(t)=>{if(w.add(t),c)t(c.settings);return()=>{w.delete(t)}},onItem:(t)=>{if(D.add(t),c)t(c.item);return()=>{D.delete(t)}},onStatusControl:(t)=>(Ee.add(t),()=>{Ee.delete(t)}),onPopoverClosed:(t)=>(Se.add(t),()=>{Se.delete(t)}),setStatusControls:(t)=>{if(c?.features?.statusControls!==!0)return Promise.reject(new a("UNSUPPORTED","This host does not support status controls."));if(!zt(t))return Promise.reject(new a("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return b({...g,type:"status-controls",id:d(l),payload:{controls:t}})},openPopover:(t)=>{if(c?.features?.popovers!==!0)return Promise.reject(new a("UNSUPPORTED","This host does not support popovers."));if(!Qe(t))return Promise.reject(new a("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return b({...g,type:"popover-open",id:d(l),payload:t})},closePopover:Xt,setPopoverAnchorActive:$t,onResolve:(t)=>(se=t,()=>{if(se===t)se=null}),toast:(t)=>{let o=t.message.trim();if(!o||o.length>ge)return Promise.reject(new a("HOST_REJECTED",`Toast message must contain 1 to ${ge} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>ke))return Promise.reject(new a("HOST_REJECTED",`Toast copy text must contain 1 to ${ke} characters.`));return b({channel:u,v:_,type:"toast",id:d(l),payload:{...t,message:o}})},openUrl:(t)=>b({channel:u,v:_,type:"open-url",id:d(l),payload:{url:t}}),openCommit:(t)=>ot(t)?b({channel:u,v:_,type:"open-commit",id:d(l),payload:{sha:t}}):Promise.reject(new a("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>b({channel:u,v:_,type:"open-surface",id:d(l),payload:{surfaceId:t}}),writeClipboard:(t)=>b({channel:u,v:_,type:"clipboard-write",id:d(l),payload:{text:t}}),compose:(t)=>b({channel:u,v:_,type:"compose",id:d(l),payload:t}),attach:(t)=>b({channel:u,v:_,type:"attach",id:d(l),payload:q(t)}),startSession:async(t)=>{if(t.projectId!==void 0)P(t.projectId);let o=t.worktree;if(o&&o!==!0)if(o.kind==="existing")P(o.directory);else{if(o.name!==void 0)P(o.name,200);if(o.baseBranch!==void 0)P(o.baseBranch,200)}let s=await I({channel:u,v:_,type:"start-session",id:d(l),payload:it(t)},e.requestTimeoutMs??180000);if(!et(s))throw new a("HOST_REJECTED","Host did not return a session.");return s},prompt:(t)=>I({channel:u,v:_,type:"prompt",id:d(l),payload:at(t)}).then((o)=>{if(!tt(o))throw new a("HOST_REJECTED","Host did not return a prompt result.");return o}),sessionLink:(t)=>b({channel:u,v:_,type:"session-link",id:d(l),payload:q(t)}),close:()=>b({channel:u,v:_,type:"close",id:d(l)}),oauthStart:()=>b({channel:u,v:_,type:"oauth-start",id:d(l)}),oauthDisconnect:()=>b({channel:u,v:_,type:"oauth-disconnect",id:d(l)}),request:(t)=>(ve(t.path)?I({channel:u,v:_,type:"request",id:d(l),payload:t}):ho()).then((o)=>{if(!Ne(o))throw new a("HOST_REJECTED","Host request result was empty.");return o}),serviceRequest:(t)=>(ve(t.path)?I({channel:u,v:_,type:"service-request",id:d(l),payload:t}):ho()).then((o)=>{if(!Ne(o))throw new a("HOST_REJECTED","Host service request result was empty.");return o}),serviceStatus:()=>I({channel:u,v:_,type:"service-status",id:d(l)}).then((t)=>{if(!dt(t))throw new a("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(ee(t)?I({channel:u,v:_,type:"file-read",id:d(l),payload:{path:t}}):Me()).then((o)=>{if(!pt(o))throw new a("HOST_REJECTED","Host did not return file content.");return o}),writeFile:(t,o)=>{if(!ee(t))return Me();if(o.length>ye)return Promise.reject(new a("FILE_TOO_LARGE",`Content is over ${ye} characters.`));return I({channel:u,v:_,type:"file-write",id:d(l),payload:{path:t,content:o}}).then((s)=>{if(!ut(s))throw new a("HOST_REJECTED","Host did not confirm the write.");return s})},listDir:(t)=>(ee(t)?I({channel:u,v:_,type:"file-list",id:d(l),payload:{path:t}}):Me()).then((o)=>{if(!_t(o))throw new a("HOST_REJECTED","Host did not return directory entries.");return o}),stat:(t)=>(ee(t)?I({channel:u,v:_,type:"file-stat",id:d(l),payload:{path:t}}):Me()).then((o)=>{if(!Et(o))throw new a("HOST_REJECTED","Host did not return file status.");return o}),generate:(t)=>{let o=t.prompt.trim(),s=t.system?.trim();if(o.length===0||o.length>Ue)return Promise.reject(new a("HOST_REJECTED",`Prompt must be 1 to ${Ue} characters.`));if(s!==void 0&&(s.length===0||s.length>Ce))return Promise.reject(new a("HOST_REJECTED",`System prompt must be 1 to ${Ce} characters.`));let i=t.maxOutputTokens===void 0?void 0:Math.min(nt,Math.max(1,Math.floor(t.maxOutputTokens)));if(i!==void 0&&!Number.isFinite(i))return Promise.reject(new a("HOST_REJECTED","maxOutputTokens must be a number."));let T={prompt:o};if(s!==void 0)T.system=s;if(i!==void 0)T.maxOutputTokens=i;return I({channel:u,v:_,type:"generate",id:d(l),payload:T},e.requestTimeoutMs??st).then((S)=>{if(!St(S))throw new a("HOST_REJECTED","Host did not return generated text.");return S})},onLateGenerateResult:(t)=>{W.add(t);for(let o of $e.splice(0))R([t],o);return Nt(),()=>{W.delete(t)}},setBadge:(t)=>b({channel:u,v:_,type:"badge",id:d(l),payload:{count:ct(t)}}),setHeight:(t)=>b({channel:u,v:_,type:"resize",id:d(l),payload:{height:lt(t)}}),onFileOpen:(t)=>{if(Te.add(t),!Fe)Fe=!0,r.addEventListener("keydown",wt,!0);if(ce)t(ce);return()=>{Te.delete(t)}},onFileSnapshot:(t)=>(ae=t,()=>{if(ae===t)ae=null}),onFileSaved:(t)=>(fe.add(t),()=>{fe.delete(t)}),reportFileChange:(t)=>Ve({...g,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:Lt,reportFileUnsupported:()=>Ve({...g,type:"file-unsupported"}),dispose:()=>{for(let t of J.keys())N({...g,type:"workspace-unsubscribe",id:d(l),payload:{subscriptionId:t}});J.clear();for(let t of Z.keys())N({...g,type:"shells-unsubscribe",id:d(l),payload:{subscriptionId:t}});if(Z.clear(),G=!0,se=null,ie=null,ae=null,Te.clear(),fe.clear(),Fe)r.removeEventListener("keydown",wt,!0);r.removeEventListener("message",Mt),r.removeEventListener("keydown",Pt,!0),r.removeEventListener("pointerover",Oe),r.removeEventListener("pointermove",Oe),r.removeEventListener("pointerout",Gt),r.removeEventListener("focus",Dt),r.removeEventListener("blur",Ht);for(let t of Y.values())clearTimeout(t.timer),t.reject(new a("HOST_UNAVAILABLE","Host client was disposed."));Y.clear(),p.clear(),x.clear(),O.clear(),m.clear(),L.clear(),w.clear(),D.clear(),Ee.clear(),Se.clear(),W.clear(),$e.length=0}}};var Ro=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var Vr=new Set(Ro);var xo=["none","agent","user"];var Kr=new Set(xo);var qo=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],er=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],bo=(e,r)=>{r.style.colorScheme=e.mode;for(let[n,E]of qo)r.style.setProperty(n,e.tokens[E]);for(let[n,E,p]of er){let x=e.tokens[p]??"";r.style.setProperty(n,x),r.style.setProperty(E,x)}r.style.setProperty("font-family",e.tokens.font),r.style.setProperty("font-size","0.875rem"),r.style.setProperty("line-height","1.45"),r.style.setProperty("color",e.tokens.foreground)},mt=(e,r)=>{if(bo(e.theme,r),r.dataset)r.dataset.ocSurface=e.surface,r.dataset.ocTheme=e.theme.mode};var tr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},f=(e,r)=>`var(--${e}, var(--oc-${tr[e]}, ${r}))`,F=f("surface-background","transparent"),Pe=f("surface-elevated","transparent"),te=f("surface-elevated-foreground","inherit"),M=f("surface-foreground","inherit"),A=f("surface-muted-foreground","gray"),or=f("surface-muted","transparent"),K=f("interactive-border","currentColor"),U=f("interactive-hover","transparent"),j=f("interactive-active","transparent"),Ot=f("interactive-selection","transparent"),At=f("interactive-selection-foreground","inherit"),X=f("primary","currentColor"),ht=f("primary-text","inherit"),Rt=f("error-text","inherit"),rr=f("font-sans","inherit"),xt=f("font-mono","monospace"),yo=f("radius","9px"),bt=`calc(${yo} - 2px)`,go=`calc(${yo} - 4px)`,h=(e,r,n="transparent")=>`color-mix(in srgb, ${e} ${r}%, ${n})`,ko=`background-image: linear-gradient(${U}, ${U});`,gt=(e,r="0.5px")=>`box-shadow: inset 0 0 0 ${r} ${e}, var(--oc-sdk-field-lift);`,kt="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",Io="box-shadow: var(--oc-sdk-lit);",It=`inset 0 0.5px 0 0 ${h(M,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,nr=`
:root {
  --oc-sdk-edge: ${h(M,16)};
  --oc-sdk-field-bg: ${Pe};
  --oc-sdk-raised-bg: ${F};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${h(M,14)};
  --oc-sdk-field-bg: ${h(F,50,Pe)};
  --oc-sdk-raised-bg: ${Pe};
  --oc-sdk-field-lift: ${It};
  --oc-sdk-raised-lift: ${It};
  --oc-sdk-lit: ${It};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,we=(e)=>{let r=f(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${f(`${e}-text`,"inherit")}; }`},sr=`
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
`,Uo=`${nr}
.oc-sdk { color: ${M}; font-family: ${rr}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${ko} }
.oc-sdk-mono { font-family: ${xt}; }
.oc-sdk-muted { color: ${A}; }
${we("success")}${we("warning")}${we("error")}${we("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${X}; --oc-sdk-tone-text: ${ht}; }

.oc-sdk-btn { border-radius: ${bt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${go}; }
.oc-sdk-btn[data-variant="default"] { color: ${ht}; background: ${h(X,10,F)}; border-color: ${h(X,12)}; ${Io} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${h(X,16,F)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${h(X,22,F)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${or}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${U}, ${U}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${te}; ${kt} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${U}, ${U}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${j}, ${j}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${U}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${j}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${f("status-error","red")}; color: ${Rt}; background: ${h("var(--oc-sdk-tone)",7,F)}; border-color: ${h("var(--oc-sdk-tone)",12)}; ${Io} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${h("var(--oc-sdk-tone)",9,F)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${h("var(--oc-sdk-tone)",11,F)}; box-shadow: none; }

.oc-sdk-field-note { color: ${A}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Rt}; }
.oc-sdk-input { border-radius: ${bt}; background: var(--oc-sdk-field-bg); color: ${te}; ${gt("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${A}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${U}, ${U}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${gt(h(M,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${gt(f("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${xt}; }

.oc-sdk-search-icon { color: ${A}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${X}; }
.oc-sdk-search-clear { border-radius: ${go}; color: ${A}; }
.oc-sdk-search-clear:hover { background: ${U}; color: ${M}; }

.oc-sdk-trigger { border-radius: ${bt}; background: var(--oc-sdk-raised-bg); color: ${te}; ${kt} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${U}, ${U}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${A}; }
.oc-sdk-trigger-chevron { color: ${A}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${te}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Pe}; background-clip: padding-box; color: ${te}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${U}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Ot}; color: ${At}; }
.oc-sdk-option-check { color: ${M}; }
.oc-sdk-option[data-destructive="true"] { color: ${Rt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${h(f("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${A}; }
.oc-sdk-popup-empty { color: ${A}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${K}; border-radius: 4px; color: ${M}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${h(M,60,K)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${K}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${F}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${X}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${ko} }
.oc-sdk-check-desc { color: ${A}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${h(M,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${A}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${M}; }
.oc-sdk-tab[aria-selected="true"] { color: ${At}; background: ${Ot}; border-color: ${K}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${te}; background: var(--oc-sdk-raised-bg); ${kt} }
.oc-sdk-tab-count { color: ${A}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${h(M,6)}; color: ${A}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${h("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${U}; }
.oc-sdk-row[aria-selected="true"] { background: ${Ot}; color: ${At}; }
.oc-sdk-row-lead { font-family: ${xt}; color: ${A}; }
.oc-sdk-row-sub { color: ${A}; }
.oc-sdk-row-meta { color: ${A}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${A}; }

.oc-sdk-empty-body { color: ${A}; }

.oc-sdk-spinner { color: ${A}; }
.oc-sdk-spinner-ring { border-color: ${K}; border-top-color: ${X}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${h("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${A}; }

.oc-sdk-separator { color: ${A}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${h(K,40)}; }

.oc-sdk-progress-label { color: ${A}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${h(M,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${X}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${f("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${f("success-text","inherit")}; }

.oc-sdk-text a { color: ${ht}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${h(K,60)}; }
`,y=`
${je}
${sr}
${Uo}`;var re={util:"#4d9fff",mem:"#e8c33a",temp:"#b07fe8",power:"#3ddc84",cpu:"#ff8c42",systemRam:"#89929c"};var Co=1000;var dr=["util","mem","temp","power","cpu"],vo="seriesVisibilityV1",pr={util:!0,mem:!0,temp:!0,power:!0,cpu:!0},Ut=(e)=>{let r={...pr};if(!e||typeof e!=="object"||Array.isArray(e))return r;for(let n of dr){let E=e[n];if(typeof E==="boolean")r[n]=E}return r};var No="sourceConfigV1";var ur=[{id:"evo-x2",label:"evo-x2.home.lan",host:"evo-x2.home.lan"},{id:"proxmox",label:"proxmox.home.lan",host:"proxmox.home.lan"}],_r=/^(?=.{1,253}$)(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)(?:\.(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?))*\.?$/,Er=/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,63}$/;function Mo(e){let r=e.trim().replace(/\.$/,"").toLowerCase();if(!_r.test(r))throw Error("Enter a hostname or IPv4 address only (no http://, port, or path).");return r}function Sr(e){if(!e||typeof e!=="object"||Array.isArray(e))return null;let r=e;if(typeof r.id!=="string"||!Er.test(r.id))return null;if(typeof r.label!=="string"||r.label.trim().length<1||r.label.length>80)return null;if(typeof r.host!=="string")return null;try{return{id:r.id,label:r.label.trim(),host:Mo(r.host)}}catch{return null}}function Lo(e){if(!e||typeof e!=="object"||Array.isArray(e))return{selectedSourceId:"local",remoteSources:ur.map((O)=>({...O}))};let r=e,n=[],E=new Set,p=new Set;if(Array.isArray(r.remoteSources))for(let O of r.remoteSources.slice(0,50)){let m=Sr(O);if(!m||E.has(m.id)||p.has(m.host))continue;n.push(m),E.add(m.id),p.add(m.host)}return{selectedSourceId:typeof r.selectedSourceId==="string"&&(r.selectedSourceId==="local"||E.has(r.selectedSourceId))?r.selectedSourceId:"local",remoteSources:n}}function wo(e){if(e.selectedSourceId==="local")return{mode:"local"};let r=e.remoteSources.find(({id:n})=>n===e.selectedSourceId);if(!r)return{mode:"local"};return{mode:"remote",label:r.label,host:Mo(r.host)}}var z=ft(),Do=document.querySelector("#root");if(!Do)throw Error("Missing #root");var Ho=document.createElement("style");Ho.textContent=`
*{box-sizing:border-box}
[data-oc-theme="dark"]{color-scheme:dark}
[data-oc-theme="light"]{color-scheme:light}
html,body{margin:0;background:transparent;color:var(--oc-fg);font:11px/1.35 var(--oc-font)}
#root{display:flex;flex-direction:column;gap:5px;padding:4px 8px}
.summary{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--oc-muted);font-variant-numeric:tabular-nums}
svg{display:block;width:100%;height:48px;overflow:visible}
`;document.head.append(Ho);var ne=document.createElement("div");ne.className="summary";ne.textContent="Waiting for nvstats-service…";var B=document.createElementNS("http://www.w3.org/2000/svg","svg");B.setAttribute("viewBox","0 0 300 48");B.setAttribute("preserveAspectRatio","none");B.setAttribute("role","img");B.setAttribute("aria-label","Recent GPU, GTT, temperature, power and CPU activity");Do.append(ne,B);var Tr=[["util",re.util],["mem",re.mem],["temp",re.temp],["power",re.power],["cpu",re.cpu]];function fr(e){B.replaceChildren();for(let[r,n]of Tr){let E=r;if(!Xo[E])continue;let p=e[E];if(p.length<2)continue;let x=p.flatMap((m,L)=>{if(m===null)return[];let w=2+(21-p.length+L)/20*296,D=46-Math.max(0,Math.min(100,m))/100*42;return[`${w.toFixed(1)},${D.toFixed(1)}`]});if(x.length<2)continue;let O=document.createElementNS("http://www.w3.org/2000/svg","polyline");O.setAttribute("points",x.join(" ")),O.setAttribute("fill","none"),O.setAttribute("stroke",n),O.setAttribute("stroke-width","1.5"),O.setAttribute("stroke-linecap","round"),O.setAttribute("stroke-linejoin","round"),B.append(O)}}var Po=(e)=>e===null?"—":`${Math.round(e)}%`,Go=async()=>{try{let e=await z.serviceRequest({method:"GET",path:"/stats"});if(e.status!==200)throw Error("service unavailable");let r=JSON.parse(e.body);if(!r.sourceAvailable){ne.textContent=`${r.sourceLabel||"nvstats-service"} unavailable${r.sourceError?` · ${r.sourceError}`:""}`,B.replaceChildren();return}let{gpu:n,sys:E}=r.sample,p=n.mem_used===null?"—":(n.mem_used/1024).toFixed(1),x=n.mem_total===null?"—":(n.mem_total/1024).toFixed(1),O=(E.ram_used/1073741824).toFixed(1),m=(E.ram_total/1073741824).toFixed(1),L=n.temp===null?"—":`${Math.round(n.temp)}°C`,w=n.power_w===null?"—":`${Math.round(n.power_w)}W`,D=r.sourceLabel&&r.sourceLabel!=="Local D-Bus"?`${r.sourceLabel} · `:"";ne.textContent=`${D}GPU ${Po(n.util)} · GTT ${p}/${x} GiB · RAM ${O}/${m} GiB · ${L} · ${w} · CPU ${Po(E.cpu)}`,fr(r.history)}catch{ne.textContent="nvstats-service unavailable",B.replaceChildren()}},_e,Xo=Ut(void 0),$o=()=>{if(_e)return;Go(),_e=setInterval(()=>void Go(),Co*2)},Fo=()=>{if(_e)clearInterval(_e);_e=void 0};z.onReady((e)=>{mt(e,document.documentElement),(async()=>{try{Xo=Ut(await z.storage.get(vo))}catch(r){console.warn("Could not load onvtop graph visibility",r)}try{let r=Lo(await z.storage.get(No));if((await z.serviceRequest({method:"POST",path:"/source",body:JSON.stringify(wo(r))})).status!==200)throw Error("Could not apply telemetry source")}catch(r){console.warn("Could not load onvtop source configuration",r)}z.setHeight(68),$o()})()});document.addEventListener("visibilitychange",()=>document.visibilityState==="visible"?$o():Fo());window.addEventListener("pagehide",()=>{Fo(),z.dispose()});})();
