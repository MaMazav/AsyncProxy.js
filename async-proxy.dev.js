var v=t();self.asyncProxyScriptBlob=new v;
function t(){function b(){this.j=["'use strict';"];this.ma=this.O=null;this.xb={};this.c(t,"BlobScriptGenerator");this.i("var asyncProxyScriptBlob = new BlobScriptGenerator();")}b.prototype.c=function(c,a,d,b){if(this.O)throw Error("Cannot add member to AsyncProxyScriptBlob after blob was used");a&&(d?(this.xb[d]=!0,this.j.push(d),this.j.push(".")):this.j.push("var "),this.j.push(a),this.j.push(" = "));this.j.push("(");this.j.push(c.toString());this.j.push(")(");this.j.push(b||"");this.j.push(");")};
b.prototype.i=function(c){if(this.O)throw Error("Cannot add statement to AsyncProxyScriptBlob after blob was used");this.j.push(c)};b.prototype.getBlob=function(){this.O||(this.O=new Blob(this.j,{type:"application/javascript"}));return this.O};b.prototype.Hb=function(){this.ma||(this.ma=URL.createObjectURL(this.getBlob()));return this.ma};return b};function w(){function b(d){if(null===a)throw"AsyncProxy internal error: SubWorkerEmulationForChrome not initialized";this.ea=++c;a[this.ea]=this;self.postMessage({type:"subWorkerCtor",H:this.ea,Rb:d})}var c=0,a=null;b.Ea=function(c){a=c};b.prototype.postMessage=function(a,c){self.postMessage({type:"subWorkerPostMessage",H:this.ea,data:a},c)};b.prototype.terminate=function(a,c){self.postMessage({type:"subWorkerTerminate",H:this.ea},c)};self.asyncProxyScriptBlob.c(w,"SubWorkerEmulationForChrome");return b}
var x=w();function y(){function b(d,f,u,e){var l=this;e=e||{};var k=c.toString(),k=k.replace("SCRIPT_PLACEHOLDER",g.Hb()),k=URL.createObjectURL(new Blob(["(",k,")()"],{type:"application/javascript"}));l.a=[];l.R=[];l.wa=[];l.xa=[];l.ha=new Worker(k);l.ha.onmessage=function(c){a(l,c)};l.za=null;l.aa=0;l.Qa=e.functionsBufferSize||5;l.ta=[];l.ha.postMessage({Aa:"ctor",Sb:d,Gb:f,F:u,f:++h,ib:!1,Nb:b.fb()})}function c(){importScripts("SCRIPT_PLACEHOLDER");AsyncProxy.AsyncProxySlave=self.AsyncProxy.AsyncProxySlaveSingleton;
AsyncProxy.AsyncProxySlave.wb()}function a(a,c){var b=c.data.f;switch(c.data.type){case "functionCalled":--a.aa;e(a);break;case "promiseResult":var f=a.R[b];delete a.R[b];f.resolve(c.data.result);break;case "promiseFailure":f=a.R[b];delete a.R[b];f.reject(c.data.reason);break;case "userData":null!==a.za&&a.za(c.data.$b);break;case "callback":b=a.a[c.data.f];if(void 0===b)throw"Unexpected message from SlaveWorker of callback ID: "+c.data.f+". Maybe should indicate isMultipleTimesCallback = true on creation?";
b.Fa||a.eb(a.a[c.data.f]);null!==b.cb&&b.cb.apply(null,c.data.F);break;case "subWorkerCtor":var b=new Worker(c.data.Rb),l=c.data.H;a.wa[l]=b;a.xa.push(b);b.onmessage=function(c){d(a,c.ports,!1,{Aa:"subWorkerOnMessage",H:l,data:c.data})};break;case "subWorkerPostMessage":b=a.wa[c.data.H];b.postMessage(c.data.data);break;case "subWorkerTerminate":b=a.wa[c.data.H];b.terminate();break;default:throw"Unknown message from AsyncProxySlave of type: "+c.data.type;}}function d(a,c,b,d){a.aa>=a.Qa?a.ta.push({Zb:c,
Lb:b,message:d}):f(a,c,b,d)}function f(a,c,b,d){b&&++a.aa;a.ha.postMessage(d,c)}function e(a){for(;a.aa<a.Qa&&0<a.ta.length;){var c=a.ta.shift();f(a,c.Zb,c.Lb,c.message)}}var g=self.asyncProxyScriptBlob,h=0,k=!1,n=function(){var a=location.href,c=a.lastIndexOf("/");0<=c&&(a=a.substring(0,c));return a}();b.prototype.Wb=function(a){this.za=a};b.prototype.terminate=function(){this.ha.terminate();for(var a=0;a<this.xa.length;++a)this.xa[a].terminate()};b.prototype.bb=function(a,c,b){b=b||{};var e=!!b.isReturnPromise,
l=b.transferables,k=b.pathsToTransferablesInPromiseResult,g=++h,n=null,r=this;e&&(n=new Promise(function(a,c){r.R[g]={resolve:a,reject:c}}));(b.isSendImmediately?f:d)(this,l,!0,{Aa:a,F:c||[],f:g,ib:e,Pb:k});if(e)return n};b.prototype.ac=function(a,c,b){b=b||{};var d=++h;c={Mb:!0,Fa:!!b.isMultipleTimeCallback,f:d,Fb:c,lb:b.pathsToTransferables};this.a[d]={Fa:!!b.isMultipleTimeCallback,f:d,cb:a,lb:b.pathsToTransferables};return c};b.prototype.eb=function(a){delete this.a[a.f]};b.fb=function(){k=!0;
return n};b.Bb=function(a){if(n!==a&&k)throw"Previous values returned from getMasterEntryUrl is wrong. Avoid calling it within the slave c`tor";n=a};g.c(y,"AsyncProxyMaster");return b}var z=y();function A(){function b(){var a;try{for(var c=k.split("."),b=self,f=0;f<c.length;++f)b=b[c[f]];var c=b,e=[null].concat(d(arguments));a=new (Function.prototype.bind.apply(c,e))}catch(g){throw Error("Failed locating class name "+k+": "+g);}return a}function c(a,c){if(void 0!==a){for(var b=Array(a.length),d=0;d<a.length;++d){for(var f=a[d],e=c,g=0;g<f.length;++g)e=e[f[g]];b[d]=e}return b}}function a(a){var c=a.data.Aa,d=a.data.F,e=a.data.f,l=a.data.ib,n=a.data.Pb;switch(c){case "ctor":self.AsyncProxy.AsyncProxyMaster.Bb(a.data.Nb);
e=a.data.Sb;k=a.data.Gb;for(var m=0;m<e.length;++m)importScripts(e[m]);g=b.apply(null,d);return;case "subWorkerOnMessage":h[a.data.H].onmessage({data:a.data.data});return}d=Array(a.data.F.length);for(m=0;m<a.data.F.length;++m){var q=a.data.F[m];void 0!==q&&null!==q&&q.Mb&&(q=f.qb(q));d[m]=q}for(var m=g,r;m&&!(r=g[c]);)m=m.__proto__;if(!r)throw"AsyncProxy error: could not find function "+r;d=r.apply(g,d);l&&f.rb(e,d,n);self.postMessage({type:"functionCalled",f:a.data.f,result:null})}function d(a){for(var c=
Array(a.length),b=0;b<a.length;++b)c[b]=a[b];return c}var f={},e=null,g,h={},k;f.wb=function(){self.onmessage=a};f.Vb=function(a){b=a};f.Ub=function(a){e=a};f.Tb=function(a){self.postMessage({type:"userData",$b:a})};f.rb=function(a,b,d){b.then(function(b){var f=c(d,b);self.postMessage({type:"promiseResult",f:a,result:b},f)})["catch"](function(c){self.postMessage({type:"promiseFailure",f:a,reason:c})})};f.qb=function(a){var b=!1;return function(){if(b)throw"Callback is called twice but isMultipleTimeCallback = false";
var f=d(arguments);if(null!==e)try{e.call(g,"callback",a.Fb,f)}catch(k){console.log("AsyncProxySlave.beforeOperationListener has thrown an exception: "+k)}var h=c(a.lb,f);self.postMessage({type:"callback",f:a.f,F:f},h);a.Fa||(b=!0)}};f.oa=function(){return B.oa(Error())};if(void 0===self.Worker){var n=self.SubWorkerEmulationForChrome;n.Ea(h);self.Worker=n}self.asyncProxyScriptBlob.c(A,"AsyncProxySlaveSingleton");return f}var C=A();function D(){function b(){this.va={};this.S=null}b.prototype.Eb=function(c){c=b.oa(c);this.va[c]||(this.va[c]=!0,this.S=null)};b.prototype.Ib=function(){if(null===this.S){this.S=[];for(var c in this.va)this.S.push(c)}return this.S};b.oa=function(c){var a=c.stack.trim(),b=/at (|[^ ]+ \()([^ ]+):\d+:\d+/.exec(a);if(b&&""!==b[2])return b[2];if((b=(new RegExp(/.+\/(.*?):\d+(:\d+)*$/)).exec(a))&&""!==b[1])return b[1];if(void 0!=c.fileName)return c.fileName;throw"ImageDecoderFramework.js: Could not get current script URL";
};self.asyncProxyScriptBlob.c(D,"ScriptsToImportPool");return b}var B=D();var E=function(){function b(){this.clear()}b.prototype.clear=function(){this.na={C:null,ba:this};this.Z={B:null,ba:this};this.l=0;this.Z.C=this.na;this.na.B=this.Z};b.prototype.add=function(c,a){if(null===a||void 0===a)a=this.Z;this.ga(a);++this.l;var b={Db:c,B:a,C:a.C,ba:this};b.C.B=b;return a.C=b};b.prototype.remove=function(c){this.ga(c);--this.l;c.C.B=c.B;c.B.C=c.C;c.ba=null};b.prototype.s=function(c){this.ga(c);return c.Db};b.prototype.o=function(){return this.u(this.na)};b.prototype.u=function(c){this.ga(c);
return c.B===this.Z?null:c.B};b.prototype.ga=function(c){if(c.ba!==this)throw"iterator must be of the current LinkedList";};return b}();var F=function(){function b(c){this.$=[];this.L=new E;this.Y=c;this.l=0}b.prototype.gb=function(c){var a=this.Y.getHashCode(c),a=this.$[a];if(!a)return null;for(var a=a.list,b=a.o();null!==b;){var f=a.s(b);if(this.Y.isEqual(f.key,c))return f.value;b=a.u(b)}return null};b.prototype.s=function(c){return c.g.list.s(c.h).value};b.prototype.Na=function(c,a){var b=this.Y.getHashCode(c),f=this.$[b];f||(f={Kb:b,list:new E,Ia:null},f.Ia=this.L.add(f),this.$[b]=f);b={g:f,h:null};for(b.h=f.list.o();null!==b.h;){var e=
f.list.s(b.h);if(this.Y.isEqual(e.key,c))return{iterator:b,Ga:!1,value:e.value};b.h=f.list.u(b.h)}e=a();b.h=f.list.add({key:c,value:e});++this.l;return{iterator:b,Ga:!0,value:e}};b.prototype.remove=function(b){var a=b.g.list.l;b.g.list.remove(b.h);var d=b.g.list.l;this.l+=d-a;0===d&&(this.L.remove(b.g.Ia),delete this.$[b.g.Kb])};b.prototype.o=function(){var b=this.L.o(),a=null,d=null;null!==b&&(a=this.L.s(b),d=a.list.o());return null===d?null:{g:a,h:d}};b.prototype.u=function(b){for(var a={g:b.g,
h:b.g.list.u(b.h)};null===a.h;){var d=this.L.u(b.g.Ia);if(null===d)return null;a.g=this.L.s(d);a.h=a.g.list.o()}return a};return b}();function G(){function b(a){this.T=a;this.pa=new I;this.ab=[];this.vb=this.U.bind(this);if(!a.createTaskContext)throw"AsyncProxy.DependencyWorkers: No workerInputRetreiver.createTaskContext() method";if(!a.getTaskOptions)throw"AsyncProxy.DependencyWorkers: No workerInputRetreiver.getTaskOptions() method";}var c=self.asyncProxyScriptBlob;b.prototype.La=function(a,b){var c=this.pa.Na(a,function(){return new aa}),e=c.value,g=new J(e,b);c.Ga&&(e.Ea(a,this,this.pa,c.iterator,this.T),this.Cb(e));return g};
b.prototype.Yb=function(a){var b=this;return new Promise(function(c,e){var g=b.La(a,{onData:function(a){h=!0;k=a},onTerminated:function(){h?c(k):e("AsyncProxy.DependencyWorkers: Internal error - task terminated but no data returned")}}),h=g.Da(),k;h&&(k=g.Ba())})};b.prototype.U=function(a){a=this.pa.gb(a);return null===a?null:a.W};b.prototype.Cb=function(a){taskContext=this.T.createTaskContext(a.ka,{getTaskContext:this.vb,onDataReadyToProcess:function(c,e){if(a.ja)throw"AsyncProxy.DependencyWorkers: already terminated";
a.N?(a.Ka=c,a.Ha=!0,a.mb=e):b.Za(a,c,e)},onTerminated:a.Ob,registerTaskDependency:a.Qb});a.W=taskContext;if(!taskContext.getTaskType)throw"AsyncProxy.DependencyWorkers: missing taskContext.getTaskType()";if(!taskContext.statusUpdated)throw"AsyncProxy.DependencyWorkers: missing taskContext.statusUpdated()";if(!taskContext.onDependencyTaskResult)throw"AsyncProxy.DependencyWorkers: missing taskContext.onDependencyTaskResult()";a.la=a.W.getTaskType();var b=this};b.prototype.Za=function(a,b,c){var e=this;
if(c)a.kb(b);else{var g,h=e.ab[a.la];h||(h=[],e.ab[a.la]=h);0<h.length?g=h.pop():(c=e.T.getTaskOptions(a.la),g=new z(c.scriptsToImport,c.ctorName,c.ctorArgs));a.N||(a.N=!0,a.V());g.bb("start",[b,a.ka],{isReturnPromise:!0}).then(function(b){a.kb(b);return b})["catch"](function(a){console.log("Error in DependencyWorkers' worker: "+a);return a}).then(function(b){h.push(g);if(a.Ha){var c=a.Ka;a.Ha=!1;a.Ka=null;e.Za(a,c,a.mb);return b}a.N=!1;a.V()})}};c.c(G,"DependencyWorkers");return b}var K=G();var J=function ba(){function c(a,c){this.b=a;this.qa=0;this.a=c;this.fa=a.A.add(this)}c.prototype.Da=function(){return this.b.hb};c.prototype.Ba=function(){return this.b.jb};c.prototype.ob=function(a){if(!this.fa)throw"AsyncProxy.DependencyWorkers: Already unregistered";a=a>this.b.G?a:this.qa<this.b.G?this.b.G:this.b.nb();this.b.pb(a)};c.prototype.unregister=function(){if(!this.fa)throw"AsyncProxy.DependencyWorkers: Already unregistered";this.b.A.remove(this.fa);this.fa=null;if(0==this.b.A.l)this.b.ja||
(this.b.ended(),this.b.V());else if(this.qa===this.b.G){var a=this.b.nb();this.b.pb(a)}};asyncProxyScriptBlob.c(ba,"DependencyWorkersTaskHandle");return c}();var aa=function(){function b(){this.ja=!1;this.G=0;this.jb=null;this.Ha=this.N=this.hb=!1;this.Ka=null;this.mb=!1;this.W=null;this.A=new E;this.Ob=this.ra.bind(this);this.Qb=this.Ab.bind(this);this.la=this.ka=null;this.Pa=0;this.v=this.sa=this.Wa=this.Va=null}b.prototype.Ea=function(b,a,d,f){this.ka=b;this.Va=a;this.Wa=d;this.sa=f;this.v=new I};b.prototype.ended=function(){for(var b=this.v.o();null!=b;){var a=this.v.s(b).X,b=this.v.u(b);a.unregister()}for(b=this.A.o();null!=b;)if(a=this.A.s(b),b=
this.A.u(b),a.a.onTerminated)a.a.onTerminated();this.A.clear();this.v=[];this.Wa.remove(this.sa);this.sa=null};b.prototype.pb=function(b){if(this.G!==b){this.G=b;this.V();for(var a=this.v.o();null!=a;){var d=this.v.s(a).X,a=this.v.u(a);d.ob(b)}}};b.prototype.V=function(){this.W.statusUpdated({priority:this.G,hasListeners:0<this.A.l,isWaitingForWorkerResult:this.N,terminatedDependsTasks:this.Pa,dependsTasks:this.v.l})};b.prototype.nb=function(){for(var b=this.A,a=b.o(),d=0;null!=a;)d=b.s(a).qa,a=b.u(a);
return d};b.prototype.kb=function(b){this.hb=!0;this.jb=b;for(var a=this.A,d=a.o();null!=d;){var f=a.s(d),d=a.u(d);f.a.onData(b,this.ka)}};b.prototype.ra=function(){if(this.ja)throw"AsyncProxy.DependencyWorkers: already terminated";if(this.N)throw"AsyncProxy.DependencyWorkers: Cannot terminate while task is processing. Wait for statusUpdated() callback with isWaitingForWorkerResult == false";this.ja=!0;this.ended()};b.prototype.ub=function(){++this.Pa;this.V()};b.prototype.Ab=function(b){function a(a){f.W.onDependencyTaskResult(a,
b);e=!0}var d=this.v.Na(b,function(){return{X:null}});if(!d.Ga)throw"AsyncProxy.DependencyWorkers: Cannot add task dependency twice";var f=this,e=!1,g=!1;d.value.X=this.Va.La(b,{onData:a,onTerminated:function(){if(g)throw"AsyncProxy.DependencyWorkers: Double termination";g=!0;f.ub()}});setTimeout(function(){!e&&d.value.X.Da()&&a(d.X.Ba())})};return b}();function L(){function b(a){if(!a.getTaskOptions)throw"AsyncProxy.DependencyWorkers: No inputRetreiver.getTaskOptions() method";this.Sa=a}var c=self.asyncProxyScriptBlob;b.prototype.ia=function(){throw"AsyncProxy.WrapperInputRetreiverBase internal error: Not implemented createTaskContext()";};b.prototype.Jb=function(a){return this.Sa.getTaskOptions(a)};c.c(L,"WrapperInputRetreiverBase");return b}var M=L();function N(){function b(a,b,c,e){this.$a=a;this.P=b;this.T=c;this.a=e;this.da=null;this.Ya=[];this.Ra=[];this.D=1;this.Oa();for(a=0;a<b.length;++a)e.registerTaskDependency(b[a])}var c=self.asyncProxyScriptBlob;Object.defineProperty(b.prototype,"dependsOnTasks",{get:function(){return this.P}});b.prototype.Ja=function(a,b){if(1!==this.D)throw"AsyncProxy.PromiseTask: Internal Error: not waiting for tasks depends on";if(null===this.da){this.da=new I;for(var c=0;c<this.P.length;++c)this.da.Na(this.P[c],
function(){return c})}var e=this.da.gb(b);if(null===e)throw"AsyncProxy.PromiseTask: Task is not depends on key";this.Ya[e]=a;this.Ra[e]||(this.Ra[e]=!0)};b.prototype.Ma=function(a){a.hasListeners||a.isWaitingForWorkerResult?1===this.D?this.Oa(a):a.isWaitingForWorkerResult||3!==this.D||this.ya():this.ya("No listeners")};b.prototype.Ca=function(){return 0};b.prototype.Oa=function(a){var b=0;a&&(b=a.terminatedDependsTasks);if(b===this.P.length){var c=this;this.D=2;this.T.preWorkerProcess(this.Ya,this.P,
this.$a).then(function(a){4!==c.D&&(c.D=3,c.a.onDataReadyToProcess(a))})["catch"](function(a){c.ya(a)})}};b.prototype.ya=function(a){4!==this.D&&(this.D=4,this.a.onTerminated(a))};c.c(N,"PromiseTask");return b}var O=N();function P(){function b(a){M.call(this,a);this.Xa=a;if(!a.getDependsOnTasks)throw"AsyncProxy.DependencyWorkers: No promiseInputRetreiver.getDependsOnTasks() method";if(!a.preWorkerProcess)throw"AsyncProxy.DependencyWorkers: No promiseInputRetreiver.preWorkerProcess() method";}var c=self.asyncProxyScriptBlob;b.prototype=Object.create(M.prototype);b.prototype.ia=function(a,b){var c=this.Xa.getDependsOnTasks(a);return new O(a,c,this.Xa,b)};c.c(P,"PromiseWrapperInputRetreiver");return b}var Q=P();function R(b){function c(a){a=new Q(a);b.call(this,a)}var a=self.asyncProxyScriptBlob;c.prototype=Object.create(b.prototype);a.c(R,"PromiseDependencyWorkers",null,"DependencyWorkers");return c}var S=R(K);function T(){function b(a,b,c){this.M=a;this.$a=b;this.ua=this.w=null;this.a=c;this.Ua=this.zb.bind(this);this.sb={onDataReadyToProcess:this.yb.bind(this),onTerminated:this.ra.bind(this),registerTaskDependency:c.registerTaskDependency};this.ca=null;this.J=this.I=this.m=!1;this.K={isWaitingForWorkerResult:!1}}var c=self.asyncProxyScriptBlob;b.prototype.Xb=function(a){if(!a.statusUpdated)throw"AsyncProxy.DependencyWorkers: missing taskContext.statusUpdated()";if(!a.onDependencyTaskResult)throw"AsyncProxy.DependencyWorkers: missing taskContext.onDependencyTaskResult()";
if(!a.getTaskType)throw"AsyncProxy.DependencyWorkers: missing taskContext.getTaskType()";this.w=a};b.prototype.Ma=function(a){this.K=JSON.parse(JSON.stringify(a));this.tb(a);this.K.isWaitingForWorkerResult=a.isWaitingForWorkerResult||this.m;return this.w.statusUpdated(this.K)};b.prototype.Ja=function(a,b){return this.w.onDependencyTaskResult(a,b)};b.prototype.Ca=function(){return this.w.getTaskType()};b.prototype.yb=function(a,b){if(this.Ta)throw"AsyncProxy.DependencyWorkers: Data after termination";
if(b)this.ca=null,this.I=this.m&&!this.J,this.m=!1,this.a.onDataReadyToProcess(a,b),this.K.isWaitingForWorkerResult&&!this.m&&(this.K.isWaitingForWorkerResult=!1,this.w.statusUpdated(this.K));else{this.ca=a;this.I=!1;var c=this.m;this.m=!0;c||this.J||this.M.enqueueJob(this.Ua,this.w)}};b.prototype.zb=function(a,b){if(b!==this.w)throw"AsyncProxy.DependencyWorkers: Unexpected context";this.I&&(this.I=!1,this.M.jobDone(a,b));if(!this.m)throw"AsyncProxy.DependencyWorkers: !enqueuedProcessJob";this.J=
!0;this.m=!1;this.ua=a;this.a.onDataReadyToProcess(this.ca);this.ca=null};b.prototype.tb=function(a){if(this.J&&!a.isWaitingForWorkerResult){if(this.I)throw"AsyncProxy.DependencyWorkers: cancelPendingDataToProcess";this.J=!1;a=this.ua;this.ua=null;this.m&&this.M.enqueueJob(this.Ua,this.w);this.M.jobDone(a,this.w)}};b.prototype.ra=function(){if(this.Ta)throw"AsyncProxy.DependencyWorkers: Double termination";this.Ta=!0;this.I=this.m&&!this.J;this.m=!1;this.a.onTerminated()};c.c(T,"SchedulerTask");return b}
var U=T();function V(){function b(a,b){M.call(this,b);this.M=a;if(!b.createTaskContext)throw"AsyncProxy.DependencyWorkers: No inputRetreiver.createTaskContext() method";}var c=self.asyncProxyScriptBlob;b.prototype=Object.create(M.prototype);b.prototype.ia=function(a,b){var c=new U(this.M,a,b),e=this.Sa.createTaskContext(a,c.sb);c.Xb(e);return c};c.c(V,"SchedulerWrapperInputRetreiver");return b}var W=V();function X(b){function c(a,c){var e=new W(a,c);b.call(this,e);if(!c.createTaskContext)throw"AsyncProxy.DependencyWorkers: No inputRetreiver.createTaskContext() method";}var a=self.asyncProxyScriptBlob;c.prototype=Object.create(b.prototype);c.prototype.U=function(a){return b.prototype.U.call(this,a).w};a.c(X,"SchedulerDependencyWorkers",null,"DependencyWorkers");return c}var Y=X(K);function Z(){asyncProxyScriptBlob.c(Z,"ExportAsyncProxySymbols");asyncProxyScriptBlob.i("ExportAsyncProxySymbols(SubWorkerEmulationForChrome, AsyncProxySlaveSingleton, AsyncProxyMaster, ScriptsToImportPool, DependencyWorkers, DependencyWorkersTaskHandle, WrapperInputRetreiverBase, PromiseTask, PromiseWrapperInputRetreiver, PromiseDependencyWorkers, SchedulerTask, SchedulerWrapperInputRetreiver, SchedulerDependencyWorkers);");asyncProxyScriptBlob.i("self['AsyncProxy']['AsyncProxySlaveSingleton'] = AsyncProxySlaveSingleton;");
asyncProxyScriptBlob.i("self['AsyncProxy']['AsyncProxyMaster'] = AsyncProxyMaster;");asyncProxyScriptBlob.i("self['AsyncProxy']['ScriptsToImportPool'] = ScriptsToImportPool;");asyncProxyScriptBlob.i("self['AsyncProxy']['DependencyWorkers'] = DependencyWorkers;");asyncProxyScriptBlob.i("self['AsyncProxy']['WrapperInputRetreiverBase'] = WrapperInputRetreiverBase;");asyncProxyScriptBlob.i("self['AsyncProxy']['PromiseTask'] = PromiseTask;");asyncProxyScriptBlob.i("self['AsyncProxy']['PromiseWrapperInputRetreiver'] = PromiseWrapperInputRetreiver;");
asyncProxyScriptBlob.i("self['AsyncProxy']['PromiseDependencyWorkers'] = PromiseDependencyWorkers;");asyncProxyScriptBlob.i("self['AsyncProxy']['SchedulerTask'] = SchedulerTask;");asyncProxyScriptBlob.i("self['AsyncProxy']['SchedulerWrapperInputRetreiver'] = SchedulerWrapperInputRetreiver;");asyncProxyScriptBlob.i("self['AsyncProxy']['SchedulerDependencyWorkers'] = SchedulerDependencyWorkers;");return function(b,c,a,d,f,e,g,h,k,n,p,H,u){self.AsyncProxy=self.AsyncProxy||{};b.prototype.postMessage=
b.prototype.postMessage;b.prototype.terminate=b.prototype.terminate;c.setSlaveSideCreator=c.Vb;c.setBeforeOperationListener=c.Ub;c.sendUserDataToMaster=c.Tb;c.wrapPromiseFromSlaveSide=c.rb;c.wrapCallbackFromSlaveSide=c.qb;a.prototype.setUserDataHandler=a.prototype.Wb;a.prototype.terminate=a.prototype.terminate;a.prototype.callFunction=a.prototype.bb;a.prototype.wrapCallback=a.prototype.ac;a.prototype.freeCallback=a.prototype.eb;a.getEntryUrl=a.fb;d.prototype.addScriptFromErrorWithStackTrace=d.prototype.Eb;
d.prototype.getScriptsForWorkerImport=d.prototype.Ib;f.prototype.startTask=f.prototype.La;f.prototype.startTaskPromise=f.prototype.Yb;f.prototype.getTaskContext=f.prototype.U;e.prototype.hasData=e.prototype.Da;e.prototype.getLastData=e.prototype.Ba;e.prototype.setPriority=e.prototype.ob;e.prototype.unregister=e.prototype.unregister;g.prototype.getTaskOptions=g.prototype.Jb;h.prototype.onDependencyTaskResult=h.prototype.Ja;h.prototype.statusUpdated=h.prototype.Ma;h.prototype.getTaskType=h.prototype.Ca;
k.prototype.createTaskContext=k.prototype.ia;p.prototype.onDependencyTaskResult=p.prototype.Ja;p.prototype.statusUpdated=p.prototype.Ma;p.prototype.getTaskType=p.prototype.Ca;H.prototype.createTaskContext=H.prototype.ia;u.prototype.getTaskContext=u.prototype.U}}Z()(x,C,z,B,K,J,M,O,Q,S,U,W,Y);self.AsyncProxy.AsyncProxySlaveSingleton=C;self.AsyncProxy.AsyncProxyMaster=z;self.AsyncProxy.ScriptsToImportPool=B;self.AsyncProxy.DependencyWorkers=K;self.AsyncProxy.WrapperInputRetreiverBase=M;
self.AsyncProxy.PromiseTask=O;self.AsyncProxy.PromiseWrapperInputRetreiver=Q;self.AsyncProxy.PromiseDependencyWorkers=S;self.AsyncProxy.SchedulerTask=U;self.AsyncProxy.SchedulerWrapperInputRetreiver=W;self.AsyncProxy.SchedulerDependencyWorkers=Y;var I=function(){function b(){F.call(this,c)}var c={getHashCode:function(a){return a},isEqual:function(a,b){return a===b}};b.prototype=Object.create(F.prototype);return b}();
