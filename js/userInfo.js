$(function(){leftSide(0);var icon='<i class="icon-sort-down"></i>';var user_id=$(".name_input").attr("id");var name=$(".name_input").val();var sex=$(".label.sexid").attr("id");var birthdate=$("#date_1").val();var grade=$(".grade_name").text();var city_id=$(".city_name_s").attr("id");if(sex==1){$(".male").attr("checked","true")}if(sex==0){$(".female").attr("checked","true")}$("#date_1").datepicker({onSelect:function(dateText,inst){birthdate=dateText},showOtherMonths:true,selectOtherMonths:false,yearRange:"-35:+0"});$(".grade_box .grade_name").click(function(){$(".grade_down").slideToggle(100,function(){$(".grade_down li").click(function(){$(".grade_down").hide();$(".grade_name").html($(this).text()+icon);$(".grade_name").attr("id",$(this).attr("id"))})})});$(".city_box_s .city_name_s").click(function(){$(".city_down_s").slideToggle(100,function(){$(".city_down_s li").click(function(){$(".city_down_s").hide();$(".city_name_s").html($(this).text()+icon);$(".city_name_s").attr("id",$(this).attr("id"))})})});$(".update_btn").click(function(){user_id=$(".name_input").attr("id");name=$(".name_input").val();sex=$("input:checked").attr("id");birthdate=$("#date_1").val();grade=$(".grade_name").text();city_id=$(".city_name_s").attr("id");$.post(updateURL,{name:name,sex:sex,birthday:birthdate,grade:grade,city_id:city_id},function(data){console.log(data);if(data.status==0){ialert("更新成功~",1)}else{if(data.status==1){ialert("真实姓名不能为空")}else{if(data.status==2){ialert("啊欧，更新失败")}}}},"json")});document.onclick=function(){$(".grade_down").hide();$(".city_down_s").hide()};$(".grade_box").click(function(e){e.stopPropagation()});$(".city_box_s").click(function(e){e.stopPropagation()})});