var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  

  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkpoint.mp3")
}

function setup() {
  createCanvas(600, 200);



  var message = "Esto es un mensaje";
 console.log(message)
  
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  

  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  invisibleGround = createSprite(200,190,1000,10);
  invisibleGround.visible = false;

  trex.setCollider("rectangle",0,0,trex.width,trex.height);
  trex.debug = true
  
  score = 0;
  
}

function draw() {
  
  background(180);
  //mostrar puntuación
  text("Puntuación: "+ score, 500,50);
  
  
  if(gameState === PLAY){

    //puntuación
    score = score + Math.round(getFrameRate()/60)
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    //como pongo un if de que cuando el jugador suelte la tecla D no se mueva el fondo
    if(keyDown("D")){
       trex.velocity.x=3
       ground.velocityX = -(1 + 3* score/100)

    }
    //hacer que el trex salte al presionar la barra espaciadora
    if(keyDown("space")&& trex.y >= 140) {
        trex.velocity.y = -12;
        jumpSound.play();
    }
    
    //agregar gravedad
    trex.velocityY = trex.velocityY + 0.8
  
  //evitar que el trex caiga
  trex.collide(invisibleGround);
  drawSprites();
}
}




