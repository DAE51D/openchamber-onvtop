(()=>{var p="openchamber.sdk",u=1;var je=`
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
`;function Vt(e){let r=e.documentElement;if(r.hasAttribute("data-oc-scrollbar-activity"))return;r.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(E)=>{let _=E.target===e?r:E.target;if(!(_ instanceof Element))return;if(!_.hasAttribute("data-oc-scrolling"))_.setAttribute("data-oc-scrolling","");let b=n.get(_);if(b!==void 0)clearTimeout(b);n.set(_,setTimeout(()=>{n.delete(_),_.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var Xo=`(${Vt.toString()})(document);`;var ze=128,We=65536;var he=128;var Re=65536;var jt=/^[a-z][a-z0-9-]{0,39}$/;var $t=(e)=>Object(e)===e&&!Array.isArray(e),Ye=(e,r)=>Object.keys(e).every((n)=>r.includes(n)),Bt=(e)=>String(e)===e&&e.length>=1&&e.length<=60,Kt=(e)=>String(e)===e&&e.length>=1&&e.length<=80,zt=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let r=new Set;for(let n of e){if(!$t(n)||!jt.test(n.id)||!Bt(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(r.has(n.id))return!1;if(r.add(n.id),n.kind==="button"){if(!Ye(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!Ye(n,["kind","id","label","value","options","disabled"]))return!1;if(!Kt(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let E=new Set;for(let _ of n.options){if(!$t(_)||!Ye(_,["value","label"])||!Kt(_.value)||!Bt(_.label)||E.has(_.value))return!1;E.add(_.value)}if(!E.has(n.value))return!1}return!0};var Wt=["{id}","{segment}","{segments+}"];var mr=new Set(Wt);var Yt=["turn-finished","turn-failed","permission-asked","question-asked"];var hr=new Set(Yt);var xe=20000000,be=256;var Je=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,Jt=(e,r)=>{if(e.path!==r.path||e.readOnly!==r.readOnly)return!1;if(e.encoding==="text"||r.encoding==="text")return e.encoding==="text"&&r.encoding==="text"&&e.content===r.content;if(e.bytes.byteLength!==r.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==r.bytes[n])return!1;return!0};var Qt=/^[A-Za-z0-9_-]{1,80}$/;var Zt=["left","right","top","bottom"];var qt=(e,r=0,n={remaining:16000})=>{if(--n.remaining<0||r>=32)return!1;if(e===null)return!0;let E=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let _ of E)if(!qt(_,r+1,n))return!1;return!0},Qe=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((r)=>/^(0|[1-9]\d*)$/.test(r)&&Number(r)<e.length)&&e.every(Qe);if(Object(e)===e){let r=Object.getPrototypeOf(e);return(r===null||r===Object.prototype)&&Object.values(e).every(Qe)}return String(e)===e||Number.isFinite(e)},Ze=(e)=>{try{if(String(e.id)!==e.id||!Qt.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Zt.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!qt(e.data)||!Qe(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var to=["file","directory","other","missing"],et=(e)=>Boolean(e&&"sessionId"in e),tt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var oo=/^[0-9a-f]{7,64}$/i,ot=(e)=>oo.test(e),ge=500,ke=32000,ro=16000,no=128,so=200,io=2000,ao=16000,co=80,lo=200,po=16000;var uo=2000;var rt=20000,Ie=1024,ye=2000000;var Ue=64000,Ce=8000,nt=4000;var st=960000;var _o=999,Eo=1e4,de=500,So=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],To=["stopped","starting","ready","failed"],Vo=new Set(So),fo=(e)=>Vo.has(e),Oo=(e)=>e&&fo(e)?e:"HOST_REJECTED",Q=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(Q);if(Object(e)===e)return Object.values(e).every(Q);return!1},mo=(e)=>Q(e)&&JSON.stringify(e).length<=po,eo=(e)=>e?.trim().slice(0,lo)??"",Z=(e)=>{let r=e.id.trim().slice(0,no),n=e.title.trim().slice(0,so),E=e.url.trim().slice(0,io),_=e.text?.trim().slice(0,ao),b=e.author?.trim().slice(0,co),g=e.kind==="pull"?"pull":"issue",k={providerId:e.providerId.trim(),id:r,title:n||r,url:E,kind:g};if(_)k.text=_;if(b)k.author=b;if(g==="pull"){let L=eo(e.branches?.head),w=eo(e.branches?.base);if(L&&w)k.branches={head:L,base:w}}if(mo(e.data))k.data=e.data;return k},it=(e)=>{let r=Z(e);if(e.projectId)r.projectId=e.projectId;if(e.navigation)r.navigation=e.navigation;if(e.worktree)r.worktree=e.worktree;return r},at=(e)=>{let r={text:e.text.trim().slice(0,ro)};if(e.send)r.send=!0;return r},ct=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(_o,Math.max(0,Math.round(e)))},dt=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Eo,Math.max(0,Math.ceil(e)))};var q=(e)=>e.length>0&&e.length<=Ie&&!e.includes("\x00")&&!e.includes("\\");var ve=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>uo)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},$o=new Set(To),lt=(e)=>Boolean(e&&"status"in e&&$o.has(String(e.status))&&!("body"in e)),Ne=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),pt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),ut=(e)=>Boolean(e&&"written"in e&&e.written===!0),_t=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),Bo=new Set(to),Et=(e)=>Boolean(e&&"kind"in e&&"size"in e&&Bo.has(String(e.kind))&&Number.isFinite(e.size)),St=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Ko=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),jo=(e)=>Object(e)===e?e:null,qe=(e)=>String(e)===e&&e.length>0,zo=(e)=>{if(!qe(e.id))return null;if(e.ok===!0){let r={channel:p,v:u,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)r.payload=e.payload;return r}if(e.ok===!1&&qe(e.error))return{channel:p,v:u,type:"result",id:e.id,ok:!1,error:e.error,code:Oo(qe(e.code)?e.code:void 0)};return null},Tt=(e)=>{let r=jo(e);if(!r||r.channel!==p||r.v!==u)return null;if(r.type==="result")return zo(r);if(!Ko.has(String(r.type))||Object(r.payload)!==r.payload)return null;return r};var Ao=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Wo=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class a extends Error{code;constructor(e,r){super(r);this.name="HostRequestError",this.code=e}}var ho=()=>Promise.reject(new a("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Me=()=>Promise.reject(new a("BAD_PATH",`File path must be 1 to ${Ie} characters without NUL or backslash.`)),Le=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new a("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},l=(e)=>(e.value+=1,`oc-${e.value}`),ft=(e={})=>{let r=e.target??("window"in globalThis?window:null);if(!r)throw new a("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((t)=>t===r.parent),E=e.requestTimeoutMs??rt,_=new Set,b=new Set,g=new Set,k=new Set,L=new Set,w=new Set,B=new Set,Ee=new Set,Se=new Set,z=new Set,Fe=[],re=null,ne=null,Te=new Set,fe=new Set,se=null,ie=null,Ve=!1,W=new Map,Y=new Map,J=new Map,G=!1,d={value:0},c=null,D=null,ae=!1,ce=!1,Ct=null,vt=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},N=(t)=>{r.parent.postMessage(t,"*")},Nt=()=>{if(G||r.parent===r||z.size===0||c?.features?.lateGenerateResults!==!0)return;N({channel:p,v:u,type:"generate-late-listen"})},A=(t,o)=>{for(let s of t)try{s(o)}catch(i){console.error(i)}},Mt=(t)=>{if(!(t instanceof MessageEvent))return;if(!n(t.source))return;let o=Tt(t.data);if(!o)return;if(o.type==="workspace"){let i=Y.get(o.payload.subscriptionId);if(i)A([i],o.payload.snapshot);return}if(o.type==="shells"){let i=J.get(o.payload.subscriptionId);if(i)A([i],o.payload.snapshot);return}if(o.type==="ready"){if(c=o.payload,D=vt(o.payload.session),A(_,o.payload),A(b,o.payload.directory),A(g,o.payload.session),D)A(k,D);A(L,o.payload.connection),A(w,o.payload.settings),A(B,o.payload.item),Nt();return}if(o.type==="generate-late"){if(z.size===0)Fe.push(o.payload);else A(z,o.payload);return}if(o.type==="directory"){if(c)c={...c,directory:o.payload.directory};A(b,o.payload.directory);return}if(o.type==="session"){if(c)c={...c,session:o.payload.session};if(!o.payload.session)D=null;else if(D?.sessionId!==o.payload.session.id)D=vt(o.payload.session);A(g,o.payload.session);return}if(o.type==="session-lifecycle"){D=o.payload,A(k,o.payload);return}if(o.type==="connection"){if(c)c={...c,connection:o.payload.connection};A(L,o.payload.connection);return}if(o.type==="settings"){if(c)c={...c,settings:o.payload.settings};A(w,o.payload.settings);return}if(o.type==="item"){if(c)c={...c,item:o.payload.item};A(B,o.payload.item);return}if(o.type==="status-control-event"){A(Ee,o.payload);return}if(o.type==="popover-closed"){A(Se,o.payload);return}if(o.type==="action"){let i=(S)=>{if(!G)N({channel:p,v:u,type:"action-result",id:o.id,payload:S})},T=ne;if(!T){i({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>T(o.payload)).then(()=>i({ok:!0}),(S)=>{let x=(S instanceof Error?S.message:String(S)).trim();i({ok:!1,error:(x||"Action failed.").slice(0,de)})});return}if(o.type==="file-open"){let i=o.payload;if(ie&&Jt(ie,i))return;ie=i,A(Te,o.payload);return}if(o.type==="file-saved"){A(fe,o.payload.version);return}if(o.type==="file-snapshot"){let i=(x)=>{if(!G)N({channel:p,v:u,type:"file-snapshot-result",id:o.id,payload:x})},T=(x)=>i({error:(x.trim()||"Could not read the edited file.").slice(0,de)}),S=se;if(!S){T("This extension does not edit files.");return}Promise.resolve().then(()=>S(o.payload.purpose)).then((x)=>{if(Je(x)>xe){T(`The file is over ${xe} ${"bytes"in x?"bytes":"characters"}.`);return}if(x.version.length>be){T(`The snapshot version is over ${be} characters.`);return}i({snapshot:"bytes"in x?{bytes:x.bytes,version:x.version}:{content:x.content,version:x.version}})},(x)=>T(x instanceof Error?x.message:String(x)));return}if(o.type==="resolve"){let i=(S)=>{N({channel:p,v:u,type:"resolve-result",id:o.id,payload:S})},T=re;if(!T){i({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>T(o.payload)).then((S)=>i({item:S?Z(S):null}),(S)=>{let x=(S instanceof Error?S.message:String(S)).trim();i({error:(x||"Command failed.").slice(0,de)})});return}let s=W.get(o.id);if(!s)return;if(clearTimeout(s.timer),W.delete(o.id),o.ok){s.resolve(o.payload);return}s.reject(new a(o.code,o.error))};r.addEventListener("message",Mt),N({channel:p,v:u,type:"hello"});let I=(t,o=E)=>{if(G||r.parent===r)return Promise.reject(new a("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((s,i)=>{let T=setTimeout(()=>{W.delete(t.id),i(new a("HOST_TIMEOUT","Host did not answer in time."))},o);W.set(t.id,{resolve:s,reject:i,timer:T}),N(t)})},h=(t)=>I(t).then(()=>{return}),R={channel:p,v:u},$e=(t)=>{if(!G&&r.parent!==r)N(t)},Lt=()=>$e({...R,type:"file-save"}),wt=(t)=>{if(!Ao(t)||!Wo(t))return;t.preventDefault(),Lt()},Pt=(t)=>{if(!Ao(t)||t.key!=="Escape"||c?.surface!=="popover"||!c.popover)return;t.preventDefault(),Xt(c.popover.id,"escape").catch(()=>{return})},Oe=()=>{let t=c?.surface==="popover"?c.popover:void 0;if(!t)return;let o=ae||ce;if(Ct===o)return;Ct=o,Ft(t.id,o).catch(()=>{return})},me=()=>{if(c?.surface!=="popover"||ae)return;ae=!0,Oe()},Gt=(t)=>{if(c?.surface!=="popover"||t.relatedTarget!==null||!ae)return;ae=!1,Oe()},Dt=()=>{if(c?.surface!=="popover"||ce)return;ce=!0,Oe()},Ht=()=>{if(c?.surface!=="popover"||!ce)return;ce=!1,Oe()},P=(t,o=1024)=>{if(!t.trim()||t.length>o)throw new a("HOST_REJECTED",`Identity must contain 1 to ${o} characters.`)},Be=async(t)=>{if(t.kind!=="projects")P(t.projectId);let o=await I({...R,type:"workspace-read",id:l(d),payload:t});if(!o||!("kind"in o)||!("state"in o)||o.kind!==t.kind)throw new a("HOST_REJECTED","Host did not return workspace data.");return o},Ke=async(t,o)=>{if(t.kind!=="projects")P(t.projectId);let s=l(d);Y.set(s,o);try{await h({...R,type:"workspace-subscribe",id:l(d),payload:{subscriptionId:s,query:t}})}catch(i){if(Y.delete(s),!G)N({...R,type:"workspace-unsubscribe",id:l(d),payload:{subscriptionId:s}});throw i}return()=>{if(!Y.delete(s)||G)return;N({...R,type:"workspace-unsubscribe",id:l(d),payload:{subscriptionId:s}})}},Ho=async(t,o)=>{if(t.kind==="session")P(t.sessionId);if(t.kind==="project")P(t.projectId);let s=l(d);J.set(s,o);try{await h({...R,type:"shells-subscribe",id:l(d),payload:{subscriptionId:s,scope:t}})}catch(i){if(J.delete(s),!G)N({...R,type:"shells-unsubscribe",id:l(d),payload:{subscriptionId:s}});throw i}return()=>{if(!J.delete(s)||G)return;N({...R,type:"shells-unsubscribe",id:l(d),payload:{subscriptionId:s}})}},Ae=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>ze))throw new a("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!Q(t.value))throw new a("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>We)throw new a("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&c?.features?.deviceStorage!==!0)throw new a("UNSUPPORTED","This host does not support device storage.");let o=await I({...R,type:"storage",id:l(d),payload:t});if(!o||!("storage"in o)||o.op!==t.op)throw new a("HOST_REJECTED","Host did not return storage data.");return o},Xt=(t,o)=>c?.features?.popovers!==!0&&!(c?.surface==="popover"&&c.popover?.id===t)?Promise.reject(new a("UNSUPPORTED","This host does not support popovers.")):h({...R,type:"popover-close",id:l(d),payload:o?{id:t,reason:o}:{id:t}}),Ft=(t,o)=>c?.features?.popovers!==!0&&!(c?.surface==="popover"&&c.popover?.id===t)?Promise.reject(new a("UNSUPPORTED","This host does not support popovers.")):h({...R,type:"popover-anchor",id:l(d),payload:{id:t,active:o}});return r.addEventListener("keydown",Pt,!0),r.addEventListener("pointerover",me),r.addEventListener("pointermove",me),r.addEventListener("pointerout",Gt),r.addEventListener("focus",Dt),r.addEventListener("blur",Ht),{onAction:(t)=>(ne=t,()=>{if(ne===t)ne=null}),listProjects:async()=>{let t=await Be({kind:"projects"});if(t.kind!=="projects")throw new a("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let o=await Be({kind:"worktrees",projectId:t});if(o.kind!=="worktrees")throw new a("HOST_REJECTED","Expected worktrees.");return o},listSessions:async(t)=>{let o=await Be({kind:"sessions",projectId:t});if(o.kind!=="sessions")throw new a("HOST_REJECTED","Expected sessions.");return o},onProjects:(t)=>Ke({kind:"projects"},(o)=>{if(o.kind==="projects")t(o)}),onWorktrees:(t,o)=>Ke({kind:"worktrees",projectId:t},(s)=>{if(s.kind==="worktrees")o(s)}),onSessions:(t,o)=>Ke({kind:"sessions",projectId:t},(s)=>{if(s.kind==="sessions")o(s)}),onRunningShells:(t,o)=>Ho(t,o),readShellOutput:async(t,o)=>{P(t,he);let s=o?.cursor;if(s!==void 0&&(!Number.isInteger(s)||s<0))throw new a("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let i=o?.tailBytes;if(i!==void 0&&(!Number.isInteger(i)||i<1||i>Re))throw new a("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Re}.`);let S=await I({...R,type:"shell-output",id:l(d),payload:{shellId:t,cursor:s,tailBytes:i}});if(!S||typeof S.output!=="string"||!Number.isFinite(S.cursor))throw new a("HOST_REJECTED","Host did not return shell output.");return S},stopShell:async(t)=>{if(P(t,he),(await I({...R,type:"shell-stop",id:l(d),payload:{shellId:t}}))?.stopped!==!0)throw new a("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{P(t),await h({...R,type:"open-session",id:l(d),payload:{sessionId:t}})},storage:{get:async(t,o)=>{let s=Le(o),i={op:"get",key:t};if(s)i.scope=s;let T=await Ae(i);return T.op==="get"&&T.found?T.value:void 0},set:async(t,o,s)=>{let i=Le(s),T={op:"set",key:t,value:o};if(i)T.scope=i;await Ae(T)},delete:async(t,o)=>{let s=Le(o),i={op:"delete",key:t};if(s)i.scope=s;await Ae(i)},keys:async(t)=>{let o=Le(t),s={op:"keys"};if(o)s.scope=o;let i=await Ae(s);if(i.op!=="keys")throw new a("HOST_REJECTED","Expected storage keys.");return i.keys}},onReady:(t)=>{if(_.add(t),c)t(c);return()=>{_.delete(t)}},onDirectory:(t)=>{if(b.add(t),c)t(c.directory);return()=>{b.delete(t)}},onSession:(t)=>{if(g.add(t),c)t(c.session);return()=>{g.delete(t)}},onSessionLifecycle:(t)=>{if(k.add(t),D)t(D);return()=>{k.delete(t)}},onConnection:(t)=>{if(L.add(t),c)t(c.connection);return()=>{L.delete(t)}},onSettings:(t)=>{if(w.add(t),c)t(c.settings);return()=>{w.delete(t)}},onItem:(t)=>{if(B.add(t),c)t(c.item);return()=>{B.delete(t)}},onStatusControl:(t)=>(Ee.add(t),()=>{Ee.delete(t)}),onPopoverClosed:(t)=>(Se.add(t),()=>{Se.delete(t)}),setStatusControls:(t)=>{if(c?.features?.statusControls!==!0)return Promise.reject(new a("UNSUPPORTED","This host does not support status controls."));if(!zt(t))return Promise.reject(new a("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return h({...R,type:"status-controls",id:l(d),payload:{controls:t}})},openPopover:(t)=>{if(c?.features?.popovers!==!0)return Promise.reject(new a("UNSUPPORTED","This host does not support popovers."));if(!Ze(t))return Promise.reject(new a("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return h({...R,type:"popover-open",id:l(d),payload:t})},closePopover:Xt,setPopoverAnchorActive:Ft,onResolve:(t)=>(re=t,()=>{if(re===t)re=null}),toast:(t)=>{let o=t.message.trim();if(!o||o.length>ge)return Promise.reject(new a("HOST_REJECTED",`Toast message must contain 1 to ${ge} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>ke))return Promise.reject(new a("HOST_REJECTED",`Toast copy text must contain 1 to ${ke} characters.`));return h({channel:p,v:u,type:"toast",id:l(d),payload:{...t,message:o}})},openUrl:(t)=>h({channel:p,v:u,type:"open-url",id:l(d),payload:{url:t}}),openCommit:(t)=>ot(t)?h({channel:p,v:u,type:"open-commit",id:l(d),payload:{sha:t}}):Promise.reject(new a("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>h({channel:p,v:u,type:"open-surface",id:l(d),payload:{surfaceId:t}}),writeClipboard:(t)=>h({channel:p,v:u,type:"clipboard-write",id:l(d),payload:{text:t}}),compose:(t)=>h({channel:p,v:u,type:"compose",id:l(d),payload:t}),attach:(t)=>h({channel:p,v:u,type:"attach",id:l(d),payload:Z(t)}),startSession:async(t)=>{if(t.projectId!==void 0)P(t.projectId);let o=t.worktree;if(o&&o!==!0)if(o.kind==="existing")P(o.directory);else{if(o.name!==void 0)P(o.name,200);if(o.baseBranch!==void 0)P(o.baseBranch,200)}let s=await I({channel:p,v:u,type:"start-session",id:l(d),payload:it(t)},e.requestTimeoutMs??180000);if(!et(s))throw new a("HOST_REJECTED","Host did not return a session.");return s},prompt:(t)=>I({channel:p,v:u,type:"prompt",id:l(d),payload:at(t)}).then((o)=>{if(!tt(o))throw new a("HOST_REJECTED","Host did not return a prompt result.");return o}),sessionLink:(t)=>h({channel:p,v:u,type:"session-link",id:l(d),payload:Z(t)}),close:()=>h({channel:p,v:u,type:"close",id:l(d)}),oauthStart:()=>h({channel:p,v:u,type:"oauth-start",id:l(d)}),oauthDisconnect:()=>h({channel:p,v:u,type:"oauth-disconnect",id:l(d)}),request:(t)=>(ve(t.path)?I({channel:p,v:u,type:"request",id:l(d),payload:t}):ho()).then((o)=>{if(!Ne(o))throw new a("HOST_REJECTED","Host request result was empty.");return o}),serviceRequest:(t)=>(ve(t.path)?I({channel:p,v:u,type:"service-request",id:l(d),payload:t}):ho()).then((o)=>{if(!Ne(o))throw new a("HOST_REJECTED","Host service request result was empty.");return o}),serviceStatus:()=>I({channel:p,v:u,type:"service-status",id:l(d)}).then((t)=>{if(!lt(t))throw new a("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(q(t)?I({channel:p,v:u,type:"file-read",id:l(d),payload:{path:t}}):Me()).then((o)=>{if(!pt(o))throw new a("HOST_REJECTED","Host did not return file content.");return o}),writeFile:(t,o)=>{if(!q(t))return Me();if(o.length>ye)return Promise.reject(new a("FILE_TOO_LARGE",`Content is over ${ye} characters.`));return I({channel:p,v:u,type:"file-write",id:l(d),payload:{path:t,content:o}}).then((s)=>{if(!ut(s))throw new a("HOST_REJECTED","Host did not confirm the write.");return s})},listDir:(t)=>(q(t)?I({channel:p,v:u,type:"file-list",id:l(d),payload:{path:t}}):Me()).then((o)=>{if(!_t(o))throw new a("HOST_REJECTED","Host did not return directory entries.");return o}),stat:(t)=>(q(t)?I({channel:p,v:u,type:"file-stat",id:l(d),payload:{path:t}}):Me()).then((o)=>{if(!Et(o))throw new a("HOST_REJECTED","Host did not return file status.");return o}),generate:(t)=>{let o=t.prompt.trim(),s=t.system?.trim();if(o.length===0||o.length>Ue)return Promise.reject(new a("HOST_REJECTED",`Prompt must be 1 to ${Ue} characters.`));if(s!==void 0&&(s.length===0||s.length>Ce))return Promise.reject(new a("HOST_REJECTED",`System prompt must be 1 to ${Ce} characters.`));let i=t.maxOutputTokens===void 0?void 0:Math.min(nt,Math.max(1,Math.floor(t.maxOutputTokens)));if(i!==void 0&&!Number.isFinite(i))return Promise.reject(new a("HOST_REJECTED","maxOutputTokens must be a number."));let T={prompt:o};if(s!==void 0)T.system=s;if(i!==void 0)T.maxOutputTokens=i;return I({channel:p,v:u,type:"generate",id:l(d),payload:T},e.requestTimeoutMs??st).then((S)=>{if(!St(S))throw new a("HOST_REJECTED","Host did not return generated text.");return S})},onLateGenerateResult:(t)=>{z.add(t);for(let o of Fe.splice(0))A([t],o);return Nt(),()=>{z.delete(t)}},setBadge:(t)=>h({channel:p,v:u,type:"badge",id:l(d),payload:{count:ct(t)}}),setHeight:(t)=>h({channel:p,v:u,type:"resize",id:l(d),payload:{height:dt(t)}}),onFileOpen:(t)=>{if(Te.add(t),!Ve)Ve=!0,r.addEventListener("keydown",wt,!0);if(ie)t(ie);return()=>{Te.delete(t)}},onFileSnapshot:(t)=>(se=t,()=>{if(se===t)se=null}),onFileSaved:(t)=>(fe.add(t),()=>{fe.delete(t)}),reportFileChange:(t)=>$e({...R,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:Lt,reportFileUnsupported:()=>$e({...R,type:"file-unsupported"}),dispose:()=>{for(let t of Y.keys())N({...R,type:"workspace-unsubscribe",id:l(d),payload:{subscriptionId:t}});Y.clear();for(let t of J.keys())N({...R,type:"shells-unsubscribe",id:l(d),payload:{subscriptionId:t}});if(J.clear(),G=!0,re=null,ne=null,se=null,Te.clear(),fe.clear(),Ve)r.removeEventListener("keydown",wt,!0);r.removeEventListener("message",Mt),r.removeEventListener("keydown",Pt,!0),r.removeEventListener("pointerover",me),r.removeEventListener("pointermove",me),r.removeEventListener("pointerout",Gt),r.removeEventListener("focus",Dt),r.removeEventListener("blur",Ht);for(let t of W.values())clearTimeout(t.timer),t.reject(new a("HOST_UNAVAILABLE","Host client was disposed."));W.clear(),_.clear(),b.clear(),g.clear(),k.clear(),L.clear(),w.clear(),B.clear(),Ee.clear(),Se.clear(),z.clear(),Fe.length=0}}};var Ro=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var wr=new Set(Ro);var xo=["none","agent","user"];var Gr=new Set(xo);var Yo=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Jo=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],bo=(e,r)=>{r.style.colorScheme=e.mode;for(let[n,E]of Yo)r.style.setProperty(n,e.tokens[E]);for(let[n,E,_]of Jo){let b=e.tokens[_]??"";r.style.setProperty(n,b),r.style.setProperty(E,b)}r.style.setProperty("font-family",e.tokens.font),r.style.setProperty("font-size","0.875rem"),r.style.setProperty("line-height","1.45"),r.style.setProperty("color",e.tokens.foreground)},Ot=(e,r)=>{if(bo(e.theme,r),r.dataset)r.dataset.ocSurface=e.surface,r.dataset.ocTheme=e.theme.mode};var Qo={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},f=(e,r)=>`var(--${e}, var(--oc-${Qo[e]}, ${r}))`,X=f("surface-background","transparent"),Pe=f("surface-elevated","transparent"),ee=f("surface-elevated-foreground","inherit"),M=f("surface-foreground","inherit"),O=f("surface-muted-foreground","gray"),Zo=f("surface-muted","transparent"),K=f("interactive-border","currentColor"),U=f("interactive-hover","transparent"),j=f("interactive-active","transparent"),mt=f("interactive-selection","transparent"),At=f("interactive-selection-foreground","inherit"),H=f("primary","currentColor"),ht=f("primary-text","inherit"),Rt=f("error-text","inherit"),qo=f("font-sans","inherit"),xt=f("font-mono","monospace"),yo=f("radius","9px"),bt=`calc(${yo} - 2px)`,go=`calc(${yo} - 4px)`,m=(e,r,n="transparent")=>`color-mix(in srgb, ${e} ${r}%, ${n})`,ko=`background-image: linear-gradient(${U}, ${U});`,gt=(e,r="0.5px")=>`box-shadow: inset 0 0 0 ${r} ${e}, var(--oc-sdk-field-lift);`,kt="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",Io="box-shadow: var(--oc-sdk-lit);",It=`inset 0 0.5px 0 0 ${m(M,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,er=`
:root {
  --oc-sdk-edge: ${m(M,16)};
  --oc-sdk-field-bg: ${Pe};
  --oc-sdk-raised-bg: ${X};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${m(M,14)};
  --oc-sdk-field-bg: ${m(X,50,Pe)};
  --oc-sdk-raised-bg: ${Pe};
  --oc-sdk-field-lift: ${It};
  --oc-sdk-raised-lift: ${It};
  --oc-sdk-lit: ${It};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,we=(e)=>{let r=f(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${f(`${e}-text`,"inherit")}; }`},tr=`
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
`,Uo=`${er}
.oc-sdk { color: ${M}; font-family: ${qo}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${ko} }
.oc-sdk-mono { font-family: ${xt}; }
.oc-sdk-muted { color: ${O}; }
${we("success")}${we("warning")}${we("error")}${we("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${H}; --oc-sdk-tone-text: ${ht}; }

.oc-sdk-btn { border-radius: ${bt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${go}; }
.oc-sdk-btn[data-variant="default"] { color: ${ht}; background: ${m(H,10,X)}; border-color: ${m(H,12)}; ${Io} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${m(H,16,X)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${m(H,22,X)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Zo}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${U}, ${U}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${ee}; ${kt} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${U}, ${U}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${j}, ${j}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${U}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${j}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${f("status-error","red")}; color: ${Rt}; background: ${m("var(--oc-sdk-tone)",7,X)}; border-color: ${m("var(--oc-sdk-tone)",12)}; ${Io} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${m("var(--oc-sdk-tone)",9,X)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${m("var(--oc-sdk-tone)",11,X)}; box-shadow: none; }

.oc-sdk-field-note { color: ${O}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Rt}; }
.oc-sdk-input { border-radius: ${bt}; background: var(--oc-sdk-field-bg); color: ${ee}; ${gt("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${O}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${U}, ${U}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${gt(m(M,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${gt(f("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${xt}; }

.oc-sdk-search-icon { color: ${O}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${H}; }
.oc-sdk-search-clear { border-radius: ${go}; color: ${O}; }
.oc-sdk-search-clear:hover { background: ${U}; color: ${M}; }

.oc-sdk-trigger { border-radius: ${bt}; background: var(--oc-sdk-raised-bg); color: ${ee}; ${kt} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${U}, ${U}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${O}; }
.oc-sdk-trigger-chevron { color: ${O}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${ee}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Pe}; background-clip: padding-box; color: ${ee}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${U}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${mt}; color: ${At}; }
.oc-sdk-option-check { color: ${M}; }
.oc-sdk-option[data-destructive="true"] { color: ${Rt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${m(f("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${O}; }
.oc-sdk-popup-empty { color: ${O}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${K}; border-radius: 4px; color: ${M}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${m(M,60,K)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${K}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${X}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${H}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${ko} }
.oc-sdk-check-desc { color: ${O}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${m(M,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${O}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${M}; }
.oc-sdk-tab[aria-selected="true"] { color: ${At}; background: ${mt}; border-color: ${K}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${ee}; background: var(--oc-sdk-raised-bg); ${kt} }
.oc-sdk-tab-count { color: ${O}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${m(M,6)}; color: ${O}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${m("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${U}; }
.oc-sdk-row[aria-selected="true"] { background: ${mt}; color: ${At}; }
.oc-sdk-row-lead { font-family: ${xt}; color: ${O}; }
.oc-sdk-row-sub { color: ${O}; }
.oc-sdk-row-meta { color: ${O}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${O}; }

.oc-sdk-empty-body { color: ${O}; }

.oc-sdk-spinner { color: ${O}; }
.oc-sdk-spinner-ring { border-color: ${K}; border-top-color: ${H}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${m("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${O}; }

.oc-sdk-separator { color: ${O}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${m(K,40)}; }

.oc-sdk-progress-label { color: ${O}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${m(M,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${H}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${f("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${f("success-text","inherit")}; }

.oc-sdk-text a { color: ${ht}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${m(K,60)}; }
`,y=`
${je}
${tr}
${Uo}`;var oe={util:"#4d9fff",mem:"#e8c33a",temp:"#b07fe8",power:"#3ddc84",cpu:"#ff8c42",systemRam:"#89929c"};var Co=1000;var ir=["util","mem","temp","power","cpu"],vo="seriesVisibilityV1",ar={util:!0,mem:!0,temp:!0,power:!0,cpu:!0},Ut=(e)=>{let r={...ar};if(!e||typeof e!=="object"||Array.isArray(e))return r;for(let n of ir){let E=e[n];if(typeof E==="boolean")r[n]=E}return r};var pe=ft(),Lo=document.querySelector("#root");if(!Lo)throw Error("Missing #root");var wo=document.createElement("style");wo.textContent=`
*{box-sizing:border-box}
[data-oc-theme="dark"]{color-scheme:dark}
[data-oc-theme="light"]{color-scheme:light}
html,body{margin:0;background:transparent;color:var(--oc-fg);font:11px/1.35 var(--oc-font)}
#root{display:flex;flex-direction:column;gap:5px;padding:4px 8px}
.summary{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--oc-muted);font-variant-numeric:tabular-nums}
svg{display:block;width:100%;height:48px;overflow:visible}
`;document.head.append(wo);var _e=document.createElement("div");_e.className="summary";_e.textContent="Waiting for knvtop…";var V=document.createElementNS("http://www.w3.org/2000/svg","svg");V.setAttribute("viewBox","0 0 300 48");V.setAttribute("preserveAspectRatio","none");V.setAttribute("role","img");V.setAttribute("aria-label","Recent GPU, GTT, temperature, power and CPU activity");Lo.append(_e,V);var cr=[["util",oe.util],["mem",oe.mem],["temp",oe.temp],["power",oe.power],["cpu",oe.cpu]];function dr(e){V.replaceChildren();for(let[r,n]of cr){let E=r;if(!Po[E])continue;let _=e[E];if(_.length<2)continue;let b=_.flatMap((k,L)=>{if(k===null)return[];let w=2+(21-_.length+L)/20*296,B=46-Math.max(0,Math.min(100,k))/100*42;return[`${w.toFixed(1)},${B.toFixed(1)}`]});if(b.length<2)continue;let g=document.createElementNS("http://www.w3.org/2000/svg","polyline");g.setAttribute("points",b.join(" ")),g.setAttribute("fill","none"),g.setAttribute("stroke",n),g.setAttribute("stroke-width","1.5"),g.setAttribute("stroke-linecap","round"),g.setAttribute("stroke-linejoin","round"),V.append(g)}}var No=(e)=>e===null?"—":`${Math.round(e)}%`,Mo=async()=>{try{let e=await pe.serviceRequest({method:"GET",path:"/stats"});if(e.status!==200)throw Error("service unavailable");let r=JSON.parse(e.body),{gpu:n,sys:E}=r.sample,_=n.mem_used===null?"—":(n.mem_used/1024).toFixed(1),b=n.mem_total===null?"—":(n.mem_total/1024).toFixed(1),g=(E.ram_used/1073741824).toFixed(1),k=(E.ram_total/1073741824).toFixed(1),L=n.temp===null?"—":`${Math.round(n.temp)}°C`,w=n.power_w===null?"—":`${Math.round(n.power_w)}W`;_e.textContent=`GPU ${No(n.util)} · GTT ${_}/${b} GiB · RAM ${g}/${k} GiB · ${L} · ${w} · CPU ${No(E.cpu)}`,dr(r.history)}catch{_e.textContent="knvtop unavailable",V.replaceChildren()}},ue,Po=Ut(void 0),Go=()=>{if(ue)return;Mo(),ue=setInterval(()=>void Mo(),Co*2)},Do=()=>{if(ue)clearInterval(ue);ue=void 0};pe.onReady((e)=>{Ot(e,document.documentElement),(async()=>{try{Po=Ut(await pe.storage.get(vo))}catch(r){console.warn("Could not load onvtop graph visibility",r)}pe.setHeight(68),Go()})()});document.addEventListener("visibilitychange",()=>document.visibilityState==="visible"?Go():Do());window.addEventListener("pagehide",()=>{Do(),pe.dispose()});})();
