/*!
 * author-status.js —— 侧栏个人信息卡片右上角「状态胶囊」随时间和节假日自动切换
 * ==================================================================
 * 模板里的表情与文字是写死的（card_author.pug 的 🎯 专注学习中），所以这里用 JS 覆盖。
 * 四种状态，第一命中即用：
 *   睡觉中zzz   😴   23:00–07:00（任何日子）
 *   放假摸鱼中  🏖️  周末 + 法定节假日（含调休放假，见 HOLIDAYS）
 *   上班摸鱼中  🐟   工作日 07:00–18:00
 *   下班玩耍中  🎮   工作日 18:00–23:00
 *
 * 依赖：无。页面里没有这张卡片时什么都不做；pjax 换页后重新应用；每 60 秒校准一次。
 * 维护：国务院办公厅每年 11 月左右公布次年放假安排，照 HOLIDAYS / WORKDAYS 的格式追加即可
 *       （HOLIDAYS = 放假的日子，WORKDAYS = 周末但要补班的日子，写成 YYYY-MM-DD）。
 *       年份没在表里的，只按「周末 = 放假」判断。
 * 调试：控制台 authorStatus.compute(new Date('2026-10-03T10:00:00')) 看某时刻会显示什么。
 */
!function(t){"use strict";var e=["2026-01-01","2026-01-02","2026-01-03","2026-02-15","2026-02-16","2026-02-17","2026-02-18","2026-02-19","2026-02-20","2026-02-21","2026-02-22","2026-02-23","2026-04-04","2026-04-05","2026-04-06","2026-05-01","2026-05-02","2026-05-03","2026-05-04","2026-05-05","2026-06-19","2026-06-20","2026-06-21","2026-09-25","2026-09-26","2026-09-27","2026-10-01","2026-10-02","2026-10-03","2026-10-04","2026-10-05","2026-10-06","2026-10-07"],n=["2026-01-04","2026-02-14","2026-02-28","2026-05-09","2026-09-20","2026-10-10"],o={};function r(t){return(t<10?"0":"")+t}function a(t){var e=o[function(t){return t.getFullYear()+"-"+r(t.getMonth()+1)+"-"+r(t.getDate())}(t)];if(e)return"holiday"===e;var n=t.getDay();return 0===n||6===n}function u(t){var e=t||new Date,n=e.getHours();return n>=23||n<7?{emoji:"😴",text:"睡觉中zzz"}:a(e)?{emoji:"🏖️",text:"放假摸鱼中"}:n>=7&&n<18?{emoji:"🐟",text:"上班摸鱼中"}:{emoji:"🎮",text:"下班玩耍中"}}function i(t){var e=(t||document).querySelector(".card-info .author-status");if(!e)return null;var n=u(),o=e.querySelector("g-emoji"),r=e.querySelector("span");return o&&o.textContent.trim()!==n.emoji&&(o.textContent=n.emoji),r&&r.textContent!==n.text&&(r.textContent=n.text),n}function c(){i(),document.addEventListener("pjax:complete",(function(){i()})),setInterval(i,6e4)}e.forEach((function(t){o[t]="holiday"})),n.forEach((function(t){o[t]="workday"})),t.authorStatus={compute:u,apply:i,isHoliday:a,holidays:e,workdays:n},"loading"===document.readyState?document.addEventListener("DOMContentLoaded",c):c()}(window);