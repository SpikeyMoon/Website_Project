$(document).ready(function () {
    
    $(".click-to-go-home").click(function (e) { 
        e.preventDefault();
        window.location = "./index.html";
    });

    
    $(".click-to-go-back").click(function (e) { 
        e.preventDefault();
        window.location = "./allthreads.html";
    });
});