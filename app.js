$(function () {

    console.log("Ready!");
    var scrolledDown = 0;
    var scrolledUp = 0;
    $(window).bind('mousewheel DOMMouseScroll', function (event) {
        var obj = $(".current");
        if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
            // scroll up
            if (obj.prev().is('div')) {
                scrolledUp++;
                scrolledDown = 0;
                // console.log("This happened");
                if (scrolledUp == 4) {
                    obj.prev().addClass("current");
                    obj.prev().removeClass("up");
                    obj.removeClass("current");
                    obj.addClass("down");
                    scrolledUp = 0;
                }
            }
        }
        else {
            // scroll down
            if (obj.next().is('div')) {
                scrolledDown++;
                scrolledUp = 0;
                // console.log("That happened");
                if (scrolledDown == 4) {
                    // var obj = $(".current");
                    obj.next().addClass("current");
                    obj.next().removeClass("down");
                    obj.removeClass("current");
                    obj.addClass("up");
                    scrolledDown = 0;
                }
            }
        }
    });


});
