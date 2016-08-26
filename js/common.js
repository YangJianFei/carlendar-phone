/*
 * 检查输入对象是否为空或全部为空格
 * 如果全是空,返回true,否则返回false
 */
function isNull(str){
	if(str == "") return true;
	var regu = "^[ ]+$";
	var re = new RegExp(regu);
	return re.test(str);
}
/*
 * 检查输入对象是否为正整数
 * 如果是返回true,否则返回false
 */
function isNumber(str){
    var regu = /^[1-9]*[1-9][0-9]*$/;
    return regu.test(str);
}
/*
 * 检查输入对象是否为一位小数点的正数
 * 如果是返回true,否则返回false
 */
function isNumberFloat(str){
    var regu = /^[0-9]+(.[0-9]{1})?$/;
    return regu.test(str);
}
/*
* 检查输入对象是否为邮箱格式
 */
function isEmail(str){
    var regu = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    return regu.test(str);
}
/*
 * 检查输入对象长度,其中英文(包括空格)占1个字符,汉字占2个字符
 * str:输入字符串; min:最小长度; max:最大长度
 */
function lengthRange(str, min, max){
    var len = 0;
    for(var i = 0; i < str.length; i++){
        if(str.charCodeAt(i)>127 || str.charCodeAt(i)==94){
            len += 2;
        }else{
            len++;
        }
    }
    if(len >= min && len <= max){
        return true;
    }
    return false;
}

/*
 * 检查输入对象是否为手机号
 * 匹配13,14,15,17,18开头手机号码
 */
function isMobile(str){
    var regu = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
    return regu.test(str);
}
/*
 * 检查输入对象是否为固定电话
 */
function isTel(str){
    var regu = /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/;
    return regu.test(str);
}
/*校验邮编*/
function isCode(str){
    var reg=/^\d{6}$/;
    return reg.test(str);
}
/*时间戳转为事件*/
/*function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
}*/
function getLocalTime(nS) {
    var d = new Date(nS * 1000);    //根据时间戳生成的时间对象
    var date = (d.getFullYear()) + "-" +
        (d.getMonth() + 1) + "-" +
        (d.getDate()) + " " +
        (d.getHours()) + ":" +
        (d.getMinutes()) + ":" +
        (d.getSeconds());
    return date;
}

//对象是否为空
function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}


//----------------------------------------------------------
//域名 https://www.91pxzs.com     https://www.peixunshenqi.cn
//localStorage.setItem("url","http://www.91pxzs.com");
//localStorage.setItem("url","http://dev.51pxzs.com");
//localStorage.setItem("url","http://www.51pxzs.com");
localStorage.setItem("url","http://test.51pxzs.com");
//localStorage.setItem("linkurl","https://m.91pxzs.com");//分享朋友圈的链接
//localStorage.setItem("linkurl","https://devm.51pxzs.com");//分享朋友圈的链接
localStorage.setItem("linkurl","https://testm.51pxzs.com");//分享朋友圈的链接
//localStorage.setItem("linkurl","https://m.51pxzs.com");//分享朋友圈的链接

$(function () {
    //点击《返回按钮回到上一界面
    $(".sideleft").click(function(){
        history.back();
    });

    // 底部按钮
    $('.footer').on('click', 'div', function () {
        var thisClass = this.className
        if (thisClass.indexOf('foot-active') !== -1) {
            return;
        } else {
            $('.footer div').removeClass('foot-active foot-item1-active foot-item2-active foot-item3-active');
            $(this).addClass(thisClass.split(' ')[0] + '-active foot-active');
        }
    });
});
//得到地址栏参数
var getUrlParam = function(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return unescape(r[2]); return null;
};

//判断是否为空并返回值
function checkundefined($element){
    if($element == null || $element == undefined || $element == "undefined" || $element == "" || typeof($element)=="undefined" || $element == " " || $element=="NaN"){
        return "";
    }else{
        return $element;
    }
}

//根据日期得到星期几
function getWeekformDate(date){
    try {
        var dt = new Date(date);
        var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        return weekDay[dt.getDay()];
    }catch(e){
        console.log("日期格式错误！");
        return "日期格式错误！";
    }
}

// 判断滚动条是否滚动到底部
function checkscrollside1() {
    // 获取滚动条滑动的长度
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // 获取窗口的高度
    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    // 获取页面的高度
    var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

    return (scrollTop + clientHeight >= scrollHeight)?true:false;
}

/**
 * 时间比较(yyyy-mm-dd hh:mm:ss)
 * @param starttime 开始时间
 * @param endtime   结束时间
 * @returns {number}    时间差()
 */
function comptime(starttime, endtime) {
    var beginTimes = starttime.substring(0, 10).split('-');
    var endTimes = endtime.substring(0, 10).split('-');

    starttime = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0] + ' ' + starttime.substring(10, 19);
    endtime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19);

    var a = (Date.parse(endtime) - Date.parse(starttime)) / 1000;
    return a;
}

/**
 * 只显示时分的时钟
 * @param $datetime 要显示时间的 div
 */
function clock() {
    var myHours="";
    var myMinutes="";
    var mydate=new Date();
    myHours = mydate.getHours();
    if (parseInt(myHours) < 10) {
        myHours = '0' + myHours;
    }
    myMinutes = mydate.getMinutes();
    if (parseInt(myMinutes) < 10) {
        myMinutes = '0' + myMinutes;
    }
    var mySeconds = mydate.getSeconds();
    var left = 60 - parseInt(mySeconds);
    $('.timetip').text(myHours+":"+myMinutes);
    setTimeout("clock()", parseInt(left) * 1000);
}

/**
 * 获取URL中的参数值
 * @param name  参数名
 * @returns {*} 参数值
 */
function getURLParams(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
}

/* 禁止页面回退 */
function banback() {
    if (window.addEventListener) {
        window.addEventListener("popstate", function() {
            window.history.forward(1);
        });
    } else if (window.attachEvent) {
        window.attachEvent("popstate", function() {
            window.history.forward(1);
        });
    }
}

/**
 * 分割时段
 * @param start 开始时间
 * @param end   结束时间
 * @returns {string}    XX月XX日 HH:MM~HH:MM
 */
function splitTime(start, end) {
    var month=start.substr(5, 2);   // 月
    var day = start.substr(8, 2);   // 日
    var starttime=start.substr(11, 5);   // 开始时分
    var endtime=end.substr(11, 5);  // 结束时分
    return month + '月' + day + '日' + ' ' + starttime + '~' + endtime;
}

/**
 * 信息提示弹出框
 * @param $div  信息显示的div
 * @param msg   显示的信息
 * @param time  信息显示的时长(可选, 默认1秒)
 */
function tip(msg, time, $div) {
    if (checkundefined(time) == '') {
        time=1000;
    }
    if (checkundefined($div) == '') {
        $div=$('#toast');
        $('.weui_toast_content', $div).empty().html(msg);
    }else if($div.attr("id")=="right" || $div.attr("id")=="error"){
        $('.weui_toast_content', $div).empty().html(msg);
    }else {
        $div.empty().html(msg);
    }

    $div.show();
    setTimeout(function () {
        $div.hide();
    }, time);
}

// 获取服务器当前时间
function getServerTime() {
    var time = '';
    $.ajax({
        async:false,
        success:function (result, status, xhr) {
            var date=new Date(xhr.getResponseHeader('Date'));
            var beiing= date + (3600000 * 8);   // 东八区
            time=new Date(beiing);
            if (isNaN(time)) {
                time = new Date();
            }
        }
    });
    // 获取完整年份
    var year=time.getFullYear();
    // 获取月份
    var month=time.getMonth()+parseInt(1);
    if (month < 10) {
        month = '0' + month;
    }
    // 获取当前天
    var day=time.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    // 获取当前小时
    var hour=time.getHours();
    if (hour < 10) {
        hour = '0' + hour;
    }
    // 获取当前分钟
    var minute=time.getMinutes();
    if (minute < 10) {
        minute = '0' + minute;
    }
    // 获取当前秒
    var seconds=time.getSeconds();
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    return year+'-'+month+'-'+day+' '+hour+':'+minute+':'+seconds;
}

/*
 * 检查输入对象是否为空或全部为空格
 * 如果全是空,返回true,否则返回false
 */
function isNull(str){
    if(str == "") return true;
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
}
/*
 * 检查输入对象是否为正整数
 * 如果是返回true,否则返回false
 */
function isNumber(str){
    var regu = /^[1-9]*[1-9][0-9]*$/;
    return regu.test(str);
}
/*
 * 检查输入对象是否为一位小数点的正数
 * 如果是返回true,否则返回false
 */
function isNumberFloat(str){
    var regu = /^[0-9]+(.[0-9]{1})?$/;
    return regu.test(str);
}
/*
 * 检查输入对象是否为邮箱格式
 */
function isEmail(str){
    var regu = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    return regu.test(str);
}
/*
 * 检查输入对象长度,其中英文(包括空格)占1个字符,汉字占2个字符
 * str:输入字符串; min:最小长度; max:最大长度
 */
function lengthRange(str, min, max){
    var len = 0;
    for(var i = 0; i < str.length; i++){
        if(str.charCodeAt(i)>127 || str.charCodeAt(i)==94){
            len += 2;
        }else{
            len++;
        }
    }
    if(len >= min && len <= max){
        return true;
    }
    return false;
}

/*
 * 检查输入对象是否为手机号
 * 匹配13,14,15,17,18开头手机号码
 */
function isMobile(str){
    var regu = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
    return regu.test(str);
}
/*
 * 检查输入对象是否为固定电话
 */
function isTel(str){
    var regu = /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/;
    return regu.test(str);
}
/*校验邮编*/
function isCode(str){
    var reg=/^\d{6}$/;
    return reg.test(str);
}
/*时间戳转为事件*/
/*function getLocalTime(nS) {
 return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
 }*/
function getLocalTime(nS) {
    var d = new Date(nS * 1000);    //根据时间戳生成的时间对象
    var date = (d.getFullYear()) + "-" +
        (d.getMonth() + 1) + "-" +
        (d.getDate()) + " " +
        (d.getHours()) + ":" +
        (d.getMinutes()) + ":" +
        (d.getSeconds());
    return date;
}

//对象是否为空
function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}

//把服务器的返回值转化为json
function getDatajson(){}

//weui的dialog弹出框取消点击事件
$(".weui_dialog_ft").on("click",".default",function(){
    $(".weui_dialog_confirm").hide();
});
