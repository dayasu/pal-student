$(function(){leftSide(0);var icon='<i class="icon-sort-down"></i>';var o_id=$(".name").attr("id");var sex=$(".sex").attr("id");var birthdate=$("#date_1").val();var city_id=$(".city_name").attr("id");var school_id=$(".school_name").attr("id");var f_id=$(".f_name").attr("id");var s_id=$(".s_name").attr("id");var experience=$(".experience").val();var address=$(".address").val();var describe=$(".describe").text();var school_name=$(".school_name").text();$("#date_1").datepicker({onSelect:function(dateText,inst){birthdate=dateText},showOtherMonths:true,selectOtherMonths:false,yearRange:"-35:+0"});$(".city_box .city_name").click(function(){$(".city_down").slideToggle(100,function(){$(".city_down li").click(function(){$(".city_down").hide();$(".city_name").html($(this).text()+icon);$(".city_name").attr("id",$(this).attr("id"))})})});$(".f_name").click(function(){$(".f_down").slideToggle(100,function(){$(".f_down li").click(function(){$(".f_down").hide();$(".f_name").html($(this).text()+icon);$(".f_name").attr("id",$(this).attr("id"));getGoodat($(this).attr("id"))})})});$(".s_name").click(function(){$(".s_down").slideToggle(100,function(){$(".s_down").delegate("li","click ",function(){$(".s_down").hide();$(".s_name").html($(this).text()+icon);$(".s_name").attr("id",$(this).attr("id"))})})});$(".update_btn").click(function(){birthdate=$("#date_1").val();city_id=$(".city_name").attr("id");school_id=$(".school_name").attr("id");f_id=$(".f_name").attr("id");s_id=$(".s_name").attr("id");experience=$(".experience").val();address=$(".address").val();describe=$(".describe").val();school_name=$(".school_name").text();$.post(updateURL,{city_id:city_id,school_name:school_name,birthday:birthdate,goodat:s_id,experience:experience,address:address,desc:describe},function(data){if(data.status==0){ialert("更新成功");setTimeout("location.reload()",1500)}else{if(data.status==1){ialert("信息不全")}else{if(data.status==2){ialert("家教经验填写错误")}else{if(data.status==3){ialert("授课区域要填写为纯汉字")}}}}},"json")});document.onclick=function(){$(".s_down").hide();$(".f_down").hide();$(".city_down").hide();$(".school_down").hide()};$(".s_box").click(function(e){e.stopPropagation()});$(".f_box").click(function(e){e.stopPropagation()});$(".school_box").click(function(e){e.stopPropagation()});$(".city_box").click(function(e){e.stopPropagation()});function getSchool(city_id_t){$.post(schoolURL,{city_id:city_id_t},function(data){$(".school_down").html("");var i=0;for(i=0;i<data.length;i++){var temp=$(".school_down").html();$(".school_down").html(temp+"<li id='"+data[i].school_id+"' >"+data[i].school_name+"</li>")}$(".school_name").html(data[0].school_name+icon);$(".school_name").attr("id",data[0].school_id)},"json")}function getGoodat(goodat_id_a){$.post(goodatURL,{goodat:goodat_id_a},function(data){$(".s_down").html("");var i=0;for(i=0;i<data.length;i++){var temp=$(".s_down").html();$(".s_down").html(temp+"<li id='"+data[i].good_kind_id+"' >"+data[i].good_kind_name+"</li>")}$(".s_name").html(data[0].good_kind_name+icon);$(".s_name").attr("id",data[0].good_kind_id)})}});