!function e(t,n,r){function o(a,s){if(!n[a]){if(!t[a]){var l="function"==typeof require&&require;if(!s&&l)return l(a,!0);if(i)return i(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var c=n[a]={exports:{}};t[a][0].call(c.exports,function(e){var n=t[a][1][e];return o(n?n:e)},c,c.exports,e,t,n,r)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(e,t,n){function r(){Window.Application=new o,Backbone.history.start()}var o=(e("hbsfy/runtime"),e("./classes/routers/Application.js"));r()},{"./classes/routers/Application.js":6,"hbsfy/runtime":16}],2:[function(e,t,n){var r=e("hbsfy/runtime");t.exports=r.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,n,r){var o,i="function",a=t.helperMissing,s=this.escapeExpression;return'<picture >\n        <img class="foto" src="'+s((o=null!=(o=t.path||(null!=e?e.path:e))?o:a,typeof o===i?o.call(e,{name:"path",hash:{},data:r}):o))+'">\n</picture>'},useData:!0})},{"hbsfy/runtime":16}],3:[function(e,t,n){var r=e("hbsfy/runtime");t.exports=r.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,n,r){return'<div class="bla"></div>'},useData:!0})},{"hbsfy/runtime":16}],4:[function(e,t,n){var r=e("../models/Foto.js"),o=Backbone.Collection.extend({model:r,url:"api/photos",sync:function(e,t,n){t.methodUrl&&t.methodUrl(e.toLowerCase())&&(n=n||{},n.url=t.methodUrl(e.toLowerCase())),Backbone.Collection.prototype.sync.apply(this,arguments)}});t.exports=o},{"../models/Foto.js":5}],5:[function(e,t,n){var r=Backbone.Model.extend({defaults:{username:"Brodelet",path:"uploads/5575be50c1363.png"},urlRoot:"api/photos",sync:function(e,t,n){t.methodUrl&&t.methodUrl(e.toLowerCase())&&(n=n||{},n.url=t.methodUrl(e.toLowerCase())),Backbone.Collection.prototype.sync.apply(this,arguments)}});t.exports=r},{}],6:[function(e,t,n){var r=e("../views/HomeView.js"),o=(e("../collections/FotoCollection.js"),Backbone.Router.extend({routes:{home:"home","*actions":"default"},empty:function(){$(".container").empty()},"default":function(){this.navigate("home",{trigger:!0})},home:function(){this.empty(),this.home=new r,$(".container").append(this.home.render().el)}}));t.exports=o},{"../collections/FotoCollection.js":4,"../views/HomeView.js":8}],7:[function(e,t,n){var r=e("../../../_hbs/foto.hbs"),o=Backbone.View.extend({template:r,events:{},initialize:function(){},render:function(){return this.$el.html(this.template(this.model.attributes)),this}});t.exports=o},{"../../../_hbs/foto.hbs":2}],8:[function(e,t,n){var r=e("../collections/FotoCollection.js"),o=e("../../../_hbs/home.hbs"),i=e("./FotoView.js"),a=Backbone.View.extend({template:o,events:{},initialize:function(){this.collection=new r,this.listenTo(this.collection,"sync",this.renderFotos),this.collection.fetch()},renderFotos:function(){this.$fotos.empty(),this.collection.forEach(this.renderFoto,this)},renderFoto:function(e){var t=new i({model:e});this.$fotos.append(t.render().el)},render:function(){return this.$el.html(this.template()),this.$fotos=this.$el.find(".bla"),this}});t.exports=a},{"../../../_hbs/home.hbs":3,"../collections/FotoCollection.js":4,"./FotoView.js":7}],9:[function(e,t,n){"use strict";var r=e("./handlebars/base"),o=e("./handlebars/safe-string")["default"],i=e("./handlebars/exception")["default"],a=e("./handlebars/utils"),s=e("./handlebars/runtime"),l=function(){var e=new r.HandlebarsEnvironment;return a.extend(e,r),e.SafeString=o,e.Exception=i,e.Utils=a,e.escapeExpression=a.escapeExpression,e.VM=s,e.template=function(t){return s.template(t,e)},e},u=l();u.create=l,u["default"]=u,n["default"]=u},{"./handlebars/base":10,"./handlebars/exception":11,"./handlebars/runtime":12,"./handlebars/safe-string":13,"./handlebars/utils":14}],10:[function(e,t,n){"use strict";function r(e,t){this.helpers=e||{},this.partials=t||{},o(this)}function o(e){e.registerHelper("helperMissing",function(){if(1===arguments.length)return void 0;throw new a("Missing helper: '"+arguments[arguments.length-1].name+"'")}),e.registerHelper("blockHelperMissing",function(t,n){var r=n.inverse,o=n.fn;if(t===!0)return o(this);if(t===!1||null==t)return r(this);if(c(t))return t.length>0?(n.ids&&(n.ids=[n.name]),e.helpers.each(t,n)):r(this);if(n.data&&n.ids){var a=v(n.data);a.contextPath=i.appendContextPath(n.data.contextPath,n.name),n={data:a}}return o(t,n)}),e.registerHelper("each",function(e,t){if(!t)throw new a("Must pass iterator to #each");var n,r,o=t.fn,s=t.inverse,l=0,u="";if(t.data&&t.ids&&(r=i.appendContextPath(t.data.contextPath,t.ids[0])+"."),p(e)&&(e=e.call(this)),t.data&&(n=v(t.data)),e&&"object"==typeof e)if(c(e))for(var h=e.length;h>l;l++)n&&(n.index=l,n.first=0===l,n.last=l===e.length-1,r&&(n.contextPath=r+l)),u+=o(e[l],{data:n});else for(var f in e)e.hasOwnProperty(f)&&(n&&(n.key=f,n.index=l,n.first=0===l,r&&(n.contextPath=r+f)),u+=o(e[f],{data:n}),l++);return 0===l&&(u=s(this)),u}),e.registerHelper("if",function(e,t){return p(e)&&(e=e.call(this)),!t.hash.includeZero&&!e||i.isEmpty(e)?t.inverse(this):t.fn(this)}),e.registerHelper("unless",function(t,n){return e.helpers["if"].call(this,t,{fn:n.inverse,inverse:n.fn,hash:n.hash})}),e.registerHelper("with",function(e,t){p(e)&&(e=e.call(this));var n=t.fn;if(i.isEmpty(e))return t.inverse(this);if(t.data&&t.ids){var r=v(t.data);r.contextPath=i.appendContextPath(t.data.contextPath,t.ids[0]),t={data:r}}return n(e,t)}),e.registerHelper("log",function(t,n){var r=n.data&&null!=n.data.level?parseInt(n.data.level,10):1;e.log(r,t)}),e.registerHelper("lookup",function(e,t){return e&&e[t]})}var i=e("./utils"),a=e("./exception")["default"],s="2.0.0";n.VERSION=s;var l=6;n.COMPILER_REVISION=l;var u={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1"};n.REVISION_CHANGES=u;var c=i.isArray,p=i.isFunction,h=i.toString,f="[object Object]";n.HandlebarsEnvironment=r,r.prototype={constructor:r,logger:d,log:m,registerHelper:function(e,t){if(h.call(e)===f){if(t)throw new a("Arg not supported with multiple helpers");i.extend(this.helpers,e)}else this.helpers[e]=t},unregisterHelper:function(e){delete this.helpers[e]},registerPartial:function(e,t){h.call(e)===f?i.extend(this.partials,e):this.partials[e]=t},unregisterPartial:function(e){delete this.partials[e]}};var d={methodMap:{0:"debug",1:"info",2:"warn",3:"error"},DEBUG:0,INFO:1,WARN:2,ERROR:3,level:3,log:function(e,t){if(d.level<=e){var n=d.methodMap[e];"undefined"!=typeof console&&console[n]&&console[n].call(console,t)}}};n.logger=d;var m=d.log;n.log=m;var v=function(e){var t=i.extend({},e);return t._parent=e,t};n.createFrame=v},{"./exception":11,"./utils":14}],11:[function(e,t,n){"use strict";function r(e,t){var n;t&&t.firstLine&&(n=t.firstLine,e+=" - "+n+":"+t.firstColumn);for(var r=Error.prototype.constructor.call(this,e),i=0;i<o.length;i++)this[o[i]]=r[o[i]];n&&(this.lineNumber=n,this.column=t.firstColumn)}var o=["description","fileName","lineNumber","message","name","number","stack"];r.prototype=new Error,n["default"]=r},{}],12:[function(e,t,n){"use strict";function r(e){var t=e&&e[0]||1,n=p;if(t!==n){if(n>t){var r=h[n],o=h[t];throw new c("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+r+") or downgrade your runtime to an older version ("+o+").")}throw new c("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+e[1]+").")}}function o(e,t){if(!t)throw new c("No environment passed to template");if(!e||!e.main)throw new c("Unknown template object: "+typeof e);t.VM.checkRevision(e.compiler);var n=function(n,r,o,i,a,s,l,p,h){a&&(i=u.extend({},i,a));var f=t.VM.invokePartial.call(this,n,o,i,s,l,p,h);if(null==f&&t.compile){var d={helpers:s,partials:l,data:p,depths:h};l[o]=t.compile(n,{data:void 0!==p,compat:e.compat},t),f=l[o](i,d)}if(null!=f){if(r){for(var m=f.split("\n"),v=0,g=m.length;g>v&&(m[v]||v+1!==g);v++)m[v]=r+m[v];f=m.join("\n")}return f}throw new c("The partial "+o+" could not be compiled when running in runtime-only mode")},r={lookup:function(e,t){for(var n=e.length,r=0;n>r;r++)if(e[r]&&null!=e[r][t])return e[r][t]},lambda:function(e,t){return"function"==typeof e?e.call(t):e},escapeExpression:u.escapeExpression,invokePartial:n,fn:function(t){return e[t]},programs:[],program:function(e,t,n){var r=this.programs[e],o=this.fn(e);return t||n?r=i(this,e,o,t,n):r||(r=this.programs[e]=i(this,e,o)),r},data:function(e,t){for(;e&&t--;)e=e._parent;return e},merge:function(e,t){var n=e||t;return e&&t&&e!==t&&(n=u.extend({},t,e)),n},noop:t.VM.noop,compilerInfo:e.compiler},o=function(t,n){n=n||{};var i=n.data;o._setup(n),!n.partial&&e.useData&&(i=l(t,i));var a;return e.useDepths&&(a=n.depths?[t].concat(n.depths):[t]),e.main.call(r,t,r.helpers,r.partials,i,a)};return o.isTop=!0,o._setup=function(n){n.partial?(r.helpers=n.helpers,r.partials=n.partials):(r.helpers=r.merge(n.helpers,t.helpers),e.usePartial&&(r.partials=r.merge(n.partials,t.partials)))},o._child=function(t,n,o){if(e.useDepths&&!o)throw new c("must pass parent depths");return i(r,t,e[t],n,o)},o}function i(e,t,n,r,o){var i=function(t,i){return i=i||{},n.call(e,t,e.helpers,e.partials,i.data||r,o&&[t].concat(o))};return i.program=t,i.depth=o?o.length:0,i}function a(e,t,n,r,o,i,a){var s={partial:!0,helpers:r,partials:o,data:i,depths:a};if(void 0===e)throw new c("The partial "+t+" could not be found");return e instanceof Function?e(n,s):void 0}function s(){return""}function l(e,t){return t&&"root"in t||(t=t?f(t):{},t.root=e),t}var u=e("./utils"),c=e("./exception")["default"],p=e("./base").COMPILER_REVISION,h=e("./base").REVISION_CHANGES,f=e("./base").createFrame;n.checkRevision=r,n.template=o,n.program=i,n.invokePartial=a,n.noop=s},{"./base":10,"./exception":11,"./utils":14}],13:[function(e,t,n){"use strict";function r(e){this.string=e}r.prototype.toString=function(){return""+this.string},n["default"]=r},{}],14:[function(e,t,n){"use strict";function r(e){return u[e]}function o(e){for(var t=1;t<arguments.length;t++)for(var n in arguments[t])Object.prototype.hasOwnProperty.call(arguments[t],n)&&(e[n]=arguments[t][n]);return e}function i(e){return e instanceof l?e.toString():null==e?"":e?(e=""+e,p.test(e)?e.replace(c,r):e):e+""}function a(e){return e||0===e?d(e)&&0===e.length?!0:!1:!0}function s(e,t){return(e?e+".":"")+t}var l=e("./safe-string")["default"],u={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},c=/[&<>"'`]/g,p=/[&<>"'`]/;n.extend=o;var h=Object.prototype.toString;n.toString=h;var f=function(e){return"function"==typeof e};f(/x/)&&(f=function(e){return"function"==typeof e&&"[object Function]"===h.call(e)});var f;n.isFunction=f;var d=Array.isArray||function(e){return e&&"object"==typeof e?"[object Array]"===h.call(e):!1};n.isArray=d,n.escapeExpression=i,n.isEmpty=a,n.appendContextPath=s},{"./safe-string":13}],15:[function(e,t,n){t.exports=e("./dist/cjs/handlebars.runtime")},{"./dist/cjs/handlebars.runtime":9}],16:[function(e,t,n){t.exports=e("handlebars/runtime")["default"]},{"handlebars/runtime":15}]},{},[1]);
//# sourceMappingURL=app.js.map