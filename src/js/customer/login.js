$('.account-form .forgot').on('click', function(){
    $('.sign-in').hide();
    $('.forgot-password').show();
    return false;
});
$('.account-form .cancel').on('click', function(){
    $('.sign-in').show();
    $('.forgot-password').hide();
    return false;
});