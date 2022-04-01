//import {teste} from "./movements.js"
function start() {
  $("#start").hide();
  $("#gameBackground").append("<div id='player' class='anima1'></div>");
  $("#gameBackground").append("<div id='enemy1' class='anima2'></div>");
  $("#gameBackground").append("<div id='enemy2' ></div>");
  $("#gameBackground").append("<div id='friend' class='anima3'></div>");
  $("#gameBackground").append("<div id='scoreboard'></div>");
  $("#gameBackground").append("<div id='life'></div>");

  //Game Variables
  var game = {}
  var gameover = false;
  canShot = true;
  var speed = 5;
  var positionY = parseInt(Math.random() * 334);
  var KEY = {
    W: 87,
    S: 83,
    D: 68
  }
  game.pressed = [];
  var score = 0;
  var saved = 0;
  var lost = 0;
  var currentLife = 3;
  var shotSong = document.getElementById("shotSong");
  var explosionSong = document.getElementById("explosionSong");
  var music = document.getElementById("music");
  var gameoverSong = document.getElementById("gameoverSong");
  var lostSong = document.getElementById("lostSong");
  var rescueSong = document.getElementById("rescueSong");

  //Music loop
  music.addEventListener("ended", function () { music.currentTime = 0; music.play(); }, false);
  music.play();
  //Check if the user has pressed any key	

  $(document).keydown(function (e) {
    game.pressed[e.which] = true;
  });
  $(document).keyup(function (e) {
    game.pressed[e.which] = false;
  });

  //Game Loop
  game.timer = setInterval(loop, 30);

  function loop() {
    moveBackground();
    movePlayer();
    moveEnemy1();
    moveEnemy2();
    moveFriend()
    collision()
    scoreboard()
    life();
  }

  //function to move the game background
  function moveBackground() {
    left = parseInt($("#gameBackground").css("background-position"));
    $("#gameBackground").css("background-position", left - 1);
  }

  //function to move the player
  function movePlayer() {
    if (game.pressed[KEY.W]) {
      var top = parseInt($("#player").css("top"));
      if (top >= 10) {
        $("#player").css("top", top - 10);
      }
    }
    if (game.pressed[KEY.S]) {
      var top = parseInt($("#player").css("top"));
      if (top <= 460) {
        $("#player").css("top", top + 10);
      }
    }
    if (game.pressed[KEY.D]) {
      shot()
    }
  }

  function moveEnemy1() {
    positionX = parseInt($("#enemy1").css("left"));
    $("#enemy1").css("left", positionX - speed);
    $("#enemy1").css("top", positionY);

    if (positionX <= 0) {
      positionY = parseInt(Math.random() * 334);
      $("#enemy1").css("left", 694);
      $("#enemy1").css("top", positionY);
    }
  }

  function moveEnemy2() {
    positionX = parseInt($("#enemy2").css("left"));
    $("#enemy2").css("left", positionX - 3)
    
    if (positionX <= 0) {
      $("#enemy2").css("left", 775)
    }
  }

  function moveFriend() {
    positionX = parseInt($("#friend").css("left"));
    $("#friend").css("left", positionX + 1)
    
    if (positionX >= 906) {
      $("#friend").css("left", 0)
    }
  }

  function shot() {
    if (canShot == true) {
      canShot = false;
      topApache = parseInt($("#player").css("top"))
      positionX = parseInt($("#player").css("left"))
      shotX = positionX + 190;
      topShot = topApache + 37;
      $("#gameBackground").append("<div id='shot'></div");
      $("#shot").css("top", topShot);
      $("#shot").css("left", shotX);
      var shotTime = window.setInterval(executeShot, 30);
    }

    function executeShot() {
      shotSong.play();
      positionX = parseInt($("#shot").css("left"));
      $("#shot").css("left", positionX + 25);

      if (positionX > 900) {
        window.clearInterval(shotTime);
        shotTime = null;
        $("#shot").remove();
        canShot = true;
      }
    }
  }

  function collision() {
    var collision1 = ($("#player").collision($("#enemy1"))); //framework jquery "collision"
    var collision2 = ($("#player").collision($("#enemy2")));
    var collision3 = ($("#shot").collision($("#enemy1")));
    var collision4 = ($("#shot").collision($("#enemy2")));
    var collision5 = ($("#player").collision($("#friend")));
    var collision6 = ($("#enemy2").collision($("#friend")));

    if (collision1.length > 0) {
      explosionSong.play()
      currentLife--;
      enemy1X = parseInt($("#enemy1").css("left"));
      enemy1Y = parseInt($("#enemy1").css("top"));
      explosion1(enemy1X, enemy1Y);
      positionY = parseInt(Math.random() * 334);
      $("#enemy1").css("left", 694);
      $("#enemy1").css("top", positionY);
    }
    if (collision2.length > 0) {
      explosionSong.play()
      currentLife--;
      enemy2X = parseInt($("#enemy2").css("left"));
      enemy2Y = parseInt($("#enemy2").css("top"));
      explosion2(enemy2X, enemy2Y);
      $("#enemy2").remove();
      enemy2Reposition();
    }
    if (collision3.length > 0) {
      explosionSong.play()
      score = score + 100;
      speed = speed + 0.3;
      enemy1X = parseInt($("#enemy1").css("left"));
      enemy1Y = parseInt($("#enemy1").css("top"));
      explosion1(enemy1X, enemy1Y);
      $("#shot").css("left", 950);
      positionY = parseInt(Math.random() * 334);
      $("#enemy1").css("left", 694);
      $("#enemy1").css("top", positionY);
    }
    if (collision4.length > 0) {
      explosionSong.play()
      score = score + 50;
      enemy2X = parseInt($("#enemy2").css("left"));
      enemy2Y = parseInt($("#enemy2").css("top"));
      $("#enemy2").remove();
      explosion2(enemy2X, enemy2Y);
      $("#shot").css("left", 950);
      enemy2Reposition();
    }
    if (collision5.length > 0) {
      rescueSong.play()
      saved++;
      friendReposition();
      $("#friend").remove();
    }
    if (collision6.length > 0) {
      lostSong.play()
      lost++;
      friendX = parseInt($("#friend").css("left"));
      friendY = parseInt($("#friend").css("top"));
      explosion3(friendX, friendY);
      $("#friend").remove();
      friendReposition();
    }
  }

  function explosion1(enemy1X, enemy1Y) {
    $("#gameBackground").append("<div id='explosion1'></div");
    $("#explosion1").css("background-image", "url(imgs/explosion.png)");
    var div = $("#explosion1");
    div.css("top", enemy1Y);
    div.css("left", enemy1X);
    div.animate({ width: 200, opacity: 0 }, "slow");
    var explosionTime = window.setInterval(removeExplosion, 1000);

    function removeExplosion() {
      div.remove();
      window.clearInterval(explosionTime);
      explosionTime = null;
    }
  }

  function explosion2(enemy2X, enemy2Y) {
    $("#gameBackground").append("<div id='explosion2'></div");
    $("#explosion2").css("background-image", "url(imgs/explosion.png)");
    var div2 = $("#explosion2");
    div2.css("top", enemy2Y);
    div2.css("left", enemy2X);
    div2.animate({ width: 200, opacity: 0 }, "slow");
    var explosionTime2 = window.setInterval(removeExplosion2, 1000);

    function removeExplosion2() {
      div2.remove();
      window.clearInterval(explosionTime2);
      explosionTime2 = null;
    }
  }

  function explosion3(friendX, friendY) {
    $("#gameBackground").append("<div id='explosion3' class='anima4'></div");
    $("#explosion3").css("top", friendY);
    $("#explosion3").css("left", friendX);
    var explosin3Time = window.setInterval(explosion3Reset, 1000);

    function explosion3Reset() {
      $("#explosion3").remove();
      window.clearInterval(explosin3Time);
      explosin3Time = null;
    }
  }

  function enemy2Reposition() {
    var collision4Time = window.setInterval(reposition4, 5000);

    function reposition4() {
      window.clearInterval(collision4Time);
      collision4Time = null;

      if (gameover == false) {
        $("#gameBackground").append("<div id=enemy2></div");
      }
    }
  }

  function friendReposition() {
    var friendTime = window.setInterval(reposition6, 3000);

    function reposition6() {
      window.clearInterval(friendTime);
      friendTime = null;

      if (gameover == false) {
        $("#gameBackground").append("<div id='friend' class='anima3'></div>");
      }
    }
  }

  function scoreboard() {
    $("#scoreboard").html("<h2> Score: " + score + " Saved: " + saved + " Lost: " + lost + "</h2>");
  }

  function life() {
    if (currentLife == 3) {
      $("#life").css("background-image", "url(imgs/life3.png)");
    }
    if (currentLife == 2) {
      $("#life").css("background-image", "url(imgs/life2.png)");
    }
    if (currentLife == 1) {
      $("#life").css("background-image", "url(imgs/life1.png)");
    }
    if (currentLife == 0) {
      $("#life").css("background-image", "url(imgs/life0.png)");
      gameOver();
    }
  }

  function gameOver() {
    gameover = true;
    music.pause();
    gameoverSong.play()
    window.clearInterval(game.timer);
    game.timer = null;
    $("#player").remove();
    $("#enemy1").remove();
    $("#enemy2").remove();
    $("#friend").remove();
    $("#gameBackground").append("<div id='gameover'></div>");
    $("#gameover").html("<h1> Game Over </h1><p>Your score was: " + score + "</p>" + "<div id='restart'><button id='restartGame' onclick='restartGame()'>Play Again</button></div>");
    document.getElementById("restartGame").addEventListener("click", restartGame);
  }

  function restartGame() {
    $("#gameover").remove();
    gameoverSong.pause();
    start()
  }
}


