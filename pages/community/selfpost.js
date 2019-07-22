$(document).ready(function () {

    var name = localStorage.getItem("postEmail");
    var title = localStorage.getItem("postTitle");
    var content = localStorage.getItem("postContent");
    var loggedIn = localStorage.getItem("loggedIn");

    if(loggedIn == undefined) {
        loggedIn = false;
    }

    console.log(name);
    console.log(title);
    console.log(content);
    console.log(loggedIn);

    if (loggedIn == "true") {
        $("#post-title").html(title);
        $("#post-content").html(content);
    } 
    if(loggedIn == "false") {
        $(".poster-pfp").removeClass("jomith-pfp");
        $(".poster-pfp").addClass("default-pfp");

        $("#poster-name").html(name);
        $("#post-title").html(title);
        $("#post-content").html(content);
    }
    
    $(".click-to-go-home").click(function (e) { 
        e.preventDefault();
        window.location = "./index.html";
    });

    $(".click-to-go-back").click(function (e) { 
        e.preventDefault();
        window.location = "./allthreads.html";
    });
});
