
// ===========================弹窗控制======================
function winOn(){
    $("#cover").fadeIn(200)
    $("#win").fadeIn(300)
}
function winOff(){
    $("#cover").fadeOut(300)
    $("#win").fadeOut (400)
}

// =========================订单函数================================
function Order( that ){
    this.ele = that;
    this.parentn = this.ele.parent()
    this.parents = this.ele.parents('.class-info-border')
    this.buttonMinus = this.ele;
    this.buttonPlus = this.parentn.find('.button-plus')
    this.buttonOrder = this.parents.find('.order-button')
    this.a =  this.parents.find('.order-a')
    this.classesName = this.parents.find('.order-class-name').text()            //课程名称
    this.inputBox = this.ele.next()                                             //输入框元素
    this.limitedTimes = parseInt(this.parents.find('.class-limited-times').text())          //最少订购数
    this.classPrice = parseInt(this.parents.find('.class-info-box-price').text())           //课程单价
    this.orderAllPrice= this.ele.parents('.class-info-border').find('.order-all-price')     //课程总价元素
    // this.orderAllPriceValue = parseInt(this.ele.parents('.class-info-border').find('.order-all-price').text())
    // this.inputValue = parseInt(this.inputBox.val())
    this.init = (function(that){
        with(that){
            return function(){
                //初始化总价格
                orderAllPrice.text(classPrice*limitedTimes)
                //初始化输入框数值
                inputBox.val(limitedTimes)
                //绑定加减号事件
                buttonMinus.bind('click', function(){
                    var value = parseInt( inputBox.val() )
                    if( value > limitedTimes ){
                        value = value - 1;
                        orderAllPrice.text(classPrice*value)
                        inputBox.val(value)
                    }                 
                });
                buttonPlus.bind('click',function(){
                    var value = parseInt( inputBox.val() )
                    value = value +1;
                    orderAllPrice.text(classPrice*value)
                    inputBox.val(value)
                })
                buttonOrder.bind('click',function(){
                    //备用
                    // $('#win-class').text(classesName)
                    // $('#win-single-price').text(classPrice)
                    // $('#win-total-price').text(classPrice*inputBox.val())
                    // $('#win-class-num').text(inputBox.val())
                    a.attr('href',a.attr('href')+'?num='+inputBox.val())
                    if( parseInt( inputBox.val() ) < limitedTimes){
                         winOn();
                         $('#limitedNum').text(limitedTimes)
                        return false;
                    }
                   
                })
                //绑定输入框事件，禁止非数字字符，包括小数
                // inputBox.keyup(function(){
                //     var value = this.value=this.value.replace(/\D/g,'')
                //     if ( value < limitedTimes ) {
                //         this.value = limitedTimes;
                //         orderAllPrice.text(classPrice*limitedTimes)
                //         return
                //     }
                //     orderAllPrice.text(classPrice*value)
                // })
                inputBox.keyup(function(event) {
                    var value = this.value=this.value.replace(/\D/g,'')
                    orderAllPrice.text(classPrice*value)
                });
            }
        }
    })(this)
}

Order.prototype.winOn = winOn;

//认证状态文字修改
function change_word(){
    var ele = $('.card-img').eq(1);
    if(ele.attr('active') !== '1'){
        $('.student_card').eq(0).text('学历未认证')
        $('.student_identi').eq(0).text('学生证未认证')
    }
}



$(document).ready(function(){
//认证状态文字修改
    change_word()
//绑定关闭遮罩函数
    $('#cover').click(winOff);
    var orderlist = [];
    $('.button-minus').each(function(i){
        orderlist[i] = new Order($(this))
        orderlist[i].init();
    });

    console.log('a')

    $('.order-button-false').bind('click',function(){
        $(this).parent().find('.order-button-win').show()
    })
    //未登陆及家教登陆状态聊天按钮提示
    $('.cant_chat').bind('click',function(){
        $(this).parent().find('.chat_notice').show()
    })

})