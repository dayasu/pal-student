$(document).ready(function () {
	leftSide(1);
	if ($(".tab_order ul li.active .num_order").text() == 0) {
		$(".right_detail.showorder .content").html('<div class="no_order">暂时还没有此类订单哦~</div>')
	}
	var delete_or_stop_order_num = "";
	var zhezhao = $(".zhezhao");
	var stoptanchuang = $("#modal-1");
	var deletechuang = $("#modal-2");
	$(".stop").click(function () {
		setTimeout(function () {
			$("#modal-1").addClass("md-show");
			zhezhao.fadeIn()
		}, 100);
		delete_or_stop_order_num = $(this).attr("id")
	});
	$(".delete").click(function () {
		setTimeout(function () {
			$("#modal-2").addClass("md-show");
			zhezhao.fadeIn()
		}, 100);
		delete_or_stop_order_num = $(this).attr("id")
	});
	$(".delete-modal").click(function (e) {
		e.stopPropagation()
	});
	$(".remind-add-log-modal").click(function (e) {
		e.stopPropagation()
	});
	document.onclick = function () {
		$(".delete-modal").removeClass("md-show");
		$(".refund-modal").removeClass("md-show");
		$(".add-log-modal").removeClass("md-show");
		$(".remind-add-log-modal").removeClass("md-show");
		zhezhao.hide()
	};
	$(".delete-modal .md-content .cancel_delete").click(function () {
		$(".delete-modal").removeClass("md-show");
		zhezhao.hide()
	});
	$(".delete-modal .md-content .confirm_stop").click(function () {
		$.post(stopURL, {
			oid: delete_or_stop_order_num
		}, function (data) {
			if (data.status == 0) {
				ialert("终止成功", 1);
				zhezhao.fadeOut();
				stoptanchuang.removeClass("md-show")
			} else {
				if (data.status == 1) {
					ialert("啊欧~系统错误..请重试");
					zhezhao.fadeOut();
					stoptanchuang.removeClass("md-show")
				} else {
					if (data.status == 2) {
						ialert("余额不足！");
						zhezhao.fadeOut();
						stoptanchuang.removeClass("md-show")
					} else {
						if (data.status == 3) {
							ialert("系统错误！");
							zhezhao.fadeOut();
							stoptanchuang.removeClass("md-show")
						}
					}
				}
			}
		})
	});
	$(".delete-modal .md-content .confirm_delete").click(function () {
		$.post(deleteURL, {
			oid: delete_or_stop_order_num
		}, function (data) {
			if (data.status == 0) {
				ialert("删除成功", 1);
				zhezhao.fadeOut();
				deletechuang.removeClass("md-show")
			} else {
				if (data.status == 1) {
					ialert("啊欧~系统错误..请重试");
					zhezhao.fadeOut();
					deletechuang.removeClass("md-show")
				} else {
					if (data.status == 2) {
						ialert("余额不足！");
						zhezhao.fadeOut();
						deletechuang.removeClass("md-show")
					} else {
						if (data.status == 3) {
							ialert("系统错误！");
							zhezhao.fadeOut();
							deletechuang.removeClass("md-show")
						}
					}
				}
			}
		})
	});
	$(".remind_class").click(remindOrder);

	function remindOrder() {
		var remind_order_num = $(this).attr("id");
		$(this).unbind();
		$(this).css("background", "gray");
		$(this).css("color", "#fff");
		$.post(remindOrderURL, {
			oid: remind_order_num
		}, (function (that) {
			return function (data) {
				if (data.status == 0) {
					$(that).text("提醒成功")
				} else {
					if (data.status == 1) {
						$(that).text("提醒失败")
					} else {
						if (data.status == 8) {
							$(that).text("提醒间隔时间太短")
						}
					}
				}
			}
		})(this), "json")
	}
	$(".confirm_order").click(confirmOrder);

	function confirmOrder() {
		var confirm_order_num = $(this).attr("id");
		var temp_giveup = $(this).parent().find(".give_up");
		temp_giveup.unbind();
		$(this).unbind();
		$(this).css("background", "gray");
		$.post(confirmOrderURL, {
			oid: confirm_order_num
		}, function (data) {
			$(this).css("background", "#f5b22d");
			if (data.status == 0) {
				location.reload()
			} else {
				if (data.status == 1) {}
			}
		})
	}
	$(".give_up").click(giveupOrder);

	function giveupOrder() {
		var give_up_order_num = $(this).attr("id");
		var temp_confirm = $(this).parent().find(".confirm_order");
		temp_confirm.unbind();
		$(this).unbind();
		$(this).css("background", "gray");
		$(this).css("color", "#fff");
		$.post(giveupOrderURL, {
			oid: give_up_order_num
		}, function (data) {
			$(this).css("background", "#fff");
			if (data.status == 0) {
				location.reload()
			} else {
				if (data.status == 1) {}
			}
		})
	}
	var add_class_log_num = "";
	$(".add_class_log").click(function () {
		setTimeout(function () {
			$(".add-log-modal").addClass("md-show");
			zhezhao.fadeIn()
		}, 100);
		add_class_log_num = $(this).attr("id");
		$("#addLog").val("")
	});
	$(".add-log-modal").click(function (e) {
		e.stopPropagation()
	});
	var isAddFlag = 0;
	$(".confirm_add").click(function () {
		$(".add-log-modal").removeClass("md-show");
		zhezhao.fadeOut();
		if (isAddFlag == 1) {
			return false
		}
		isAddFlag = 1;
		var log_cont = $("#addLog").val();
		$.post(addLogURL, {
			oid: add_class_log_num,
			content: log_cont
		}, function (data) {
			isAddFlag = 0;
			if (data.status == 0) {
				ialert("您已获得由爱淘学赠送的10淘币奖励！~");
				setTimeout(function () {
					location.reload()
				}, 2000)
			} else {
				if (data.status == 1) {
					location.reload()
				} else {
					if (data.status == 2) {
						location.reload()
					} else {
						if (data.status == 3) {
							ialert("您添加的日志数目不能超过总课时");
							setTimeout(function () {
								location.reload()
							}, 2000)
						}
					}
				}
			}
		}, "json")
	});
	$(function () {
		$(".add-log-modal textarea").keyup(function () {
			var len = $(this).val().length;
			if (len > 249) {
				$(this).val($(this).val().substring(0, 250))
			}
			var num = 250 - len;
			$(".word").html("还可以输入" + num + "字")
		})
	});
	$(".cancel_x i").click(function () {
		$(".add-log-modal").removeClass("md-show");
		zhezhao.hide()
	});
	$(".remind_add_log").click(remindAddLog);

	function remindAddLog() {
		var remind_add_log_num = $(this).attr("id");
		$(this).unbind();
		$(this).css("background", "gray");
		$(this).css("color", "#fff");
		$.post(remindAddLogURL, {
			oid: remind_add_log_num
		}, (function (that) {
			return function (data) {
				if (data.status == 0) {
					$(that).text("提醒成功")
				} else {
					if (data.status == 1) {
						$(that).text("提醒失败")
					} else {
						if (data.status == 8) {
							$(that).text("间隔时间太短")
						}
					}
				}
			}
		})(this), "json")
	}
	$(".comfirm_class").click(confirmClass);

	// 确认授课
	function confirmClass() {
		$(".classNum").val(1);
		confirm_class_num = $(this).attr("id");
		var classNum = $(".classNum").val();
		setTimeout(function () {
			$(".remind-add-log-modal").addClass("md-show");
			zhezhao.fadeIn()
		}, 100);
		limitNum = $(this).parent().parent().find(".all").text() - $(this).parent().parent().find(".now").text()

		// 评价重置
		skill = 4;
		attitude = 4;
		timing = 4;
		$(".appraise_star_box .star").attr('appraise-data', 4);

	}
	$(".addBox .add").click(function () {
		var i = $(".classNum").val();
		if (i >= limitNum || i >= 4) {
			return false
		}
		i++;
		$(".classNum").val(i)
	});
	$(".addBox .down").click(function () {
		var i = $(".classNum").val();
		if (i == 0) {
			return false
		}
		i--;
		$(".classNum").val(i)
	});
	$(".cancelBtn").click(function () {
		$(".remind-add-log-modal").removeClass("md-show");
		zhezhao.hide()
	});
	var isConfirmFlag = 0;
	$(".confirmBtn").click(function () {
		if (isConfirmFlag == 1) {
			return false
		}
		isConfirmFlag = 1;
		$.post(confirmClassURL, {
			oid: confirm_class_num,
			classNum: $(".classNum").val(),
			skill: $(".appraise_star_box .star#skill").attr('appraise-data'),
			attitude: $(".appraise_star_box .star#attitude").attr('appraise-data'),
			timing: $(".appraise_star_box .star#timing").attr('appraise-data')
		}, function (data) {
			$(".remind-add-log-modal").removeClass("md-show");
			zhezhao.hide();
			if (data.status == 0) {
				ialert("确认成功", 1)
			} else {
				if (data.status == 1) {
					$(".remind-add-log-modal").removeClass("md-show");
					zhezhao.hide();
					ialert("确认失败")
				} else {
					if (data.status == 2) {
						$(".remind-add-log-modal").removeClass("md-show");
						zhezhao.hide();
						ialert("确认失败")
					} else {
						if (data.status == 3) {
							$(".remind-add-log-modal").removeClass("md-show");
							zhezhao.hide();
							ialert("余额不足！")
						} else {
							if (data.status == 4) {
								$(".remind-add-log-modal").removeClass("md-show");
								zhezhao.hide();
								ialert("确认课时数过大")
							} else {
								if(data.status == 8) {
									$(".remind-add-log-modal").removeClass("md-show");
									zhezhao.hide();
									ialert("系统错误")
								} else {
									if(data.status == 9) {
										$(".remind-add-log-modal").removeClass("md-show");
										zhezhao.hide();
										ialert("信息不全")
									}
								}
							}
						}
					}
				}
			}
		})
	});
	var refund_order_num = "";
	$(".to_refund").click(function () {
		setTimeout(function () {
			$(".refund-modal").addClass("md-show");
			zhezhao.fadeIn()
		}, 100);
		refund_order_num = $(this).attr("id")
	});
	$(".refund-modal").click(function (e) {
		e.stopPropagation()
	});
	$(".refund-modal .md-content .cancel_delete").click(function () {
		$(".refund-modal").removeClass("md-show");
		zhezhao.hide()
	});
	$(".refund-modal .md-content .confirm_delete").click(function () {
		$.post(refundURL, {
			oid: refund_order_num
		}, function (data) {
			if (data.status == 0) {
				location.reload()
			} else {
				if (data.status == 1) {}
			}
		})
	});
	$(".back").click(function () {
		history.back(-1)
	});


	// 评价
	// $(".appraise").click(function () {
	// 	appraise_oid = $(this).attr('id');
	// 	setTimeout(function () {
	// 		$(".appraise-modal").addClass("md-show");
	// 		zhezhao.fadeIn()
	// 	}, 100);
	// 	skill = 4;
	// 	attitude = 4;
	// 	timing = 4;
	// 	$(".appraise_star_box .star").attr('appraise-data', 4);
	// });
	// zhezhao.click(function () {
	// 	$(".appraise-modal").removeClass("md-show");
	// });
	// $(".cancel_appraise").click(function () {
	// 	$(".appraise-modal").removeClass("md-show");
	// 	zhezhao.hide();
	// });
	// $(".confirm_appraise").click(function () {
	// 	$(".appraise-modal").removeClass("md-show");
	// 	zhezhao.hide();
	// 	// alert( appraise_oid );
	// 	$.post(
	// 		evaluateURL, {
	// 			oid: appraise_oid,
	// 			skill: $(".appraise_star_box .star#skill").attr('appraise-data'),
	// 			attitude: $(".appraise_star_box .star#attitude").attr('appraise-data'),
	// 			timing: $(".appraise_star_box .star#timing").attr('appraise-data')
	// 		},
	// 		function (data) {
	// 			if (data.status == 0) {
	// 				ialert('评价成功', 1)
	// 			} else if (data.status == 1) {
	// 				ialert('信息不全')
	// 			} else if (data.status == 2) {
	// 				ialert('系统错误')
	// 			}
	// 		},
	// 		'json'
	// 	);
	// });
	// $(".appraise-modal").click(function (e) {
	// 	e.stopPropagation();
	// });
});
