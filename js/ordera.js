
function orderSUCC(data){
    if( data.status == '0' ){
    	var text;
    	setTimeout(function () {
			$("#modal-1").addClass("md-show");
			text = "请选择支付方式   订单总额为:" + $('#order_all').text() + "元";
			$("div.md-content .h3").text(text); 
			zhezhao.fadeIn()
		}, 100);
    	order_id = data.order_id;
//        document.pay_form.trade_no.value=data.order_id;
//        document.pay_form.ordsubject.value='爱淘学订单'+data.order_id;
//        document.pay_form.ordtotal_fee.value=$('#order_all').text();
//        // document.pay_form.ordtotal_fee.value='0.01'
//        document.pay_form.ordbody.value=$("#remark").val()?$("#remark").val():'备注为空';
//        document.pay_form.ordshow_url.value="<{:U('Goods/showOrder')}>";
//        document.pay_form.submit();
        return true;
    }
    if( data.status == '1'){
        alert('请确认订单信息是否正确.')
    }
}
function orderFail(){
    alert('网络故障，请重试！')
}
//添加地址ajax状态函数
function addrSucc(data){
    if(data.status == '0'){
        var ele = $('.order_addr_box');
        var nth = ele.length - 1;
        var name = $('#add_name').val();
        var addr = $('#add_address').val();
        var phone = $('#add_phone').val()        
        ele.eq(nth).after(
            '&nbsp'+
            '<div class="order_addr_box" id="'+ data.aid +'" flag="0">'+
                '<div class="addr_name">'+
                    '<span>'+ name +'</span>'+
                '</div>'+
                '<div class="order_addr">'+
                    '<p>'+ addr +'</p>'+
                    '<p>'+ phone +'</p>'+
                '</div>'+
                '<div class="triangle"><i class="icon-ok"></i></div>'+
            '</div>'
        )
        //初始化所有订单状态
        $('.order_addr_box').attr('flag','0')
        //重新绑定地址事件，第一次绑定在页面加在后完成
        $(".order_addr_box").bind('click',function(){
            $(".order_addr_box").removeClass('order_addr_box_active').attr('flag','0')
            $('.triangle').removeClass('triangle_active')
            $(this).find('.triangle').addClass('triangle_active')
            $(this).addClass('order_addr_box_active').attr('flag','1')
        })
        //删除添加地址按钮元素
        $('#add_addr').remove()
        //关闭遮罩
        winAddOff() 
        return true;
    }
    if(data.status == "1"){
        alert("地址添加失败，请重试")
    }
    if(data.status == "2"){
        alert("手机号格式不合法")
        return false;
    }
    if(data.status == "3"){
        alert("信息不能为空")
    }
}
function addrFail(){
    alert('网络错误')
}
//添加新地址元素
function addNewAdd(){
    var name = $('#add_name').val();
    var addr = $('#add_address').val();
    var phone = $('#add_phone').val()
    // 验证信息是否合法
    if( name =='' || addr == '' || phone ==''){
        alert('信息不能为空！')
        return false;
    }
    $.ajax({
        url: urladdr,
        type:'post',
        dataType:'json',
        data:{
            name:name,
            address:addr,
            phone:phone
        },
        success:addrSucc,
        error:addrFail

    })       
}
// ===========================弹窗控制======================
function winOn(){
    $("#cover").fadeIn(200)
    $("#win").fadeIn(300)
}
function winOff(){
    $("#cover").fadeOut(300)
    $("#win").fadeOut (400)
}
function winAddOn(){
    $("#cover2").fadeIn(200)
    $("#add_win").fadeIn(300)
}
function winAddOff(){
    $("#cover2").fadeOut(300)
    $("#add_win").fadeOut (400)
}
//============================获取地址id=====================
var aid;
function getAid(){
    var aid;
    $('.order_addr_box').each(function(){
        if($(this).attr('flag') == '1') {
        aid = $(this).attr('id')
        }
    })
    return aid;
}
//订单构造函数
function Order( ){
    this.buttonMinus = $('.button-minus').eq(0)
    this.buttonPlus = $('.button-plus').eq(0)
    this.classesName = $('#order_class').text()           //课程名称
    this.inputBox = $('.add-input').eq(0)          //输入框元素
    this.limitedTimes = $('#limitedn').val()        //最少订购数
    this.classPrice = parseInt($('#order_single').text())         //课程单价
    this.orderAllPrice= $('#order_all')     //课程总价元素
    this.price = $('#order_pay_alls')
    this.button = $('#order_sumit')
    this.init = (function(that){
        with(that){
            return function(){
                //初始化总价格
                //绑定加减号事件
                buttonMinus.bind('click', function(){
                    var value = parseInt( inputBox.val() )
                    if( value > limitedTimes ){
                        value = value - 1;
                        orderAllPrice.text(classPrice*value)
                        price.text(classPrice*value+'元')
                        $('#order_pay_socers').text(classPrice*value)
                        inputBox.val(value)
                    }                 
                });
                //绑定减号事件
                buttonPlus.bind('click',function(){
                    var value = parseInt( inputBox.val() )
                    if( value < 99 ){
                        value = value +1;
                        orderAllPrice.text(classPrice*value)
                        price.text(classPrice*value+'元')
                        $('#order_pay_socers').text(classPrice*value)
                        inputBox.val(value)
                    }
                })
                //绑定提交按钮
                button.bind('click',function(){
                    var value = parseInt( inputBox.val() )
                    if( value < limitedTimes || value > 99){
                         winOn()
                         $('#limitedNum').text(limitedTimes + '-99之间')
                        return false;
                    }
                    var aid = getAid()
                    if( !aid ){
                        alert('提交订单前，请选择授课地址')
                        return false;
                    }
                    //发送信息确认是否提交订单                    
                    $.ajax({
                            type:'post',
                            url: urlorder,
                            dataType: "json",
                            data: {
                                remark:$('#remark').val(),
                                num:$('.add-input').val(),
                                gid:$('#gid').val(),
                                aid:aid
                            },
                            success: orderSUCC,
                            error: orderFail,
                            });
                    
                })
                //绑定输入框事件，禁止非数字字符，包括小数
                inputBox.keyup(function(){
                    var value = this.value=this.value.replace(/\D/g,'')
                    orderAllPrice.text(classPrice*value)
                     $('#order_pay_socers').text(classPrice*value)
                    price.text(classPrice*value+'元')
                })
            }
        }
    })(this)
}
$(document).ready(function(){
    var a = new Order()
    a.init()
    //绑定地址事件
    $(".order_addr_box").bind('click',function(){
        $(".order_addr_box").removeClass('order_addr_box_active').attr('flag','0')
        $('.triangle').removeClass('triangle_active')
        $(this).find('.triangle').addClass('triangle_active')
        $(this).addClass('order_addr_box_active').attr('flag','1')
    })

    $('#remark').bind('click',function(){
        $(this).css({height:'90px',
                    marginTop:'0px'
                    })
    }).bind('blur',function(){
        $(this).css({height:'30px',
                    marginTop:'30px'
                    })
    })
    $('#cover').click(winOff).click(winAddOff); 
    //添加地址按钮事件
    $('#add_addr').bind('click',function(){
        winAddOn()
    })
    // //确定输入新地址按钮--备用
    // $('#add_win_ok').bind('click',function(){
    //     addNewAdd()
    // })
    //绑定取消输入新地址按钮
    $('#add_win_no').bind('click',function(){
        winAddOff()
    })
})
