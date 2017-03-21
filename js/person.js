$(document).ready(
		function() {
			$("input").each(function(i) {
				$(this).value = ""
			});
			//上传头像
			$("#thumb_chang").click(function() {
				$("#head_photo").click();
			});
			
			if ($("#person_changeimg").attr("flag") == 0
					|| $("#person_changeimg").attr("flag") == 3) {
				$("#person_changeimg").html("进行认证")
			}
			if ($("#person_changeimg").attr("flag") == 1) {
				$("#person_changeimg").html("已认证成功");
				$("#person_changeimg").css("cursor", "auto").css("box-shadow",
						"#888888 0px 0px 0px").css("border-radius", "0px").css(
						"backgroundColor", "#F3F3F3").css("color", "#5EB6A3")
			}
			if ($("#person_changeimg").attr("flag") == 2) {
				$("#person_changeimg").html("正在认证");
				$("#person_changeimg").css("cursor", "auto").css("box-shadow",
						"#888888 0px 0px 0px").css("border-radius", "0px").css(
						"backgroundColor", "#F3F3F3").css("color", "#5EB6A3")
			}
			var person_url = "<{:U('UserConfig/ChangePasswordbypsw')}>";
			var flag = 1;
			var person_aphoneold0 = $("#person_aphoneold0");
			var person_aphoneold1 = $("#person_aphoneold1");
			$("#person_changelogin").click(function() {
				var height = parseInt($(window).height()) / 2;
				var top = $(document).scrollTop();
				$("#person_login").css({
					top : height + top
				}).fadeIn(1000);
				$("#person_cover").fadeIn(1000)
			});
			$("#person_changesafe").click(function() {
				var height = parseInt($(window).height()) / 2;
				var top = $(document).scrollTop();
				$("#person_safe").css({
					top : height + top
				}).fadeIn(1000);
				$("#person_cover").fadeIn(1000)
			});
			if ($("#person_changeimg").attr("flag") == 0
					|| $("#person_changeimg").attr("flag") == 3) {
				$("#person_changeimg").click(function() {
					$("#person_img").fadeIn(1000);
					$("#person_cover").fadeIn(1000)
				})
			}
			$(".person_adelete").click(function() {
				showOff()
			});
			$(".person_ano").click(function() {
				showOff()
			});
			$("#person_apbutton").click(function() {
				personApbutton()
			});
			$("#person_safeyes").click(
					function() {
						var data = $(".person_aprove").eq(0).val();
						var person_aphone = $("#person_aphone").eq(0).val();
						var aphoneold1 = $("#person_aphoneold1").val();
						var person_aphone10 = $.md5($(".person_aphone1").eq(0)
								.val());
						var person_aphone11 = $.md5($(".person_aphone1").eq(1)
								.val());
						if ($(".person_aphone1").eq(0).val() == "") {
							ialert("密码不能为空")
						} else {
							if ($(".person_aphone1").eq(0).val().length < 8) {
								ialert("密码不能小于8位")
							} else {
								if ($(".person_aphone1").eq(0).val() != $(
										".person_aphone1").eq(1).val()) {
									ialert("两次输入密码不一致")
								} else {
									$.post(url_safe, {
										checknum : data,
										pswnew1 : person_aphone10,
										pswnew2 : person_aphone11,
									}, function(data) {
										console.log(data);
										if (data.status == 0) {
											ialert(data.error)
										} else {
											if (data.status == 1) {
												showOff();
												ialert("修改成功")
											}
										}
									}, "json")
								}
							}
						}
					});
			$("#person_loginyes").click(
					function() {
						if ($(".person_aphone0").eq(0).val() == "") {
							ialert("密码不能为空")
						} else {
							if ($(".person_aphone0").eq(0).val().length < 8) {
								ialert("密码不能小于8位")
							} else {
								if ($(".person_aphone0").eq(0).val() != $(
										".person_aphone0").eq(1).val()) {
									ialert("两次输入密码不一致")
								} else {
									var aphoneold0 = $.md5($(
											"#person_aphoneold0").val());
									var person_aphone00 = $.md5($(
											".person_aphone0").eq(0).val());
									var person_aphone01 = $.md5($(
											".person_aphone0").eq(1).val());
									$.post(url_f, {
										pswnew1 : person_aphone00,
										pswnew2 : person_aphone01,
										pswold : aphoneold0
									}, function(data) {
										console.log(data.status);
										if (data.status == 0) {
											ialert("旧密码错误")
										} else {
											if (data.status == 1) {
												showOff();
												ialert("修改成功")
											} else {
												if (data.status == 2) {
													ialert("修改失败")
												}
											}
										}
									}, "json")
								}
							}
						}
					})
		});
function showOff() {
	$(".person_alert").each(function(i) {
		$(this).fadeOut(700)
	});
	$("#person_cover").fadeOut(1000)
}
function checkMobile(s) {
	var regu = /^[1][0-9][0-9]{9}$/;
	var re = new RegExp(regu);
	if (s == "") {
		ialert("请输入手机号")
	} else {
		if (re.test(s)) {
			var person_apbutton = $(".person_apbutton").eq(0);
			var person_aprove = $(".person_aprove").eq(0);
			time(person_apbutton, person_aprove)
		} else {
			ialert("手机号错误")
		}
	}
}
var wait = 60;
function time(apbutton, aprove) {
	if (wait == 0) {
		apbutton.html("获取验证码");
		wait = 60;
		$("#person_apbutton").bind("click", function() {
			personApbutton()
		})
	} else {
		apbutton.html("重新发送(" + wait + ")");
		wait--;
		setTimeout(function() {
			time(apbutton, aprove)
		}, 1000)
	}
}
function myFunction(a) {
	if (a.val() == "") {
		ialert("请输入旧密码")
	}
}
function personApbutton() {
	$("#person_apbutton").unbind("click");
	checkMobile($("#person_getphone").val());
	var person_aphone = $("#person_getphone").val();
	var clock = 120;
	var countdown;
	$.post(senchecknum, {
		phone : person_aphone,
		role_type : 1
	}, function(data) {
		if (data.status == 0) {
		} else {
			if (data.status == 1) {
				ialert("获取失败")
			} else {
				if (data.status == 8) {
					ialert("两次操作不超过60秒")
				}
			}
		}
	}, "json")
};
