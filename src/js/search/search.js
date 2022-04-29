//toggle display of predictive search
$('header .menu-link-search a').on('click', function(){
    $('.search-box').show();
    $('.search-input input').val('').focus();
    $('#predictive-search').hide();
    return false;
});
$('.search-input .toggle-search').on('click', function(){
    $('.search-box').hide();
    return false;
});