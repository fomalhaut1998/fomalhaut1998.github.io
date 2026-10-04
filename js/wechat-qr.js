/*!
 * 社交二维码点击 → 同页灯箱展示（不跳转、不下载）
 * 背景：二维码放在缤纷云 S4 默认域名上，返回 Content-Disposition: attachment，
 *      浏览器直接导航会变成下载；这里就地接管点击，用主题自带的 Fancybox 弹层显示。
 * 生效对象：a.social-icon[title="微信"] / [title="QQ"] / href 里带 QRCode 的社交图标。
 * 做法：文档级事件委托（capture 阶段）。不依赖“元素何时被绑定”，作者卡被 pjax
 *      或其它脚本重建后依然生效；脚本执行本身也留了 data-wechat-qr 标记便于排查。
 * 依赖：主题 fancybox: true（Fancybox v4，全局名 Fancybox）。未就绪时用自建遮罩兜底
 *      （不能用 window.open —— 缤纷云那个 attachment 响应头会让新标签页变下载）。
 * 回滚：删掉 _config.fomalhaut.yml inject.bottom 里的 <script defer src="/js/wechat-qr.js"><\/script> 以及本文件即可。
 */
!function(){"use strict";function t(t){var e=t.getAttribute("title")||"";return(e?e+" · ":"")+"扫码添加好友"}function e(e,n){window.Fancybox&&"function"==typeof window.Fancybox.show?window.Fancybox.show([{src:n,type:"image",caption:t(e)}],{}):function(t,e){var n=document.createElement("div");n.style.cssText="position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.78);display:flex;align-items:center;justify-content:center;cursor:zoom-out";var i=document.createElement("div");i.style.cssText="background:#fff;border-radius:12px;padding:16px;max-width:min(420px,86vw);text-align:center;box-shadow:0 12px 40px rgba(0,0,0,.4)";var o=document.createElement("img");o.src=t,o.alt=e,o.style.cssText="display:block;width:100%;height:auto";var a=document.createElement("p");a.textContent=e,a.style.cssText="margin:10px 0 0;color:#333;font-size:14px",i.appendChild(o),i.appendChild(a),n.appendChild(i),n.addEventListener("click",(function(){n.remove()})),document.body.appendChild(n)}(n,t(e))}document.documentElement.setAttribute("data-wechat-qr","ready"),document.addEventListener("click",(function(t){var n=t.target,i=n&&n.closest?n.closest('a.social-icon[title="微信"], a.social-icon[title="QQ"], a.social-icon[href*="QRCode"]'):null;if(i){var o=i.getAttribute("href")||i.getAttribute("data-href");o&&(t.preventDefault(),t.stopPropagation(),e(i,o))}}),!0)}();