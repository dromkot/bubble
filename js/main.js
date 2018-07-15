'use stict';

$(document).ready(function(){
	$('.phone').mask('+7 (999) 999-999-999');
	var calcB1 = $('.calculate__block-1 input');
	var calcB2 = $('.calculate__block-2');
	var calcB3 = $('.calculate__block-3');
	var calcB4 = $('.calculate__block-4');
	var calcB5 = $('.calculate__block-5');
	var calcB6 = $('.calculate__block-6');
	var calcB7 = $('.calculate__block-7');
	var calcB8 = $('.calculate__block-8');
	var calcB9 = $('.calculate__block-9');

	calcB1.click(function () {
		$('.calculate__block-1').hide();
		calcB2.show();
	});
	calcB2.click(function () {
		$('.calculate__block-2').hide();
		calcB3.show();
	});
	calcB3.click(function () {
		$('.calculate__block-3').hide();
		calcB4.show();
	});
	calcB4.click(function () {
		$('.calculate__block-4').hide();
		calcB5.show();
	});
	calcB5.click(function () {
		$('.calculate__block-5').hide();
		calcB6.show();
	});
	calcB6.click(function () {
		$('.calculate__block-6').hide();
		calcB7.show();
	});
	calcB7.click(function () {
		$('.calculate__block-7').hide();
		calcB8.show();
	});
	calcB8.click(function () {
		$('.calculate__block-8').hide();
		calcB9.show();
	});

  // ---------
  // Functions
  // ---------

  var canvas = document.querySelector('canvas');
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  var ctx = canvas.getContext('2d');
  var count = canvas.height;
  var bubbles = [];
  var bubbleCount = 100;
  var bubbleSpeed = 1;
  var popLines = 6;
  var popDistance = 40;
  var mouseOffset = {
  	x: 0,
  	y: 0
  }



  // --------------
  // Animation Loop
  // --------------

  function animate() {



    // ------------
    // Clear Canvas
    // ------------

    ctx.clearRect(0, 0, canvas.width, canvas.height);



    // ------------
    // Draw Bubbles
    // ------------

    ctx.beginPath();
    for (var i = 0; i < bubbles.length; i++) {
      // first num = distance between waves
      // second num = wave height
      // third num = move the center of the wave away from the edge
      bubbles[i].position.x = Math.sin(bubbles[i].count/bubbles[i].distanceBetweenWaves) * 50 + bubbles[i].xOff;
      bubbles[i].position.y = bubbles[i].count;
      bubbles[i].render();

      if(bubbles[i].count < 0 - bubbles[i].radius) {
      	bubbles[i].count = canvas.height + bubbles[i].yOff;
      } else {
      	bubbles[i].count -= bubbleSpeed;
      }
    }

    // ---------------
    // On Bubble Hover
    // ---------------

    for (var i = 0; i < bubbles.length; i++) {
    	if(mouseOffset.x > bubbles[i].position.x - bubbles[i].radius && mouseOffset.x < bubbles[i].position.x + bubbles[i].radius) {
    		if(mouseOffset.y > bubbles[i].position.y - bubbles[i].radius && mouseOffset.y < bubbles[i].position.y + bubbles[i].radius) {
    			for (var a = 0; a < bubbles[i].lines.length; a++) {
    				popDistance = bubbles[i].radius * 0.5;
    				bubbles[i].lines[a].popping = true;
    				bubbles[i].popping = true;
    			}
    		}
    	}
    }

    window.requestAnimationFrame(animate);
  }

  window.requestAnimationFrame(animate);



  // ------------------
  // Bubble Constructor
  // ------------------

  var createBubble = function() {
  	this.position = {x: 0, y: 0};
  	this.radius = 8 + Math.random() * 6;
  	this.xOff = Math.random() * canvas.width - this.radius;
  	this.yOff = Math.random() * canvas.height;
  	this.distanceBetweenWaves = 50 + Math.random() * 40;
  	this.count = canvas.height + this.yOff;
  	this.color = '#8bc9ee';
  	this.lines = [];
  	this.popping = false;
  	this.maxRotation = 85;
  	this.rotation = Math.floor(Math.random() * (this.maxRotation - (this.maxRotation * -1))) + (this.maxRotation * -1);
  	this.rotationDirection = 'forward';

    // Populate Lines
    for (var i = 0; i < popLines; i++) {
    	var tempLine = new createLine();
    	tempLine.bubble = this;
    	tempLine.index = i;

    	this.lines.push(tempLine);
    }

    this.resetPosition = function() {
    	this.position = {x: 0, y: 0};
    	this.radius = 8 + Math.random() * 6;
    	this.xOff = Math.random() * canvas.width - this.radius;
    	this.yOff = Math.random() * canvas.height;
    	this.distanceBetweenWaves = 50 + Math.random() * 40;
    	this.count = canvas.height + this.yOff;
    	this.popping = false;
    }

    // Render the circles
    this.render = function() {
    	if(this.rotationDirection === 'forward') {
    		if(this.rotation < this.maxRotation) {
    			this.rotation++;
    		} else {
    			this.rotationDirection = 'backward';
    		}
    	} else {
    		if(this.rotation > this.maxRotation * -1) {
    			this.rotation--;
    		} else {
    			this.rotationDirection = 'forward';
    		}
    	}

    	ctx.save();
    	ctx.translate(this.position.x, this.position.y);
    	ctx.rotate(this.rotation*Math.PI/180);

    	if(!this.popping) {
    		ctx.beginPath();
    		ctx.strokeStyle = '#8bc9ee';
    		ctx.lineWidth = 1;
    		ctx.arc(0, 0, this.radius - 3, 0, Math.PI*1.5, true);
    		ctx.stroke();

    		ctx.beginPath();
    		ctx.arc(0, 0, this.radius, 0, Math.PI*2, false);
    		ctx.stroke();
    	}

    	ctx.restore();

      // Draw the lines
      for (var a = 0; a < this.lines.length; a++) {
      	if(this.lines[a].popping) {
      		if(this.lines[a].lineLength < popDistance && !this.lines[a].inversePop) {
      			this.lines[a].popDistance += 0.06;
      		} else {
      			if(this.lines[a].popDistance >= 0) {
      				this.lines[a].inversePop = true;
      				this.lines[a].popDistanceReturn += 1;
      				this.lines[a].popDistance -= 0.03;
      			} else {
      				this.lines[a].resetValues();
      				this.resetPosition();
      			}
      		}

      		this.lines[a].updateValues();
      		this.lines[a].render();
      	}
      }
    }
  };



  // ----------------
  // Populate Bubbles
  // ----------------

  for (var i = 0; i < bubbleCount; i++) {
  	var tempBubble = new createBubble();

  	bubbles.push(tempBubble);
  }



  // ----------------
  // Line Constructor
  // ----------------

  function createLine() {
  	this.lineLength = 0;
  	this.popDistance = 0;
  	this.popDistanceReturn = 0;
    this.inversePop = false; // When the lines reach full length they need to shrink into the end position
    this.popping = false;

    this.resetValues = function() {
    	this.lineLength = 0;
    	this.popDistance = 0;
    	this.popDistanceReturn = 0;
    	this.inversePop = false;
    	this.popping = false;

    	this.updateValues();
    }

    this.updateValues = function() {
    	this.x = this.bubble.position.x + (this.bubble.radius + this.popDistanceReturn) * Math.cos(2 * Math.PI * this.index / this.bubble.lines.length);
    	this.y = this.bubble.position.y + (this.bubble.radius + this.popDistanceReturn) * Math.sin(2 * Math.PI * this.index / this.bubble.lines.length);
    	this.lineLength = this.bubble.radius * this.popDistance;
    	this.endX = this.lineLength;
    	this.endY = this.lineLength;
    }

    this.render = function() {
    	this.updateValues();

    	ctx.beginPath();
    	ctx.strokeStyle = '#8bc9ee';
    	ctx.lineWidth = 2;
    	ctx.moveTo(this.x, this.y);
    	if(this.x < this.bubble.position.x) {
    		this.endX = this.lineLength * -1;
    	}
    	if(this.y < this.bubble.position.y) {
    		this.endY = this.lineLength * -1;
    	}
    	if(this.y === this.bubble.position.y) {
    		this.endY = 0;
    	}
    	if(this.x === this.bubble.position.x) {
    		this.endX = 0;
    	}
    	ctx.lineTo(this.x + this.endX, this.y + this.endY);
    	ctx.stroke();
    };
  }



  // ---------------
  // Event Listeners
  // ---------------

  /*smoke*/
  /*smoke end*/


  $(function() {
  	"use strict";
  	var a = 0;
  	$('#tv').hide();
  	for (; a < 25; a += 1) {
  		setTimeout(function b() {
  			var a = Math.random() * 1e3 + 5e3,
  			c = $("<div />", {
  				"class": "smoke",
  				css: {
  					left: Math.random() * 800,
  					backgroundSize: "contain",
  					width: Math.random() * 800,
  					height: Math.random() * 600
  				}
  			});
  			$(c).addClass("animated");
  			$(c).addClass("zoomIn");
  			$(c).addClass("rollOut");
  			$(c).appendTo("#viewport");
  			$.when($(c).animate({}, {
  				duration: a / 4,
  				easing: "linear",
  				queue: false,
  				complete: function() {
  					$(c).animate({}, {
  						duration: a / 3,
  						easing: "linear",
  						queue: false
  					})
  				}
  			}),
  			$(c).animate({
  				bottom: $("#viewport").height()
  			}, {
  				duration: a,
  				easing: "linear",
  				queue: false,
          duration:10000
  			})).then(
  			function() {
  				$(c).remove();
  				b()
  			})
  		}, Math.random() * 3e3)
  	}
  	$("body").keypress(function() {
  		$('body').addClass("fadeOut");
  		setTimeout(function() {
  			$('#tv').show();
  		}, 1000);

  		console.log("Handler for .keypress() called.");
  	});
  }())
  var tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/player_api';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  var tv,
  playerDefaults = {
  	autoplay: 0,
  	autohide: 1,
  	modestbranding: 0,
  	rel: 0,
  	showinfo: 0,
  	controls: 0,
  	disablekb: 1,
  	enablejsapi: 0,
  	iv_load_policy: 3
  };
  var vid = [{
  	'videoId': '2b5QNj-BVhs',
  	'startSeconds': 515,
  	'endSeconds': 690,
  	'suggestedQuality': 'hd720'
  }, {
  	'videoId': '9ge5PzHSS0Y',
  	'startSeconds': 465,
  	'endSeconds': 657,
  	'suggestedQuality': 'hd720'
  }, {
  	'videoId': 'OWsCt7B-KWs',
  	'startSeconds': 0,
  	'endSeconds': 240,
  	'suggestedQuality': 'hd720'
  }, {
  	'videoId': 'qMR-mPlyduE',
  	'startSeconds': 19,
  	'endSeconds': 241,
  	'suggestedQuality': 'hd720'
  }],
  randomvid = Math.floor(Math.random() * (vid.length - 1 + 1));
  function vidRescale() {
  	var w = $(window).width() + 400,
  	h = $(window).height() + 200;

  	if (w / h > 16 / 9) { 
  		$('.tv .screen').css({
  			'left': '0px'
  		});
  	} else { 
  		$('.tv .screen').css({
  			'left': -($('.tv .screen').outerWidth() - w) / 2
  		});
  	}
  }

  $(window).on('load resize', function() {
  	vidRescale();
  });

  $('.hi span').on('click', function() {
  	$('#tv').toggleClass('mute');
  	if ($('#tv').hasClass('mute')) {
  		tv.mute();
  	} else {
  		tv.unMute();
  	}
  });
});
$(document).on('submit', "form", function (event) {
	event.preventDefault();
	var this_form = $(this);
	var post_url = this_form.attr("action");
	var request_method = this_form.attr("method");
	var form_data = this_form.serialize();
	$.ajax({
		url: post_url,
		type: request_method,
		data: form_data
	}).done(function (response) {
    try{
     var obj = JSON.parse(response);
     console.log(obj);
     if(obj.ok){
      alert(obj.ok);
     }else{
      alert(obj.error);
     }
   }catch(e){
    console.log(e);
    console.log(response); 
  }
});

});