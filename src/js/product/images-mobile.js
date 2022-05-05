$('.mobile-thumbnails a').on('click', function(){
    var target = $(this).attr('href');
    $(".mobile").scrollTo(target);
    return false;
});
$('.mobile-images button').on('click', function(){
    var img_width = $('.mobile li:first-child img').width();
    if ($(this).hasClass('next')) {
       $('.mobile').animate({scrollLeft: "+=" + img_width});
        return false;
    }
    if ($(this).hasClass('prev')) {
        $('.mobile').animate({scrollLeft: "-=" + img_width});
        return false;
    }
});