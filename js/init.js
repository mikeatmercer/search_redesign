function init() {
  glFilterDropdowns();
  glTabs();
  $("#search-filters-toggle").on('click',function(e){
    e.preventDefault();
    var filterClass = 'ms-l-filters',
        openClass = filterClass+'__opened';
    var filters = $('.'+filterClass);
    if($(filters).hasClass(openClass)) {
      $(filters).removeClass(openClass);
      $(this).removeClass('gl-btn--raised__toggled-on');
      $(this).text('Show Search Controls')
    } else {
      $(filters).addClass(openClass);
      $(this).addClass('gl-btn--raised__toggled-on');
      $(this).text('Hide Search Filters')
    }

  });



  //UI DEMO PURPOSES ONLY
  $("#UIToggler button").on('click',function(e){
    e.preventDefault();
    var el = "#"+$(this).attr('data-el');
    if($(this).attr('data-type') === "loading") {
      $('html').removeClass('html__loading');
      $('#UIToggler button[data-type=loading]').removeClass('selected');
      if($(this).attr('data-state') === "on") {
        $('html').addClass('html__loading');
      }
      $(this).addClass('selected');
      return;
    }
    if($(this).attr('data-type') === "visToggle") {
      if($(this).attr('data-attr-state') === "Show") {
        $(el).show();
        $(this).text('Hide').attr('data-attr-state', "Hide");
      } else {
        $(el).hide();
        $(this).text('Show').attr('data-attr-state', "Show");
      }
      return ;
    }
    if($(this).hasClass('selected')) {
      return;
    }
    var blocks = $('#UIToggler button[data-block='+$(this).attr('data-block')+']');
    $(blocks).removeClass('selected');
    $(blocks).each(function(i,e){
      if(!$(this).attr('data-el')) {
        return;
      }
      $('#'+$(this).attr('data-el')).hide();
    });
    $(el).show();
    $(this).addClass('selected');
  })
}
