//https://atishayacoder.github.io/PROJECT-C37-INFINITE-RUNNER-GAME/
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var technoBlade,technoBladeImg;
var dreamImg,dream;
var bg,bgImg;
var ground,groundImg,invisibleGround;
var ememy1,enemy2,enemy3,enemy4,enemy5,enemyGrp;
var youDied,youDiedImg,respawn,respawnImg;
var score;

function preload(){
  dreamImg = loadImage("Dream.png");
  technoBladeImg = loadImage("TechnoBlade.png");
  bgImg = loadImage("bgImg.png");
  groundImg = loadImage("groundImg.png");
  enemy1 = loadImage("enemy1.png");
  enemy2 = loadImage("enemy2.png");
  enemy3 = loadImage("enemy3.png");
  enemy4 = loadImage("enemy4.png");
  enemy5 = loadImage("enemy5.png");
  respawnImg = loadImage("respawn.png");
  youDiedImg = loadImage("you died.png");
}

function setup(){
  createCanvas(displayWidth, displayHeight);

  bg = createSprite( 700, 400,displayWidth , displayHeight);
  bg.addImage(bgImg);
  bg.scale = 6;

  ground = createSprite(800,500,displayWidth+50,50);
  ground.addImage(groundImg);
  ground.scale = 0.75;

  invisibleGround = createSprite(800,475,displayWidth+50,10);
  invisibleGround.visible = false;

  youDied = createSprite(700, 400,displayWidth , displayHeight);
  youDied.addImage(youDiedImg);
  respawn = createSprite(700,400,100,10);
  respawn.addImage(respawnImg);
  respawn.visible = false;
  youDied.visible = false;
  technoBlade = createSprite(400,450,30,30);
  technoBlade.addImage(technoBladeImg);
  technoBlade.setCollider("rectangle",0-43,0-70,40,40);

  dream = createSprite(200,450,30,30);
  dream.addImage(dreamImg);
  dream.setCollider("rectangle",0-6,0-40,100,40);

  enemyGrp = new Group();

  score = 0;

}

function draw(){
  background("white");
  fill("white")
  text("Score: "+ score, 500,400);

  if (ground.x < 250){
    ground.x = ground.width/2 - 500;
  }

  technoBlade.collide(invisibleGround);
  dream.collide(invisibleGround);
  if(gameState == PLAY){

    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(4 + 3*score/100);

    camera.y = technoBlade.y;
    enemy();
    if(keyDown("space") && technoBlade.y >= 450){
      technoBlade.velocityY = -10;
    }
    technoBlade.velocityY = technoBlade.velocityY + 0.8;
    if(technoBlade.isTouching(enemyGrp)){
      gameState = END;
    }
    if(dream.isTouching(enemyGrp) && dream.velocityY>= 450){
      dream.velocityY = -10;
    }
    dream.velocityY = dream.velocityY + 0.8;
}
if(gameState == END){
  ground.velocityX = 0;
  enemyGrp.destroyEach();
  respawn.visible = true;
  youDied.visible = true;
  if(mousePressedOver(respawn)){
     restart();
  }

}
  
  drawSprites();
}
function restart(){
  gameState = PLAY;
  respawn.visible = false;
  youDied.visible = false;
  score = 0;
}
function enemy() {
  if(frameCount % 150 === 0) {
    var enemy = createSprite(800,475,30,30);
    enemy.scale = 0.45;
    enemy.velocityX = ground.velocityX;
    var rand = Math.round(random(1,2,3,4,5));
     switch(rand) {
       case 1: enemy.addImage(enemy1);
               enemy.scale = 0.5;
               break;
       case 2: enemy.addImage(enemy2);
               enemy.scale = 0.5;
               break;
       case 3: enemy.addImage(enemy3);
               enemy.scale = 0.5;
               break;
       case 4: enemy.addImage(enemy4);
               enemy.scale = 0.5;
               break;
       case 5: enemy.addImage(enemy5);
               enemy.scale = 0.5;
               break;
       default: break;
    }
    enemyGrp.add(enemy);
  }
}