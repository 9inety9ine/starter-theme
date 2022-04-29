
jQuery.getJSON('/cart.js', function(cart) {
    if (cart.item_count >= 1) {
        if ($('.cart-counter').is(":visible")) {
            $('.cart-counter').text(cart.item_count);
        } else {
            $('.cart-counter').css('display','flex');
            $('.cart-counter').text(cart.item_count);
        }
    }
    if (cart.item_count == 0) {
        $('.cart-counter').hide();
    }
});
