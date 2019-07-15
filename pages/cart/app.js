$(document).ready(function () {
    var defaultQuantity = 1;
    var quantity = defaultQuantity;
    var count = 0;
    var total = 0;

    $(".quantify").html(defaultQuantity);
    adjustTotal();


    $(".add").click(function (e) {
        e.preventDefault();
        quantity++;
        $(".quantify").html(quantity);
        adjustTotal();
    });

    $(".reduce").click(function (e) {
        
        e.preventDefault();
        quantity--;
        if (quantity > 0) {
            $(".quantify").html(quantity);
        }
        else {
            var res = confirm("Are you sure you want to remove the selected item?");
            if (res) {
                $(".cart-item").has($(this)).fadeOut();
                count++;
            } else {
                quantity++;
            }
        }
        adjustTotal();
        display();
    });

    $(".clear-button").click(function (e) { 
        e.preventDefault();
        var res = confirm("Are you sure you want to remove the selected item(s)?");
        if (res) {
            $(".cart-item").has($(this)).fadeOut();
            count++;
        }
        display();
    });

    $(".remove").click(function (e) {
        e.preventDefault();
        var res = confirm("Are you sure you want to remove the selected item?");
        if (res) {
            $(".cart-item").has($(this)).fadeOut();
            count++;
        }
        display();
    });

    function display() {
        if(count == 1) {
            $(".empty").fadeIn();
            $(".amount").fadeOut();
        }
    }

    function adjustTotal() {
        total = 59.99 * quantity;
        $(".amount").html("$"+total);
    }

    $('#dvProductsFilteredd > div').filter(function() {
        return $(this).css('display') === 'block';
    }).length;


    $(".checkout").click(function (e) { 
        e.preventDefault();
        $(".done").next().addClass("done");
        $(".checkout-page").fadeOut();

    });

    $(".creditcard-payment").click(function (e) { 
        e.preventDefault();
        $(".creditcard-payment > input").prop("checked", true);
        $(".ewallet-payment > input").prop("checked",false);
        $(".ewallet-pay").fadeOut();
        $(".creditcard-pay").fadeIn();
    });

    $(".ewallet-payment").click(function (e) { 
        e.preventDefault();
        $(".ewallet-payment > input").prop("checked",true);
        $(".creditcard-payment > input").prop("checked", false);
        $(".creditcard-pay").fadeOut();
        $(".ewallet-pay").fadeIn();
    });
});