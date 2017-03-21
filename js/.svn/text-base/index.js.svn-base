//获取展示图片链接
function getShowPicterUrl(){
    var picterUrl = [];
    $('[id^=index_show_img]').each(function(i){
        picterUrl[i] = $(this).css('background-image')
    })
    return picterUrl;
}

//循环计数器
var counter; 
//循环计数器生成函数
function con(list){
    var i = 0;
    var max = list.length -1;
    return function( leftOrRight ){
        if (leftOrRight == 'right') {
            i --;
            if( i < 0 ){
                i = max; 
                return i;

            }else{
                return i;
            }
        }else{
            i ++ ;
            if( i > max ){
                i = 0;
                return i;

            }else{
                return i;
            }
        }
    }
}
//开关值
var switchVal = (function(){
    var i = 1;
    return function(){
        if (i){
            i = 0;
            return 1;
        }else{
            i = 1;
            return 0;
        }
    }
})()

//图片轮播初始化
function scrollPicter(){
    var html_width = parseInt($('html').css('width'))
    $('[id^=index_show_img]').each(function(i){
            $(this).css({left:i*(1)*html_width+'px'})
        //清除除第一个和第二个展示图片元素
        if( i > 1){
            $(this).remove()
        }           
    })
    $('[id^=index_show_button]').each(function(){
        $(this).attr('active','1')
    })
}

//轮播按钮事件
function changePicture(list,leftOrRight,that){
    if( parseInt($(that).attr('active')) ){
        var html_width = parseInt($('html').css('width'))
        var i;
        var imgs = $('[id^=index_show_img]')
        if (leftOrRight == 'left' ){
            i = -1;
            imgs.eq(switchVal()).css({
                backgroundImage: list[counter('left')],
                width: html_width,
                left: (-1)*i*html_width
            })
        }else{
            i = 1;
            imgs.eq(switchVal()).css({
                backgroundImage: list[counter('right')],
                width: html_width,
                left: (-1)*i*html_width
            })
        }
        //防止动画触发你频率过快
        $(that).attr('active','0')
        var t = setTimeout(function(){
            $(that).attr('active','1')
        },500)
        imgs.each(function(){
            $(this).animate({left:parseInt($(this).css('left'))+(i*html_width)+'px'},400)
        })
    }

}
//窗口尺寸
function winSizeChange(){
    var html_width = parseInt($('html').css('width'))
    var imgs = $('[id^=index_show_img]')
    imgs.each(function(){
        $(this).css({
            width: html_width,
            left:function(){
                if(parseInt($(this).css('left')) != 0){
                    return $(this).css('width')
                }
            }
        })
    })
}

//自动轮播----time/ms
function autoScroll(time){
    var btn = $('#index_show_button_right');
    setTimeout(function(){
        btn.click()
        autoScroll(time)
    },time)
}

//load 函数
$(document).ready(function(){
    // 课程选择菜单
    var classEle = $('.index_find_class_child').eq(0)
    $('.index_find_class_hub li').each(function(){
        $(this).bind('mouseover',function(){
            classEle.css({width: Math.ceil($('#class_'+$(this).attr('id')).find('li').length/10)*140 +'px'})
            classEle.html('<ul>' + $('#class_'+$(this).attr('id')).html() + '</ul>' )
        })
    });
    $('.index_find_class').eq(0).bind('mouseleave',function(){
         classEle.html('')
         classEle.css({width:'0px'})
    })

    //获取轮播图片url列表
    var list = getShowPicterUrl()

    //构造轮播计数器
    counter = con(list)

    //初始化轮播
    scrollPicter();

    //绑定轮播按钮事件
    $('#index_show_button_left').bind('click',function(){
        changePicture(list,'left',this)
    })
    $('#index_show_button_right').bind('click',function(){
        changePicture(list,'right',this)
    })
    //窗口尺寸变化事件
    window.onresize = winSizeChange;
    //自动轮播
    autoScroll(7000)
});
