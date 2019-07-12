//Toggle the menu
$(".nav-menu-opener").click(function (e) {
    e.preventDefault();
    $("nav").toggleClass("navigation-active");
    $(".nav-menu-opener").toggleClass("nav-menu-opener-active");
    firstTick = Date.now();
});

//Close the menu if clicked outside
$("body").click(function (e) {
    e.preventDefault();
    if (!$("nav").hasClass("navigation-active")) return;
    secondTick = Date.now();
    if ((secondTick - firstTick) < 400) return;
    if (!$("nav").find("*").is(e.target)) {
        $("nav").delay(500).removeClass("navigation-active");
        $(".nav-menu-opener").removeClass("nav-menu-opener-active");
    }
});