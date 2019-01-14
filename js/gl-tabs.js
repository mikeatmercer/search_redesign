function glTabs() {
  $('.gl-tabs').each(function(i,e){
    var tabsID = $(e).attr('data-gl-tabs-id'),
        tabs = e,
        btns = $(tabs).find('.gl-tabs-tab-button');

    $(tabs).find('.gl-tabs-tab-button').on('click',function(e){
      e.preventDefault();
      var order = $(this).attr('data-order');
      $('.gl-tabs-tab-content[data-gl-tabs-id='+tabsID+']').each(function(i,e){
        $(e).hide();
        if($(e).attr('data-order') == order) {
          $(e).show();
        }
      });

        $(btns).removeClass('ms-mod-right-col-sp-card-tabs-tab-button--selected')

      $(this).addClass('ms-mod-right-col-sp-card-tabs-tab-button--selected');
    });
    $('.gl-tabs-tab-button[data-onload=true]').click();
  });

}
