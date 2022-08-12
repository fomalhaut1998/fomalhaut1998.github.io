AV.init({
    appId: 'ldjkSWxSsvkGbb5HLyGxJQ0c-MdYXbMMI',
    appKey: 'R3NnpvH3kP3pgvq4drunxXLt'
});

var flag = 0;
var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
var url = window.location.href.replace(parse_url,'$3/$5');

function goodplus(url,flag) {
    flag = 1; //访客点击标记
    senddata(url,flag);
    flag = 0;
}
function senddata(url,flag) {
    var Zan = AV.Object.extend('Zan');
    var query = new AV.Query('Zan');
	query.contains("url", url);
	query.find().then(function (results) {
        var vLeng = results.length;
        if(flag == 0){  //页面加载标记
            if (vLeng == 0){
                console.log("新增");
                var Zan = AV.Object.extend('Zan');
                var zan = new Zan();
                zan.set('url', url);
                zan.set('views', 0);
                zan.save().then(function (zan) {
                    document.getElementById("zan_text").innerHTML= "0";
                });
            }else if (vLeng == 1){
                console.log("显示");
                var vViews = results[0].attributes.views;
                document.getElementById("zan_text").innerHTML= vViews;
            }
        }else if(flag == 1){ //访客点击标记
            console.log("更新+1");
            var vViews = results[0].attributes.views;
            var vId = results[0].id;
            var Zan = AV.Object.createWithoutData('Zan', vId);
            Zan.set('views', vViews+1);
            Zan.save();
            document.getElementById("zan_text").innerHTML= vViews+1;
        }
    });
}
function remcls(){$('.heart').removeClass("heartAnimation");}
function addcls(){$('.heart').addClass("heartAnimation");    }
$(document).ready(function ()  { //.post-content 文章内页样式
	$(".post-content").append("<div id='zan' class='clearfix'><div class='heart' onclick=\"goodplus('"+url+"')\"></div><br><div id='zan_text'></div></div>");
	senddata(url,flag);
	$('body').on("click",'.heart',function(){
		$('.heart').css("background-position","")
		var wwin=$('.heart').attr("class");
		if(wwin === 'heart'){
			$('.heart').addClass("heartAnimation");
			tui=setTimeout("remcls()",800)
		}else{
		 	remcls()
		 	tuiw=setTimeout("addcls()",100)
		}
	});
});