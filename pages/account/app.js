$(document).ready(function () {
    $(".edit-account-button").click(function (e) {
        e.preventDefault();
        $(".account-management").removeClass("active");
        $(".account-edit").addClass("active");
    });

    $(".save-button").click(function (e) {
        e.preventDefault();
        if ((".field-description").hasClass("error")) {
            alert("Unable to save, please review your changes");
        } else {
            $(".account-management").addClass("active");
            $(".account-edit").removeClass("active");
        }
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
        }
    });

});