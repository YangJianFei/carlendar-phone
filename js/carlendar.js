
getcalendar();
//确定按钮点击事件
    $(".calendar_sure").on("click",function(){
        $("#actionSheet_wrap").hide();
        var year=$(".calendar_select_year li[class*='calendar_active']").text();
        var month=$(".calendar_select_month li[class*='calendar_active']").text();
        if(month < 10){
            month="0"+month;
        }
        var day=($(".calendar_select_day li[class*='calendar_active']").text()).substr(0,($(".calendar_select_day li[class*='calendar_active']").text()).indexOf("/"));
        if(day < 10){
            day="0"+day;
        }
        var time=$(".calendar_select_hour li[class*='calendar_active']").text()+":"+$(".calendar_select_minute li[class*='calendar_active']").text();
        var week=getWeekformDate(year+"-"+month+"-"+day);
        var date=new Date(year+"-"+month+"-"+day+" "+time);
            
      
    });
    
//actionSheet点击空白隐藏
$(".weui_fade_toggle").on("click",function(){
    $("#actionSheet_wrap").hide();
});

//生成日历
function getcalendar(year,month,day,hour,minute){
    var today=new Date(year+"-"+month+"-"+day+" "+(checkundefined(hour)=="" ? 8:hour)+":"+(checkundefined(minute)=="" ? 30:minute));
    if((year+"-"+month+"-"+day+" "+(checkundefined(hour)=="" ? 8:hour)+":"+(checkundefined(minute)=="" ? 30:minute)).indexOf("NaN")!=-1 || (year+"-"+month+"-"+day+" "+(checkundefined(hour)=="" ? 8:hour)+":"+(checkundefined(minute)=="" ? 30:minute)).indexOf("defin")!=-1){
        today=new Date();
    }
    //var today=new Date();
    var todynumber=today.getDate();//当前天
    var todayweek=today.getDay();//今天星期
    $(".calendar_finally").html(today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()+"/"+weeks[todayweek]+" "+today.getHours()+":"+(parseInt(today.getMinutes())>=10 ? today.getMinutes():"0"+today.getMinutes()));
    var monthday=new Date(today.getFullYear()+"/"+(today.getMonth()+2)+"/1");//获取本月最后一天日期
    monthday.setDate(0);
    var monthdays=monthday.getDate();////本月共有多少天
    var firstday=new Date(today.getFullYear()+"/"+(today.getMonth()+1)+"/1");//获取本月第一天
    var firstdayweek=parseInt(firstday.getDay());//获取本月第一天星期int

    //绑定年份
    for(var a=1;a<=21;a++){//绑定前后四年
        $(".calendar_select_year li[data-id='"+a+"']").text((parseInt(today.getFullYear())-11+a)+"");
    }
    //绑定天和星期
    $(".calendar_select_day li").each(function(){
        var _thisday=this.id.split("_")[1];
        var _thisweek=weeks[(parseInt($(this).attr("data-date"))+firstdayweek)>=7 ? (parseInt($(this).attr("data-date"))+firstdayweek-7):(parseInt($(this).attr("data-date"))+firstdayweek)];
        $(this).text(_thisday+"/"+_thisweek);
        if(monthdays==_thisday){
            return false;
        }
    });
    $(".calendar_select_year li").removeClass("calendar_active");
    $(".calendar_select_month li").removeClass("calendar_active");
    $(".calendar_select_day li").removeClass("calendar_active");
    $(".calendar_select_hour li").removeClass("calendar_active");
    $(".calendar_select_minute li").removeClass("calendar_active");
    $(".calendar_select_year").scrollTop(350);
    $(".calendar_select_year li[data-id='11']").addClass("calendar_active");
    $(".calendar_select_month").scrollTop(today.getMonth()*35);
    $(".calendar_select_month li[data-id='"+(today.getMonth()+1)+"']").addClass("calendar_active");
    $(".calendar_select_day").scrollTop((today.getDate()-1)*35);
    $(".calendar_select_day li[data-id='"+today.getDate()+"']").addClass("calendar_active");
    $(".calendar_select_hour").scrollTop(today.getHours()*35);
    $(".calendar_select_hour li[data-id='"+(today.getHours()+1)+"']").addClass("calendar_active");
    $(".calendar_select_minute").scrollTop(parseInt(today.getMinutes()/5)*35);
    $(".calendar_select_minute li[data-id='"+(parseInt(today.getMinutes()/5)+1)+"']").addClass("calendar_active");
}

//年月日时分滚动事件
var beforeScrollTop=0;
var timer;
var weeks=["周日","周一","周二","周三","周四","周五","周六"];
$(".calendar_select div").on("scroll",function(){
    var _$this=this;
    clearInterval(timer);
    beforeScrollTop = $(_$this).scrollTop();
    timer=setInterval(function(){
        var afterScrollTop=$(_$this).scrollTop();
        if(beforeScrollTop == afterScrollTop){
            $(_$this).find("li").removeClass("calendar_active");
            if(parseFloat(afterScrollTop)%35 >= 18){
                $(_$this).scrollTop(((parseInt(afterScrollTop)-parseInt(afterScrollTop)%35)+35));
                $(_$this).find("li[data-id='"+((parseInt(afterScrollTop)-parseInt(afterScrollTop)%35)/35+2)+"']").addClass("calendar_active");
            }else{
                $(_$this).scrollTop((parseInt(afterScrollTop)-parseInt(afterScrollTop)%35));
                $(_$this).find("li[data-id='"+((parseInt(afterScrollTop)-parseInt(afterScrollTop)%35)/35+1)+"']").addClass("calendar_active");
            }
            clearInterval(timer);
            if($(_$this).attr("class") == "calendar_select_year" || $(_$this).attr("class") == "calendar_select_month"){
                //当年月变化时绑定天和星期
                var monthday = new Date($(".calendar_select_year li[class*='calendar_active']").text()+"/"+(parseInt($(".calendar_select_month li[class*='calendar_active']").text())+1)+"/1");//获取本月最后一天日期
                monthday.setDate(0);
                var monthdays = monthday.getDate();////本月共有多少天
                var firstday = new Date(monthday.getFullYear()+"/"+(monthday.getMonth()+1)+"/1");//获取本月第一天
                var firstdayweek = parseInt(firstday.getDay());//获取本月第一天星期int
                $(".calendar_select_day li").each(function(){
                    var _thisday = this.id.split("_")[1];
                    var _thisweek = weeks[(parseInt($(this).attr("data-date"))+firstdayweek)>=7 ? (parseInt($(this).attr("data-date"))+firstdayweek-7):(parseInt($(this).attr("data-date"))+firstdayweek)];
                    $(this).text(_thisday+"/"+_thisweek);
                    if(monthdays+1 == _thisday){
                        $(this).text("");
                    }
                });
            }
            $(".calendar_finally").html($(".calendar_select_year li[class*='calendar_active']").text()+"-"+$(".calendar_select_month li[class*='calendar_active']").text()+"-"+
                $(".calendar_select_day li[class*='calendar_active']").text()+" "+$(".calendar_select_hour li[class*='calendar_active']").text()+":"+$(".calendar_select_minute li[class*='calendar_active']").text());

        }

    },500);

});
