// 复制提醒
document.addEventListener("copy", function (e) {
    new Vue({
        data: function () {
            this.$notify({
                title: "哎嘿！复制成功🍬",
                message: "若要转载最好保留原文链接哦，给你一个大大的赞！",
                position: 'top-left',
                offset: 50,
                showClose: true,
                type: "success"
            });
            // return { visible: false }
        }
    })
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

// 禁用f12
document.onkeydown = function (e) {
    if (123 == e.keyCode || (e.ctrlKey && e.shiftKey && (74 === e.keyCode || 73 === e.keyCode || 67 === e.keyCode)) || (e.ctrlKey && 85 === e.keyCode)) {
        event.keyCode = 0;
        event.returnValue = false;
        new Vue({
            data: function () {
                this.$notify({
                    title: "你已被发现😜",
                    message: "你太坏了，这里可不允许查看源码哦！",
                    position: 'top-left',
                    offset: 50,
                    showClose: true,
                    type: "warning"
                });
                return { visible: false }
            }
        })
        return false;
    }
};

