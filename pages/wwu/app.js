$(document).ready(function () {
    $(".learn-more-button").click(function (e) {
        e.preventDefault();
        $("html, body").animate(
            {scrollTop : ($(".jobs").offset().top)}
            , 500);
    });

    $(".apply-job").click(function (e) { 
        e.preventDefault();
        window.location = "https://chm.tbe.taleo.net/chm03/ats/careers/apply.jsp?org=IDSOFTWARE&cws=1";
    });

    $("#click-here").click(function (e) {
        e.preventDefault();
        $(".listing").fadeIn();
    });

    $(".listing").click(function (e) {
        e.preventDefault();
        if (!$(e.target).is($(".listing").find("*"))) {
            $(".listing").fadeOut();
        }
    });
});