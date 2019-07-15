$(document).ready(function () {
    $(".search-button").click(function (e) {
        e.preventDefault();
        $(".search-field").toggleClass("input-active");
    });

    $(".collapse-toggle").click(function (e) {
        e.preventDefault();
        var header = $(".main-section-header").has(this);
        console.log(header);
        $(header).next().toggleClass("disable-section");
    });

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

    $("#click-here").click(function (e) { 
        e.preventDefault();
        window.location = "./allthreads.html";
    });

});