// 防抖全局计时器
let TT = null;    //time用来控制事件的触发
// 防抖函数:fn->逻辑 time->防抖时间
function debounce(fn, time) {
    if (TT !== null) clearTimeout(TT);
    TT = setTimeout(fn, time);
}

// 复制提醒
document.addEventListener("copy", function () {
    debounce(function () {
        new Vue({
            data: function () {
                this.$notify({
                    title: "哎嘿！复制成功🍬",
                    message: "若要转载最好保留原文链接哦，给你一个大大的赞！",
                    position: 'top-left',
                    offset: 50,
                    showClose: true,
                    type: "success",
                    duration: 5000
                });
            }
        })
    }, 500);
})

/* 禁用F12按键并提醒 */
// document.onkeydown = function () {
//     if (window.event && window.event.keyCode == 123) {
//         event.keyCode = 0;
//         event.returnValue = false;
//         new Vue({
//             data: function () {
//                 this.$notify({
//                     title: "喂喂，小伙子你在干嘛！",
//                     message: "你太坏了，这里可不允许查看源码哦！",
//                     position: 'top-left',
//                     offset: 50,
//                     showClose: false,
//                     type: "error"
//                 });
//                 return { visible: false }
//             }
//         })
//         return false;
//     }
// };

// f12提醒但不禁用
document.onkeydown = function (e) {
    if (123 == e.keyCode || (e.ctrlKey && e.shiftKey && (74 === e.keyCode || 73 === e.keyCode || 67 === e.keyCode)) || (e.ctrlKey && 85 === e.keyCode)) {
        debounce(function () {
            new Vue({
                data: function () {
                    this.$notify({
                        title: "你已被发现😜",
                        message: "小伙子，扒源记住要遵循GPL协议！",
                        position: 'top-left',
                        offset: 50,
                        showClose: true,
                        type: "warning",
                        duration: 5000
                    });
                }
            })
        }, 500);
    }
};

