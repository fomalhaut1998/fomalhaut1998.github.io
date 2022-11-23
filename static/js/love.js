// 相遇的函数
function meet1() {    // 有年份的
    var now = new Date().getTime();
    var start = new Date("06/25/2020 00:00:00").getTime(); // 在一起的时间
    var years = (now - start) / 1e3 / 60 / 60 / 24 / 365,
        ynum = Math.floor(years);
    var days = (now - start) / 1e3 / 60 / 60 / 24 - ynum * 365,
        dnum = Math.floor(days),
        hours = (now - start) / 1e3 / 60 / 60 - ynum * 365 * 24 - 24 * dnum,
        hnum = Math.floor(hours);
    1 == String(hnum).length && (hnum = "0" + hnum);
    var minutes = (now - start) / 1e3 / 60 - ynum * 365 * 1440 - 1440 * dnum - 60 * hnum,
        mnum = Math.floor(minutes);
    1 == String(mnum).length && (mnum = "0" + mnum);
    var seconds = (now - start) / 1e3 - ynum * 365 * 1440 * 60 - 86400 * dnum - 3600 * hnum - 60 * mnum,
        snum = Math.round(seconds);
    1 == String(snum).length && (snum = "0" + snum);
    document.getElementById("contentAA").innerHTML =
        `<font size=4><b>1. 认识小猫咪已经有 ${ynum} 年 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒 </b> <i id="heartbeat" class='fas fa-heartbeat' style='color:#2ce0e0'></i></font>`;
}

function meet2() {    // 没有年份的，只有天数
    var now = new Date().getTime();
    var start = new Date("06/25/2020 00:00:00").getTime(); // 在一起的时间
    var days = (now - start) / 1e3 / 60 / 60 / 24,
        dnum = Math.floor(days),
        hours = (now - start) / 1e3 / 60 / 60 - 24 * dnum,
        hnum = Math.floor(hours);
    1 == String(hnum).length && (hnum = "0" + hnum);
    var minutes = (now - start) / 1e3 / 60 - 1440 * dnum - 60 * hnum,
        mnum = Math.floor(minutes);
    1 == String(mnum).length && (mnum = "0" + mnum);
    var seconds = (now - start) / 1e3 - 86400 * dnum - 3600 * hnum - 60 * mnum,
        snum = Math.round(seconds);
    1 == String(snum).length && (snum = "0" + snum);
    document.getElementById("contentAA").innerHTML =
        `<font size=4><b>1. 认识小猫咪已经有 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒 </b> <i id="heartbeat" class='fas fa-heartbeat' style='color:#2ce0e0'></i></font>`;
}

// 在一起的函数
function together1() {    // 有年份的
    var now = new Date().getTime();
    var start = new Date("09/14/2020 00:00:00").getTime(); // 在一起的时间
    var years = (now - start) / 1e3 / 60 / 60 / 24 / 365,
        ynum = Math.floor(years);
    var days = (now - start) / 1e3 / 60 / 60 / 24 - ynum * 365,
        dnum = Math.floor(days),
        hours = (now - start) / 1e3 / 60 / 60 - ynum * 365 * 24 - 24 * dnum,
        hnum = Math.floor(hours);
    1 == String(hnum).length && (hnum = "0" + hnum);
    var minutes = (now - start) / 1e3 / 60 - ynum * 365 * 1440 - 1440 * dnum - 60 * hnum,
        mnum = Math.floor(minutes);
    1 == String(mnum).length && (mnum = "0" + mnum);
    var seconds = (now - start) / 1e3 - ynum * 365 * 1440 * 60 - 86400 * dnum - 3600 * hnum - 60 * mnum,
        snum = Math.round(seconds);
    1 == String(snum).length && (snum = "0" + snum);
    document.getElementById("contentBB").innerHTML =
        `<font size=4><b>2. 和小猫咪已经在一起 ${ynum} 年 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒 </b> <i id="heartbeat" class='fas fa-heartbeat' style='color:#e9d135'></i></font>`;
}

function together2() {    // 没有年份的，只有天数
    var now = new Date().getTime();
    var start = new Date("09/14/2020 00:00:00").getTime(); // 在一起的时间
    var days = (now - start) / 1e3 / 60 / 60 / 24,
        dnum = Math.floor(days),
        hours = (now - start) / 1e3 / 60 / 60 - 24 * dnum,
        hnum = Math.floor(hours);
    1 == String(hnum).length && (hnum = "0" + hnum);
    var minutes = (now - start) / 1e3 / 60 - 1440 * dnum - 60 * hnum,
        mnum = Math.floor(minutes);
    1 == String(mnum).length && (mnum = "0" + mnum);
    var seconds = (now - start) / 1e3 - 86400 * dnum - 3600 * hnum - 60 * mnum,
        snum = Math.round(seconds);
    1 == String(snum).length && (snum = "0" + snum);
    document.getElementById("contentBB").innerHTML =
        `<font size=4><b>2. 和小猫咪已经在一起 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒 </b> <i id="heartbeat" class='fas fa-heartbeat' style='color:#e9d135'></i></font>`;    
}


// 设置重复执行函数，周期1000ms
setInterval(together2, 1000);
setInterval(meet2, 1000);
