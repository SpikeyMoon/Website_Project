

$(function () {
    ////////////////////////////////
    //Initialize variables
    var scrolledDown = 0;
    var scrolledUp = 0;
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
                // console.log("This happened");
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
                // console.log("That happened");
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

    const sectionType = {
        PRIMARY : 'primary',
        SECONDARY : 'secondary'
    }

    function jumpToSection(destination, secType) {
        switch(secType) {
            case sectionType.PRIMARY:
                var jumpTarget = destination;
                var sections = $('primary-content-current').siblings();
                var passedCurrentContent = false;
                for(section in sections) {
                    section.removeClass(".primary-content-next");
                    section.removeClass(".primary-content-previous");
                    section.removeClass(".primary-content-current");
                    if(section == sections[jumpTarget]) {
                        passedCurrentContent = true;
                        section.addClass(".primary-content-current");
                        continue;
                    }
                    if(passedCurrentContent) {
                        section.addClass(".primary-content-next");
                    } else {
                        section.addClass('.primary-content-previous');
                    }
                }
            case sectionType.SECONDARY:
                    var jumpTarget = destination;
                    var sections = $('secondary-content-current').siblings();
                    var passedCurrentContent = false;
                    for(section in sections) {
                        section.removeClass(".secondary-content-next");
                        section.removeClass(".secondary-content-previous");
                        section.removeClass(".secondary-content-current");
                        if(section == sections[jumpTarget]) {
                            passedCurrentContent = true;
                            section.addClass(".secondary-content-current");
                            continue;
                        }
                        if(passedCurrentContent) {
                            section.addClass(".secondary-content-next");
                        } else {
                            section.addClass('.secondary-content-previous');
                        }
                    }
        }
    }

    ///////////////////////////////////////////
    //Reset the secondary contents slider classes
    function secondaryContentReset() {
        var obj = $(".primary-content-current > .secondary-content-1");

        obj.removeClass("secondary-content-previous");
        obj.addClass("secondary-content-current");

        //Remove all slider classes from all secondary contents
        obj.siblings().removeClass("secondary-content-current");
        obj.siblings().removeClass("secondary-content-next");
        obj.siblings().removeClass("secondary-content-previous");

        //Reset slider classes to all secondary contents
        obj.siblings().addClass("secondary-content-next");
    }
    //////////////////////////////////////////


    setInterval(function () {
        var obj = $(".primary-content-current > .secondary-content-current");

        if (obj.next().hasClass("secondary-content")) {
            obj.next().addClass("secondary-content-current");
            obj.next().removeClass("secondary-content-next");
            obj.removeClass("secondary-content-current");
            obj.addClass("secondary-content-previous");
        } else {
            secondaryContentReset();
        }
    }, 5000);

    //TODO change this to nav menu only
    $(".nav-menu-opener").click(function (e) {
        e.preventDefault();
        $("nav").toggleClass("navigation-active");
        $(".nav-menu-opener").toggleClass("nav-menu-opener-active");
    });

    // $(document).click(function (e) {
    //     e.preventDefault();
    //     if ($("nav").hasClass("navigation-active")) {
    //         $("nav").toggleClass("navigation-active");
    //         $(".nav-menu-opener").toggleClass("nav-menu-opener-active");
    //     }
    // });
});
