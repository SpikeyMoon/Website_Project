$(document).ready(function () {
    var firstName = "";
    var lastName = "";
    var displayName = "";
    var emailAdd = "";
    var forumsName = "";
    var country = "";
    var language = "";
    var loggedIn = true;


    function save() {
        if (firstName != "" && firstName != "null") {
            localStorage.setItem("firstName", firstName);
            console.log("why");
        } else {
            localStorage.setItem("firstName", "John");
        }
        if (lastName != "" && lastName != "null") {
            localStorage.setItem("lastName", lastName);
        } else {
            localStorage.setItem("lastName", "Smith")
        }
        if (displayName != "" && displayName != "null") {
            localStorage.setItem("displayName", displayName);
        } else {
            localStorage.setItem("displayName", "Jomith");
        }
        if (emailAdd != "" && emailAdd != "null") {
            localStorage.setItem("emailAdd", emailAdd);
        } else {
            localStorage.setItem("emailAdd", "Smith.John@gmail.com");
        }
        if (forumsName != "" && forumsName != "null") {
            localStorage.setItem("forumsName", forumsName);
        } else {
            localStorage.setItem("forumsName", "Jomith");
        }
        if (country != "" && country != "null") {
            localStorage.setItem("country", country);
        } else {
            localStorage.setItem("country", "Western Europe")
        }
        if (language != "" && language != "null") {
            localStorage.setItem("language", language);
        } else {
            localStorage.setItem("language", "English");
        }

    }

    function load() {
        firstName = localStorage.getItem("firstName");
        lastName = localStorage.getItem("lastName");
        displayName = localStorage.getItem("displayName");
        emailAdd = localStorage.getItem("emailAdd");
        forumsName = localStorage.getItem("forumsName");
        country = localStorage.getItem("country");
        language = localStorage.getItem("language");


        console.log(localStorage.getItem("firstName"));
        console.log(localStorage.getItem("lastName"));
        console.log(localStorage.getItem("displayName"));
        console.log(localStorage.getItem("emailAdd"));
        console.log(localStorage.getItem("forumsName"));
        console.log(localStorage.getItem("emailAdd"));
        console.log(localStorage.getItem("language"));
    }

    function loadToPage() {
        $("#first-name").html(firstName);
        $("#last-name").html(lastName);
        $("email-address").html(emailAdd);
        $("#display-name").html(displayName);
        $("#forums-name").html(forumsName);
        $("#country").html(country);
        $("#language").html(language);
    }

    load(); save(); load(); loadToPage();

    $(".account-navigation-1").click(function (e) {
        e.preventDefault();
        $(".account-content").removeClass("active");
        $(".account-management").addClass("active");
    });
    $(".account-navigation-2").click(function (e) {
        e.preventDefault();
        $(".account-content").removeClass("active");
        $(".linked-accounts").addClass("active");
    });
    $(".account-navigation-3").click(function (e) {
        e.preventDefault();
        $(".account-content").removeClass("active");
        $(".redeem-code").addClass("active");
    });
    $(".account-navigation-4").click(function (e) {
        e.preventDefault();
        $(".account-content").removeClass("active");
        $(".transactions-history").addClass("active");
    });

    $(".edit-account-button").click(function (e) {
        e.preventDefault();
        if ($(this).is($("#redeem-code-button"))) return;
        $(".account-management").removeClass("active");
        $(".account-edit").addClass("active");
    });

    $(".save-button").click(function (e) {
        e.preventDefault();
        if ($(".field-description").hasClass("error")) {
            alert("Unable to save, please review your changes");
        } else {
            $(".account-management").addClass("active");
            $(".account-edit").removeClass("active");
            country = $("#select-region").find(":selected").text();
            language = $("#select-language").find(":selected").text();
            save();
            load();
            loadToPage();
        }
    });

    $(".cancel-button").click(function (e) {
        e.preventDefault();
        $(".account-management").addClass("active");
        $(".account-edit").removeClass("active");
    });

    $(".close-menu").click(function (e) {
        e.preventDefault();
        $(".clearable").fadeOut();
    });

    $(".clearable").click(function (e) {
        e.preventDefault();
        if (!$(e.target).is($(".clearable").find("*"))) {
            $(".clearable").fadeOut();
        }
    });

    $(".add-new-link").click(function (e) {
        e.preventDefault();
        $(".add-platform").fadeIn();

    })

    $(".redeem-button").click(function (e) {
        e.preventDefault();
        var regex = /^([A-Z0-9_-]{23})+$/;
        var value = $("#redeem-text").val();
        if (!regex.test(value)) {
            alert("Code invalid, please try again");
        } else {
            alert("Code sucessfully redeemed");
            var date = new Date();
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            var sp = "-";
            var today = day + sp + month + sp + year;
            $(".redeemed > tbody > tr:first-child").after("<tr><td><p>" + today + "</p></td><td><p>" + value + "</p></td><td><p>" + "Next purchase discount 30%" + "</p></td></tr>");
        }
    });

    $("#redeem-code-button").click(function (e) {
        e.preventDefault();
        $(".add-code").fadeIn();
    });

    $("#twitch-button").click(function (e) {
        e.preventDefault();
        $(".linked-twitch").fadeIn();
    });

    $("#field-first-name").focusout(function (e) {
        e.preventDefault();

        var value = $("#edit-first-name").val();
        var regexName = /^[a-zA-Z]+$/;
        if (value.length < 1) {
            $(this).addClass("error");
            alert("Name must NOT be left empty");
        } else if (!regexName.test(value)) {
            $(this).addClass("error");
            alert("Name must ONLY contain letters");
        } else {
            $(this).removeClass("error");
            firstName = value;
        }
    });

    $("#field-last-name").focusout(function (e) {
        e.preventDefault();
        var value = $("#edit-last-name").val();
        var regexName = /^[a-zA-Z]+$/;
        if (value.length < 1) {
            $(this).addClass("error");
            alert("Name must NOT be left empty");
        } else if (!regexName.test(value)) {
            $(this).addClass("error");
            alert("Name must ONLY contain letters");
        } else {
            $(this).removeClass("error");
            lastName = value;
        }
    });

    $("#field-display-name").focusout(function (e) {
        e.preventDefault();

        var value = $("#edit-display-name").val();
        var regexName = /^[a-zA-Z_.+-]+$/;
        if (value.length < 3 || value.length > 20) {
            $(this).addClass("error");
            alert("Display name must have more than 3 characters and less than 20 characters");
        } else if (!regexName.test(value)) {
            $(this).addClass("error");
            alert("Display name must follow the format");
        } else {
            $(this).removeClass("error");
            displayName = value;
        }
    });

    $("#field-email").focusout(function (e) {
        e.preventDefault();

        var value = $("#edit-display-name").val();
        var regexName = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-]))+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regexName.test(value)) {
            $(this).addClass("error");
            alert("Please enter a valid email address");
        } else {
            $(this).removeClass("error");
            emailAdd = value;
        }
    });

    $(".logout-button").click(function (e) {
        loggedIn = false;
        localStorage.setItem("loggedIn", loggedIn);
        window.location.replace("../../index.html");
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
    if (loggedIn == "false") {
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

    $(".logo").click(function (e) {
        e.preventDefault();
        window.location = "../../index.html"
    });

    $(".menu-item-1").click(function (e) {
        e.preventDefault();
        window.location = "../game/index.html"
    });

    $(".menu-item-2").click(function (e) {
        e.preventDefault();
        window.location = "../news/index.html"
    });

    $(".menu-item-3").click(function (e) {
        e.preventDefault();
        window.location = "../community/index.html"
    });

    $(".menu-item-4").click(function (e) {
        e.preventDefault();
        window.location = "../wwu/index.html"
    });

    $(".menu-item-5").click(function (e) {
        e.preventDefault();
        window.location = "../store/index.html"
    });

    $(".nav-cart").click(function (e) {
        e.preventDefault();
        window.location = "../cart/index.html"
    });

    $(".loggedin-person").click(function (e) {
        e.preventDefault();
        window.location = "../account/index.html"
    });

    $(".login-button").click(function (e) {
        e.preventDefault();
        window.location = "../../overlay/login.html"
    });


});