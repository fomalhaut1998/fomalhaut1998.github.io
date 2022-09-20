function welcome() {
    let welcome_text = '欢迎光顾小站~'
    if (document.referrer !== '') {
        let referrer = document.referrer.split("/")[2];
        welcome_text = "欢迎您，来自" + referrer.toUpperCase() + "的用户！";
        if (referrer.toUpperCase() == document.domain.toUpperCase()) return;
    }
    swal({
        title: "♪(^∇^)",
        text: welcome_text + '\n🛸主域名：fomal.cc\n🚀备用域名1：blog.fomal.cc\n🛵备用域名2：aa.fomal.cc\n🚁备用域名3：bb.fomal.cc',
        imageUrl: "/assets/咖啡.png",
        timer: 8000,
        showConfirmButton: true
    });
}
$(document).ready(() => {
    welcome()
})