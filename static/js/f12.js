// 复制提醒
document.addEventListener("copy", function (e) {
    new Vue({
        data: function () {
            this.$notify({
                title: "哎嘿！复制成功",
                message: "若要转载最好保留原文链接哦，给你一个大大的赞！",
                position: 'top- left',
                offset: 50,
                showClose: true,
                type: "success"
            });
            return { visible: false }
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

/* 可以用F12但是会提醒 */
document.onkeydown = function () {
    if (window.event && window.event.keyCode == 123) {
        new Vue({
            data: function () {
                this.$notify({
                    title: "喂喂，我看见你在扒源码了！",
                    message: "小伙子，开发者模式打开后请遵循GPL协议！",
                    position: 'top-left',
                    offset: 50,
                    showClose: true,
                    type: "warning"
                });
            }
        })
    }
};