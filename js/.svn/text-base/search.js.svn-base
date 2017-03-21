
// ==================学生年级-科目选择===================
function Choice_card(name){
	this.ele = $("." + name);
	this.init = function(){
		for (var i = 0 ;  i <= this.ele.length ; i++) {
			this.ele.eq(i).bind("click", 
				(function(that){
					return function(){
	 					$('.dele_paddingbottom').eq(0).css({borderBottom:'1px dashed #ddddde'})
				 		for (var i = 0 ; i <= that.ele.length ; i++ ){
				 			if ( $( "#choice-" + that.ele.eq(i).attr("id") ).css("display") == "block" ) {
				 				if (that.ele.eq(i).attr("id") == $(this).attr("id")) {
				 					return false;
				 				}else{
				 					$( "#choice-" + that.ele.eq(i).attr("id") ).slideUp(300)
				 					that.ele.eq(i).removeClass('choice-child-active')
				 				}
				 			}

				 		}
 				 		// console.log( $( "#" + "choice-" + $(this).attr("id") ).attr("id") )
 				 		$( "#choice-" + $(this).attr("id") ).slideDown(500)
 				 		$(this).addClass('choice-child-active')
					}

				})(this)
			)
		}
	}
}

// ==========================点亮已选择的标签======================
function Find_tab(class_name){
	this.ele = $("." + class_name +" a");
	this.init = function(){
		for (var i = 0 ;  i <= this.ele.length ; i++) {
			if ( this.ele.eq(i).attr("active") == "1" ) {
				this.ele.eq(i).addClass('choice-child-active-sys')
			};
		}
	}
}


// =========================滚轮=============================
function control_scroll(events){
			$(document).scrollTop(events.data.sval)
		}


// =========================排序箭头====================
function Find_sort(class_name){
	this.ele = $("." + class_name + " a")
	this.init = function(){
		this.ele.each(function(){
			if (  parseInt( $(this).attr('st') ) > 0  ) {
					if( parseInt( $(this).attr('status') ) > 0  ) {
						$(this).find('i').removeClass('icon-resize-full').addClass('icon-arrow-up')
					}else{
						$(this).find('i').removeClass('icon-resize-full').addClass('icon-arrow-down ')	
					}
			};
			// console.log( $(this).attr('status') )
		});
	}
}

// ==========================弹窗==========================
 function Windows(name){
    	this.ele = $("#" + name )
    	this.on = (function(that){
    		return function(){	
    			$("#cover").fadeIn(200)
    			that.ele.slideDown(300)

    		}
    	})(this)
    	
    	this.off = (function(that){
    		return function(){	
    			$("#cover").fadeOut(300)
    			that.ele.slideUp(400)
			}
    	})(this)
   }


// =========================onload==========================
$(document).ready(function(){
	//标记导航栏
	nav(1)

	//未登陆及家教登陆状态聊天按钮提示
	$('.cant_chat').bind('click',function(){
		$(this).parent().find('.chat_notice').show()
	})

	var card = new Choice_card("card");
	card.init();
	var tab = new Find_tab("choice-child-box")
	tab.init();
	var win = new Windows("win");
    $("#open").bind("click",function(){
    	win.on()
    	// 绑定document禁用滚动条
    	var sval = $(document).scrollTop();
    	$(document).bind('scroll',{sval:sval},control_scroll)
    });

    $("#cover").bind("click",function(){
    	win.off()
    	// 解除document禁用滚动条
    	$(document).unbind("scroll",control_scroll)
    });

    var sort = new Find_sort('sort')
    sort.init()
});


