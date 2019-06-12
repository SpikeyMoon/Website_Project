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
            if (obj.prev().is('.primary-content')) {
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
            if (obj.next().is('.primary-content')) {
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


    function videoControl() {
        var videos = $('video')[0];
        videos.pause();
        var video = $('.primary-content-current > .secondary-content-current > video')[0];
        if (video.paused) {
            video.play();
        }
    }

    ///////////////////////////////////////////
    //Reset the secondary contents slider classes
    function secondaryContentReset () {
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
        videoControl();
    }, 5000);

    //TODO change this to nav menu only
    $(document).click(function (e) { 
        e.preventDefault();
        $('nav').toggleClass('navigation-active');
    });
});
