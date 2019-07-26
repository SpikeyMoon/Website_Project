$(document).ready(function () {
    var loggedIn = localStorage.getItem("loggedIn");

    $(".nav-search").click(function (e) {
        e.preventDefault();
        $("#search-overlay").fadeIn();
    });

    $(".closebtn").click(function (e) {
        e.preventDefault();
        $("#search-overlay").fadeOut();
    });

    $("#search-overlay").click(function (e) {
        e.preventDefault();
        if (!$(this).find("*").is(e.target)) {
            $("#search-overlay").fadeOut();
        }
    });

    if (loggedIn == "true") {
        $(".login-button").addClass("hide");
        $(".loggedin-person").removeClass("hide");
        $(".login-mobile").addClass("hide");
    } 
    if(loggedIn == "false") {
        $(".login-button").removeClass("hide");
        $(".loggedin-person").addClass("hide");
        $(".login-mobile").removeClass("hide");
    }

    var countries = [
        { value: 'DOOM', data: 'DO' },
        { value: 'DOOM Eternal', data: 'DE' },
        { value: 'Crysis Eternal', data: 'CE' },
        { value: 'Crysis', data: 'DE' },
        { value: 'Crysis Eternal: Angel City', data: 'DE' },
        { value: 'Crysis Eternal: Sole Survivor', data: 'DE' },
        { value: 'DOOM Eternal', data: 'DE' },
        { value: 'PARAGON', data: 'PG' },
        { value: 'PARAGON:YOUNGBLOOD', data: 'PY' },
        { value: 'STEEP', data: 'ST' }
    ];

    $('#search-input').autocomplete({
        lookup: countries,
        onSelect: function (suggestion) {
            window.location = "../game/index.html";

        }
    });
    // Menu-ing
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

    $(".logo").click(function(e) {
        e.preventDefault();
        window.location = "../index.html"
    });

    $(".menu-item-1").click(function(e) {
        e.preventDefault();
        window.location = "../pages/game/index.html"
    });

    $(".menu-item-2").click(function(e) {
        e.preventDefault();
        window.location = "../pages/news/index.html"
    });

    $(".menu-item-3").click(function(e) {
        e.preventDefault();
        window.location = "../pages/community/index.html"
    });

    $(".menu-item-4").click(function(e) {
        e.preventDefault();
        window.location = "../pages/wwu/index.html"
    });
    
    $(".menu-item-5").click(function(e) {
        e.preventDefault();
        window.location = "../pages/store/index.html"
    });

    $(".nav-cart").click(function(e) {
        e.preventDefault();
        window.location = "../pages/cart/index.html"
    });

    $(".loggedin-person").click(function(e) {
        e.preventDefault();
        window.location = "../pages/account/index.html"
    });

    $(".login-button").click(function(e) {
        e.preventDefault();
        window.location = "./overlay/login.html"
    });

    
});
