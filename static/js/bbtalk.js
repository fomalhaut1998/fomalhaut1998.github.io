let jsonUrl = 'https://kkapi.fomal.cc/api/ispeak?author=6319fedef46fae97dcfa5ee2' // 在这修改api

document.getElementById('bber-talk').addEventListener('click', () => {
    window.location.pathname = '/bb/' // 在这修改你的哔哔页面地址
})

bbtalk();

function bbtalk() {
    let data = JSON.parse(localStorage.getItem('bibi'));
    let nowTime = Date.now();
    let ls;
    if (data == null || nowTime - data.time >= 1800000) { // 设置缓存时长，单位毫秒，默认30分钟，建议10分钟以上，不能为0，想不缓存自己改代码。
        getData();
        return
    } else {
        ls = JSON.parse(data.ls)
    };
    let bberHtml = ''
    ls.forEach((item, i) => {
        let br = /[\s\uFEFF\xA0]+/g;
        item.content = item.content.replace(br, '')
        let d = new Date(item.createdAt)
        let date = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
        let dataTime = timeago.format(date, 'zh_CN');
        let newdataTime = '<span class="datatime">' + dataTime + '</span>'

        bberHtml += '<li class="item item-' + (i + 1) + '">' + newdataTime + '： ' + urlToLink(item.content) + '</li>'
    });
    document.getElementById("bber-talk").innerHTML += '<i style="margin-right: 10px;" class="fa-regular fa-message"></i><ul class="talk-list">' + bberHtml + '</ul><i class="fa-solid fa-angles-right pass bber-icon"></i>'
}

function getData() {
    fetch(jsonUrl)
        .then(res => res.json())
        .then((data) => {
            data = { time: Date.now(), ls: JSON.stringify(data.data.items) }
            localStorage.setItem('bibi', JSON.stringify(data))
        }).then(() => {
            bbtalk();
        }).catch(() => {
            console.log('获取哔哔数据失败！');
        });
}

function urlToLink(str) {
    let re_forimg = /<img(.*?)src=[\"|\']?(.*?)[\"|\']?(.*?)>|!\[(.*?)\]\((.*?)\)/g;
    str = str.replace(re_forimg, '<i class="fa-solid fa-image"></i>');
    return str
}

function Roll() {
    try {
        let list_li = Array.prototype.slice.call(document.querySelectorAll('.talk-list li'));
        let tmp = list_li[0];
        list_li.splice(0, 1);
        list_li.push(tmp);
        let list = document.querySelector('ul.talk-list')
        list_li.forEach((item) => {
            list.appendChild(item)
        });
    } catch (error) { }
};
setInterval(Roll, 3000);