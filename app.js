/*!
 * Pecha Kucha v1.0
 * http://weedygarden.com/
 *
 * Copyright 2011, Erik Runyon
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */

(function() {
  var $counter = $('#counter'),
      countInit = 20,
      totalSlides = 20,
      slide = 1,
      count = countInit,
      t,
      running = true
  ;
  
  var Slides = {
  
    init: function() {
      console.log('init');
      Slides.addPaging();
      Slides.doCountdown();
    },

    nextSlide: function() {
      if(slide === totalSlides) {
        $counter.html('Finished');
        clearTimeout(t);
        running = false;
      } else {
        $('#slide'+slide).fadeOut();
        ++slide;
        $('#slide'+slide).fadeIn();
        
        $('#footer ul a').removeClass();
        $('#p'+slide).addClass('active');
      }
    },

    doCountdown: function() {
      if(running) {
        t = setTimeout(function(){
          console.log('counting down');
          $counter.html(count);
          --count;
          if(count === 0) {
            count = countInit;
            Slides.nextSlide();
          }
          Slides.doCountdown();
        }, 1000);
      }
    },
    
    togglePlay: function() {
      if(running === true) {
        clearTimeout(t);
        running = false;
      } else {
        running = true;
        Slides.doCountdown();
      }
    },
    
    addPaging: function() {      
      var links = '';
      for(i = 1; i <= totalSlides; i++) {
        var active = (i === 1) ? 'active' : '';
        links += "<li><a href=\"#slide"+ i +"\" id=\"p"+ i +"\" class=\""+ active +"\">"+ i +"</a></li>";
      }
      $('#slidenav').html(links);
    }

  };
  Slides.init();
  
  $('#pause').click(function(e){
    e.preventDefault();
    Slides.togglePlay();
    var $this = $(this);
    ($this.html() == 'Pause') ? $this.html('Play') : $this.html('Pause');
  });
  
  $('#slidenav a').click(function(e){
    e.preventDefault();
    var $this = $(this);
    
    // stop the timer
    clearTimeout(t);
    running = false;
    $('#pause').html('Play');
    
    // Hide all but the selected slide
    $('.slide:visible').fadeOut();
    $('#footer ul a').removeClass();
    slide = $this.html();
    console.log('activating slide ' + slide);
    $($this.attr('href')).fadeIn();
    $this.addClass('active');
  });
  
})();
