$(document).ready(function(){$("#button").click(function(){$.post(sendchecknumurl,{phone:$("#phone").val(),role_type:$("#role_type").val()},function(data){if(data.status==1){$("#tele-error").removeClass("hidden")}else{if(data.status==2){$("#tele-error").removeClass("hidden")}else{if(data.status==3){alert("非法角色")}else{if(data.status==5){$("#tele-error").text("该手机号已注册，请直接登录").removeClass("hidden")}else{if(data.status==0){}}}}}},"json")})});$(document).ready(function(){$("#submit").click(function(){$.post(registerurl,{phone:$("#phone").val(),role_type:$("#role_type").val(),phone_check_num:$("#phone_check_num").val(),user_password:$.md5($("#user_password").val()),user_password_check:$.md5($("#user_password_check").val()),isagree:$("#isagree").val()},function(data){if(data.status==0){window.location.href=loginurl}else{if(data.status==1){$("#tele-error").removeClass("hidden")}else{if(data.status==2){$("#tele-error").removeClass("hidden")}else{if(data.status==3){$("#checknum-error").removeClass("hidden")}else{if(data.status==4){$("#psw-error").text("密码强度不够，需设置长度多于8位").removeClass("hidden")}else{if(data.status==5){$("#psw-check-error").removeClass("hidden")}else{if(data.status==7){$("#tele-exist").removeClass("hidden")}}}}}}}},"json")})});