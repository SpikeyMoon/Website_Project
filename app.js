
if (window.innerWidth < 768) {
    //Functions for smaller screens
    
    $(function () {
        var firstTick = 0;
        var secondTick = 0;
        $(".nav-menu-opener").click(function (e) {
            e.preventDefault();
            $("nav").toggleClass("navigation-active");
            $(".nav-menu-opener").toggleClass("nav-menu-opener-active");
            firstTick = Date.now();
            $(".primary-content-navigation").css("right", "-100%");
        });

        $("body").click(function (e) {
            e.preventDefault();
            if (!$("nav").hasClass("navigation-active")) return;
            secondTick = Date.now();
            if ((secondTick - firstTick) < 400) return;
            if (!$("nav").find("*").is(e.target)) {
                $("nav").delay(500).removeClass("navigation-active");
                $(".nav-menu-opener").removeClass("nav-menu-opener-active");
            }
            $(".primary-content-navigation").css("right", "2.5%");
        });

    });
}
else {
    
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
                }
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
        }, 5000);
        ///////////////////////////////////////////

        ///////////////////////////////////////////
        //Toggle the menu
        $(".nav-menu-opener").click(function (e) {
            e.preventDefault();
            $("nav").toggleClass("navigation-active");
            $(".nav-menu-opener").toggleClass("nav-menu-opener-active");
            firstTick = Date.now();
        });
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
        ///////////////////////////////////////////

        ///////////////////////////////////////////
        //Hash navigation
        //
        $("a").click(function (e) {
            var url = this.href;
            url = url.split("#")[1];

            if (url.length > 0) {
                $(".main-content").fadeOut();
                $(".hash-content").fadeIn();
                switch (url) {
                    case "game-1", "game-2", "game-3", "game-4", "game-5", "game-6", "game-7", "game-8":
                        //Do game- things
                        break;
                    case "latest", "hottest":
                        //Do news things
                        break;
                    case "forums", "recent", "lfg":
                        //Do community things
                        break;
                    case "WWU-FR", "WWU-TX":
                        //Do work with us things
                        break;
                    case "digital-store", "merchandise", "redeem-code":
                        //Do shop things
                        break;

                }

            }
            else {
                //Main page navigation
                if ($this.is("#GAMES")) {
                    jumpToSection(1, sectionType.PRIMARY);
                } else if ($this.is("#NEWS")) {
                    jumpToSection(2, sectionType.PRIMARY);
                } else if ($this.is("#COMMUNITY")) {
                    jumpToSection(3, sectionType.PRIMARY);
                } else if ($this.is("#WORKWITHUS")) {
                    jumpToSection(4, sectionType.PRIMARY);
                } else if ($this.is("#SHOP")) {
                    jumpToSection(5, sectionType.PRIMARY);
                }
            }
        });
        ///////////////////////////////////////////


    });

}
