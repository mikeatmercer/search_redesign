function init() {
  glFilterDropdowns();
  $("#search-filters-toggle").on('click',function(e){
    e.preventDefault();
    var filterClass = 'ms-l-filters',
        openClass = filterClass+'--open';
    var filters = $('.'+filterClass);
    if($(filters).hasClass(openClass)) {
      $(filters).removeClass(openClass);
      $(this).removeClass('gl-btn--raised--toggled-on');
      $(this).text('Show Search Controls')
    } else {
      $(filters).addClass(openClass);
      $(this).addClass('gl-btn--raised--toggled-on');
      $(this).text('Hide Search Controls')
    }

  });
}
