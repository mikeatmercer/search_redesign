function glFilterDropdowns() {
  $('.gl-filter-container').each(function(i,e){
    filterSetup(e)
  });
  function filterSetup(e) {
    var btn = $(e).find('.gl-filter-button'),
        list = $(e).find('.gl-filter-dropdown-list');
    var activeClass = 'gl-filter-dropdown-list__activated',
        rightClass = 'gl-filter-dropdown-list--right-side';
    $(btn).on('click',function(e){
      e.preventDefault();

      $(list).removeClass(rightClass);
      if($(list).hasClass(activeClass)) {
        $(list).removeClass(activeClass);
        return ;
      }
      $(list).addClass(activeClass);
      var bl = $(btn).width(),
          bo = $(btn).offset().left
          wl = $(window).width(),
          ddw = $(list).width();

      if((bo + 12) >= (wl - ddw) ) {
        $(list).addClass(rightClass);
      }
    });
    $(document).on('click',function(e){

      var px = e.pageX,
          py = e.pageY,
          $sBox = $(list),
          sxMin = $($sBox).offset().left,
          syMin = $($sBox).offset().top,
          sxMax = sxMin + $($sBox).width(),
          syMax = syMin + $($sBox).height(),
          bxMin = $(btn).offset().left,
          byMin = $(btn).offset().top,
          bxMax = bxMin + $(btn).width(),
          byMax = byMin + $(btn).height();

      if( px >= bxMin && px <= bxMax && py >= byMin && py <= byMax ) {
        return;
      }
      if(px < sxMin || px > sxMax || py < syMin || py > syMax ) {
        $(list).removeClass(activeClass);
      }
    });
  }
}
