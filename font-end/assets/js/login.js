$(document).ready(function () {
    $("#registerLink").click(function () {
        $("#registerContainer").show();
        $("#loginContainer").hide();
    });

    $("#loginLink").click(function () {
        $("#loginContainer").show();
        $("#registerContainer").hide();
    });

    $("button").click(function (event) {
        event.preventDefault();

        var email = $("#email").val();
        var password = $("#password").val();

        $.get('/login', function(response, err) {
                // Xử lý dữ liệu trả về từ server
                $('#message').text(response.message);
                if (response.success) {
                    // Redirect hoặc thực hiện hành động khác khi đăng nhập thành công
                    window.location.href = 'font-end/home.html';
                }
                if(err){
                    $("#test2").html("Đăng nhập thất bại!")
                }
            },
           
        );
    
        // // Gửi yêu cầu POST đến API đăng nhập
        // $.post('/login', { email: email, password: password })
        //     .done(function (data) {
        //         // Xử lý kết quả thành công
        //         window.location.href = '/home';
        //     })
        //     .fail(function (xhr, status, error) {
        //         // Xử lý lỗi
        //         console.log(error)
        //         $("#test2").html("Đăng nhập thất bại!");
        //     });
    });

    $("#registerBtn").click(function () {
        var regUsername = $("#regUsername").val();
        var regPassword = $("#regPassword").val();
        console.log("Đăng ký với " + regUsername + " và " + regPassword);
    });
});

