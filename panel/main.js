(()=>{function tr(e,t,n,s,i){let a=e.length,u=t.length===a?t:e.map((g,b)=>n-(a-1-b)*1000),S=i.width-2*i.pad,x=[],_=null;for(let g=0;g<a;g++){let b=e[g];if(b===null)continue;let Ie=(n-u[g]+s)/1000,ae=i.width-i.pad-Ie/i.windowSec*S,ce=Math.min(Math.max(b,0),i.max);x.push({x:ae,y:i.height-i.pad-ce/i.max*(i.height-2*i.pad)}),_=b}let f=x.findIndex((g)=>g.x>=0),L=f<0?Math.max(0,x.length-1):Math.max(0,f-1);if(x.splice(0,L),x.length&&_!==null){let g=i.width-i.pad,b=x[x.length-1];if(b.x<g)x.push({x:g,y:b.y})}return x}var Pt=(e)=>e.map((t)=>`${t.x.toFixed(1)},${t.y.toFixed(1)}`).join(" "),or=(e,t)=>`${e[0].x.toFixed(1)},${t} ${Pt(e)} ${e[e.length-1].x.toFixed(1)},${t}`;var T="openchamber.sdk",h=1;var Gt=`
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
`;function rr(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(s)=>{let i=s.target===e?t:s.target;if(!(i instanceof Element))return;if(!i.hasAttribute("data-oc-scrolling"))i.setAttribute("data-oc-scrolling","");let a=n.get(i);if(a!==void 0)clearTimeout(a);n.set(i,setTimeout(()=>{n.delete(i),i.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var Sn=`(${rr.toString()})(document);`;var Dt=128,$t=65536;var qe=128;var Ze=65536;var ar=/^[a-z][a-z0-9-]{0,39}$/;var nr=(e)=>Object(e)===e&&!Array.isArray(e),Ht=(e,t)=>Object.keys(e).every((n)=>t.includes(n)),sr=(e)=>String(e)===e&&e.length>=1&&e.length<=60,ir=(e)=>String(e)===e&&e.length>=1&&e.length<=80,cr=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let n of e){if(!nr(n)||!ar.test(n.id)||!sr(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(t.has(n.id))return!1;if(t.add(n.id),n.kind==="button"){if(!Ht(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!Ht(n,["kind","id","label","value","options","disabled"]))return!1;if(!ir(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let s=new Set;for(let i of n.options){if(!nr(i)||!Ht(i,["value","label"])||!ir(i.value)||!sr(i.label)||s.has(i.value))return!1;s.add(i.value)}if(!s.has(n.value))return!1}return!0};var lr=["{id}","{segment}","{segments+}"];var _s=new Set(lr);var dr=["turn-finished","turn-failed","permission-asked","question-asked"];var Ss=new Set(dr);var Qe=20000000,et=256;var Ft=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,pr=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==t.bytes[n])return!1;return!0};var ur=/^[A-Za-z0-9_-]{1,80}$/;var Er=["left","right","top","bottom"];var mr=(e,t=0,n={remaining:16000})=>{if(--n.remaining<0||t>=32)return!1;if(e===null)return!0;let s=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let i of s)if(!mr(i,t+1,n))return!1;return!0},Vt=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((t)=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(Vt);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(Vt)}return String(e)===e||Number.isFinite(e)},Xt=(e)=>{try{if(String(e.id)!==e.id||!ur.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Er.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!mr(e.data)||!Vt(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var fr=["file","directory","other","missing"],Kt=(e)=>Boolean(e&&"sessionId"in e),zt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var Sr=/^[0-9a-f]{7,64}$/i,jt=(e)=>Sr.test(e),tt=500,ot=32000,Tr=16000,hr=128,gr=200,xr=2000,br=16000,Ar=80,Or=200,Rr=16000;var yr=2000;var Wt=20000,rt=1024,nt=2000000;var st=64000,it=8000,Yt=4000;var Jt=960000;var kr=999,vr=1e4,Me=500,Cr=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Ir=["stopped","starting","ready","failed"],hn=new Set(Cr),Ur=(e)=>hn.has(e),Nr=(e)=>e&&Ur(e)?e:"HOST_REJECTED",be=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(be);if(Object(e)===e)return Object.values(e).every(be);return!1},wr=(e)=>be(e)&&JSON.stringify(e).length<=Rr,_r=(e)=>e?.trim().slice(0,Or)??"",Ae=(e)=>{let t=e.id.trim().slice(0,hr),n=e.title.trim().slice(0,gr),s=e.url.trim().slice(0,xr),i=e.text?.trim().slice(0,br),a=e.author?.trim().slice(0,Ar),u=e.kind==="pull"?"pull":"issue",S={providerId:e.providerId.trim(),id:t,title:n||t,url:s,kind:u};if(i)S.text=i;if(a)S.author=a;if(u==="pull"){let x=_r(e.branches?.head),_=_r(e.branches?.base);if(x&&_)S.branches={head:x,base:_}}if(wr(e.data))S.data=e.data;return S},qt=(e)=>{let t=Ae(e);if(e.projectId)t.projectId=e.projectId;if(e.navigation)t.navigation=e.navigation;if(e.worktree)t.worktree=e.worktree;return t},Zt=(e)=>{let t={text:e.text.trim().slice(0,Tr)};if(e.send)t.send=!0;return t},Qt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(kr,Math.max(0,Math.round(e)))},eo=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(vr,Math.max(0,Math.ceil(e)))};var Oe=(e)=>e.length>0&&e.length<=rt&&!e.includes("\x00")&&!e.includes("\\");var at=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>yr)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},gn=new Set(Ir),to=(e)=>Boolean(e&&"status"in e&&gn.has(String(e.status))&&!("body"in e)),ct=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),oo=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),ro=(e)=>Boolean(e&&"written"in e&&e.written===!0),no=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),xn=new Set(fr),so=(e)=>Boolean(e&&"kind"in e&&"size"in e&&xn.has(String(e.kind))&&Number.isFinite(e.size)),io=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),bn=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),An=(e)=>Object(e)===e?e:null,Bt=(e)=>String(e)===e&&e.length>0,On=(e)=>{if(!Bt(e.id))return null;if(e.ok===!0){let t={channel:T,v:h,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)t.payload=e.payload;return t}if(e.ok===!1&&Bt(e.error))return{channel:T,v:h,type:"result",id:e.id,ok:!1,error:e.error,code:Nr(Bt(e.code)?e.code:void 0)};return null},ao=(e)=>{let t=An(e);if(!t||t.channel!==T||t.v!==h)return null;if(t.type==="result")return On(t);if(!bn.has(String(t.type))||Object(t.payload)!==t.payload)return null;return t};var Lr=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Rn=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class d extends Error{code;constructor(e,t){super(t);this.name="HostRequestError",this.code=e}}var Mr=()=>Promise.reject(new d("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),lt=()=>Promise.reject(new d("BAD_PATH",`File path must be 1 to ${rt} characters without NUL or backslash.`)),dt=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new d("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},m=(e)=>(e.value+=1,`oc-${e.value}`),co=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new d("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((o)=>o===t.parent),s=e.requestTimeoutMs??Wt,i=new Set,a=new Set,u=new Set,S=new Set,x=new Set,_=new Set,f=new Set,L=new Set,g=new Set,b=new Set,Ie=[],ae=null,ce=null,ze=new Set,je=new Set,Ue=null,Ne=null,Nt=!1,he=new Map,ge=new Map,xe=new Map,Y=!1,E={value:0},p=null,q=null,we=!1,Le=!1,Xo=null,Bo=(o)=>{if(!o)return null;return{sessionId:o.id,phase:o.busy?"started":"completed"}},X=(o)=>{t.parent.postMessage(o,"*")},Ko=()=>{if(Y||t.parent===t||b.size===0||p?.features?.lateGenerateResults!==!0)return;X({channel:T,v:h,type:"generate-late-listen"})},C=(o,r)=>{for(let c of o)try{c(r)}catch(l){console.error(l)}},zo=(o)=>{if(!(o instanceof MessageEvent))return;if(!n(o.source))return;let r=ao(o.data);if(!r)return;if(r.type==="workspace"){let l=ge.get(r.payload.subscriptionId);if(l)C([l],r.payload.snapshot);return}if(r.type==="shells"){let l=xe.get(r.payload.subscriptionId);if(l)C([l],r.payload.snapshot);return}if(r.type==="ready"){if(p=r.payload,q=Bo(r.payload.session),C(i,r.payload),C(a,r.payload.directory),C(u,r.payload.session),q)C(S,q);C(x,r.payload.connection),C(_,r.payload.settings),C(f,r.payload.item),Ko();return}if(r.type==="generate-late"){if(b.size===0)Ie.push(r.payload);else C(b,r.payload);return}if(r.type==="directory"){if(p)p={...p,directory:r.payload.directory};C(a,r.payload.directory);return}if(r.type==="session"){if(p)p={...p,session:r.payload.session};if(!r.payload.session)q=null;else if(q?.sessionId!==r.payload.session.id)q=Bo(r.payload.session);C(u,r.payload.session);return}if(r.type==="session-lifecycle"){q=r.payload,C(S,r.payload);return}if(r.type==="connection"){if(p)p={...p,connection:r.payload.connection};C(x,r.payload.connection);return}if(r.type==="settings"){if(p)p={...p,settings:r.payload.settings};C(_,r.payload.settings);return}if(r.type==="item"){if(p)p={...p,item:r.payload.item};C(f,r.payload.item);return}if(r.type==="status-control-event"){C(L,r.payload);return}if(r.type==="popover-closed"){C(g,r.payload);return}if(r.type==="action"){let l=(O)=>{if(!Y)X({channel:T,v:h,type:"action-result",id:r.id,payload:O})},R=ce;if(!R){l({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>R(r.payload)).then(()=>l({ok:!0}),(O)=>{let N=(O instanceof Error?O.message:String(O)).trim();l({ok:!1,error:(N||"Action failed.").slice(0,Me)})});return}if(r.type==="file-open"){let l=r.payload;if(Ne&&pr(Ne,l))return;Ne=l,C(ze,r.payload);return}if(r.type==="file-saved"){C(je,r.payload.version);return}if(r.type==="file-snapshot"){let l=(N)=>{if(!Y)X({channel:T,v:h,type:"file-snapshot-result",id:r.id,payload:N})},R=(N)=>l({error:(N.trim()||"Could not read the edited file.").slice(0,Me)}),O=Ue;if(!O){R("This extension does not edit files.");return}Promise.resolve().then(()=>O(r.payload.purpose)).then((N)=>{if(Ft(N)>Qe){R(`The file is over ${Qe} ${"bytes"in N?"bytes":"characters"}.`);return}if(N.version.length>et){R(`The snapshot version is over ${et} characters.`);return}l({snapshot:"bytes"in N?{bytes:N.bytes,version:N.version}:{content:N.content,version:N.version}})},(N)=>R(N instanceof Error?N.message:String(N)));return}if(r.type==="resolve"){let l=(O)=>{X({channel:T,v:h,type:"resolve-result",id:r.id,payload:O})},R=ae;if(!R){l({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>R(r.payload)).then((O)=>l({item:O?Ae(O):null}),(O)=>{let N=(O instanceof Error?O.message:String(O)).trim();l({error:(N||"Command failed.").slice(0,Me)})});return}let c=he.get(r.id);if(!c)return;if(clearTimeout(c.timer),he.delete(r.id),r.ok){c.resolve(r.payload);return}c.reject(new d(r.code,r.error))};t.addEventListener("message",zo),X({channel:T,v:h,type:"hello"});let P=(o,r=s)=>{if(Y||t.parent===t)return Promise.reject(new d("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((c,l)=>{let R=setTimeout(()=>{he.delete(o.id),l(new d("HOST_TIMEOUT","Host did not answer in time."))},r);he.set(o.id,{resolve:c,reject:l,timer:R}),X(o)})},I=(o)=>P(o).then(()=>{return}),U={channel:T,v:h},wt=(o)=>{if(!Y&&t.parent!==t)X(o)},jo=()=>wt({...U,type:"file-save"}),Wo=(o)=>{if(!Lr(o)||!Rn(o))return;o.preventDefault(),jo()},Yo=(o)=>{if(!Lr(o)||o.key!=="Escape"||p?.surface!=="popover"||!p.popover)return;o.preventDefault(),Qo(p.popover.id,"escape").catch(()=>{return})},We=()=>{let o=p?.surface==="popover"?p.popover:void 0;if(!o)return;let r=we||Le;if(Xo===r)return;Xo=r,er(o.id,r).catch(()=>{return})},Ye=()=>{if(p?.surface!=="popover"||we)return;we=!0,We()},Jo=(o)=>{if(p?.surface!=="popover"||o.relatedTarget!==null||!we)return;we=!1,We()},qo=()=>{if(p?.surface!=="popover"||Le)return;Le=!0,We()},Zo=()=>{if(p?.surface!=="popover"||!Le)return;Le=!1,We()},j=(o,r=1024)=>{if(!o.trim()||o.length>r)throw new d("HOST_REJECTED",`Identity must contain 1 to ${r} characters.`)},Lt=async(o)=>{if(o.kind!=="projects")j(o.projectId);let r=await P({...U,type:"workspace-read",id:m(E),payload:o});if(!r||!("kind"in r)||!("state"in r)||r.kind!==o.kind)throw new d("HOST_REJECTED","Host did not return workspace data.");return r},Mt=async(o,r)=>{if(o.kind!=="projects")j(o.projectId);let c=m(E);ge.set(c,r);try{await I({...U,type:"workspace-subscribe",id:m(E),payload:{subscriptionId:c,query:o}})}catch(l){if(ge.delete(c),!Y)X({...U,type:"workspace-unsubscribe",id:m(E),payload:{subscriptionId:c}});throw l}return()=>{if(!ge.delete(c)||Y)return;X({...U,type:"workspace-unsubscribe",id:m(E),payload:{subscriptionId:c}})}},fn=async(o,r)=>{if(o.kind==="session")j(o.sessionId);if(o.kind==="project")j(o.projectId);let c=m(E);xe.set(c,r);try{await I({...U,type:"shells-subscribe",id:m(E),payload:{subscriptionId:c,scope:o}})}catch(l){if(xe.delete(c),!Y)X({...U,type:"shells-unsubscribe",id:m(E),payload:{subscriptionId:c}});throw l}return()=>{if(!xe.delete(c)||Y)return;X({...U,type:"shells-unsubscribe",id:m(E),payload:{subscriptionId:c}})}},Je=async(o)=>{if("key"in o&&(o.key.length===0||o.key.length>Dt))throw new d("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(o.op==="set"&&!be(o.value))throw new d("HOST_REJECTED","Storage values must be JSON.");if(o.op==="set"&&new TextEncoder().encode(JSON.stringify(o.value)).length>$t)throw new d("HOST_REJECTED","Storage value exceeds 64 KiB.");if(o.scope==="device"&&p?.features?.deviceStorage!==!0)throw new d("UNSUPPORTED","This host does not support device storage.");let r=await P({...U,type:"storage",id:m(E),payload:o});if(!r||!("storage"in r)||r.op!==o.op)throw new d("HOST_REJECTED","Host did not return storage data.");return r},Qo=(o,r)=>p?.features?.popovers!==!0&&!(p?.surface==="popover"&&p.popover?.id===o)?Promise.reject(new d("UNSUPPORTED","This host does not support popovers.")):I({...U,type:"popover-close",id:m(E),payload:r?{id:o,reason:r}:{id:o}}),er=(o,r)=>p?.features?.popovers!==!0&&!(p?.surface==="popover"&&p.popover?.id===o)?Promise.reject(new d("UNSUPPORTED","This host does not support popovers.")):I({...U,type:"popover-anchor",id:m(E),payload:{id:o,active:r}});return t.addEventListener("keydown",Yo,!0),t.addEventListener("pointerover",Ye),t.addEventListener("pointermove",Ye),t.addEventListener("pointerout",Jo),t.addEventListener("focus",qo),t.addEventListener("blur",Zo),{onAction:(o)=>(ce=o,()=>{if(ce===o)ce=null}),listProjects:async()=>{let o=await Lt({kind:"projects"});if(o.kind!=="projects")throw new d("HOST_REJECTED","Expected projects.");return o},listWorktrees:async(o)=>{let r=await Lt({kind:"worktrees",projectId:o});if(r.kind!=="worktrees")throw new d("HOST_REJECTED","Expected worktrees.");return r},listSessions:async(o)=>{let r=await Lt({kind:"sessions",projectId:o});if(r.kind!=="sessions")throw new d("HOST_REJECTED","Expected sessions.");return r},onProjects:(o)=>Mt({kind:"projects"},(r)=>{if(r.kind==="projects")o(r)}),onWorktrees:(o,r)=>Mt({kind:"worktrees",projectId:o},(c)=>{if(c.kind==="worktrees")r(c)}),onSessions:(o,r)=>Mt({kind:"sessions",projectId:o},(c)=>{if(c.kind==="sessions")r(c)}),onRunningShells:(o,r)=>fn(o,r),readShellOutput:async(o,r)=>{j(o,qe);let c=r?.cursor;if(c!==void 0&&(!Number.isInteger(c)||c<0))throw new d("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let l=r?.tailBytes;if(l!==void 0&&(!Number.isInteger(l)||l<1||l>Ze))throw new d("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Ze}.`);let O=await P({...U,type:"shell-output",id:m(E),payload:{shellId:o,cursor:c,tailBytes:l}});if(!O||typeof O.output!=="string"||!Number.isFinite(O.cursor))throw new d("HOST_REJECTED","Host did not return shell output.");return O},stopShell:async(o)=>{if(j(o,qe),(await P({...U,type:"shell-stop",id:m(E),payload:{shellId:o}}))?.stopped!==!0)throw new d("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(o)=>{j(o),await I({...U,type:"open-session",id:m(E),payload:{sessionId:o}})},storage:{get:async(o,r)=>{let c=dt(r),l={op:"get",key:o};if(c)l.scope=c;let R=await Je(l);return R.op==="get"&&R.found?R.value:void 0},set:async(o,r,c)=>{let l=dt(c),R={op:"set",key:o,value:r};if(l)R.scope=l;await Je(R)},delete:async(o,r)=>{let c=dt(r),l={op:"delete",key:o};if(c)l.scope=c;await Je(l)},keys:async(o)=>{let r=dt(o),c={op:"keys"};if(r)c.scope=r;let l=await Je(c);if(l.op!=="keys")throw new d("HOST_REJECTED","Expected storage keys.");return l.keys}},onReady:(o)=>{if(i.add(o),p)o(p);return()=>{i.delete(o)}},onDirectory:(o)=>{if(a.add(o),p)o(p.directory);return()=>{a.delete(o)}},onSession:(o)=>{if(u.add(o),p)o(p.session);return()=>{u.delete(o)}},onSessionLifecycle:(o)=>{if(S.add(o),q)o(q);return()=>{S.delete(o)}},onConnection:(o)=>{if(x.add(o),p)o(p.connection);return()=>{x.delete(o)}},onSettings:(o)=>{if(_.add(o),p)o(p.settings);return()=>{_.delete(o)}},onItem:(o)=>{if(f.add(o),p)o(p.item);return()=>{f.delete(o)}},onStatusControl:(o)=>(L.add(o),()=>{L.delete(o)}),onPopoverClosed:(o)=>(g.add(o),()=>{g.delete(o)}),setStatusControls:(o)=>{if(p?.features?.statusControls!==!0)return Promise.reject(new d("UNSUPPORTED","This host does not support status controls."));if(!cr(o))return Promise.reject(new d("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return I({...U,type:"status-controls",id:m(E),payload:{controls:o}})},openPopover:(o)=>{if(p?.features?.popovers!==!0)return Promise.reject(new d("UNSUPPORTED","This host does not support popovers."));if(!Xt(o))return Promise.reject(new d("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return I({...U,type:"popover-open",id:m(E),payload:o})},closePopover:Qo,setPopoverAnchorActive:er,onResolve:(o)=>(ae=o,()=>{if(ae===o)ae=null}),toast:(o)=>{let r=o.message.trim();if(!r||r.length>tt)return Promise.reject(new d("HOST_REJECTED",`Toast message must contain 1 to ${tt} characters.`));if(o.copy&&o.copy!==!0&&(!o.copy.text.length||o.copy.text.length>ot))return Promise.reject(new d("HOST_REJECTED",`Toast copy text must contain 1 to ${ot} characters.`));return I({channel:T,v:h,type:"toast",id:m(E),payload:{...o,message:r}})},openUrl:(o)=>I({channel:T,v:h,type:"open-url",id:m(E),payload:{url:o}}),openCommit:(o)=>jt(o)?I({channel:T,v:h,type:"open-commit",id:m(E),payload:{sha:o}}):Promise.reject(new d("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(o)=>I({channel:T,v:h,type:"open-surface",id:m(E),payload:{surfaceId:o}}),writeClipboard:(o)=>I({channel:T,v:h,type:"clipboard-write",id:m(E),payload:{text:o}}),compose:(o)=>I({channel:T,v:h,type:"compose",id:m(E),payload:o}),attach:(o)=>I({channel:T,v:h,type:"attach",id:m(E),payload:Ae(o)}),startSession:async(o)=>{if(o.projectId!==void 0)j(o.projectId);let r=o.worktree;if(r&&r!==!0)if(r.kind==="existing")j(r.directory);else{if(r.name!==void 0)j(r.name,200);if(r.baseBranch!==void 0)j(r.baseBranch,200)}let c=await P({channel:T,v:h,type:"start-session",id:m(E),payload:qt(o)},e.requestTimeoutMs??180000);if(!Kt(c))throw new d("HOST_REJECTED","Host did not return a session.");return c},prompt:(o)=>P({channel:T,v:h,type:"prompt",id:m(E),payload:Zt(o)}).then((r)=>{if(!zt(r))throw new d("HOST_REJECTED","Host did not return a prompt result.");return r}),sessionLink:(o)=>I({channel:T,v:h,type:"session-link",id:m(E),payload:Ae(o)}),close:()=>I({channel:T,v:h,type:"close",id:m(E)}),oauthStart:()=>I({channel:T,v:h,type:"oauth-start",id:m(E)}),oauthDisconnect:()=>I({channel:T,v:h,type:"oauth-disconnect",id:m(E)}),request:(o)=>(at(o.path)?P({channel:T,v:h,type:"request",id:m(E),payload:o}):Mr()).then((r)=>{if(!ct(r))throw new d("HOST_REJECTED","Host request result was empty.");return r}),serviceRequest:(o)=>(at(o.path)?P({channel:T,v:h,type:"service-request",id:m(E),payload:o}):Mr()).then((r)=>{if(!ct(r))throw new d("HOST_REJECTED","Host service request result was empty.");return r}),serviceStatus:()=>P({channel:T,v:h,type:"service-status",id:m(E)}).then((o)=>{if(!to(o))throw new d("HOST_REJECTED","Host did not return service status.");return o}),readFile:(o)=>(Oe(o)?P({channel:T,v:h,type:"file-read",id:m(E),payload:{path:o}}):lt()).then((r)=>{if(!oo(r))throw new d("HOST_REJECTED","Host did not return file content.");return r}),writeFile:(o,r)=>{if(!Oe(o))return lt();if(r.length>nt)return Promise.reject(new d("FILE_TOO_LARGE",`Content is over ${nt} characters.`));return P({channel:T,v:h,type:"file-write",id:m(E),payload:{path:o,content:r}}).then((c)=>{if(!ro(c))throw new d("HOST_REJECTED","Host did not confirm the write.");return c})},listDir:(o)=>(Oe(o)?P({channel:T,v:h,type:"file-list",id:m(E),payload:{path:o}}):lt()).then((r)=>{if(!no(r))throw new d("HOST_REJECTED","Host did not return directory entries.");return r}),stat:(o)=>(Oe(o)?P({channel:T,v:h,type:"file-stat",id:m(E),payload:{path:o}}):lt()).then((r)=>{if(!so(r))throw new d("HOST_REJECTED","Host did not return file status.");return r}),generate:(o)=>{let r=o.prompt.trim(),c=o.system?.trim();if(r.length===0||r.length>st)return Promise.reject(new d("HOST_REJECTED",`Prompt must be 1 to ${st} characters.`));if(c!==void 0&&(c.length===0||c.length>it))return Promise.reject(new d("HOST_REJECTED",`System prompt must be 1 to ${it} characters.`));let l=o.maxOutputTokens===void 0?void 0:Math.min(Yt,Math.max(1,Math.floor(o.maxOutputTokens)));if(l!==void 0&&!Number.isFinite(l))return Promise.reject(new d("HOST_REJECTED","maxOutputTokens must be a number."));let R={prompt:r};if(c!==void 0)R.system=c;if(l!==void 0)R.maxOutputTokens=l;return P({channel:T,v:h,type:"generate",id:m(E),payload:R},e.requestTimeoutMs??Jt).then((O)=>{if(!io(O))throw new d("HOST_REJECTED","Host did not return generated text.");return O})},onLateGenerateResult:(o)=>{b.add(o);for(let r of Ie.splice(0))C([o],r);return Ko(),()=>{b.delete(o)}},setBadge:(o)=>I({channel:T,v:h,type:"badge",id:m(E),payload:{count:Qt(o)}}),setHeight:(o)=>I({channel:T,v:h,type:"resize",id:m(E),payload:{height:eo(o)}}),onFileOpen:(o)=>{if(ze.add(o),!Nt)Nt=!0,t.addEventListener("keydown",Wo,!0);if(Ne)o(Ne);return()=>{ze.delete(o)}},onFileSnapshot:(o)=>(Ue=o,()=>{if(Ue===o)Ue=null}),onFileSaved:(o)=>(je.add(o),()=>{je.delete(o)}),reportFileChange:(o)=>wt({...U,type:"file-change",payload:{dirty:o.dirty,edited:o.edited}}),requestFileSave:jo,reportFileUnsupported:()=>wt({...U,type:"file-unsupported"}),dispose:()=>{for(let o of ge.keys())X({...U,type:"workspace-unsubscribe",id:m(E),payload:{subscriptionId:o}});ge.clear();for(let o of xe.keys())X({...U,type:"shells-unsubscribe",id:m(E),payload:{subscriptionId:o}});if(xe.clear(),Y=!0,ae=null,ce=null,Ue=null,ze.clear(),je.clear(),Nt)t.removeEventListener("keydown",Wo,!0);t.removeEventListener("message",zo),t.removeEventListener("keydown",Yo,!0),t.removeEventListener("pointerover",Ye),t.removeEventListener("pointermove",Ye),t.removeEventListener("pointerout",Jo),t.removeEventListener("focus",qo),t.removeEventListener("blur",Zo);for(let o of he.values())clearTimeout(o.timer),o.reject(new d("HOST_UNAVAILABLE","Host client was disposed."));he.clear(),i.clear(),a.clear(),u.clear(),S.clear(),x.clear(),_.clear(),f.clear(),L.clear(),g.clear(),b.clear(),Ie.length=0}}};var Pr=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var Us=new Set(Pr);var Gr=["none","agent","user"];var ws=new Set(Gr);var yn=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],kn=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Dr=(e,t)=>{t.style.colorScheme=e.mode;for(let[n,s]of yn)t.style.setProperty(n,e.tokens[s]);for(let[n,s,i]of kn){let a=e.tokens[i]??"";t.style.setProperty(n,a),t.style.setProperty(s,a)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},lo=(e,t)=>{if(Dr(e.theme,t),t.dataset)t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode};var vn={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},y=(e,t)=>`var(--${e}, var(--oc-${vn[e]}, ${t}))`,Q=y("surface-background","transparent"),ut=y("surface-elevated","transparent"),Re=y("surface-elevated-foreground","inherit"),B=y("surface-foreground","inherit"),k=y("surface-muted-foreground","gray"),Cn=y("surface-muted","transparent"),le=y("interactive-border","currentColor"),D=y("interactive-hover","transparent"),de=y("interactive-active","transparent"),po=y("interactive-selection","transparent"),uo=y("interactive-selection-foreground","inherit"),Z=y("primary","currentColor"),Eo=y("primary-text","inherit"),mo=y("error-text","inherit"),In=y("font-sans","inherit"),_o=y("font-mono","monospace"),Vr=y("radius","9px"),fo=`calc(${Vr} - 2px)`,$r=`calc(${Vr} - 4px)`,v=(e,t,n="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${n})`,Hr=`background-image: linear-gradient(${D}, ${D});`,So=(e,t="0.5px")=>`box-shadow: inset 0 0 0 ${t} ${e}, var(--oc-sdk-field-lift);`,To="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",Fr="box-shadow: var(--oc-sdk-lit);",ho=`inset 0 0.5px 0 0 ${v(B,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,Un=`
:root {
  --oc-sdk-edge: ${v(B,16)};
  --oc-sdk-field-bg: ${ut};
  --oc-sdk-raised-bg: ${Q};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${v(B,14)};
  --oc-sdk-field-bg: ${v(Q,50,ut)};
  --oc-sdk-raised-bg: ${ut};
  --oc-sdk-field-lift: ${ho};
  --oc-sdk-raised-lift: ${ho};
  --oc-sdk-lit: ${ho};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,pt=(e)=>{let t=y(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${y(`${e}-text`,"inherit")}; }`},Nn=`
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
`,Xr=`${Un}
.oc-sdk { color: ${B}; font-family: ${In}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${Hr} }
.oc-sdk-mono { font-family: ${_o}; }
.oc-sdk-muted { color: ${k}; }
${pt("success")}${pt("warning")}${pt("error")}${pt("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${Z}; --oc-sdk-tone-text: ${Eo}; }

.oc-sdk-btn { border-radius: ${fo}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${$r}; }
.oc-sdk-btn[data-variant="default"] { color: ${Eo}; background: ${v(Z,10,Q)}; border-color: ${v(Z,12)}; ${Fr} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${v(Z,16,Q)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${v(Z,22,Q)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Cn}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${D}, ${D}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${de}, ${de}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${Re}; ${To} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${D}, ${D}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${de}, ${de}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${D}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${de}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${y("status-error","red")}; color: ${mo}; background: ${v("var(--oc-sdk-tone)",7,Q)}; border-color: ${v("var(--oc-sdk-tone)",12)}; ${Fr} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${v("var(--oc-sdk-tone)",9,Q)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${v("var(--oc-sdk-tone)",11,Q)}; box-shadow: none; }

.oc-sdk-field-note { color: ${k}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${mo}; }
.oc-sdk-input { border-radius: ${fo}; background: var(--oc-sdk-field-bg); color: ${Re}; ${So("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${k}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${D}, ${D}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${So(v(B,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${So(y("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${_o}; }

.oc-sdk-search-icon { color: ${k}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${Z}; }
.oc-sdk-search-clear { border-radius: ${$r}; color: ${k}; }
.oc-sdk-search-clear:hover { background: ${D}; color: ${B}; }

.oc-sdk-trigger { border-radius: ${fo}; background: var(--oc-sdk-raised-bg); color: ${Re}; ${To} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${D}, ${D}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${de}, ${de}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${k}; }
.oc-sdk-trigger-chevron { color: ${k}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${Re}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${ut}; background-clip: padding-box; color: ${Re}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${D}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${po}; color: ${uo}; }
.oc-sdk-option-check { color: ${B}; }
.oc-sdk-option[data-destructive="true"] { color: ${mo}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${v(y("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${k}; }
.oc-sdk-popup-empty { color: ${k}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${le}; border-radius: 4px; color: ${B}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${v(B,60,le)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${le}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${Q}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${Z}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Hr} }
.oc-sdk-check-desc { color: ${k}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${v(B,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${k}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${B}; }
.oc-sdk-tab[aria-selected="true"] { color: ${uo}; background: ${po}; border-color: ${le}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${Re}; background: var(--oc-sdk-raised-bg); ${To} }
.oc-sdk-tab-count { color: ${k}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${v(B,6)}; color: ${k}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${v("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${D}; }
.oc-sdk-row[aria-selected="true"] { background: ${po}; color: ${uo}; }
.oc-sdk-row-lead { font-family: ${_o}; color: ${k}; }
.oc-sdk-row-sub { color: ${k}; }
.oc-sdk-row-meta { color: ${k}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${k}; }

.oc-sdk-empty-body { color: ${k}; }

.oc-sdk-spinner { color: ${k}; }
.oc-sdk-spinner-ring { border-color: ${le}; border-top-color: ${Z}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${v("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${k}; }

.oc-sdk-separator { color: ${k}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${v(le,40)}; }

.oc-sdk-progress-label { color: ${k}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${v(B,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${Z}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${y("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${y("success-text","inherit")}; }

.oc-sdk-text a { color: ${Eo}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${v(le,60)}; }
`,G=`
${Gt}
${Nn}
${Xr}`;var A={util:"#4d9fff",mem:"#e8c33a",temp:"#b07fe8",power:"#3ddc84",cpu:"#ff8c42",npu:"#ec60a0",systemRam:"#89929c"};function Br(e,t){return!!e.can_kill_all||!!e.current_user&&t.user===e.current_user}function Kr(e,t){if(!t.unit)return!1;return t.unit.startsWith("user:")||!!e.can_kill_all}var Gn={llama:"llama.cpp",ollama:"Ollama",vllm:"vLLM",sglang:"SGLang",tgi:"Hugging Face TGI",flm:"FastFlowLM"};function zr(e){return Gn[e]}function jr(e){let t=[],n=["llama","ollama","vllm","sglang","tgi","flm"];for(let s of n)for(let i of e[s]??[]){if(s==="ollama"||!i.model)continue;let a=i.alias||i.model;t.push({key:`process:${s}:${i.pid}`,engine:s,title:a,process:i})}for(let s of e.ollama_models??[]){if(!s.name)continue;t.push({key:`ollama-model:${s.name}`,engine:"ollama",title:s.name,ollamaModel:s})}return t.sort((s,i)=>s.key.localeCompare(i.key))}var Dn=/(?:api[-_]?key|token|password|secret|credential|auth)/i;function Wr(e=[]){let t=[];for(let n=1;n<e.length;n++){let s=e[n];if(!/^-{1,2}(?!\d)/.test(s))continue;let i=s.indexOf("="),a=(i<0?s:s.slice(0,i)).replace(/^-+/,""),u=i<0?"":s.slice(i+1);if(i<0&&n+1<e.length&&!/^-{1,2}(?!\d)/.test(e[n+1]))u=e[++n];if(Dn.test(a)&&u)u="[redacted]";t.push({key:a,value:u})}return t.sort((n,s)=>n.key.localeCompare(s.key))}var Yr=21;var xo=["util","mem","temp","power","cpu","npu"],bo="seriesVisibilityV1",$n={util:!0,mem:!0,temp:!0,power:!0,cpu:!0,npu:!0},Ao=(e)=>{let t={...$n};if(!e||typeof e!=="object"||Array.isArray(e))return t;for(let n of xo){let s=e[n];if(typeof s==="boolean")t[n]=s}return t};var Oo="sourceConfigV1",St="local",Hn=[{id:"evo-x2",label:"evo-x2.home.lan",host:"evo-x2.home.lan"},{id:"proxmox",label:"proxmox.home.lan",host:"proxmox.home.lan"}],Fn=/^(?=.{1,253}$)(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)(?:\.(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?))*\.?$/,Vn=/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,63}$/;function Tt(e){let t=e.trim().replace(/\.$/,"").toLowerCase();if(!Fn.test(t))throw Error("Enter a hostname or IPv4 address only (no http://, port, or path).");return t}function Xn(e){if(!e||typeof e!=="object"||Array.isArray(e))return null;let t=e;if(typeof t.id!=="string"||!Vn.test(t.id))return null;if(typeof t.label!=="string"||t.label.trim().length<1||t.label.length>80)return null;if(typeof t.host!=="string")return null;try{return{id:t.id,label:t.label.trim(),host:Tt(t.host)}}catch{return null}}function Ro(e){if(!e||typeof e!=="object"||Array.isArray(e))return{selectedSourceId:"local",remoteSources:Hn.map((u)=>({...u}))};let t=e,n=[],s=new Set,i=new Set;if(Array.isArray(t.remoteSources))for(let u of t.remoteSources.slice(0,50)){let S=Xn(u);if(!S||s.has(S.id)||i.has(S.host))continue;n.push(S),s.add(S.id),i.add(S.host)}return{selectedSourceId:typeof t.selectedSourceId==="string"&&(t.selectedSourceId==="local"||s.has(t.selectedSourceId))?t.selectedSourceId:"local",remoteSources:n}}function Jr(e){if(e.selectedSourceId==="local")return{mode:"local"};let t=e.remoteSources.find(({id:n})=>n===e.selectedSourceId);if(!t)return{mode:"local"};return{mode:"remote",label:t.label,host:Tt(t.host)}}var te=co(),Ve=document.querySelector("#root");if(!Ve)throw Error("Missing #root");var Bn=`
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
.llm-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; }
.llm-actions { display: flex; flex: none; gap: 5px; }
.llm-actions[hidden] { display: none; }
.llm-action {
  padding: 1px 7px;
  font: inherit;
  font-size: 11px;
  color: var(--oc-muted);
  background: transparent;
  border: 1px solid color-mix(in srgb, var(--oc-fg) 25%, transparent);
  border-radius: 4px;
  cursor: pointer;
}
.llm-action[data-action="kill"] { --action-color: #ef4444; }
.llm-action[data-action="restart"] { --action-color: #f97316; }
.llm-action[data-action] {
  color: var(--action-color);
  border-color: var(--action-color);
}
.llm-action[data-action]:hover:not(:disabled) {
  background: color-mix(in srgb, var(--action-color) 18%, transparent);
}
.llm-action:disabled { opacity: 0.5; cursor: default; }
.llm-action[hidden] { display: none; }
.llm-action.armed { color: #fff; background: var(--action-color); }
.llm-notice { margin-top: 4px; font-size: 11px; color: #ef4444; overflow-wrap: anywhere; }
.llm-notice[hidden] { display: none; }
.llm-notice.ok { color: var(--oc-muted); }
`,sn=document.createElement("style");sn.textContent=Bn;document.head.append(sn);var qr=(e)=>{if(e===0)return"0 B";let t=["B","KB","MB","GB","TB"],n=Math.floor(Math.log(e)/Math.log(1024));return`${(e/Math.pow(1024,n)).toFixed(1)} ${t[n]}`},Ge=(e)=>{if(e===null)return"–";return`${e.toFixed(0)}%`},Kn=(e)=>{if(e===null)return"–";return`${e.toFixed(0)}°`},zn=(e)=>{if(e===null)return"–";return`${e.toFixed(0)} W`},pe={util:"GPU Util",mem:"GTT",temp:"Temp",power:"Power",cpu:"CPU",npu:"NPU"},jn={util:100,mem:100,temp:100,power:100,cpu:100,npu:100};function De(e,t){let n=document.getElementById("chart-svg");if(!n)return;while(n.firstChild)n.removeChild(n.firstChild);let s=300,i=100,a=2,u=document.createElementNS("http://www.w3.org/2000/svg","g");for(let _ of[0.25,0.5,0.75]){let f=document.createElementNS("http://www.w3.org/2000/svg","line");f.setAttribute("x1","0"),f.setAttribute("x2",String(s)),f.setAttribute("y1",String(i*_)),f.setAttribute("y2",String(i*_)),f.setAttribute("stroke","var(--oc-border)"),f.setAttribute("stroke-width","0.5"),f.setAttribute("opacity","0.3"),u.appendChild(f)}n.appendChild(u);let S=performance.now()-an,x=Ee?.timestamp??Date.now();for(let _ of xo){if(!t[_])continue;let f=A[_],L=tr(e[_],e.times??[],x,S,{width:s,height:i,pad:a,max:jn[_],windowSec:Yr-1});if(L.length<2)continue;let g=document.createElementNS("http://www.w3.org/2000/svg","polygon");g.setAttribute("points",or(L,i)),g.setAttribute("fill",f),g.setAttribute("opacity","0.08"),n.appendChild(g);let b=document.createElementNS("http://www.w3.org/2000/svg","polyline");b.setAttribute("points",Pt(L)),b.setAttribute("fill","none"),b.setAttribute("stroke",f),b.setAttribute("stroke-width","1.5"),b.setAttribute("stroke-linejoin","round"),b.setAttribute("stroke-linecap","round"),b.setAttribute("opacity","0.95"),n.appendChild(b)}}var Ee=null,an=performance.now(),xt=!1,yo=0,W=Ao(void 0),se=document.createElement("div");se.className="status-dot";var K=document.createElement("span");K.textContent="Connecting…";var Io=document.createElement("div");Io.className="status";Io.append(se,K);var me=document.createElement("button");me.type="button";me.dataset.series="util";me.className="stat";me.innerHTML=`
  <span class="stat-label">GPU Util</span>
  <span class="stat-value">–</span>
`;var Xe=document.createElement("div");Xe.className="stat";Xe.innerHTML=`
  <span class="stat-label">System RAM</span>
  <span class="stat-value">–</span>
`;var _e=document.createElement("button");_e.type="button";_e.dataset.series="temp";_e.className="stat";_e.innerHTML=`
  <span class="stat-label">Temperature</span>
  <span class="stat-value">–</span>
`;var fe=document.createElement("button");fe.type="button";fe.dataset.series="power";fe.className="stat";fe.innerHTML=`
  <span class="stat-label">Power</span>
  <span class="stat-value">–</span>
`;var Se=document.createElement("button");Se.type="button";Se.dataset.series="cpu";Se.className="stat";Se.innerHTML=`
  <span class="stat-label">CPU</span>
  <span class="stat-value">–</span>
`;var J=document.createElement("button");J.type="button";J.dataset.series="npu";J.className="stat";J.style.display="none";J.innerHTML=`
  <span class="stat-label">NPU</span>
  <span class="stat-value">–</span>
`;var bt=!1,Te=document.createElement("button");Te.type="button";Te.dataset.series="mem";Te.className="stat";Te.innerHTML=`
  <span class="stat-label">GTT Memory</span>
  <span class="stat-value">–</span>
`;var Uo=document.createElement("div");Uo.className="stats-row";Uo.append(me,Te,_e,fe,Se,Xe,J);var Wn=[[me,A.util],[Xe,A.systemRam],[_e,A.temp],[fe,A.power],[Se,A.cpu],[Te,A.mem],[J,A.npu]];for(let[e,t]of Wn)e.style.setProperty("--series-color",t);var No=document.createElement("div");No.className="mem-detail";var cn=document.createElement("span"),ln=document.createElement("span");No.append(cn,ln);var wo=document.createElement("div");wo.className="section";wo.innerHTML=`
  <h2>Activity</h2>
  <div class="chart-container">
    <svg id="chart-svg" class="chart" viewBox="0 0 300 100" preserveAspectRatio="none"></svg>
    <div class="legend">
      <button class="legend-item" type="button" data-series="util" style="--series-color:${A.util}" aria-pressed="true"><span class="legend-dot" style="background:${A.util}"></span>${pe.util}</button>
      <button class="legend-item" type="button" data-series="mem" style="--series-color:${A.mem}" aria-pressed="true"><span class="legend-dot" style="background:${A.mem}"></span>${pe.mem}</button>
      <button class="legend-item" type="button" data-series="temp" style="--series-color:${A.temp}" aria-pressed="true"><span class="legend-dot" style="background:${A.temp}"></span>${pe.temp}</button>
      <button class="legend-item" type="button" data-series="power" style="--series-color:${A.power}" aria-pressed="true"><span class="legend-dot" style="background:${A.power}"></span>${pe.power}</button>
      <button class="legend-item" type="button" data-series="cpu" style="--series-color:${A.cpu}" aria-pressed="true"><span class="legend-dot" style="background:${A.cpu}"></span>${pe.cpu}</button>
      <button class="legend-item" type="button" data-series="npu" style="display:none;--series-color:${A.npu}" aria-pressed="true"><span class="legend-dot" style="background:${A.npu}"></span>${pe.npu}</button>
    </div>
  </div>
`;var yt=document.createElement("section");yt.className="section llm-section";var dn=document.createElement("h2");dn.textContent="LLM processes";var At=document.createElement("div");At.className="llm-list";yt.append(dn,At);var w=Ro(void 0),ko=Promise.resolve(),ke="",Ot=!1,Co="Checking local D-Bus…",Lo=document.createElement("div");Lo.className="source-controls";var Mo=document.createElement("label");Mo.htmlFor="source-picker-trigger";Mo.textContent="Source";var kt=document.createElement("div");kt.className="source-picker";var M=document.createElement("button");M.id="source-picker-trigger";M.type="button";M.className="source-picker-trigger";M.setAttribute("role","combobox");M.setAttribute("aria-label","Telemetry source");M.setAttribute("aria-haspopup","listbox");M.setAttribute("aria-expanded","false");M.disabled=!0;var Po=document.createElement("span");Po.className="source-picker-value";var vt=document.createElement("span");vt.className="source-picker-chevron";vt.setAttribute("aria-hidden","true");vt.textContent="⌄";M.append(Po,vt);var V=document.createElement("div");V.className="source-picker-menu";V.id="source-picker-options";V.setAttribute("role","listbox");V.setAttribute("aria-label","Telemetry sources");V.hidden=!0;M.setAttribute("aria-controls",V.id);kt.append(M,V);var Be=document.createElement("button");Be.type="button";Be.textContent="Manage";Be.setAttribute("aria-label","Manage remote servers");Lo.append(Mo,kt,Be);var oe=document.createElement("dialog");oe.className="source-dialog";oe.setAttribute("aria-labelledby","source-dialog-title");var Go=document.createElement("h2");Go.id="source-dialog-title";Go.textContent="Remote servers";var Do=document.createElement("div");Do.className="dialog-help";Do.textContent="Enter a hostname or IPv4 address. onvtop uses HTTP on port 8039 and requests the full sample.";var $e=document.createElement("div");$e.className="server-list";var re=document.createElement("div");re.className="dialog-error";re.setAttribute("role","alert");var $o=document.createElement("div");$o.className="add-server";var ne=document.createElement("input");ne.name="name";ne.placeholder="Name (optional)";ne.setAttribute("aria-label","Server display name");ne.maxLength=80;var z=document.createElement("input");z.name="host";z.placeholder="hostname";z.setAttribute("aria-label","Server hostname");z.setAttribute("autocomplete","off");var Ce=document.createElement("button");Ce.type="button";Ce.textContent="Add";var ie=document.createElement("button");ie.type="button";ie.className="cancel-edit";ie.textContent="Cancel edit";ie.hidden=!0;$o.append(ne,z,Ce,ie);var Ho=document.createElement("div");Ho.className="dialog-actions";var Ct=document.createElement("button");Ct.type="button";Ct.textContent="Done";Ho.append(Ct);oe.append(Go,Do,$e,re,$o,Ho);var ue=null;function Fo(){ue=null,ne.value="",z.value="",Ce.textContent="Add",ie.hidden=!0}function Zr(e,t,n=""){let s=document.createElement("button");s.type="button",s.className=`icon-button ${n}`.trim(),s.title=e,s.setAttribute("aria-label",e);let i=document.createElementNS("http://www.w3.org/2000/svg","svg");i.setAttribute("viewBox","0 0 24 24"),i.setAttribute("aria-hidden","true");for(let a of t){let u=document.createElementNS("http://www.w3.org/2000/svg","path");u.setAttribute("d",a),i.append(u)}return s.append(i),s}function Rt(){let e=[{id:St,label:"Local D-Bus",detail:Ot?"This machine":Co||"Unavailable on this machine"},...w.remoteSources.map((n)=>({id:n.id,label:n.label,detail:`${n.host}:8039`}))],t=e.find(({id:n})=>n===w.selectedSourceId)??e[0];Po.textContent=t.label,M.setAttribute("aria-label",`Telemetry source: ${t.label}`),V.replaceChildren();for(let n of e){let s=document.createElement("button");if(s.type="button",s.className="source-picker-option",s.setAttribute("role","option"),s.setAttribute("aria-selected",String(n.id===t.id)),s.disabled=n.id===St&&!Ot,s.disabled)s.title=n.detail;s.dataset.sourceId=n.id;let i=document.createElement("span");i.textContent=n.label;let a=document.createElement("small");a.textContent=n.detail,s.append(i,a),s.addEventListener("click",()=>{if(Ke(!1),w.selectedSourceId!==n.id)Fe({...w,selectedSourceId:n.id})}),V.append(s)}}function Ke(e,t=!1){if(V.hidden=!e,M.setAttribute("aria-expanded",String(e)),e&&t)V.querySelector('[role="option"]')?.focus()}M.addEventListener("click",()=>{Ke(V.hidden)});M.addEventListener("keydown",(e)=>{if(e.key==="ArrowDown")e.preventDefault(),Ke(!0,!0)});V.addEventListener("keydown",(e)=>{let t=Array.from(V.querySelectorAll('[role="option"]')),n=t.indexOf(document.activeElement);if(e.key==="Escape")e.preventDefault(),Ke(!1),M.focus();else if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();let s=e.key==="ArrowDown"?1:-1;t[(n+s+t.length)%t.length]?.focus()}else if(e.key==="Home")e.preventDefault(),t[0]?.focus();else if(e.key==="End")e.preventDefault(),t.at(-1)?.focus()});document.addEventListener("click",(e)=>{if(!kt.contains(e.target))Ke(!1)});function It(){if($e.replaceChildren(),w.remoteSources.length===0){let e=document.createElement("div");e.className="dialog-help",e.textContent="No remote servers added.",$e.append(e);return}for(let e of w.remoteSources){let t=document.createElement("div");t.className="server-row";let n=document.createElement("div");n.className="server-row-info";let s=document.createElement("strong");s.textContent=e.label;let i=document.createElement("small");i.textContent=`${e.host}:8039`,n.append(s,i);let a=document.createElement("div");a.className="server-actions";let u=Zr(`Edit ${e.label}`,["M12 20h9","M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"]);u.addEventListener("click",()=>{ue=e.id,ne.value=e.label,z.value=e.host,Ce.textContent="Save",ie.hidden=!1,re.textContent="",z.focus()});let S=Zr(`Delete ${e.label}`,["M3 6h18","M8 6V4h8v2","M19 6l-1 14H6L5 6","M10 11v6","M14 11v6"],"delete-button");S.addEventListener("click",()=>{let x=w.remoteSources.filter(({id:f})=>f!==e.id),_=w.selectedSourceId===e.id?St:w.selectedSourceId;if(ue===e.id)Fo();Fe({...w,selectedSourceId:_,remoteSources:x}),re.textContent="",It()}),a.append(u,S),t.append(n,a),$e.append(t)}}function Fe(e){return w=e,ke="",Rt(),It(),se.className="status-dot",K.textContent="Connecting…",K.title="",ko=ko.then(async()=>{await te.storage.set(Oo,w);let t=await te.serviceRequest({method:"POST",path:"/source",body:JSON.stringify(Jr(w))});if(t.status!==200){let n="";try{let s=JSON.parse(t.body);if(typeof s.error==="string")n=`: ${s.error}`}catch{}if(t.status===404)throw Error("Onvtop service is outdated. Restart OpenChamber.");throw Error(`Source request failed (HTTP ${t.status}${n}).`)}}).catch((t)=>{console.warn("Could not save onvtop source configuration",t);let n=t instanceof Error?t.message:"Could not change source";ke=n,K.textContent=n,K.title=n,se.className="status-dot error"}),ko}Be.addEventListener("click",()=>{re.textContent="",It(),oe.showModal(),z.focus()});Ct.addEventListener("click",()=>oe.close());oe.addEventListener("click",(e)=>{if(e.target===oe)oe.close()});function pn(){re.textContent="";try{if(!ue&&w.remoteSources.length>=50)throw Error("You can add up to 50 remote servers.");let e=Tt(z.value);if(w.remoteSources.some((n)=>n.host===e&&n.id!==ue))throw Error("That host is already in the list.");let t=ne.value.trim()||e;if(t.length>80)throw Error("The server name must be 80 characters or fewer.");if(ue){let n=w.remoteSources.map((s)=>s.id===ue?{...s,label:t,host:e}:s);Fe({...w,remoteSources:n})}else{let n=`remote-${Date.now()}-${Math.floor(Math.random()*1e4)}`,s={id:n,label:t,host:e};Fe({selectedSourceId:n,remoteSources:[...w.remoteSources,s]})}Fo(),It(),z.focus()}catch(e){re.textContent=e instanceof Error?e.message:"Invalid server address."}}Ce.addEventListener("click",pn);for(let e of[ne,z])e.addEventListener("keydown",(t)=>{if(t.key==="Enter")t.preventDefault(),pn()});ie.addEventListener("click",()=>{Fo(),re.textContent=""});Ve.append(Io,Uo,No,wo,Lo,yt,oe);var ht=new Map,Yn={llama:A.util,ollama:A.mem,vllm:A.temp,sglang:A.power,tgi:A.cpu,flm:A.npu},Qr=(e)=>e===null||e===void 0?"N/A":`${e.toFixed(0)}%`,en=(e)=>e===null||e===void 0?"N/A":`${(e/1024).toFixed(0)} MiB`;function tn(e,t,n,s){let i=document.createElement("button");i.type="button",i.className="llm-action",i.dataset.action=e,i.textContent=t;let a=0,u=()=>{window.clearTimeout(a),i.classList.remove("armed"),i.textContent=t};return i.addEventListener("click",()=>{if(i.classList.contains("armed")){u(),s();return}i.classList.add("armed"),i.textContent=n,a=window.setTimeout(u,3000)}),i.addEventListener("blur",u),i}function Jn(){let e=document.createElement("article");e.className="llm-card";let t=document.createElement("div");t.className="llm-head";let n=document.createElement("div");n.className="llm-title";let s=document.createElement("div");s.className="llm-actions";let i=document.createElement("div");i.className="llm-stats";let a=document.createElement("div");a.className="llm-meta";let u=document.createElement("div");u.className="llm-flags";let S=document.createElement("div");S.className="llm-notice",S.hidden=!0;let x=tn("restart","Restart","Restart? Click",()=>void rn(f,"restart")),_=tn("kill","Kill","Kill? Click",()=>void rn(f,"kill")),f={element:e,title:n,stats:i,meta:a,flags:u,flagsSignature:"",actions:s,notice:S,killButton:_,restartButton:x,pid:0};return s.append(x,_),s.hidden=!0,t.append(n,s),e.append(t,i,a,u,S),f}var on=new WeakMap;function gt(e,t,n){e.notice.textContent=t,e.notice.classList.toggle("ok",n),e.notice.hidden=!1,window.clearTimeout(on.get(e.notice)),on.set(e.notice,window.setTimeout(()=>{e.notice.hidden=!0},n?4000:8000))}async function rn(e,t){let n=e.pid;if(!(n>1))return;e.killButton.disabled=!0,e.restartButton.disabled=!0,gt(e,t==="kill"?"Killing…":"Restarting…",!0);try{let s=await te.serviceRequest({method:"POST",path:"/process",body:JSON.stringify({action:t,pid:n})});if(s.status===404)throw Error("Onvtop service is outdated. Restart OpenChamber.");let i=JSON.parse(s.body);if(i.ok)gt(e,i.message||(t==="kill"?"Killed":"Restart queued"),!0);else gt(e,`${t} failed: ${i.message||`HTTP ${s.status}`}`,!1)}catch(s){gt(e,`${t} failed: ${s instanceof Error?s.message:"request failed"}`,!1)}finally{e.killButton.disabled=!1,e.restartButton.disabled=!1,Ut()}}var un=(e)=>e.engine==="flm"||(e.process?.type??[]).includes("npu");function qn(e){let t=e.process;if(!t){let n=e.ollamaModel;if(!n)return"";return[n.parameter_size&&`parameters: ${n.parameter_size}`,n.quantization&&`quant: ${n.quantization}`].filter(Boolean).join("   ·   ")}return[t.user&&`user: ${t.user}`,bt&&`device: ${un(e)?"NPU":"GPU"}`,t.ngl&&`ngl: ${t.ngl}`,t.ctx&&`ctx: ${t.ctx}`,t.parallel&&`parallel: ${t.parallel}`,t.threads&&`threads: ${t.threads}`,t.port&&`port: ${t.port}`,`pid: ${t.pid}`].filter(Boolean).join("   ·   ")}function Zn(e,t,n){e.element.style.setProperty("--engine-color",Yn[t.engine]);let s=t.process;e.pid=s?.pid??0;let i=!!s&&n.controlAvailable&&Br(n.sample,s),a=!!s&&n.controlAvailable&&Kr(n.sample,s);if(e.killButton.hidden=!i,e.restartButton.hidden=!a,e.actions.hidden=!i&&!a,e.title.textContent=`${zr(t.engine)}  [${t.title}]`,t.process){let _=t.process,f=bt&&un(t)?"NPU":"GPU";e.stats.textContent=`${f} (proc): ${Qr(_.gpu_pct)}   ${f} MEM (proc): ${en(_.vram_kb)}   CPU: ${Qr(_.cpu_pct)}   RSS: ${en(_.rss_kb)}`}else if(t.ollamaModel){let _=t.ollamaModel,f=_.size?qr(_.size):"N/A",L=_.size_vram?qr(_.size_vram):"N/A";e.stats.textContent=`Model size: ${f}   GPU memory: ${L}`}e.meta.textContent=qn(t);let u=t.process?.argv??[],S=Wr(u),x=JSON.stringify(S);if(x!==e.flagsSignature){e.flags.replaceChildren();for(let _ of S){let f=document.createElement("span");f.className="llm-flag";let L=document.createElement("span");L.className="llm-flag-key",L.textContent=`${_.key}: `;let g=document.createElement("span");g.className="llm-flag-value",g.textContent=_.value||"on",f.append(L,g),e.flags.append(f)}e.flagsSignature=x}}function Qn(e){let t=jr(e.sample.llm);yt.hidden=t.length===0;let n=new Set(t.map(({key:s})=>s));for(let[s,i]of ht){if(n.has(s))continue;i.element.remove(),ht.delete(s)}t.forEach((s,i)=>{let a=ht.get(s.key);if(!a)a=Jn(),ht.set(s.key,a);Zn(a,s,e);let u=At.children.item(i);if(u!==a.element)At.insertBefore(a.element,u)})}function Vo(){for(let e of Array.from(Ve.querySelectorAll("[data-series]"))){let t=e.dataset.series,n=W[t];e.setAttribute("aria-pressed",String(n)),e.classList.toggle("series-off",!n),e.title=`${n?"Hide":"Show"} ${pe[t]} graph line`}}function es(e){if(W={...W,[e]:!W[e]},Vo(),Ee)De(Ee.history,W);te.storage.set(bo,W).catch((t)=>{console.warn("Could not save onvtop graph visibility",t)})}for(let e of Array.from(Ve.querySelectorAll("[data-series]")))e.addEventListener("click",()=>es(e.dataset.series));Vo();function ts(e){let{gpu:t,sys:n,npu:s}=e.sample;bt=!!s?.present;for(let g of[J,...Array.from(Ve.querySelectorAll('.legend-item[data-series="npu"]'))])g.style.display=bt?"":"none";if(Qn(e),typeof e.localSourceAvailable==="boolean"){let g=e.localSourceAvailable,b=e.localSourceReason||"Unavailable on this machine";if(g!==Ot||!g&&b!==Co)Ot=g,Co=g?"":b,Rt()}if(ke){se.className="status-dot error",K.textContent=ke,K.title=ke,De(e.history,W),xt=!0;return}if(!e.sourceAvailable){se.className="status-dot error",K.textContent=`${e.sourceLabel||"nvstats-service"} unavailable`,K.title=e.sourceError||"No sample received from this source",De(e.history,W),xt=!0;return}me.querySelector(".stat-value").textContent=Ge(t.util),_e.querySelector(".stat-value").textContent=Kn(t.temp),fe.querySelector(".stat-value").textContent=zn(t.power_w),Se.querySelector(".stat-value").textContent=Ge(n.cpu),J.querySelector(".stat-value").textContent=s?.readable?Ge(s.util):"N/A",J.title=s?.readable?"":s?.reason??"NPU not readable";let i=t.mem_used??0,a=t.mem_total??0,u=t.mem_used!==null&&a>0?i/a*100:null;Te.querySelector(".stat-value").textContent=Ge(u);let S=t.mem_used===null?"—":(i/1024).toFixed(1),x=t.mem_total===null?"—":(a/1024).toFixed(1);cn.textContent=`GTT ${S} / ${x} GiB`;let{ram_used:_,ram_total:f}=n,L=f>0?_/f*100:null;Xe.querySelector(".stat-value").textContent=Ge(L),ln.textContent=`System RAM ${(_/1073741824).toFixed(1)} / ${(f/1073741824).toFixed(1)} GiB`,De(e.history,W),se.className="status-dot ok",K.textContent=`Live · ${e.sourceLabel||"nvstats-service"}`,K.title="",xt=!1}function os(){se.className="status-dot error",K.textContent="No data from nvstats-service",xt=!0}async function Ut(){try{let e=await te.serviceRequest({method:"GET",path:"/stats"}),t=JSON.parse(e.body);if(e.status===200)Ee=t,an=performance.now(),ts(Ee),yo=0;else throw Error("bad response")}catch{if(yo++,yo>3)os()}}var ve=0,nn=0;function En(e){if(ve=requestAnimationFrame(En),e-nn<33)return;if(nn=e,Ee?.sourceAvailable&&!ke)De(Ee.history,W)}function rs(){if(!ve)ve=requestAnimationFrame(En)}function ns(){if(ve)cancelAnimationFrame(ve);ve=0}var He=null,vo=!1;function mn(){if(He)return;He=setInterval(()=>{if(!vo)vo=!0,Ut().finally(()=>{vo=!1})},1000),rs()}function _n(){if(ns(),He)clearInterval(He),He=null}document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")mn(),Ut();else _n()});window.addEventListener("pagehide",()=>{_n(),te.dispose()});te.onReady(async(e)=>{lo(e,document.documentElement);try{W=Ao(await te.storage.get(bo)),Vo()}catch(t){console.warn("Could not load onvtop graph visibility",t)}try{w=Ro(await te.storage.get(Oo)),Rt(),M.disabled=!1,await Fe(w)}catch(t){console.warn("Could not load onvtop source configuration",t),Rt(),M.disabled=!1}mn(),Ut()});})();
