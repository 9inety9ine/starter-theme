$('.add-new').on('click', function(){
    $('.address-new').show();
    return false;
})
$('.cancel').on('click', function(){
    console.log('yep');
    $('.address-new, .address-edit').hide();
    return false;
})
$('.edit').on('click', function(){
    var current_address = $(this).data('address-id');
    var target_address = $('.address-edit#' + current_address);
    
    // var country_selected = $(target_address).find('#AddressCountry').data('default');
    // var country_code = $(target_address).find('select option:contains("' + country_selected + '")').val();
    // $(target_address).find('#AddressCountry').val(country_code).prop('selcted', true);

    $(target_address).show();

    return false;
});