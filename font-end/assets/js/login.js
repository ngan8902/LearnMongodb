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

        $.ajax({
            url: 'http://localhost:8000/api/user/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                email: regUsername,
                password: regPassword,
            }),
            success: function(response) {
                console.log('API call success:', response);
                window.location.href = 'font-end/page/login.html'                
            },
        })

           
       
    
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
        var regFullname = $("#regFullname").val();
        var regPhonenumber = $("#regPhonenumber").val();

        console.log("Đăng ký với " + regUsername + " và " + regPassword);

        $.ajax({
            url: 'http://localhost:8000/api/user/signup',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                email: regUsername,
                fullname: regFullname,
                password: regPassword,
                phonenumber: regPhonenumber
            }),
            success: function(response) {
                console.log('API call success:', response);
                $("#loginContainer").show();
                $("#registerContainer").hide();
                
            },
            error: function(xhr, status, error) {
                console.error('API call error:', error);
                $("#test1").html("Đăng ký thất bại!");
                // Xử lý lỗi ở đây nếu cần
            }
        });
        
    });
});

