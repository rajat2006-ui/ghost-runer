var tower,towerImg;
var door,doorImg,doorGroup;
var climber,climberImg,climberGroup;
var ghost,ghostImg,ghostStandingImg;
var invisibleSlab,invisibleSlabGroup;
var gameState,PLAY=1,END=0;
var score;

function preload(){
  
  //to load tower
  towerImg=loadImage("tower.png");
  
  //to load door
  doorImg=loadImage("door.png");
  
  //to load climber
  climberImg=loadImage("climber.png");
  
  //to load ghost
  ghostImg=loadImage("ghost-jumping.png");
  ghostStandingImg=loadImage("ghost-standing.png");
}

function setup(){
  createCanvas(400,400);
  
  //to create tower
  tower=createSprite(200,250);
  tower.addImage("Tower",towerImg);
  tower.scale=0.7;
  
  //creating ghost
  ghost=createSprite(200,100);
  ghost.addImage("ghst",ghostImg);
  ghost.addImage("gStand",ghostStandingImg)
  ghost.scale=0.4;
  
 
  //to create group for doors and climber
  doorGroup=new Group();
  climberGroup=new Group();
  invisibleSlabGroup=new Group();
  
  gameState=PLAY;
}

function draw(){
  
  ghost.debug=true;
  ghost.setCollider("rectangle",0,0,140,140)
  
  if(gameState===PLAY){
  //to move tower
  tower.velocityY=4;
  
  //to make ground infinite
  if(tower.y>400){
    tower.y=100;
  }
  
  //to jump ghost
  if(keyDown("space")){
    ghost.velocityY=-9;
  }
  
  //to add gravity
  ghost.velocityY=ghost.velocityY+0.7;
  
   //to move ghost left
  if(keyDown(LEFT_ARROW)){
    ghost.x=ghost.x-7;
  }
  
  //to move ghost right
  if(keyDown(RIGHT_ARROW)){
    ghost.x=ghost.x+7;
  }
  
   
  
  if(ghost.isTouching(invisibleSlabGroup)||ghost.y>400){
    gameState=END;
  }
  
  //to spawn doors
  spawnDoors();
  
   if(ghost.isTouching(climberGroup)){
      ghost.changeImage("gStand",ghostStandingImg);
      ghost.velocityY=0;
    }
    
    score=Math.round(frameCount/60);
  
  drawSprites();
 } 
  else if(gameState===END){
    fill("red");
    textSize(20)
    text("game over",150,50);
  }
  fill("red");
    textSize(20)
  text("score  "+score,300,50);
}

function spawnDoors(){
  if(frameCount%70===0){
    var door=createSprite(random(50,350),-10);
    door.addImage("Door",doorImg);
    door.velocityY=4;
    door.lifetime=100;
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    doorGroup.add(door);
    
    var climber=createSprite(door.x,door.y+50);
    climber.addImage("clmbr",climberImg);
    climber.scale=0.8;
    climber.velocityY=4;
    climber.lifetime=100;
    climberGroup.add(climber);
    
     //to create invisible slab
              invisibleSlab=createSprite(climber.x,climber.y+5,70,3);
    invisibleSlab.velocityY=4;
    invisibleSlab.lifetime=100;
    invisibleSlab.visible=false;
    invisibleSlabGroup.add(invisibleSlab);
    
  }
}
