// 存数据
// name：命名 data：数据
function saveData(name, data) {
  localStorage.setItem(name, JSON.stringify({ time: Date.now(), data: data }));
}

// 取数据
// name：命名 time：过期时长,单位分钟,如传入30,即加载数据时如果超出30分钟返回0,否则返回数据
function loadData(name, time) {
  let d = JSON.parse(localStorage.getItem(name));
  // 过期或有错误返回 0 否则返回数据
  if (d) {
    let t = Date.now() - d.time;
    if (t < time * 60 * 1000 && t > -1) return d.data;
  }
  return 0;
}

// 上面两个函数如果你有其他需要存取数据的功能，也可以直接使用

// 读取背景
try {
  let data = loadData("blogbg", 1440);
  if (data) changeBg_noWindow(data, 0);
  else localStorage.removeItem("blogbg");
} catch (error) {
  localStorage.removeItem("blogbg");
}

// 切换背景函数(带弹窗)
// 此处的flag是为了每次读取时都重新存储一次,导致过期时间不稳定
// 如果flag为0则存储,即设置背景. 为1则不存储,即每次加载自动读取背景.
function changeBg(s, flag) {
  let bg = document.getElementById("web_bg");
  if (s.charAt(0) == "#") {
    bg.style.backgroundColor = s;
    bg.style.backgroundImage = "none";
  } else bg.style.backgroundImage = s;
  if (!flag) {
    saveData("blogbg", s);
  }
  // 弹窗提醒切换成功
  new Vue({
    data: function () {
      this.$notify({
        title: "提示",
        message: "切换背景成功，该背景将会维持一天！",
        position: 'top-left',
        offset: 50,
        showClose: true,
        type: "info"
      });
    }
  })
}

// // 解决开启Pjax的问题
function whenDOMReady() {
  // 背景localstorage
  try {
    let data = loadData('blogbg', 1440)
    if (data) changeBg_noWindow(data, 1)
    else localStorage.removeItem('blogbg');
  } catch (error) { localStorage.removeItem('blogbg'); }
}
whenDOMReady()
document.addEventListener("pjax:success", whenDOMReady)

// 无弹窗提醒更换背景
function changeBg_noWindow(s, flag) {
  let bg = document.getElementById("web_bg");
  if (s.charAt(0) == "#") {
    bg.style.backgroundColor = s;
    bg.style.backgroundImage = "none";
  } else bg.style.backgroundImage = s;
  if (!flag) {
    saveData("blogbg", s);
  }
}

// 以下为2.0新增内容
// 创建窗口
var winbox = "";

function createWinbox() {
  let div = document.createElement("div");
  document.body.appendChild(div);
  winbox = WinBox({
    id: "changeBgBox",
    index: 999,
    title: "切换背景",
    x: "left",
    y: "center",
    minwidth: "300px",
    height: "60%",
    background: "#76c8f1",
    onmaximize: () => {
      div.innerHTML = `<style>body::-webkit-scrollbar {display: none;}div#changeBgBox {width: 100% !important;}</style>`;
    },
    onrestore: () => {
      div.innerHTML = "";
    },
  });
  winResize();
  window.addEventListener("resize", winResize);

  // 每一类我放了一个演示，直接往下复制粘贴 a标签 就可以，需要注意的是 函数里面的链接 冒号前面需要添加反斜杠\进行转义
  winbox.body.innerHTML = `

<div id="article-container" style="padding:15px;">
<div class="note info flat"><p>点击对应图片就可实现背景切换，自定义背景会保留一天，一天后自动恢复为默认背景!</p>
</div>
<h2>1.二次元</h2>
<details class="folding-tag" blue><summary> 查看二次元背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://unpkg.com/fomalhaut1998_picgodemo/img/dm1.png)" class="imgbox" onclick="changeBg('url(https\://unpkg.com/fomalhaut1998_picgodemo/img/dm1.png)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://unpkg.com/fomalhaut1998_picgodemo/img/dm2.png)" class="imgbox" onclick="changeBg('url(https\://unpkg.com/fomalhaut1998_picgodemo/img/dm2.png)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://unpkg.com/fomalhaut1998_picgodemo/img/dm3.png)" class="imgbox" onclick="changeBg('url(https\://unpkg.com/fomalhaut1998_picgodemo/img/dm3.png)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://unpkg.com/fomalhaut1998_picgodemo/img/dm5.png)" class="imgbox" onclick="changeBg('url(https\://unpkg.com/fomalhaut1998_picgodemo/img/dm5.png)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://unpkg.com/fomalhaut1998_picgodemo/img/dm8.png)" class="imgbox" onclick="changeBg('url(https\://unpkg.com/fomalhaut1998_picgodemo/img/dm8.png)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://unpkg.com/fomalhaut1998_picgodemo/img/dm9.png)" class="imgbox" onclick="changeBg('url(https\://unpkg.com/fomalhaut1998_picgodemo/img/dm9.png)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://unpkg.com/fomalhaut1998_picgodemo/img/dm11.png)" class="imgbox" onclick="changeBg('url(https\://unpkg.com/fomalhaut1998_picgodemo/img/dm11.png)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://unpkg.com/fomalhaut1998_picgodemo/img/dm12.png)" class="imgbox" onclick="changeBg('url(https\://unpkg.com/fomalhaut1998_picgodemo/img/dm12.png)')"></a></div>
              </div>
            </details>


<h2>2.风景</h2>

<details class="folding-tag" blue><summary> 查看风景背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://unpkg.com/fomalhaut1998_picgodemo/img/fj1.jpg)" class="imgbox" onclick="changeBg('url(https://unpkg.com/fomalhaut1998_picgodemo/img/fj1.jpg)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://unpkg.com/fomalhaut1998_picgodemo/img/fj2.jpg)" class="imgbox" onclick="changeBg('url(https://unpkg.com/fomalhaut1998_picgodemo/img/fj2.jpg)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://unpkg.com/fomalhaut1998_picgodemo/img/fj3.jpg)" class="imgbox" onclick="changeBg('url(https://unpkg.com/fomalhaut1998_picgodemo/img/fj3.jpg)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://unpkg.com/fomalhaut1998_picgodemo/img/fj4.jpg)" class="imgbox" onclick="changeBg('url(https://unpkg.com/fomalhaut1998_picgodemo/img/fj4.jpg)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://unpkg.com/fomalhaut1998_picgodemo/img/fj5.jpg)" class="imgbox" onclick="changeBg('url(https://unpkg.com/fomalhaut1998_picgodemo/img/fj5.jpg)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://unpkg.com/fomalhaut1998_picgodemo/img/fj6.jpg)" class="imgbox" onclick="changeBg('url(https://unpkg.com/fomalhaut1998_picgodemo/img/fj6.jpg)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://unpkg.com/fomalhaut1998_picgodemo/img/fj7.jpg)" class="imgbox" onclick="changeBg('url(https://unpkg.com/fomalhaut1998_picgodemo/img/fj7.jpg)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://unpkg.com/fomalhaut1998_picgodemo/img/fj8.jpg)" class="imgbox" onclick="changeBg('url(https://unpkg.com/fomalhaut1998_picgodemo/img/fj8.jpg)')"></a></div>
              </div>
            </details>

<h2>3.萌宠</h2>

<details class="folding-tag" blue><summary> 查看萌宠背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://unpkg.com/fomalhaut1998_picgodemo/img/mc1.jpg)" class="imgbox" onclick="changeBg('url(https://unpkg.com/fomalhaut1998_picgodemo/img/mc1.jpg)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://unpkg.com/fomalhaut1998_picgodemo/img/mc2.jpg)" class="imgbox" onclick="changeBg('url(https://unpkg.com/fomalhaut1998_picgodemo/img/mc2.jpg)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://unpkg.com/fomalhaut1998_picgodemo/img/mc3.jpg)" class="imgbox" onclick="changeBg('url(https://unpkg.com/fomalhaut1998_picgodemo/img/mc3.jpg)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://unpkg.com/fomalhaut1998_picgodemo/img/mc4.jpg)" class="imgbox" onclick="changeBg('url(https://unpkg.com/fomalhaut1998_picgodemo/img/mc4.jpg)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://unpkg.com/fomalhaut1998_picgodemo/img/mc5.jpg)" class="imgbox" onclick="changeBg('url(https://unpkg.com/fomalhaut1998_picgodemo/img/mc5.jpg)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://unpkg.com/fomalhaut1998_picgodemo/img/mc6.jpg)" class="imgbox" onclick="changeBg('url(https://unpkg.com/fomalhaut1998_picgodemo/img/mc6.jpg)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://unpkg.com/fomalhaut1998_picgodemo/img/mc7.jpg)" class="imgbox" onclick="changeBg('url(https://unpkg.com/fomalhaut1998_picgodemo/img/mc7.jpg)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://unpkg.com/fomalhaut1998_picgodemo/img/mc8.jpg)" class="imgbox" onclick="changeBg('url(https://unpkg.com/fomalhaut1998_picgodemo/img/mc8.jpg)')"></a></div>
              </div>
            </details>

<h2>4.渐变色</h2>
<details class="folding-tag" blue><summary> 查看渐变色背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #544a7d, #ffd452)" onclick="changeBg('linear-gradient(to right, #544a7d, #ffd452)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to bottom, #7f7fd5, #86a8e7, #91eae4)" onclick="changeBg('linear-gradient(to bottom, #7f7fd5, #86a8e7, #91eae4)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to left, #654ea3, #eaafc8)" onclick="changeBg('linear-gradient(to left, #654ea3, #eaafc8)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #feac5e, #c779d0, #4bc0c8)" onclick="changeBg('linear-gradient(to top, #feac5e, #c779d0, #4bc0c8)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #d3959b, #bfe6ba)" onclick="changeBg('linear-gradient(to top, #d3959b, #bfe6ba)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #8360c3, #2ebf91)" onclick="changeBg('linear-gradient(to top, #8360c3, #2ebf91)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #108dc7, #ef8e38)" onclick="changeBg('linear-gradient(to top, #108dc7, #ef8e38)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #355c7d, #6c5b7b, #c06c84)" onclick="changeBg('linear-gradient(to top, #355c7d, #6c5b7b, #c06c84)')"></a></div>
              </div>
            </details>


<h2>5.纯色</h2>
<details class="folding-tag" blue><summary> 查看纯色背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #7D9D9C" onclick="changeBg('#7D9D9C')"></a> <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #ecb1b1" onclick="changeBg('#ecb1b1')"></a> <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #d3ebac" onclick="changeBg('#d3ebac')"></a> <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #ace9ce" onclick="changeBg('#ace9ce')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #c1ebea" onclick="changeBg('#c1ebea')"></a> <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #dee7f1" onclick="changeBg('#dee7f1')"></a> <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #e9e3f2" onclick="changeBg('#e9e3f2')"></a> <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #f7eff5" onclick="changeBg('#f7eff5')"></a>  </div>
              </div>
            </details>



<h2>6.适配手机</h2>
<details class="folding-tag" blue><summary> 查看适配手机的背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://unpkg.com/fomalhaut1998_picgodemo@latest/img/mb1.jpg)" class="pimgbox" onclick="changeBg('url(https\://unpkg.com/fomalhaut1998_picgodemo@latest/img/mb1.jpg)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://unpkg.com/fomalhaut1998_picgodemo@latest/img/mb2.png)" class="pimgbox" onclick="changeBg('url(https\://unpkg.com/fomalhaut1998_picgodemo@latest/img/mb2.png)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://unpkg.com/fomalhaut1998_picgodemo@latest/img/mb3.png)" class="pimgbox" onclick="changeBg('url(https\://unpkg.com/fomalhaut1998_picgodemo@latest/img/mb3.png)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://unpkg.com/fomalhaut1998_picgodemo@latest/img/mb4.png)" class="pimgbox" onclick="changeBg('url(https\://unpkg.com/fomalhaut1998_picgodemo@latest/img/mb4.png)')"></a></div>
              </div>
            </details>

<br>

<center><p><button onclick="localStorage.removeItem('blogbg');location.reload();" style="background:linear-gradient(to left, #0b486b, #f56217);display:block;width:60%;padding: 15px 0;border-radius:6px;color:white;"><i class="fa-solid fa-arrows-rotate"></i>点我恢复默认背景</button></p></center>
</div>

`;
}

// 适应窗口大小
function winResize() {
  var offsetWid = document.documentElement.clientWidth;
  if (offsetWid <= 768) {
    winbox.resize(offsetWid * 0.95 + "px", "90%").move("center", "center");
  } else {
    winbox.resize(offsetWid * 0.6 + "px", "70%").move("center", "center");
  }
}

// 切换状态，窗口已创建则控制窗口显示和隐藏，没窗口则创建窗口
function toggleWinbox() {
  if (document.querySelector("#changeBgBox")) winbox.toggleClass("hide");
  else createWinbox();
}
