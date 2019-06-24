

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
                    clearInterval();
                }
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
                    clearInterval();
                }
            }
        }
    });
    ////////////////////////////////


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
    }

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
                console.log(obj);
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

    timer = setInterval(function () {
        if (!timerPaused) {
            nextSecondarySection();
        }
    }, 5000);

    $(".nav-menu-opener").click(function (e) {
        e.preventDefault();
        $("nav").toggleClass("navigation-active");
        $(".nav-menu-opener").toggleClass("nav-menu-opener-active");
        firstTick = Date.now();
    });

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

    $("body").click(function (e) {
        e.preventDefault();
        if (!$("nav").hasClass("navigation-active")) return;
        secondTick = Date.now();
        if ((secondTick - firstTick) < 400) return;
        if (!$("nav").find("*").is(e.target)) {
            $("nav").delay(500).removeClass("navigation-active");
            $(".nav-menu-opener").removeClass("nav-menu-opener-active");
            console.log($("nav > *").is(e.target));
        }
    });

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


});
