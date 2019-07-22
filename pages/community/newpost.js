$(document).ready(function () {
    var postTitle = "";
    var postEmail = "";
    var postContent = "";
    var loggedIn = false;

    loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn == "true") {
        $("#new-post-email").fadeOut();
    }

    $(".footer-paragraph").click(function (e) {
        e.preventDefault();
        $(".upload-media").click();
    });

    $(".cancel-button").click(function (e) {
        e.preventDefault();
        window.history.back();
    })

    $(".submit-button").click(function (e) {
        e.preventDefault();
        postContent = $.trim($(".edit-textarea").val());
        if (!postContent) {
            alert("Content must not be left empty");
            return;
        } else {
            if ($("#new-post-title").hasClass("error") || $("#new-post-email").hasClass("error")) {
                alert("Please check the required fields");
                return;
            } else {
                localStorage.setItem("postTitle", postTitle);
                localStorage.setItem("postEmail", postEmail);
                localStorage.setItem("postContent", postContent);
                console.log(postTitle);
                console.log(postEmail);
                console.log(postContent);
                window.location = "./selfpost.html";
            }
        }
    });

    $("#new-post-title").focusout(function (e) {
        e.preventDefault();

        var value = $.trim($("#new-post-title > input").val());
        if (value.length < 1) {
            $(this).addClass("error");
            alert("Name must NOT be left empty");
        } else {
            $(this).removeClass("error");
            postTitle = value;
        }
    });

    $("#new-post-email").focusout(function (e) {
        e.preventDefault();

        var value = $.trim($("#new-post-email > input").val());
        var regexName = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-]))+\.+([a-zA-Z0-9]{2,4})+$/;
        if (value.length < 1) {
            $(this).addClass("error");
            alert("Email must NOT be left empty");
        } else if (!regexName.test(value)) {
            $(this).addClass("error");
            alert("Please enter a valid email address");
        } else {
            $(this).removeClass("error");
            postEmail = value;
        }
    });

    $(".click-to-go-home").click(function (e) {
        e.preventDefault();
        window.location = "./index.html";
    });
});