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
        if (firstName != "") { localStorage.setItem("firstName", firstName); }
        else { localStorage.setItem("firstName", "John"); }
        if (lastName != "") { localStorage.setItem("lastName", lastName); }
        else { localStorage.setItem("lastName", "Smith") }
        if (displayName != "") { localStorage.setItem("displayName", displayName); }
        else { localStorage.setItem("displayName", "Jomith"); }
        if (emailAdd != "") { localStorage.setItem("emailAdd", emailAdd); }
        else { localStorage.setItem("emailAdd", "Smith.John@gmail.com"); }
        if (forumsName != "") { localStorage.setItem("forumsName", forumsName); }
        { localStorage.setItem("forumsName", "Jomith"); }
        if (emailAdd != "") { localStorage.setItem("emailAdd", country); }
        if (language != "") { localStorage.setItem("language", language); }

    }

    function load() {
        firstName = localStorage.getItem("firstName");
        lastName = localStorage.getItem("lastName");
        displayName = localStorage.getItem("displayName");
        emailAdd = localStorage.getItem("emailAdd");
        forumsName = localStorage.getItem("forumsName");
        country = localStorage.getItem("emailAdd");
        language = localStorage.getItem("language");
    }

    function loadToPage() {
        $("#first-name").text(firstName);
        $("#last-name").text(lastName);
        $("email-address").text(emailAdd);
        $("#display-name").text(displayName);
        $("#forums-name").text(forumsName);
        $("#country").text(country);
        $("#language").text(language);
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

    $(".logout-button").click(function (e){
        loggedIn = false;
        localStorage.setItem("loggedIn", false);
        window.location.replace("../../index.html");
    });

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
});