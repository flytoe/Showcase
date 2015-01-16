window.onload = function () {
    GetVideos();
    var count = 0;
};


<!-- Essential Functions -->

var activefloor;
var projectOpen = false;
var aboutOpen;
var currentscroll;
var currentVid;
var isPaused;
var wasPaused;
var isPlaying;



function OpenProject() {

	$(this).closest(".work").toggleClass("modify");	
	$(".close").toggleClass("active");  
	$(".bottom").addClass("hide");
	
	//get active floor	
	activefloor = ascensor.data("current-floor");	
	projectOpen = true;
	
	GetVideos();	
	
}

function CloseProject() {

	$(this).closest(".work").toggleClass("modify");	

}

function ScrollUp() {
	
	currentwork = $(".work:eq("+activefloor+")");
	
	currentwork.animate({
	    scrollTop: '0px'
	},
	600, "easeInOutQuint");
	
}


<!-- VIDEOS -->

function GetVideos() {

	// Enable the API on each Vimeo video
	$('iframe.video').each(function(){
	    Froogaloop(this).addEvent('ready', ready);
	    ////console.log("all videos ready");
	});
	
}

	function ready(player_id){
	    // Add event listeners
	    
	    // get the currently played video
	    Froogaloop(player_id).addEvent('play', function(player_id){
	    	isPlaying = true;
	    	isPaused = false;
	    	currentVid = player_id;
	    	//console.log(player_id + "– playing");
	    	
	    })
	   
	   Froogaloop(player_id).addEvent('pause', function(player_id) {
	   	isPaused=true;
	   	//console.log(player_id + " is paused.");
	   })
	   
	}




function StopVideo() {
	
	Froogaloop(currentVid).api('unload');
	//console.log(currentVid + "– Video stopped");
	
	//forget video and stats	
	currentVid = null;
	isPaused = false;
	wasPaused = undefined;
	isPlaying = false;
}

function PauseVideo() {
	

		if (activefloor != 5) 
		{

			Froogaloop(currentVid).api("pause");
			//console.log("video paused");
		}
		else if (activefloor = 5)
		{			
			//Pause it
			Froogaloop(currentVid).api('pause');
		}
}



function ResumeVideo() {
	
	if (activefloor != 5)
	{
		Froogaloop(currentVid).api("play");
		//console.log("video resumed");
	}
	else if (activefloor = 5)
	{
		Froogaloop(currentVid).api('play');
	}
}







<!-- EVENTS -->	
	
	//Open Project
	$( ".open-project" ).on( "click", OpenProject );
	
	
	//Scroll to top
	$( ".totop" ).on( "click", ScrollUp );
	

	//Scroll Up and Close
	$(".close").on({
	    click: function() 
	    {
	    
	    //get current scroll position and project
	    currentscroll = $(".work:eq("+activefloor+")").scrollTop();
	    currentwork = $(".work:eq("+activefloor+")");
	    
	    //stop and reset Video
	    if (isPlaying) 
	    {
	    	StopVideo();
	    }

	    	    
		    //if user has scrolled down, scroll up first and then close
		    if (currentscroll > 0) 
		    {
		    		currentwork.animate({
		    		    scrollTop: '0px'
		    		},
		    		250, "easeInOutQuint");
	
		    		
		    		setTimeout($.proxy(function CloseProject() {
		    		    
		    		    currentwork.toggleClass("modify");	        
		    		    $(".close").toggleClass("active");
		    		    $(".bottom").removeClass("hide");
		    		    projectOpen = false;
		    		    //Wait some time to hide the content, so that it can fade out properly	        
		    		    setTimeout($.proxy(function()
		    		        {
		    		            currentwork.find('.content').toggleClass("visual");
		    		        }, this), 400);
		    		    
		    		}, this), 250);
		    }
		    
		    //if user has scrolled to top, close immediately
		    else if (currentscroll == 0) 
		    {
		    		currentwork.toggleClass("modify");	        
		    		$(".close").toggleClass("active");
		    		$(".bottom").removeClass("hide");
		    		projectOpen = false;
		    		//Wait some time to hide the content, so that it can fade out properly	        
		    		setTimeout($.proxy(function()
		    		    {
		    		        currentwork.find('.content').toggleClass("visual");
		    		    }, this), 400);
		    }

	    }
	});


	


	
<!--///////////////////////////////////////////////////////////////////////////////////-->	

<!-- Load and init Ascensor -->
				var animationSpeed = 200;
				var ascensor = $('#ascensor').ascensor({loop: true,keyNavigation: true, direction: [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6]]});
				var ascensorInstance = $('#ascensor').data('ascensor');
				var pageNav = $("#pagenav");
			
			//		{ascensorFloorName:["hybmix", "meshexperience", "bookbox" , "stereodrama","larva", "others"], 
					
				$(".links-to-floor li").click(function(event, index) {
					ascensorInstance.scrollToFloor($(this).index());
				});
		
				
				
				$(".links-to-floor li:eq("+ ascensor.data("current-floor") +")").addClass("selected");
							
				
							ascensor.on("scrollStart", function(event, floor){
								
								//console.log("currentVideo: " + currentVid + " – Playing: " + isPlaying + " – Paused: " + isPaused);
								
								$(".close").removeClass("active");
								$(".bottom").removeClass("hide");
								
								$(".links-to-floor li").removeClass("selected");
								$(".links-to-floor li:eq("+floor.to+")").addClass("selected");
							});
							
				
				$(".direction").click(function() {
					ascensorInstance.scrollToDirection($(this).data("direction"));
				});
				
				
				
			//Close project, if it's open and user leaves floor
							
				var closing = null;
				
				//if project on last floor is open, close it...
				ascensor.on("scrollEnd", function(e, floor) 
				{
					
					//keep floor with open project
					var originfloor = $(".work:eq("+activefloor+")")	
					
					//get floor that is coming
					var nextfloor = floor.to;
						
					if(projectOpen)
					{
					
						//if the active project is visited again within the timeout, don't close it...
						if (activefloor == nextfloor) 
						{
							clearTimeout(closing);
							//console.log("Don't close");
						}
						
						//...otherwise, close it after the timeout
						else 
						{
							closing = setTimeout($.proxy(function(){
								
								originfloor.removeClass("modify");
								projectOpen = false;
								//console.log("close");
								
								
								//check if video is playing and unload it if yes
								if (isPlaying) 
								{
									StopVideo();
									
								}
								
								
								setTimeout($.proxy(function()
								    {
								        originfloor.find('.content').removeClass("visual");
								    }, this), 50);
								    
							}, this), 400);
						
					 	}
				 	
				 	}

		
				
				});
				
<!-- Page load -->
var imageCount=0;
var loaded = 0;
var barWidth = $('.loading-bar').css("width");
var windowSize;

function Initialize() {
	console.log("let's go");
	$(".loading-bar-wrapper").fadeOut("slow");
	$("#pageload").addClass("loaded");
	  
	$(".top").removeClass("loaded");
	$(".bottom").removeClass("loaded");
	$(".links").removeClass("loaded");
	$(".rechts").removeClass("loaded");
	
	$(".work:eq(0)").find(".cover-title").toggleClass("hidden");
}


$('#ascensor').imagesLoaded()
	.done( function() {
		console.log("all loaded");
  		
	})
	
	.progress( function( instance, image ) {
  		imageCount ++;
  		loaded = Math.round((imageCount/0.35));
		windowSize = document.body.clientWidth + "px";
		
		window.onresize = function(event) {
		    windowSize = document.body.clientWidth + "px";
		};
							
		$('.loading-bar').animate({
			width: loaded + "%"
				}, {
				duration: 50,
				complete: function () {

							barWidth = $(".loading-bar").css("width");

							if (barWidth == windowSize) 
							{
								Initialize();
							}			
				}
		});

});