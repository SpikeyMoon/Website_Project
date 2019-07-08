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
});