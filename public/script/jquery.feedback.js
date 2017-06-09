/* global window, $, console */
(function() {

  // 'use strict';

  var Feedback = function(selector, options) {

    if ( !(this instanceof Feedback) ) {
      return new Feedback(options);
    }

    var template = '<div class="feedback-box closed">' +
                     '<a id="openclose" href="">' +
                       '<span>Feedback</span>' +
                     '</a>' +
                     '<div class="box">' +
                       '<h2>Tell us what you think...</h2>' +
                       '<textarea id="comment" rows="12" resize="false" maxlength="300"></textarea>' +
                       '<span class="character-counter">0 / 300</span>' +
                       '<div class="logo">' +
                         '<img alt="Logo." src="img/logo.png">' +
                       '</div>' +
                       '<div class="buts">' +
                         '<a id="sendfeedback" href="#" class="button button-outline disabled">Submit</a>' +
                       '</div>' +
                     '</div>' +
                   '</div>';

    var opts, form, target, left, commented=false;

    // function myOffset(elem) {
    //   var offset = elem.offset();
    //   var e = elem.parent();
    //   while(e.offset()) {
    //     var off = e.offset();
    //     offset.top  += off.top;
    //     offset.left += off.left;
    //     e = e.parent();
    //   }
    //   return offset;
    // }

    function resize() {
      var behind = $(opts.target);
      var offset = target.offset(); // myOffset(behind);
      var width = behind.innerWidth();
      // left = (offset.left+width-240+11);
      left = (offset.left+width-240);

      var elem = form.find('#openclose').parent();
      if ( elem.hasClass('closed') ){
        form.css({ top:(offset.top + 10), left:left });
      } else {
        form.css({ top:(offset.top + 10), left:(left+240) });
      }
    }
    function show() {
      resize();
      form.show();
    }
    function updateButton() {
      var chars = $('#comment').val().length;
      if (chars > 0) {
        form.find('#sendfeedback').removeClass('disabled');
      } else {
        form.find('#sendfeedback').addClass('disabled');
      }
    }
    function updateCountdown() {
      var elem = $('#comment');
      var maxLengh = elem.attr('maxlength');
      var remaining = /*maxLengh -*/ elem.val().length;
      elem.nextAll('.character-counter:first').text(remaining + ' / ' + maxLengh );
    }
    function stripNonASCII(e) {
      /*jshint validthis:true */
      var $elem = $(this);
      var text = $('#comment').val().replace(/[^/a-zA-Z0-9 .,?!:;'""'()&%#@\-\+]+/g,'');
      $('#comment').val(text);
    }
    function lock() {
      commented = true;
      form.animate({left:left}, 500);
      form.find('#openclose span').text('Thankyou');
      form.find('.feedback-box').addClass('closed thanks');
    }

    function attachEvents() {

      $(window).on('resize', resize);

      // Open and close the form
      var openclose = form.find('#openclose');
      openclose.on('click', function(event) {
        var elem = $(this).parent();
        event.preventDefault();
        event.stopPropagation();

         if (commented ) {
           return;
         }

        if ( elem.hasClass('closed')){
          form.animate({left:(left+240)}, 500);
          elem.removeClass('closed');
        } else {
          form.animate({left:left}, 500);
          elem.addClass('closed');
        }
      });

      form.on('change keyup cut paste', '#comment', function(e){
        stripNonASCII();
        updateCountdown();
        updateButton();
      });

      form.find('#sendfeedback').click( function(event){
        event.preventDefault();
        event.stopPropagation();
        if ($(this).hasClass('disabled') || commented) {
          return;
        }

        var comment = form.find('#comment').val().trim();
        /*
        $.ajax({
          type: 'POST',
          url: 'feedback',
          data: { userFeedback: comment }
        })
        .done(function(msg) {
          lock();
        })
        .error(function( msg ) {
          console.log(msg.statusText); // eslint-disable-line no-console
          lock();
        });
        */

        // just 'lock' it for now
        lock();
      });
    }

    function init() {
      // var self = this;
      options.target = $(selector);  // (this);

      opts = $.extend({}, options);
      target = $(opts.target);
      form = $(opts.form); // || {};

      form.html(template);
      attachEvents();
      updateButton();
      show();
    }

    return {
      init: init
    };
  };

  // $.fn.feedback = function(options) {
  //   return this.each(function () {
  //     var obj = Object.create(Feedback);
  //     obj.init(options, this);
  //     $.data(this, 'feedback', obj);
  //   });
  // };

  $.fn.feedback = function( options ) {
    return this.each( function() {
      if (!$.data(this, 'feedback')) {
        var plugin = new Feedback(this, options);
        plugin.init();
        $.data( this, 'feedback', plugin);
      }
    });
  };

  // stick in default values
  // $.fn.feedback.options = {
  //   target: '#feedback'
  // };

  // Browser: Expose to window
  // window.Feedback = Feedback;

})();
