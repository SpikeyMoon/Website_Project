$(document).ready(function () {
    var defaultQuantity = 1;
    var quantity = defaultQuantity;
    var count = 0;
    var total = 0;

    $(".quantify").html(defaultQuantity);
    adjustTotal();


    $(".add").click(function (e) {
        e.preventDefault();
        quantity++;
        $(".quantify").html(quantity);
        adjustTotal();
    });

    $(".reduce").click(function (e) {

        e.preventDefault();
        quantity--;
        if (quantity > 0) {
            $(".quantify").html(quantity);
        }
        else {
            var res = confirm("Are you sure you want to remove the selected item?");
            if (res) {
                $(".cart-item").has($(this)).fadeOut();
                count++;
            } else {
                quantity++;
            }
        }
        adjustTotal();
        display();
    });

    $(".clear-shopping").click(function (e) {
        e.preventDefault();
        var res = confirm("Are you sure you want to remove the selected item(s)?");
        if (res) {
            $(".cart-item").has($(this)).fadeOut();
            count++;
        }
        display();
    });

    $(".remove").click(function (e) {
        e.preventDefault();
        var res = confirm("Are you sure you want to remove the selected item?");
        if (res) {
            $(".cart-item").has($(this)).fadeOut();
            count++;
        }
        display();
    });  

    function display() {
        if (count == 1) {
            $(".empty").fadeIn();
            $(".total").fadeOut();
            $(".action-buttons").fadeOut();
        }
    }

    function adjustTotal() {
        total = 59.99 * quantity;
        $(".amount").html("$" + total);
    }

    $('#dvProductsFilteredd > div').filter(function () {
        return $(this).css('display') === 'block';
    }).length;


    $(".checkout").click(function (e) {
        e.preventDefault();
        $(".done").next().addClass("done");
        $(".checkout-page").fadeOut();
        $(".checkout-page").next().fadeIn();

    });

    if ($(".creditcard-payment > input").prop("checked") === true) {
        $(".ewallet-pay").fadeOut();
        $(".creditcard-pay").fadeIn();
    };
    if ($(".ewallet-payment > input").prop("checked") === true) {
        $(".creditcard-pay").fadeOut();
        $(".ewallet-pay").fadeIn();
    };


    $(".creditcard-payment").click(function (e) {
        e.preventDefault();
        $(".creditcard-payment > input").prop("checked", true);
        $(".ewallet-payment > input").prop("checked", false);
        $(".ewallet-pay").fadeOut();
        $(".creditcard-pay").fadeIn();
    });

    $(".ewallet-payment").click(function (e) {
        e.preventDefault();
        $(".ewallet-payment > input").prop("checked", true);
        $(".creditcard-payment > input").prop("checked", false);
        $(".creditcard-pay").fadeOut();
        $(".ewallet-pay").fadeIn();
    });

    /////////////////////////////////////////////////////
    var loggedIn = localStorage.getItem("loggedIn");

    $(".next-step").click(function (e) {
        var DEFAULT = $(".default").has($(this));
        console.log(DEFAULT[0]);
        var DEFAULT_2 = $(".default");
        console.log(DEFAULT_2[1]);
        console.log(DEFAULT[0] == DEFAULT_2[1]);
        console.log(DEFAULT[0] == DEFAULT_2[2]);
        if (DEFAULT[0] == DEFAULT_2[1]) {
            $(".done").last().next().addClass("done");
            $(".billing-page").fadeOut();
            $(".billing-page").next().fadeIn();
        } else if (DEFAULT[0] == DEFAULT_2[2]) {
            $(".done").last().next().addClass("done");
            $(".verify-page").fadeOut();
            $(".verify-page").next().fadeIn();
        }
    })

    $(".continue-shopping").click(function (e) { 
        e.preventDefault();
        window.location = "../store/index.html"
    });

    $(".back-to-main-site").click(function (e) { 
        e.preventDefault();
        window.location = "../../index.html"
    });

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