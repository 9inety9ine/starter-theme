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
$('.search-clear').on('click', function(){
    $('input[type=search]').val('').focus();
    $('#predictive-search').hide();
    return false;
});

var searchSend = document.getElementById('searchmain');
if (searchSend) {
  var searchForm = document.getElementById('searchinput');
  searchSend.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      searchForm.submit();
    }
  });
}