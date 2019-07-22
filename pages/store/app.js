$(document).ready(function () {
    var currentBannerPos = 0;

    function bannerScrolling() {
        var obj = $(".shop-main-banner > .banner-container");
        console.log(obj);
        $(obj).removeClass("banner-previous");
        $(obj).removeClass("banner-next");
        $(obj).removeClass("banner-current");
        $(obj).addClass("banner-previous");

        $(obj[currentBannerPos]).removeClass("banner-previous");
        $(obj[currentBannerPos]).addClass("banner-current");
        $(".banner-current ~ .banner-container").removeClass("banner-previous");
        $(".banner-current ~ .banner-container").addClass("banner-next");

        var sobj = $(".banner-nav");
        $(sobj).removeClass("banner-active");
        $(sobj[currentBannerPos]).addClass("banner-active");
    }

    $(".chevron-navigation").click(function () {
        console.log(1);
        if ($(this).is("#chevron-navigation-previous")) {
            currentBannerPos--;
            if (currentBannerPos < 0) {
                currentBannerPos = 2;
            }
        } else if ($(this).is("#chevron-navigation-next")) {
            currentBannerPos++;
            if (currentBannerPos > 2) {
                currentBannerPos = 0;
            }
        }
        bannerScrolling();
    });

    $(".banner-nav").click(function () {
        console.log(2);
        if ($(this).is("#navigation-1")) {
            currentBannerPos = 0;
        } else if ($(this).is("#navigation-2")) {
            currentBannerPos = 1;;
        } else if ($(this).is("#navigation-3")) {
            currentBannerPos = 2;;
        }

        bannerScrolling();
    });

    timer = setInterval(function () {
        console.log(3);
        currentBannerPos++;
        if (currentBannerPos > 2) {
            currentBannerPos = 0;
        }
        bannerScrolling();
    }, 5000);

    $(".item-buy").click(function (e) { 
        e.preventDefault();
        alert("Item added to cart");
    });

    $(".default-button").click(function (e) { 
        e.preventDefault();
        alert("Item added to cart");
    });

    $("#click-here").click(function (e) { 
        e.preventDefault();
        window.location = "../game/index.html"
    });

    $("#clear-filter").click(function (e) { 
        document.getElementById('set-filter').checked = false;
        document.getElementById('clear-filter').checked = true;
        e.preventDefault();
        $(".shop-showcase .item-card").fadeIn();
    });
    
    $("#set-filter").click(function (e) { 
        document.getElementById('clear-filter').checked = false;
        document.getElementById('set-filter').checked = true;
        e.preventDefault();
        $(".shop-showcase .item-card").fadeOut();

        $(".item-filtered").fadeIn();
    });

    $('input:radio[name="franchise"]').click(function(e) {
        // $('input:radio[name="franchise"]').prop("checked", false);
        $(this).prop('checked', true);
    })
    
    /////////////////////////////////////////////////////
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
        window.location = "../../index.html"
    });

    $(".menu-item-1").click(function(e) {
        e.preventDefault();
        window.location = "../game/index.html"
    });

    $(".menu-item-2").click(function(e) {
        e.preventDefault();
        window.location = "../news/index.html"
    });

    $(".menu-item-3").click(function(e) {
        e.preventDefault();
        window.location = "../community/index.html"
    });

    $(".menu-item-4").click(function(e) {
        e.preventDefault();
        window.location = "../wwu/index.html"
    });
    
    $(".menu-item-5").click(function(e) {
        e.preventDefault();
        window.location = "../store/index.html"
    });

    $(".nav-cart").click(function(e) {
        e.preventDefault();
        window.location = "../cart/index.html"
    });

    $(".loggedin-person").click(function(e) {
        e.preventDefault();
        window.location = "../account/index.html"
    });

    $(".login-button").click(function(e) {
        e.preventDefault();
        window.location = "../../overlay/login.html"
    });
});