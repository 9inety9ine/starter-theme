$('.desktop-thumbnails a').on('click', function(){
    var target = $(this).attr('href');
    $(".desktop").scrollTo(target);
    return false;
});
$('.desktop-images button').on('click', function(){
    var img_width = $('.desktop li:first-child img').width();
    if ($(this).hasClass('next')) {
       $('.desktop').animate({scrollLeft: "+=" + img_width});
        return false;
    }
    if ($(this).hasClass('prev')) {
        $('.desktop').animate({scrollLeft: "-=" + img_width});
        return false;
    }
});