$(function() {
    function enterLogin() {
        var phone = $("#userphone").val();
        var password = $.md5($('#password').val());

        $.ajax({
            type: "post",
            url: "http://120.25.202.14/pal/public/index.php?_url=/tokens/login",
            data: {
                phone: phone,
                password: password
            },
            dataType: "json",
            success: function(data) {
                if (data.success == true) {
                    window.location.href = "#";
                } else if (data.errcode == 20202) {
                    alert("手机号错误");
                } else if (data.errcode == 20203) {
                    alert("密码错误");
                }

            }
        });
    }

    // function loginOut() {
    //     var token = sessionStorage.getItem("token");
    //     $.ajax({
    //         type: "post",
    //         url: "http://120.25.202.14/pal/public/index.php?_url=/tokens/{token}",
    //         data: {
    //             token: token
    //         },
    //         dataType: "json",
    //         success: function(data) {

    //         }
    //     });
    // }

    function init() {
        $("#loginBtn").on("click", enterLogin);

    }
    init();
})