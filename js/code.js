 var miss = 0;
    var hit = 0;
     

function centerGameBoard(){
	windowWidth = $(window).width();
	windowHeight = $(window).height();
	var moveLine = new TimelineMax({onComplete: turnOnLeftLight})//po naciśnieciu przesuń ekran w lewo

	//$("#startScreen").css({'top': ((windowHeight / 2) - ($('#startScreen').height() /2)) + 50, "left": (windowWidth / 2) - ($("#title").width() /2)});
//	$("#board").css({'top': ((windowHeight / 2) - ($('#board').height() /2)), "left": windowWidth});
     TweenMax.to("#container-wrapper",3,{scaleY: 1.2, scaleX:1.2,x:"650px",ease:Quad.easeOut});//szybkizjazd z zwolnieniem
	
		TweenMax.set($("#title"),{textShadow:"0px 0px 25px rgba(41,255,55,1)",color:"#211215"});
	
	}
	
	function binStart(){
	$("#start").click(function(event){
		var moveLine = new TimelineMax({onComplete: turnOnLeftLight})//po naciśnieciu przesuń ekran w lewo
	//	moveLine.add(TweenMax.to("#container-wrapper",.5,{left:-(windowWidth/2) -($("#board").height()/2)}));
		  TweenMax.to("#container-wrapper",3,{scaleY: 1.3, scaleX:1.3,x:"-400px",ease:Quad.easeOut},"+=15");

	});
}
function turnOnLeftLight(){
	 
}
function game(){
	  var head = $("#trumna img"),
	       zamek=$("#zamek img"),
		   nietoperz=$("#nietoperz img"),
		   pomnik=$("#nagrobek img");
		var tl = new TimelineLite();
	tl.play();
		tl.from(zamek, 4, {scale:.2, autoAlpha:0}, "+=5");
	tl.from(trumna, 0.5, {left:300, opacity:0}, "+=0.4");
	tl.from(nietoperz, 1, {left:-300,  opacity:0}, "-=0.25");
	tl.from(pomnik, 0.7, {scale:.2, opacity:0});
	
	 }	 
    $(document).ready(function() {
    centerGameBoard();
	binStart();
	 game();
       
        $("#btnstart").click(function(){
		startplay();
            
        });

        function startplay() {
            $("#message").fadeOut('slow');
            $(".character").fadeOut('slow');
            $("#miss").html("0 Miss");
            $("#hit").html("0 Hit");
            miss = 0;
            hit = 0;
            $("#btnstart").css("color", "#11e3e3");
            $("#btnstart").unbind("click");
            play = setInterval(scramble, 800);
            setTimeout(function() {
                clearInterval(play);
                $("#btnstart").css("color", "#333333");
                $("#btnstart").bind("click", startplay);

                // wiadomość o przejściu na czarną strone mocy
                var containerPos = $('#container').offset();
                $("#message").animate({
                    top: containerPos.top,
                    left: containerPos.left
                    }, 'fast', function() {
                        setTimeout(function() {
                            $("#message").fadeIn('slow');
                            $(".character").fadeIn('slow');
                        }, 2500);
                });
            }, 30000);// czas gry
        }

        $(".character").click(function() {
            if ($(this).hasClass("ally")) {
                $(this).effect("bounce", 300);
               $(this).slideUp("fast");
                miss++;
                $("#miss").html(miss + " Miss");
            } else {
                $(this).effect("explode", 500);//efekt po trafieniu
                hit++;
                $("#hit").html(hit + " Hit");
            }
        });
    });

    function randomFromTo(from, to){
        return Math.floor(Math.random() * (to - from + 1) + from);
    }

    function scramble() {//losuje randomowo postać 
        var children = $('#container').children();

        var randomId = randomFromTo(1, children.length);
        moveRandom('char'+randomId);
		
        setTimeout(function(){
            $("#char"+randomId).slideDown('fast');            
        }, 500);
        
        setTimeout(function() {
            $("#char"+randomId).slideUp('fast');
        }, 1500);
    }

    function moveRandom(id) {
        /* pozycja konteneru obrazka pobieranie rozmiaru ramki*/
        var cPos = $('#container').offset();//pozycja w stosunku do dokumentu
        var cHeight = $('#container').height();
        var cWidth = $('#container').width();

        // marginesy tę samą wartość
        var pad = parseInt($('#container').css('padding-top').replace('px', ''));//wyszujaj i zastąp

        // rozmiar skżynki
        var bHeight = $('#'+id).height();
        var bWidth = $('#'+id).width();

        // max pozycja
        maxY = cPos.top + cHeight  - pad;
        maxX = cPos.left + cWidth  - pad;

        // min pozycja
        minY = cPos.top + pad;
        minX = cPos.left + pad;

        // ustaw nową pozycje
        newY = randomFromTo(minY, maxY);
        newX = randomFromTo(minX, maxX);

        $('#'+id).animate({
            top: newY,
            left: newX
            }, 'fast', function() {
        });
    }