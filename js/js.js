function start() { 

	$("#start").hide();
	
	$("#gameBackground").append("<div id='player' class='anima1'></div>");
	$("#gameBackground").append("<div id='enemy1' class='anima2'></div>");
	$("#gameBackground").append("<div id='enemy2' ></div>");
	$("#gameBackground").append("<div id='friend' class='anima3'></div>");

} 
//Game Variables
  var game = {}

  var speed=5;
  var positionY = parseInt(Math.random() * 334);

	var KEY = {
	W: 87,
	S: 83,
	D: 68
	}

	game.pressed = [];

	//Check if the user has pressed any key	
	
	$(document).keydown(function(e){
	  game.pressed[e.which] = true;
	});

	$(document).keyup(function(e){
    game.pressed[e.which] = false;
	});

	//Game Loop

	game.timer = setInterval(loop,30);
	
	function loop() {
	
	moveBackground();
  movePlayer();
  moveEnemy1();
	
	} 

//function to move the game background
	
	function moveBackground() {
	
	esquerda = parseInt($("#gameBackground").css("background-position"));
	$("#gameBackground").css("background-position",esquerda-1);
	
	}
//function to move the player
  function movePlayer() {
	
    if (game.pressed[KEY.W]) {
      var top = parseInt($("#player").css("top"));
      if(top >= 10){
        $("#player").css("top",top-10);
      }
   }
    
    if (game.pressed[KEY.S]) {      
      var top = parseInt($("#player").css("top"));
      if(top<=460){
        $("#player").css("top",top+10);
      }	
    }
    
    if (game.pressed[KEY.D]) {
      
      //shot function	
    }
  
    } 

  function moveEnemy1() {

      positionX = parseInt($("#enemy1").css("left"));
      $("#enemy1").css("left",positionX-speed);
      $("#enemy1").css("top",positionY);
        
        if (positionX <= 0) {
        positionY = parseInt(Math.random() * 334);
        $("#enemy1").css("left",694);
        $("#enemy1").css("top",positionY);
          
        }
    } 