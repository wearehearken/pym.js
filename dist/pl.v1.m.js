/*! pym-loader.js - v1.1.4 - 2018-02-12 */

!function(a,b){var c=function(a){var b=document.createEvent("Event");b.initEvent("pym-loader:"+a,!0,!0),document.dispatchEvent(b)},d=function(a){return!!a&&(c("pym-initializing"),a.autoInit(),c("pym-initialized"),!0)},e="//assets.wearehearken.com/production/thirdparty/pym.v1.min.js";0===e.lastIndexOf("@@",0)&&(e="//pym.nprapps.org/pym.v1.min.js"),function(b){if(void 0!==a){b=b.split(".js")[0];var c="context_"+b.split("/").slice(-1)[0];return a.config({context:c,paths:{pym:b},shim:{pym:{exports:"pym"}}})(["require","pym"],function(a,b){d(b)}),!0}return!1}(e)||function(a){return void 0!==b&&"function"==typeof b.getScript&&(b.getScript(a).done(function(){d(window.pym)}),!0)}(e)||function(a){var b=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.src=a,c.onload=function(){b&&c.parentNode&&b.removeChild(c),d(window.pym)},b.appendChild(c)}(e);var f=function(){return document.removeEventListener("DOMContentLoaded",f),window.removeEventListener("load",f),d(window.pym)};window.document.addEventListener("DOMContentLoaded",f),window.addEventListener("load",f)}(window.requirejs,window.jQuery);