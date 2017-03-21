$(function() {
    var countdown = null;
    //手机号码框失去焦点后检测手机格式是否正确
    function checkPhone() {
        var str = $("#phone").val();
        var re = /^1[8345]\d{9}$/;
        if (!re.test(str)) {
            // 错误
            error_tip("请输入手机号码");
            return false;
        } else {
            // 正确
            $('.error_tip.phone').show();
            $('.error_tip.phone').html('');
            $('.error_tip.phone').css("color", "green");
            $('#phone').removeClass('error');
            return true;
        }
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "http://120.25.202.14/pal/public/index.php?_url=/users/phone_exists",
            data: { phone: $('#phone').val() },
            success: function(data) {
                if (data.exist == true) {
                    $('.error_tip.phone').css('display', 'inline');
                    $('.error_tip.phone').html('该号码已经注册');
                } else {
                    $('.error_tip.phone').html('');
                }
            }

        });

    };

    function checkUserName() {
        var errTip = $(".error_tip.name");
        errTip.css('display', 'inline');
        var username = $('#name').val();
        var nameLen = username.length;
        if (nameLen < 4 || nameLen > 30) {
            errTip.html("用户名需为4-30位");
            return;
        } else if (nameLen === 0) {
            errTip.html("用户名不能为空");
            return;
        }
        errTip.html("");
    }
    /*当鼠标离开密码文本框时，提示文本及样式*/
    function passwordBlur() {
        var password = $("#password").val();
        var passwordTip = $('.error_tip.password');
        if (password.value == "") {
            passwordTip.css('display', 'inline');
            passwordTip.html('密码不能为空');
            return false;
        }
        if (password.length < 6 || password.length > 16) {
            passwordTip.css('display', 'inline');
            passwordTip.html('密码长度为6-16');
            return false;
        }
        passwordTip.html('');
        return true;
    }

    // function checkPsd() {
    //     var psd1 = $("#password").val();
    //     var psd2 = $("#password_check").val();
    //     var psd1Tip = $('.error_tip.password');
    //     var psd2Tip = $('.error_tip.password_check');
    //     psd1Tip.css('display', 'inline');
    //     psd2Tip.css('display', 'inline');
    //     if (psd1.length === 0) {
    //         psd1Tip.html('密码不能为空');
    //     } else if (psd2 !== psd1) {
    //         psd1Tip.html('');
    //         psd2.length === 0 ? psd2Tip.html('密码不能为空') : psd2Tip.html('两次密码不一致');
    //     } else {
    //         psd1Tip.html('');
    //         psd2Tip.html('');
    //     }
    // }
    /*当鼠标离开重复密码文本框时，提示文本及样式*/
    function repassBlur() {
        var repwd = $("#password_check").val();
        var pwd = $("#password").val();
        var repwdTip = $(".error_tip.password_check");
        if (repwd.value == "") {
            repwdTip.css('display', 'inline');
            repwdTip.html('密码不能为空');
            return false;
        }
        if (repwd != pwd) {
            repwdTip.css('display', 'inline');
            repwdTip.html('两次密码不一致');
            return false;
        }
        repwdTip.html('');
        return true;
    }


    function error_tip(tip) {
        $('.error_tip.phone').show();
        $('.error_tip.phone').html(tip);
        $('.error_tip.phone').css("color", "red");
        $('#phone').addClass('error');
    }

    function getCheckNum() {
        var phone = $('#phone').val();
        countdown = setInterval(countDown(), 1000);
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "http://120.25.202.14/pal/public/index.php?_url=/common/code",
            data: { phone: phone },
            success: function(data) {
                if (data.success == true) {} else {
                    alert('网络故障，请稍后再试');
                }
            }

        });
    }
    // 倒计时
    function countDown() {
        $('#get_check_num').prop("disabled", true);
        clearInterval(countdown);
        var clock = 60;
        return function() {
            clock--;
            $('#get_check_num').html(clock + "s后重发");
            if (clock == 0) {
                clearInterval(countdown);
                $('#get_check_num').html('获取验证码');
                $('#get_check_num').prop("disabled", false);
                $('#get_check_num').addClass('active');
            }
        }
    }
    // 验证框失去焦点检测验证码是否输入
    function chekInputNum() {
        var str = $("#ambassador_check_num").val();
        if (str == '') {
            // 错误
            $('.error_tip.yzm').show();
            $('.error_tip.yzm').css("color", "red");
            $('.error_tip.yzm').html(error + "请输入验证码");
            $('#ambassador_check_num').addClass('error');
            return false;
        } else {
            // 正确
            $('.error_tip.yzm').show();
            $('.error_tip.yzm').html('');
            $('.error_tip.yzm').css("color", "green");
            $('#ambassador_check_num').removeClass('error');
            return true;
        }
    };
    // 提交注册
    function enter() {
        var $box = document.getElementById('ty');
        if (!$box.checked) {
            return false;
        }
        var phone = $('#phone').val();
        var role = +sessionStorage.getItem('role');
        var code = $('#ambassador_check_num').val();
        var username = $('#name').val();
        var password = $.md5($('#password').val());

        $.ajax({
            type: "POST",
            dataType: "json",
            url: "http://120.25.202.14/pal/public/index.php?_url=/tokens/register",
            data: {
                phone: phone,
                role: role,
                code: code,
                username: username,
                password: password
            },
            success: function(data) {
                if (data.errcode && data.errcode === 20201) {
                    $('.error_tip.yzm').css('display', 'inline')
                    $('.error_tip.yzm').html('验证码错误');
                }
                if (data.token) {
                    alert("注册成功");
                }
                sessionStorage.setItem("token", data.token);
            }

        });
    };

    function init() {
        $('#get_check_num').on('click', getCheckNum);
        $("#phone").on('blur', checkPhone);
        $('#name').on('blur', checkUserName);
        $("#password").on('blur', passwordBlur);
        $("#password_check").on('blur', repassBlur);
        $('#submit').on('click', enter);

    }

    init();
});