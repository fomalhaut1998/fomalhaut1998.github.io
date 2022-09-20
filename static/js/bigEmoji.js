// 如果当前页有评论就执行函数
if (document.getElementById('post-comment')) owoBig();
// 表情放大
function owoBig() {
    let flag = 1, // 设置节流阀
        owo_time = '', // 设置计时器
        m = 3; // 设置放大倍数
    // 创建盒子
    let div = document.createElement('div'),
        body = document.querySelector('body');
    // 设置ID
    div.id = 'owo-big';
    // 插入盒子
    body.appendChild(div)

    // 构造observer
    let observer = new MutationObserver(mutations => {

        for (let i = 0; i < mutations.length; i++) {
            let dom = mutations[i].addedNodes,
                owo_body = '';
            if (dom.length == 2 && dom[1].className == 'OwO-body') owo_body = dom[1];
            // 如果需要在评论内容中启用此功能请解除下面的注释
            // else if (dom.length == 1 && dom[0].className == 'tk-comment') owo_body = dom[0];
            else continue;

            // 禁用右键（手机端长按会出现右键菜单，为了体验给禁用掉）
            if (document.body.clientWidth <= 768) owo_body.addEventListener('contextmenu', e => e.preventDefault());
            // 鼠标移入
            owo_body.onmouseover = (e) => {
                if (flag && e.target.tagName == 'IMG') {
                    flag = 0;
                    // 移入300毫秒后显示盒子
                    owo_time = setTimeout(() => {
                        let height = e.path[0].clientHeight * m, // 盒子高
                            width = e.path[0].clientWidth * m, // 盒子宽
                            left = (e.x - e.offsetX) - (width - e.path[0].clientWidth) / 2, // 盒子与屏幕左边距离
                            top = e.y - e.offsetY; // 盒子与屏幕顶部距离

                        if ((left + width) > body.clientWidth) left -= ((left + width) - body.clientWidth + 10); // 右边缘检测，防止超出屏幕
                        if (left < 0) left = 10; // 左边缘检测，防止超出屏幕
                        // 设置盒子样式
                        div.style.cssText = `display:flex; height:${height}px; width:${width}px; left:${left}px; top:${top}px;`;
                        // 在盒子中插入图片
                        div.innerHTML = `<img src="${e.target.src}">`
                    }, 300);
                }
            };
            // 鼠标移出隐藏盒子
            owo_body.onmouseout = () => { div.style.display = 'none', flag = 1, clearTimeout(owo_time); }
        }

    })
    observer.observe(document.getElementById('post-comment'), { subtree: true, childList: true }) // 监听的 元素 和 配置项
}