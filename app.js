

//Functions for big screens
//Hash functions should go here

$(function () {
    ////////////////////////////////
    //Initialize variables
    var scrolledDown = 0;
    var scrolledUp = 0;
    var firstTick;
    var secondTick;
    var timerPaused = false;
    const sectionType = {
        PRIMARY: 'primary',
        SECONDARY: 'secondary'
    }
    const resetDirection = {
        FIRST: 'first',
        LAST: 'last'
    }
    var currentPrimary = 0;
    var currentSecondary = 0;
    var loggedIn = localStorage.getItem("loggedIn");
    ////////////////////////////////

    ////////////////////////////////
    //Change sections by scrolling
    $(window).bind('mousewheel DOMMouseScroll', function (event) {
        var obj = $(".primary-content-current");
        if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
            // scroll up
            if (obj.prev().is(".primary-content")) {
                scrolledUp++;
                scrolledDown = 0;
                if (scrolledUp == 4) {
                    obj.prev().addClass("primary-content-current");
                    obj.prev().removeClass("primary-content-previous");
                    obj.removeClass("primary-content-current");
                    obj.addClass("primary-content-next");
                    scrolledUp = 0;
                }
                $(".footer").addClass("footer-hide");
                $(".secondary-content-navigation").show();
            }
        }
        else {
            // scroll down
            if (obj.next().is(".primary-content")) {
                scrolledDown++;
                scrolledUp = 0;
                if (scrolledDown == 4) {
                    // var obj = $(".primary-content-current");
                    obj.next().addClass("primary-content-current");
                    obj.next().removeClass("primary-content-next");
                    obj.removeClass("primary-content-current");
                    obj.addClass("primary-content-previous");
                    scrolledDown = 0;
                }
            } else {
                $(".footer").removeClass("footer-hide");
                $(".secondary-content-navigation").hide();
            }
        }
        $(".primary-nav-section").find(".section-icon").removeClass("fa");
        $(".primary-nav-section").find(".section-icon").removeClass("fa-bullseye");
        if($(".primary-content-1").hasClass("primary-content-current")) {
            $(".primary-nav-section.section-1").find(".section-icon").addClass("fa-bullseye");
            $(".primary-nav-section.section-1").find(".section-icon").addClass("fa");
        }
        else if($(".primary-content-2").hasClass("primary-content-current")) {
            $(".primary-nav-section.section-2").find(".section-icon").addClass("fa-bullseye");
            $(".primary-nav-section.section-2").find(".section-icon").addClass("fa");
        }
        else if($(".primary-content-3").hasClass("primary-content-current")) {
            $(".primary-nav-section.section-3").find(".section-icon").addClass("fa-bullseye");
            $(".primary-nav-section.section-3").find(".section-icon").addClass("fa");
        }
    });
    ///////////////////////////////////////////


    ///////////////////////////////////////////
    //Section jumping
    ///////////////////////////////////////////
    function jumpToSection(destination, secType) {
        switch (secType) {
            case sectionType.PRIMARY:
                var jumpTarget = destination;
                var sections = $('.primary-content');
                $(".primary-content").removeClass("primary-content-previous");
                $(".primary-content").removeClass("primary-content-current");
                $(".primary-content").removeClass("primary-content-next");
                $(sections[jumpTarget]).addClass("primary-content-current");
                var previous = $(".primary-content-current").prev();
                var next = $(".primary-content-current").next();
                while ($(previous).hasClass("primary-content")) {
                    $(previous).addClass("primary-content-previous");
                    previous = $(previous).prev();
                }
                while ($(next).hasClass("primary-content")) {
                    $(next).addClass("primary-content-next");
                    next = $(next).next();
                }


            case sectionType.SECONDARY:
                var jumpTarget = destination;
                var sections = $('.secondary-content');
                $(".secondary-content").removeClass("secondary-content-previous");
                $(".secondary-content").removeClass("secondary-content-current");
                $(".secondary-content").removeClass("secondary-content-next");
                $(sections[jumpTarget]).addClass("secondary-content-current");
                var previous = $(".secondary-content-current").prev();
                var next = $(".secondary-content-current").next();
                while ($(previous).hasClass("secondary-content")) {
                    $(previous).addClass("secondary-content-previous");
                    previous = $(previous).prev();
                }
                while ($(next).hasClass("secondary-content")) {
                    $(next).addClass("secondary-content-next");
                    next = $(next).next();
                }
        }
        $(".primary-nav-section").find(".section-icon").removeClass("fa");
        $(".primary-nav-section").find(".section-icon").removeClass("fa-bullseye");
        if($(".primary-content-1").hasClass("primary-content-current")) {
            $(".primary-nav-section.section-1").find(".section-icon").addClass("fa-bullseye");
            $(".primary-nav-section.section-1").find(".section-icon").addClass("fa");
        }
        else if($(".primary-content-2").hasClass("primary-content-current")) {
            $(".primary-nav-section.section-2").find(".section-icon").addClass("fa-bullseye");
            $(".primary-nav-section.section-2").find(".section-icon").addClass("fa");
        }
        else if($(".primary-content-3").hasClass("primary-content-current")) {
            $(".primary-nav-section.section-3").find(".section-icon").addClass("fa-bullseye");
            $(".primary-nav-section.section-3").find(".section-icon").addClass("fa");
        }
    }
    ///////////////////////////////////////////

    ///////////////////////////////////////////
    //Pause the transitions 
    function pauseContentChanges() {
        primaryC = $(".primary-content");
        secondaryC = $(".primary-content-current > .secondary-content");
        for (i = 0; i < primaryC.length; i++) {
            if (primaryC[i].hasClass("primary-content-current")) {
                currentPrimary = i;
                break;
            }
        }
        for (i = 0; i < secondaryC.length; i++) {
            if (secondaryC[i].hasClass("secondary-content-current")) {
                currentSecondary = i;
                break;
            }
        }
        if ($(".secondary-navigation-pause > i").hasClass("transitioning")) {
            $(".secondary-navigation-pause > i").removeClass("transitioning");
            $(".secondary-navigation-pause > i").addClass("paused");
        }
        timerPaused = true;
    }
    ///////////////////////////////////////////

    ///////////////////////////////////////////
    //Resume the transitions
    function resumeContentChanges() {
        primaryC = $(".primary-content");
        secondaryC = $(".primary-content-current > .secondary-content");
        $(primaryC[currentPrimary]).addClass("primary-content-current");
        $(secondaryC[currentSecondary]).addClass("secondary-content-current");
        $(".secondary-navigation-pause > i").removeClass("paused");
        $(".secondary-navigation-pause > i").addClass("transitioning");
        timerPaused = false;
    }
    ///////////////////////////////////////////

    ///////////////////////////////////////////
    //Reset the secondary contents slider classes
    function secondaryContentReset(direction) {
        switch (direction) {
            case resetDirection.FIRST:
                var obj = $(".primary-content-current > .secondary-content-1");

                obj.removeClass("secondary-content-previous");
                obj.addClass("secondary-content-current");

                //Remove all slider classes from all secondary contents
                obj.siblings().removeClass("secondary-content-current");
                obj.siblings().removeClass("secondary-content-next");
                obj.siblings().removeClass("secondary-content-previous");

                //Reset slider classes to all secondary contents
                obj.siblings().addClass("secondary-content-next");
                break;

            default:
                var obj = $(".primary-content-current > .secondary-content-1");
                while (obj.next().hasClass("secondary-content")) {
                    obj = obj.next();
                }
                obj.removeClass("secondary-content-previous");
                obj.removeClass("secondary-content-next");
                obj.addClass("secondary-content-current");

                //Remove all slider classes from all secondary contents
                obj.siblings().removeClass("secondary-content-current");
                obj.siblings().removeClass("secondary-content-next");
                obj.siblings().removeClass("secondary-content-previous");

                //Reset slider classes to all secondary contents
                obj.siblings().addClass("secondary-content-previous");
                break;
        }

    }
    //////////////////////////////////////////

    //////////////////////////////////////////
    //Change the current secondary 
    //section to the next
    function nextSecondarySection() {
        var obj = $(".primary-content-current > .secondary-content-current");

        if (obj.next().hasClass("secondary-content")) {
            obj.next().addClass("secondary-content-current");
            obj.next().removeClass("secondary-content-next");
            obj.removeClass("secondary-content-current");
            obj.addClass("secondary-content-previous");
        } else {
            secondaryContentReset(resetDirection.FIRST);
        }
    }
    ///////////////////////////////////////////

    ///////////////////////////////////////////
    //Change the current secondary
    //section to the previous
    function previousSecondarySection() {
        var obj = $(".primary-content-current > .secondary-content-current");

        if (obj.prev().hasClass("secondary-content")) {
            obj.prev().addClass("secondary-content-current");
            obj.prev().removeClass("secondary-content-previous");
            obj.removeClass("secondary-content-current");
            obj.addClass("secondary-content-next");
        } else {
            secondaryContentReset(resetDirection.LAST);
        }
    }
    ///////////////////////////////////////////

    ///////////////////////////////////////////
    //Timer to change 2ndary content
    timer = setInterval(function () {
        if (!timerPaused) {
            nextSecondarySection();
        }
    }, 10000);
    ///////////////////////////////////////////

    ///////////////////////////////////////////
    //Primary section scrolling
    $(".primary-content-navigation > .primary-nav-section").click(function (e) {
        if ($(this).hasClass("section-1")) {
            jumpToSection(0, sectionType.PRIMARY);
        } else if ($(this).hasClass("section-2")) {
            jumpToSection(1, sectionType.PRIMARY);
        } else if ($(this).hasClass("section-3")) {
            jumpToSection(2, sectionType.PRIMARY);
        } else if ($(this).hasClass("section-4")) {
            jumpToSection(3, sectionType.PRIMARY);
        }
    });
    ///////////////////////////////////////////

    ///////////////////////////////////////////
    //Secondary content navigation control
    $(".secondary-content-navigation").click(function (e) {
        e.preventDefault();
        if ($(".secondary-navigation-previous").find("*").is(e.target)) {
            previousSecondarySection();
        } else if ($(".secondary-navigation-next").find("*").is(e.target)) {
            nextSecondarySection();
        } else if ($(".secondary-navigation-pause").find("*").is(e.target)) {
            if ($(".secondary-navigation-pause > i").hasClass("transitioning")) {
                $(".secondary-navigation-pause > i").removeClass("transitioning");
                $(".secondary-navigation-pause > i").addClass("paused");
            } else {
                $(".secondary-navigation-pause > i").removeClass("paused");
                $(".secondary-navigation-pause > i").addClass("transitioning");
            }
            timerPaused = !timerPaused;
        }
    });

    $("#WWU-button").click(function(e) {
        e.preventDefault();
        jumpToSection(2, sectionType.PRIMARY);
    });

    $("#GAMES-button").click(function(e) {
        e.preventDefault();
        jumpToSection(1, sectionType.PRIMARY);
    });

    $("#NEWS-button").click(function(e) {
        e.preventDefault();
        window.location = "./pages/news/index.html"
    });

    $("#COMM-button").click(function(e) {
        e.preventDefault();
        window.location = "./pages/community/index.html"
    });




    ///////////////////////////////////////////

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
            window.location = "./pages/game/index.html";

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
        window.location = "./index.html"
    });

    $(".menu-item-1").click(function(e) {
        e.preventDefault();
        window.location = "./pages/game/index.html"
    });

    $(".menu-item-2").click(function(e) {
        e.preventDefault();
        window.location = "./pages/news/index.html"
    });

    $(".menu-item-3").click(function(e) {
        e.preventDefault();
        window.location = "./pages/community/index.html"
    });

    $(".menu-item-4").click(function(e) {
        e.preventDefault();
        window.location = "./pages/wwu/index.html"
    });
    
    $(".menu-item-5").click(function(e) {
        e.preventDefault();
        window.location = "./pages/store/index.html"
    });

    $(".nav-cart").click(function(e) {
        e.preventDefault();
        window.location = "./pages/cart/index.html"
    });

    $(".loggedin-person").click(function(e) {
        e.preventDefault();
        window.location = "./pages/account/index.html"
    });

    $(".login-button").click(function(e) {
        e.preventDefault();
        window.location = "./overlay/login.html"
    });

});

