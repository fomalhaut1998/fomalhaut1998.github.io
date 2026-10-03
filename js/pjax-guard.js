/*!
 * pjax-guard.js —— 修 pjax 选择器不匹配导致的「换页退回整页刷新」与「加载遮罩一直转圈」
 *
 * 【问题】themes/fomalhaut/layout/includes/third-party/pjax.pug:6 的 pjaxSelectors 里写死了
 *   '#tag-echarts'、'#posts-echart'、'#categories-echarts'，而这三个 id 只存在于文章统计页（/tags/，由主题
 *   layout/includes/page/echarts.pug 渲染）。pjax 的 switches-selectors 在切换前会逐个比对「新文档 / 旧文档里
 *   该选择器的元素个数」，只要有一个不一致就 throw：
 *       DOM doesn’t look the same on new loaded page: ’#tag-echarts’ - new 0, old 1
 *   这个异常被 handle-response 捕获后：只触发 pjax:error（**不触发 pjax:complete**），并且调用
 *   latestChance(href) → window.location = href，也就是直接退回整页跳转。因此：
 *     ① 离开 /tags/（新旧文档里这三个 id 由 1 变 0）或进入 /tags/（由 0 变 1）都会被强制整页刷新；
 *     ② 遮罩在 pjax:send 里被 preloader.initLoading() 打开，而负责关闭它的 preloader.endLoading()
 *        是 pjax:complete 处理器的最后一句 —— complete 永远不来，遮罩就一直转（用户 2026-10-05 报的 bug）。
 *
 * 【本文件做两件事，都不需要改主题源码】
 *   1) 运行期把这三个选择器从 pjax 的 selectors 里摘掉 —— 图表脚本依旧会被 '#body-wrap' 这一项重执行，
 *      换页后图表照常重建，功能不受影响；
 *   2) 兜底层：pjax:send 后 6 秒仍未收到 pjax:complete、收到 pjax:error、以及页面从 bfcache 恢复时，
 *      都把加载遮罩关掉（preloader.endLoading()），保证任何意外都不会把读者困在加载动画里。
 * 回滚：删掉本文件，并去掉 _config.fomalhaut.yml 里引用它的那一行。
 */
!function(){"use strict";var t=["#tag-echarts","#posts-echart","#categories-echarts"];function n(n){return n&&"[object Array]"===Object.prototype.toString.call(n.selectors)&&(n.selectors=n.selectors.filter((function(n){return-1===t.indexOf(n)}))),n}function e(){var t=window.Pjax;if(t&&!t.__pjaxGuardWrapped){t=e(t);try{Object.defineProperty(window,"Pjax",{configurable:!0,get:function(){return t},set:function(n){t=e(n)}})}catch(n){window.Pjax=t}}function e(t){if("function"!=typeof t||t.__pjaxGuardWrapped)return t;function e(e){return new t(n(e))}for(var r in e.__pjaxGuardWrapped=!0,e.prototype=t.prototype,t)if(Object.prototype.hasOwnProperty.call(t,r))try{e[r]=t[r]}catch(t){}return e}}function r(){try{if("undefined"!=typeof postsOption)return!0}catch(t){}return!!(window.postsChart||window.tagsChart||window.categoriesChart)}var o=/<script[^>]+src=["']([^"']*echarts[^"']*\.js)["']/i;function a(t,n){var e=window.__pjaxGuardEcharts;if(e)e.push(n);else{e=window.__pjaxGuardEcharts=[n];var r=function(){window.__pjaxGuardEcharts=null;for(var t=0;t<e.length;t++)try{e[t]()}catch(t){}},o=document.createElement("script");o.src=t,o.onload=r,o.onerror=r,document.head.appendChild(o)}}function i(){try{var t=window.Pjax&&window.Pjax.prototype;if(!t||t.__pjaxGuardSanitize||"function"!=typeof t.loadContent)return;t.__pjaxGuardSanitize=!0;var n=t.loadContent;t.loadContent=function(t){if("string"!=typeof t)return n.apply(this,arguments);var e=Array.prototype.slice.call(arguments);if(void 0===window.echarts){var i=o.exec(t);if(i){var c=this;return void a(i[1],(function(){n.apply(c,e)}))}}return-1!==t.indexOf("let postsOption")&&r()&&(e[0]=t.replace(/let(\s+postsOption\b)/g,"window.__pjaxPostsOption")),n.apply(this,e)}}catch(t){}}function c(){try{window.pjax&&window.pjax.options&&n(window.pjax.options)}catch(t){}}function p(t){try{"object"==typeof preloader&&preloader&&"function"==typeof preloader.endLoading&&preloader.endLoading()}catch(t){}}e(),i(),c(),document.addEventListener("pjax:complete",(function(){e(),i(),c()})),document.addEventListener("pjax:success",(function(){e(),i(),c()}));var d=null;document.addEventListener("pjax:send",(function(){d&&clearTimeout(d),d=setTimeout((function(){d=null,p()}),6e3)})),document.addEventListener("pjax:complete",(function(){d&&(clearTimeout(d),d=null)})),document.addEventListener("pjax:error",(function(){d&&(clearTimeout(d),d=null),p()})),window.addEventListener("pageshow",(function(t){t&&t.persisted&&p()}))}();