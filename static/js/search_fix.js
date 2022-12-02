searchSize();
window.addEventListener('resize', searchSize)
// 搜索窗口自适应
function searchSize() {
    // 只需要适应手机端
    if (document.body.clientWidth > 768) return
    let div = document.querySelector('#algolia-hits')
    // 监听插入，如果有插入则根据可视高度动态设置最大高度
    div.addEventListener('DOMNodeInserted', () => {
        div.children[0].style.maxHeight = (document.documentElement.clientHeight - 210) + 'px'
    })
}