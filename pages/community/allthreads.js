$(document).ready(function () {
    $(".new-post-button").click(function (e) {
        e.preventDefault();
        $(".select-category").fadeIn();
    });

    $(".cancel-posting").click(function (e) {
        e.preventDefault();
        $(".select-category").fadeOut();
    });

    $(".select-category").click(function (e) {
        e.preventDefault();
        if (!$(e.target).is($(".select-category").find("*"))) {
            $(".select-category").fadeOut();
        }
    });

    $(".confirm-button").click(function (e) { 
        e.preventDefault();
        $(".select-category").fadeOut();
        window.location = "./newpost.html";
    });

    $("#click-this").click(function (e) { 
        e.preventDefault();
        window.location = "./onethread.html";
    });

    $(".click-to-go-home").click(function (e) { 
        e.preventDefault();
        window.location = "./index.html";
    });
});