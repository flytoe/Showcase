//ANCESTOR
var ascensor = $('#Work').ascensor({
    time: 250,
    easing: 'easeInOutCubic',
    ascensorFloorName: ["Intro", "lighthouse", "prototyper", "Work 3", "Work 4", "Work 5", "Contact"],
    direction: 'x',
    swipeNavigation: true,
    keyNavigation: true,
    jump: true,
    loop: true

});
	

var ascensorInstance = $('#Work').data('ascensor');		
			$(".links-to-floor li").click(function(event, index) {
				ascensorInstance.scrollToFloor($(this).index());
			});

			$(".links-to-floor li:eq("+ ascensor.data("current-floor") +")").addClass("selected");
			ascensor.on("scrollStart", function(event, floor){
				$(".links-to-floor li").removeClass("selected");
				$(".links-to-floor li:eq("+floor.to+")").addClass("selected");
			});
			
            $(".prev").on('touchstart click', function() {
				ascensorInstance.prev();
            });
			
            $(".next").on('touchstart click', function() {
				ascensorInstance.next();
			});
				
			$(".direction").click(function() {
				ascensorInstance.scrollToDirection($(this).data("direction"));
			});

//jQuery
$(".next").click(function() { 
    $(".fullText").fadeOut({
        duration: 5,
        easing: 'easeInOutCubic',  
    });
    $(".fullText").fadeIn({
        duration: 150,
        easing: 'easeInOutCubic',  
    });
});

$(".introText").click(function() { 
    $('body').scrollTop( 300 );
});
