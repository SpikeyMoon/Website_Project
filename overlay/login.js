$(document).ready(function () {
    var emailValid = false;
    var signupEmailValid = false;
    function validateEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    $(".login-button").click(function (e) {
        e.preventDefault();
        var email = $("#login-email").val();

        emailValid = validateEmail(email);

        if (!emailValid) {
            alert("Your credentials are incorrect, please try again");
        } else {
            if($("#login-password").val().length > 0) {
                alert("Login successful!");
            }
        }

    });

    $(".next-button").click(function (e) {
        e.preventDefault();
        if ($(".signup-page-1").hasClass("active")) {
            var email = $("#signup-email").val();

            if (!validateEmail(email)) {
                alert("Invalid Email Address");
            } else {
                signupEmailValid = true;
                $(".signup-page-1").removeClass("active");
                $(".signup-page-2").addClass("active");

            }

        } else if ($(".signup-page-2").hasClass("active")) {
            var password = $("#signup-password").val();
            if (!(password.length > 8)) {
                alert("Password must have atleast 9 characters");
            } else {
                $(".signup-page-2").removeClass("active");
                $(".signup-page-3").addClass("active");
            }
        }

    });

    $(".back-button").click(function (e) {
        e.preventDefault();
        if ($(".signup-page-3").hasClass("active")) {
            $(".signup-page-3").removeClass("active");
            $(".signup-page-2").addClass("active");
        } else if ($(".signup-page-2").hasClass("active")) {
            $(".signup-page-2").removeClass("active");
            $(".signup-page-1").addClass("active");
        } else if ($(".signup-page-1").hasClass("active")) {
            $(".signup-page-1").removeClass("active");
            $(".signup-main").addClass("active");
        }

    });

    $(".signup-email").click(function (e) {
        e.preventDefault();
        $(".signup-main").removeClass("active");
        $(".signup-page-1").addClass("active");
    });



    $(".switch-button").click(function (e) {
        e.preventDefault();
        if ($(".login").hasClass("active")) {
            $(".login").removeClass("active");
            $(".signup-main").addClass("active");
        } else {
            $(".signup-main").removeClass("active");
            $(".login").addClass("active");
        }
    });

    $(".create-account-button").click(function (e) {
        e.preventDefault();
        window.location = "../index.html";
    });

});